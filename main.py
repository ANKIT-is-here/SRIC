from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
import os, csv, re, subprocess
from typing import List

app = FastAPI(title="Inverted Index Builder")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR        = "data"
os.makedirs(DATA_DIR, exist_ok=True)

WORD_TO_ID_PATH = os.path.join(DATA_DIR, "word_to_id.csv")
ID_TO_WORD_PATH = os.path.join(DATA_DIR, "id_to_word.csv")
DOC_TO_ID_PATH  = os.path.join(DATA_DIR, "doc_to_id.csv")
ID_TO_DOC_PATH  = os.path.join(DATA_DIR, "id_to_doc.csv")
INDEX_PATH      = os.path.join(DATA_DIR, "inverted_index.csv")
DAT_PATH        = "db6k.dat"          # written next to main.py, consumed by binaries

SETUP_BINARY    = "./ntru-oqxt-setup"
SEARCH_BINARY   = "./ntru-oqxt-search"


# ── helpers ──────────────────────────────────────────────────────────────────

def load_csv_map(path: str, key_col: str, val_col: str) -> dict:
    result = {}
    if not os.path.exists(path):
        return result
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            result[row[key_col]] = row[val_col]
    return result


def save_two_col_csv(path: str, col1: str, col2: str, data: dict):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow([col1, col2])
        for k, v in data.items():
            w.writerow([k, v])


def next_hex_id(existing_ids: set) -> str:
    n = len(existing_ids)
    while True:
        candidate = f"{n:08X}"
        if candidate not in existing_ids:
            return candidate
        n += 1


def tokenize(text: str) -> List[str]:
    return re.findall(r"[a-zA-Z0-9']+", text.lower())


def load_inverted_index() -> dict:
    idx = {}
    if not os.path.exists(INDEX_PATH):
        return idx
    with open(INDEX_PATH, newline="", encoding="utf-8") as f:
        for row in csv.reader(f):
            if not row:
                continue
            # skip header row if present
            if row[0] == "word_id":
                continue
            word_id = row[0]
            doc_ids = set(row[1:]) if len(row) > 1 else set()
            idx[word_id] = doc_ids
    return idx


def save_inverted_index(idx: dict):
    """
    Write inverted index to two locations:
      1. data/inverted_index.csv  – human-readable CSV with header
      2. db6k.dat                 – no header, raw CSV, consumed by ntru binaries
    Both are sorted by word_id for deterministic output.
    """
    sorted_items = sorted(idx.items())

    # --- CSV (with header) ---
    with open(INDEX_PATH, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["word_id", "doc_ids..."])
        for word_id, doc_ids in sorted_items:
            w.writerow([word_id] + sorted(doc_ids))

    # --- .dat (no header, raw) ---
    with open(DAT_PATH, "w", encoding="utf-8") as f:
        for word_id, doc_ids in sorted_items:
            row = [word_id] + sorted(doc_ids)
            f.write(",".join(row) + ",\n")


def run_binary(binary: str, args: List[str], timeout: int = 60) -> dict:
    """
    Run a binary with args. Returns dict with command, exit_code, output.
    Raises HTTPException on hard failures (not found, timeout, etc.)
    """
    if not os.path.isfile(binary):
        raise HTTPException(
            status_code=500,
            detail=(
                f"Binary '{binary}' not found. "
                f"Place it in the same directory as main.py and make it executable (chmod +x {binary})."
            ),
        )

    cmd = [binary] + args
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        combined = result.stdout
        if result.stderr:
            combined += "\n--- stderr ---\n" + result.stderr
        return {
            "command":   " ".join(cmd),
            "exit_code": result.returncode,
            "output":    combined.strip() or "(binary produced no output)",
        }
    except FileNotFoundError:
        raise HTTPException(
            status_code=500,
            detail=f"Binary not executable or missing: {binary}",
        )
    except subprocess.TimeoutExpired:
        raise HTTPException(
            status_code=504,
            detail=f"Binary timed out after {timeout}s",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── endpoints ─────────────────────────────────────────────────────────────────

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    # Load existing mappings
    word_to_id = load_csv_map(WORD_TO_ID_PATH, "word", "id")
    id_to_word = {v: k for k, v in word_to_id.items()}
    doc_to_id  = load_csv_map(DOC_TO_ID_PATH, "doc_name", "id")
    id_to_doc  = {v: k for k, v in doc_to_id.items()}
    inv_index  = load_inverted_index()

    results = []

    for upload in files:
        filename = upload.filename
        content  = (await upload.read()).decode("utf-8", errors="ignore")

        # Assign doc ID (stable across re-uploads of same filename)
        if filename not in doc_to_id:
            doc_id = next_hex_id(set(doc_to_id.values()))
            doc_to_id[filename] = doc_id
            id_to_doc[doc_id]   = filename
        else:
            doc_id = doc_to_id[filename]

        tokens        = tokenize(content)
        unique_tokens = set(tokens)

        for word in unique_tokens:
            if word not in word_to_id:
                wid = next_hex_id(set(word_to_id.values()))
                word_to_id[word] = wid
                id_to_word[wid]  = word
            wid = word_to_id[word]
            inv_index.setdefault(wid, set()).add(doc_id)

        results.append({
            "filename":    filename,
            "doc_id":      doc_id,
            "token_count": len(tokens),
            "unique_words": len(unique_tokens),
        })

    # ── Persist CSVs + db6k.dat ───────────────────────────────────────────
    save_two_col_csv(WORD_TO_ID_PATH, "word",     "id",       word_to_id)
    save_two_col_csv(ID_TO_WORD_PATH, "id",       "word",     id_to_word)
    save_two_col_csv(DOC_TO_ID_PATH,  "doc_name", "id",       doc_to_id)
    save_two_col_csv(ID_TO_DOC_PATH,  "id",       "doc_name", id_to_doc)
    save_inverted_index(inv_index)      # writes both inverted_index.csv AND db6k.dat

    # ── Run ntru-oqxt-setup ───────────────────────────────────────────────
    setup_result = None
    setup_error  = None
    try:
        setup_result = run_binary(SETUP_BINARY, [], timeout=120)
    except HTTPException as e:
        # Don't fail the whole upload — surface the error to the client instead
        setup_error = e.detail

    return {
        "status":                   "success",
        "processed":                results,
        "total_words_in_vocab":     len(word_to_id),
        "total_docs_indexed":       len(doc_to_id),
        "inverted_index_entries":   len(inv_index),
        "dat_path":                 os.path.abspath(DAT_PATH),
        "setup":                    setup_result,   # None if binary missing
        "setup_error":              setup_error,    # None if ran OK
    }


@app.get("/stats")
def get_stats():
    word_to_id = load_csv_map(WORD_TO_ID_PATH, "word", "id")
    doc_to_id  = load_csv_map(DOC_TO_ID_PATH, "doc_name", "id")
    inv_index  = load_inverted_index()
    docs         = [{"name": k, "id": v} for k, v in doc_to_id.items()]
    words_sample = [{"word": k, "id": v} for k, v in list(word_to_id.items())[:20]]
    return {
        "total_words":   len(word_to_id),
        "total_docs":    len(doc_to_id),
        "index_entries": len(inv_index),
        "docs":          docs,
        "words_sample":  words_sample,
        "dat_exists":    os.path.isfile(DAT_PATH),
        "dat_path":      os.path.abspath(DAT_PATH),
    }


@app.get("/search")
def search_word(q: str):
    word_to_id = load_csv_map(WORD_TO_ID_PATH, "word", "id")
    id_to_doc  = load_csv_map(ID_TO_DOC_PATH, "id", "doc_name")
    inv_index  = load_inverted_index()

    word = q.lower().strip()
    if word not in word_to_id:
        return {"found": False, "word": word, "docs": []}

    wid     = word_to_id[word]
    doc_ids = inv_index.get(wid, set())
    docs    = [{"doc_id": did, "doc_name": id_to_doc.get(did, "?")} for did in doc_ids]
    return {"found": True, "word": word, "word_id": wid, "docs": docs}


@app.get("/download/{filename}")
def download_file(filename: str):
    allowed = {
        "word_to_id.csv", "id_to_word.csv",
        "doc_to_id.csv",  "id_to_doc.csv",
        "inverted_index.csv",
    }
    if filename not in allowed:
        return JSONResponse(status_code=404, content={"error": "Not found"})
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        return JSONResponse(status_code=404, content={"error": "File not generated yet"})
    return FileResponse(path, filename=filename, media_type="text/csv")


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


@app.delete("/reset")
def reset():
    for f in ["word_to_id.csv", "id_to_word.csv", "doc_to_id.csv",
              "id_to_doc.csv",  "inverted_index.csv"]:
        p = os.path.join(DATA_DIR, f)
        if os.path.exists(p):
            os.remove(p)
    if os.path.exists(DAT_PATH):
        os.remove(DAT_PATH)
    return {"status": "reset complete"}