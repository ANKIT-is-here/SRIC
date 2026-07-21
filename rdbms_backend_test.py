"""
rdbms_backend_test.py  --  run on port 8001
Pair with main.py (port 8000) for SSE search.

Start with:  uvicorn rdbms_backend_test:app --port 8001 --reload
"""

import csv
import os
import shutil
import subprocess
import json
import time
from pathlib import Path
from typing import List

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from rdbms_utils.inverted_index import build_and_persist, normalise, TCVMap

app = FastAPI(title="Inverted Index Explorer")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

UPLOAD_DIR = Path("./uploads")
INDEX_DIR  = Path("./rdbms_test")

SETUP_BINARY  = "./ntru-oqxt-setup"
SEARCH_BINARY = "./ntru-oqxt-search"

UPLOAD_DIR.mkdir(exist_ok=True)
INDEX_DIR.mkdir(exist_ok=True)


# ── Binary runner ──────────────────────────────────────────────────────────────

def run_binary(binary: str, args: list, timeout: int = 30) -> dict:
    """
    Run a binary with args.  Always returns a dict with an "output" field
    containing the full stdout (+ stderr if any), so callers can reliably
    parse "Search time = X micro-seconds", "Nmatch: Y", etc.
    """
    if not os.path.isfile(binary):
        raise HTTPException(
            status_code=500,
            detail=f"Binary '{binary}' not found. Place it next to this file and run: chmod +x {binary}",
        )
    cmd = [binary] + args
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        combined = proc.stdout
        if proc.stderr:
            combined += "\n--- stderr ---\n" + proc.stderr
        return {
            "command":   " ".join(cmd),
            "exit_code": proc.returncode,
            "output":    combined.strip() or "(binary produced no output)",
        }
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail=f"Binary not executable: {binary}")
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail=f"Binary timed out after {timeout}s")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── TCV helpers ────────────────────────────────────────────────────────────────

def _load_tcv_map() -> TCVMap:
    tcv_map = TCVMap()
    tcv_map.load(INDEX_DIR)
    return tcv_map


def resolve_filters_to_ids(filters: list) -> tuple:
    """Convert [{table, column, value}] → (tcv_ids, missing)."""
    tcv_map = _load_tcv_map()
    tcv_ids, missing = [], []
    for f in filters:
        tid = tcv_map.lookup(f["table"], f["column"], normalise(f.get("value", "")))
        (tcv_ids if tid else missing).append(tid if tid else f)
    return tcv_ids, missing


def schema_from_csv() -> dict:
    path = INDEX_DIR / "tcv_to_id.csv"
    if not path.exists():
        return {}
    schema: dict = {}
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            schema.setdefault(row["table"], set()).add(row["column"])
    return {t: sorted(cols) for t, cols in schema.items()}


def values_from_csv(table: str, column: str) -> list:
    path = INDEX_DIR / "tcv_to_id.csv"
    if not path.exists():
        return []
    vals = []
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["table"] == table and row["column"] == column:
                vals.append(row["value"])
    return sorted(vals)


# ── Endpoints ──────────────────────────────────────────────────────────────────

@app.get("/status")
def status():
    return {"index_ready": (INDEX_DIR / "tcv_to_id.csv").exists()}


@app.post("/upload")
async def upload_database(file: UploadFile = File(...)):
    """Accept a SQLite .db file, build TCV/TR index, run setup binary."""
    if not file.filename.endswith(".db"):
        raise HTTPException(status_code=400, detail="Only .db files accepted.")

    dest = UPLOAD_DIR / file.filename
    with dest.open("wb") as f:
        shutil.copyfileobj(file.file, f)

    shutil.rmtree(INDEX_DIR, ignore_errors=True)
    INDEX_DIR.mkdir()

    try:
        stats = build_and_persist(str(dest), str(INDEX_DIR))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Index build failed: {e}")

    # Copy inverted_index.csv → db6k.dat for the setup binary
    shutil.copy(INDEX_DIR / "inverted_index.csv", "db6k.dat")

    setup_result = None
    setup_error  = None
    try:
        setup_result = run_binary(SETUP_BINARY, [], timeout=120)
    except HTTPException as e:
        setup_error = e.detail

    return {
        "filename":    file.filename,
        "stats":       stats,
        "setup":       setup_result,
        "setup_error": setup_error,
    }


@app.get("/schema")
def schema():
    s = schema_from_csv()
    if not s:
        raise HTTPException(status_code=400, detail="No index found. Upload a .db file first.")
    return s


@app.get("/values")
def values(table: str, column: str):
    return {"values": values_from_csv(table, column)}


@app.post("/resolve-tcv")
def resolve_tcv(req: dict):
    """
    Preview endpoint: resolve a list of filters to their TCV IDs without
    running a search.  Used by the filter builder to show an ID badge as
    soon as the user picks a value.

    Request body: { "filters": [{table, column, value}, ...] }
    Response:     { "resolved": [{table, column, value, found, tcv_id}, ...] }
    """
    filters = req.get("filters", [])
    tcv_map = _load_tcv_map()
    resolved = []
    for f in filters:
        norm = normalise(f.get("value", ""))
        tid  = tcv_map.lookup(f.get("table", ""), f.get("column", ""), norm)
        resolved.append({
            "table":   f.get("table"),
            "column":  f.get("column"),
            "value":   f.get("value"),
            "found":   tid is not None,
            "tcv_id":  tid,
        })
    return {"resolved": resolved}


class ConjunctiveRequest(BaseModel):
    word_ids: List[str]
    words:    List[str] = []


@app.post("/conjunctive-search")
def conjunctive_search(req: ConjunctiveRequest):
    if not req.word_ids:
        raise HTTPException(status_code=400, detail="No word IDs provided")
    t0     = time.perf_counter()
    result = run_binary(SEARCH_BINARY, req.word_ids, timeout=30)
    ms     = round((time.perf_counter() - t0) * 1000, 4)
    return {**result, "word_ids": req.word_ids, "words": req.words, "time_taken": ms}


class FilterRequest(BaseModel):
    filters: List[dict]


@app.post("/search")
def search(req: FilterRequest):
    if not req.filters:
        raise HTTPException(status_code=400, detail="No filters provided.")

    tcv_ids, missing = resolve_filters_to_ids(req.filters)
    if missing:
        raise HTTPException(status_code=400, detail=f"Could not resolve filters: {missing}")

    t0     = time.perf_counter()
    result = run_binary(SEARCH_BINARY, tcv_ids, timeout=30)
    ms     = round((time.perf_counter() - t0) * 1000, 4)

    return {
        **result,
        "word_ids":   tcv_ids,
        "words":      [f"({f['table']},{f['column']},{f['value']})" for f in req.filters],
        "time_taken": ms,
    }


@app.get("/download/{filename}")
def download_file(filename: str):
    allowed = {"tcv_to_id.csv","id_to_tcv.csv","tr_to_id.csv","id_to_tr.csv",
               "inverted_index.csv","inverted_index.txt","db6k.dat"}
    if filename not in allowed:
        raise HTTPException(status_code=404)
    path = INDEX_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="File not found.")
    return FileResponse(str(path), filename=filename)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("rdbms_backend_test:app", host="0.0.0.0", port=8001, reload=True)