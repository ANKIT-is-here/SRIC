# NTRU-OQXT Search Demo

This repository contains two separate search demos that use the same native
NTRU-OQXT binaries:

- Document search: upload text documents, build a word-to-document inverted
  index, then search over document IDs.
- RDBMS search: upload a SQLite database, build a table-column-value to row
  inverted index, then search over row IDs.

Run the document and database demos separately. Both HTML frontends call
`http://localhost:8000`, so only one backend should be running on port `8000`
at a time unless you edit the `API` value in the HTML file.

## Required Files

The following binaries must be present in the repository root and executable:

```bash
./ntru-oqxt-setup
./ntru-oqxt-search
```

If they are missing, build them with:

```bash
make ntru-oqxt-setup
make ntru-oqxt-search
```

The backend writes the final inverted index to:

```text
db6k.dat
```

`ntru-oqxt-setup` consumes this index during setup. `ntru-oqxt-search` expects
IDs as command-line arguments, not raw words or raw database values. The Python
backends resolve user input into IDs before calling the search binary.

Install Python dependencies if needed:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Document Search

Backend file:

```text
main.py
```

Frontend file:

```text
index.html
```

Start the document-search backend from the repository root:

```bash
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Then open `index.html` in a browser.

### Document Processing Flow

1. Upload one or more text documents from `index.html`.
2. `main.py` reads each uploaded file as UTF-8 text.
3. The text is tokenized into lowercase words using a simple alphanumeric
   tokenizer.
4. Each document filename is assigned a stable hexadecimal document ID.
5. Each unique word is assigned a stable hexadecimal word ID.
6. The backend builds an inverted index:

```text
word_id -> doc_id, doc_id, ...
```

7. The readable mapping files are stored under `data/`:

```text
data/word_to_id.csv
data/id_to_word.csv
data/doc_to_id.csv
data/id_to_doc.csv
data/inverted_index.csv
```

8. The final raw index is written to `db6k.dat` in the repository root.
9. `main.py` runs `./ntru-oqxt-setup` after indexing.
10. During search, the frontend first resolves words to word IDs through
    `/search?q=<word>`.
11. For conjunctive search, the frontend sends those IDs to
    `/conjunctive-search`.
12. The backend calls:

```bash
./ntru-oqxt-search <word_id_1> <word_id_2> ...
```

The search binary receives IDs only. For example, if `hello` maps to
`00000001` and `world` maps to `00000002`, the backend searches with:

```bash
./ntru-oqxt-search 00000001 00000002
```

## RDBMS Search

To create a demo database run python3 demo_create_sqlite.py

Backend file:

```text
rdbms_backend_test.py
```

Frontend file:

```text
rdbms_frontend.html
```

Start the RDBMS backend from the repository root:

```bash
source venv/bin/activate
python3 rdbms_backend_test.py
```

This starts FastAPI/Uvicorn on `http://localhost:8000`. Then open
`rdbms_frontend.html` in a browser.

Only SQLite `.db` files are accepted by the upload endpoint.

### RDBMS Processing Flow

1. Upload a SQLite `.db` file from `rdbms_frontend.html`.
2. `rdbms_backend_test.py` saves the upload under `uploads/`.
3. The backend calls `rdbms_utils/inverted_index.py`.
4. SQLite is read once during indexing. After that, schema, value lookup, and
   search use generated CSV files rather than querying SQLite again.
5. For each user table, the indexer reads all columns except the primary key
   column named `id`.
6. Each table-column-value triple is normalized and assigned a TCV ID:

```text
(table, column, value) -> tcv_id
```

7. Each table-row pair is assigned a TR ID:

```text
(table, row_id) -> tr_id
```

8. The backend builds an inverted index:

```text
tcv_id -> tr_id, tr_id, ...
```

9. RDBMS mapping and index files are written under `rdbms_test/`:

```text
rdbms_test/tcv_to_id.csv
rdbms_test/id_to_tcv.csv
rdbms_test/tr_to_id.csv
rdbms_test/id_to_tr.csv
rdbms_test/inverted_index.csv
rdbms_test/inverted_index.txt
rdbms_test/db6k.dat
```

10. The backend copies `rdbms_test/inverted_index.csv` to root-level
    `db6k.dat` so the native setup binary can consume it.
11. `rdbms_backend_test.py` runs `./ntru-oqxt-setup`.
12. During search, the frontend sends filters like:

```text
table = users, column = city, value = delhi
```

13. The backend resolves each filter to a TCV ID using `rdbms_test/tcv_to_id.csv`.
14. The backend calls:

```bash
./ntru-oqxt-search <tcv_id_1> <tcv_id_2> ...
```

The search binary receives TCV IDs only. It does not receive raw table names,
column names, or values.

## Important Notes

- `db6k.dat` is overwritten by whichever workflow was run most recently.
- Run document search and RDBMS search separately to avoid mixing their indexes.
- Re-run `./ntru-oqxt-setup` whenever `db6k.dat` changes. The backends do this
  automatically after uploads.
- `ntru-oqxt-search` expects already-resolved IDs. Use the frontend or backend
  endpoints to resolve words or database filters before searching.
- The document backend stores document index files in `data/`.
- The RDBMS backend stores database index files in `rdbms_test/`.
