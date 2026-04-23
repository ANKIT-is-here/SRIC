"""
inverted_index.py

Assigns stable hex IDs to two kinds of entities:
    TCV  – (table_name, column_name, value)   → tcv_id
    TR   – (table_name, row_id)               → tr_id

Builds an inverted index:
    tcv_id  →  {tr_id, tr_id, …}

Output files (all in output_dir/)
----------------------------------
    tcv_to_id.csv          (table, column, value, id)
    id_to_tcv.csv          (id, table, column, value)
    tr_to_id.csv           (table, row_id, id)
    id_to_tr.csv           (id, table, row_id)
    inverted_index.csv     (tcv_id, tr_id)   ← flat postings
    inverted_index.txt     human-readable
    db6k.dat               compact binary

Usage
-----
    python inverted_index.py [db_path] [output_dir]
"""

import csv
import sqlite3
import struct
import sys
from pathlib import Path
from typing import Any

# ── Config ───────────────────────────────────────────────────────────────────
PRIMARY_KEY_COL = "id"
SKIP_TABLES     = {"inverted_index_entries", "inverted_index_meta"}

TCV_TO_ID_FILE = "tcv_to_id.csv"
ID_TO_TCV_FILE = "id_to_tcv.csv"
TR_TO_ID_FILE  = "tr_to_id.csv"
ID_TO_TR_FILE  = "id_to_tr.csv"
INV_CSV_FILE   = "inverted_index.csv"
INV_TXT_FILE   = "inverted_index.txt"
DAT_FILE       = "db6k.dat"

MAGIC = b"DB6K"


# ── ID generation ─────────────────────────────────────────────────────────────
def next_hex_id(existing: set[str]) -> str:
    """Smallest 4-digit (or wider) hex string not already in *existing*."""
    i = 1
    while True:
        cid = f"{i:08x}"
        if cid not in existing:
            return cid
        i += 1


# ── Normalisation ─────────────────────────────────────────────────────────────
def normalise(value: Any) -> str:
    if value is None:
        return "__null__"
    return str(value).strip().lower()


# ── CSV helpers ───────────────────────────────────────────────────────────────
def _read_csv(path: Path, fieldnames: list) -> list:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def _write_csv(path: Path, fieldnames: list, rows: list) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)


# ── TCV map  (table, column, value) ↔ hex-id ──────────────────────────────────
class TCVMap:
    def __init__(self):
        self._to_id   = {}   # (table, col, val) -> id
        self._from_id = {}   # id -> (table, col, val)

    def load(self, out: Path) -> None:
        for row in _read_csv(out / TCV_TO_ID_FILE, ["table","column","value","id"]):
            key = (row["table"], row["column"], row["value"])
            self._to_id[key]         = row["id"]
            self._from_id[row["id"]] = key

    def save(self, out: Path) -> None:
        fwd = sorted(
            [{"table": t, "column": c, "value": v, "id": i}
             for (t, c, v), i in self._to_id.items()],
            key=lambda r: r["id"]
        )
        _write_csv(out / TCV_TO_ID_FILE, ["table","column","value","id"], fwd)

        rev = [{"id": i, "table": t, "column": c, "value": v}
               for i, (t, c, v) in sorted(self._from_id.items())]
        _write_csv(out / ID_TO_TCV_FILE, ["id","table","column","value"], rev)

    def get_or_create(self, table: str, col: str, val: str) -> str:
        key = (table, col, val)
        if key not in self._to_id:
            new_id = next_hex_id(set(self._to_id.values()))
            self._to_id[key]      = new_id
            self._from_id[new_id] = key
        return self._to_id[key]

    def label(self, tcv_id: str) -> str:
        if tcv_id not in self._from_id:
            return tcv_id
        t, c, v = self._from_id[tcv_id]
        return f"({t}, {c}, {v!r})"


# ── TR map  (table, row_id) ↔ hex-id ──────────────────────────────────────────
class TRMap:
    def __init__(self):
        self._to_id   = {}   # (table, row_id:int) -> id
        self._from_id = {}   # id -> (table, row_id:int)

    def load(self, out: Path) -> None:
        for row in _read_csv(out / TR_TO_ID_FILE, ["table","row_id","id"]):
            key = (row["table"], int(row["row_id"]))
            self._to_id[key]         = row["id"]
            self._from_id[row["id"]] = key

    def save(self, out: Path) -> None:
        fwd = sorted(
            [{"table": t, "row_id": r, "id": i}
             for (t, r), i in self._to_id.items()],
            key=lambda x: x["id"]
        )
        _write_csv(out / TR_TO_ID_FILE, ["table","row_id","id"], fwd)

        rev = [{"id": i, "table": t, "row_id": r}
               for i, (t, r) in sorted(self._from_id.items())]
        _write_csv(out / ID_TO_TR_FILE, ["id","table","row_id"], rev)

    def get_or_create(self, table: str, row_id: int) -> str:
        key = (table, row_id)
        if key not in self._to_id:
            new_id = next_hex_id(set(self._to_id.values()))
            self._to_id[key]      = new_id
            self._from_id[new_id] = key
        return self._to_id[key]

    def label(self, tr_id: str) -> str:
        if tr_id not in self._from_id:
            return tr_id
        t, r = self._from_id[tr_id]
        return f"({t}, row={r})"


# ── Inverted index  tcv_id → {tr_id} ─────────────────────────────────────────
def load_inv_csv(path: Path) -> dict:
    index = {}
    if not path.exists():
        return index
    with path.open(encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split(',')
            if len(parts) >= 2:
                tcv_id, *tr_ids = parts
                index.setdefault(tcv_id, set()).update(tr_ids)
    return index

def save_inv_csv(path: Path, index: dict) -> None:
    # Format: tcv_id tr_id1 tr_id2 ...  (one TCV per line, no header)
    with path.open("w", encoding="utf-8") as f:
        for tcv_id, tr_ids in sorted(index.items()):
            f.write(tcv_id + "," + ",".join(sorted(tr_ids)) + ", \n")

def write_inv_txt(path: Path, index: dict,
                  tcv_map: TCVMap, tr_map: TRMap) -> None:
    with path.open("w", encoding="utf-8") as f:
        for tcv_id, tr_ids in sorted(index.items()):
            lhs      = f"{tcv_map.label(tcv_id)}  [id={tcv_id}]"
            postings = ",  ".join(
                f"{tr_map.label(tid)} [id={tid}]" for tid in sorted(tr_ids)
            )
            f.write(f"{lhs}\n    ---> [{postings}]\n\n")


# ── Binary .dat ───────────────────────────────────────────────────────────────
def save_dat(path: Path, index: dict) -> None:
    """
    Header : MAGIC(4B) + n_entries(uint32)
    Entry  : tcv_id_len(uint16) + tcv_id_bytes
           + posting_len(uint16) + comma-joined tr_id bytes
    """
    entries = sorted(index.items())
    with path.open("wb") as f:
        f.write(MAGIC)
        f.write(struct.pack(">I", len(entries)))
        for tcv_id, tr_ids in entries:
            tid_b  = tcv_id.encode()
            post_b = ",".join(sorted(tr_ids)).encode()
            f.write(struct.pack(">H", len(tid_b)));  f.write(tid_b)
            f.write(struct.pack(">H", len(post_b))); f.write(post_b)


# ── SQLite helpers ────────────────────────────────────────────────────────────
def get_user_tables(cur: sqlite3.Cursor) -> list:
    cur.execute("""
        SELECT name FROM sqlite_master
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ORDER BY name
    """)
    return [r[0] for r in cur.fetchall() if r[0] not in SKIP_TABLES]

def get_columns(cur: sqlite3.Cursor, table: str) -> list:
    cur.execute(f"PRAGMA table_info('{table}')")
    return [r[1] for r in cur.fetchall() if r[1] != PRIMARY_KEY_COL]


# ── Main pipeline ─────────────────────────────────────────────────────────────
def build_and_persist(db_path: str, out_dir: str) -> None:
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)

    tcv_map = TCVMap(); tcv_map.load(out)
    tr_map  = TRMap();  tr_map.load(out)
    index   = load_inv_csv(out / INV_CSV_FILE)

    conn   = sqlite3.connect(db_path)
    cur    = conn.cursor()
    tables = get_user_tables(cur)

    if not tables:
        print("No user tables found.")
        conn.close()
        return

    total_postings = 0

    for table in tables:
        columns = get_columns(cur, table)
        if not columns:
            continue

        col_list = ", ".join([PRIMARY_KEY_COL] + columns)
        cur.execute(f"SELECT {col_list} FROM '{table}'")
        rows = cur.fetchall()

        for row in rows:
            raw_row_id = row[0]
            tr_id = tr_map.get_or_create(table, raw_row_id)

            for col, raw_val in zip(columns, row[1:]):
                val    = normalise(raw_val)
                tcv_id = tcv_map.get_or_create(table, col, val)
                index.setdefault(tcv_id, set()).add(tr_id)
                total_postings += 1

        print(f"  '{table}': {len(rows)} rows × {len(columns)} cols")

    conn.close()

    print(f"\nTotal postings  : {total_postings:,}")
    print(f"Unique TCV ids  : {len(tcv_map._to_id):,}")
    print(f"Unique TR  ids  : {len(tr_map._to_id):,}")
    print(f"Index entries   : {len(index):,}")

    tcv_map.save(out)
    tr_map.save(out)
    save_inv_csv(out / INV_CSV_FILE, index)
    save_dat(out / DAT_FILE, index)
    write_inv_txt(out / INV_TXT_FILE, index, tcv_map, tr_map)

    print(f"\nFiles written to '{out_dir}/':")
    for name in [TCV_TO_ID_FILE, ID_TO_TCV_FILE,
                 TR_TO_ID_FILE,  ID_TO_TR_FILE,
                 INV_CSV_FILE,   INV_TXT_FILE,  DAT_FILE]:
        size = (out / name).stat().st_size
        print(f"  {name:<25} {size:>8,} bytes")


# ── Entry point ───────────────────────────────────────────────────────────────
def main():
    args    = sys.argv[1:]
    db_path = args[0] if args else "demo.db"
    out_dir = args[1] if len(args) > 1 else "index_output"
    print(f"Database   : {db_path}")
    print(f"Output dir : {out_dir}\n")
    build_and_persist(db_path, out_dir)

if __name__ == "__main__":
    main()