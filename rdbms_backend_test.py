"""
main.py
"""

import csv
import shutil
import subprocess
import json
from pathlib import Path
from typing import List

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
# from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from rdbms_utils.inverted_index import build_and_persist, normalise, TCVMap

app = FastAPI(title="Inverted Index Explorer")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

UPLOAD_DIR    = Path("./uploads")
INDEX_DIR     = Path("./rdbms_test")

SETUP_BINARY    = "./ntru-oqxt-setup"
SEARCH_BINARY   = "./ntru-oqxt-search"


UPLOAD_DIR.mkdir(exist_ok=True)
INDEX_DIR.mkdir(exist_ok=True)


# ── Binary runner ──────────────────────────────────────────────────────────────

def run_binary(binary: str, args: list, timeout: int = 30) -> dict:
    result = subprocess.run(
        [binary] + args,
        capture_output=True, text=True, timeout=timeout
    )
    try:
        return json.loads(result.stdout)
    except Exception:
        return {"stdout": result.stdout, "stderr": result.stderr, "returncode": result.returncode}


# ── TCV lookup from CSV only ───────────────────────────────────────────────────

def resolve_filters_to_ids(filters: list) -> tuple:
    """Convert [{table, column, value}] → (tcv_ids, missing) using CSV only."""
    tcv_map = TCVMap()
    tcv_map.load(INDEX_DIR)

    tcv_ids = []
    missing = []
    for f in filters:
        norm = normalise(f.get("value", ""))
        tid  = tcv_map.lookup(f["table"], f["column"], norm)
        if tid:
            tcv_ids.append(tid)
        else:
            missing.append(f)
    return tcv_ids, missing


def schema_from_csv() -> dict:
    """Tables + columns from tcv_to_id.csv — no SQLite."""
    path = INDEX_DIR / "tcv_to_id.csv"
    if not path.exists():
        return {}
    schema: dict = {}
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            schema.setdefault(row["table"], set()).add(row["column"])
    return {t: sorted(cols) for t, cols in schema.items()}


def values_from_csv(table: str, column: str) -> list:
    """Distinct values for (table, column) from tcv_to_id.csv — no SQLite."""
    path = INDEX_DIR / "tcv_to_id.csv"
    if not path.exists():
        return []
    vals = []
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["table"] == table and row["column"] == column:
                vals.append(row["value"])
    return sorted(vals)


# ── Upload & Index ─────────────────────────────────────────────────────────────

@app.post("/upload")
async def upload_database(file: UploadFile = File(...)):
    if not file.filename.endswith(".db"):
        raise HTTPException(status_code=400, detail="Only .db files accepted.")

    dest = UPLOAD_DIR / file.filename
    with dest.open("wb") as f:
        shutil.copyfileobj(file.file, f)

    shutil.rmtree(INDEX_DIR, ignore_errors=True)
    INDEX_DIR.mkdir()

    # SQLite is read ONCE here to build the CSV files
    try:
        stats = build_and_persist(str(dest), str(INDEX_DIR))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Index build failed: {e}")

    # copying inverted_index.csv as db6k.dat for the setup binary to read
    shutil.copy(INDEX_DIR / "inverted_index.csv", "db6k.dat")

    # Call setup binary — it can read the CSV/DAT files
    setup_result = run_binary(SETUP_BINARY, [], timeout=120)

    return {"filename": file.filename, "stats": stats, "setup": setup_result}


@app.get("/status")
def status():
    return {"index_ready": (INDEX_DIR / "tcv_to_id.csv").exists()}


# ── Schema & Values (CSV only, no SQLite) ─────────────────────────────────────

@app.get("/schema")
def schema():
    s = schema_from_csv()
    if not s:
        raise HTTPException(status_code=400, detail="No index found.")
    return s


@app.get("/values")
def values(table: str, column: str):
    return {"values": values_from_csv(table, column)}


# ── Conjunctive Search ─────────────────────────────────────────────────────────

class ConjunctiveRequest(BaseModel):
    word_ids: List[str]
    words:    List[str] = []


@app.post("/conjunctive-search")
def conjunctive_search(req: ConjunctiveRequest):
    if not req.word_ids:
        raise HTTPException(status_code=400, detail="No word IDs provided")

    result = run_binary(SEARCH_BINARY, req.word_ids, timeout=30)
    return {
        **result,
        "word_ids": req.word_ids,
        "words":    req.words,
    }


# ── /search: resolve (table,col,val) filters → ids → binary ───────────────────

class FilterRequest(BaseModel):
    filters: List[dict]   # [{table, column, value}, ...]


@app.post("/search")
def search(req: FilterRequest):
    if not req.filters:
        raise HTTPException(status_code=400, detail="No filters provided.")

    tcv_ids, missing = resolve_filters_to_ids(req.filters)

    if missing:
        raise HTTPException(status_code=400, detail=f"Could not resolve: {missing}")

    result = run_binary(SEARCH_BINARY, tcv_ids, timeout=30)
    return {
        **result,
        "word_ids": tcv_ids,
        "words":    [f"({f['table']},{f['column']},{f['value']})" for f in req.filters],
    }


# ── Downloads ──────────────────────────────────────────────────────────────────

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


# ── Frontend ───────────────────────────────────────────────────────────────────

# @app.get("/", response_class=HTMLResponse)
# def serve_frontend():
#     return HTMLResponse(Path("./static/index.html").read_text())

# app.mount("/static", StaticFiles(directory="./static"), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("rdbms_backend_test:app", host="0.0.0.0", port=8000, reload=True)