# NTRU-OQXT Encrypted Search Engine Workflow

This document provides a comprehensive overview of the repository for onboarding new engineers. It explains the core architecture, repository structure, and the step-by-step workflow for both the Text Document Search and the RDBMS (SQLite) Search.

---

## 1. High-Level Overview

This repository implements two distinct encrypted search demonstrations that share the same underlying native C++ Searchable Symmetric Encryption (SSE) engine. 

1. **Document Search**: Upload text documents, build an inverted index mapping words to documents, and perform secure keyword searches.
2. **RDBMS Search**: Upload a SQLite database, build an inverted index mapping table-column-value combinations to row IDs, and perform secure SQL-like filter searches.

### Key Architectural Concept
The core cryptographic C++ engine **does not process plaintext words or raw SQL values**. Instead, the Python backends act as middleware:
- They parse the raw data (text files or SQL rows).
- They assign stable hexadecimal IDs to all entities (Words, Documents, Table-Column-Values, Rows).
- They build a plaintext inverted index of these IDs (`db6k.dat`).
- They invoke `./ntru-oqxt-setup` to encrypt this index.
- During search, they translate user queries into IDs, pass those IDs to `./ntru-oqxt-search`, and translate the encrypted results back into human-readable document names or database rows.

---

## 2. Repository Structure & Code Map

### Core Cryptographic Binaries (C/C++)
*These files handle the actual Searchable Symmetric Encryption.*
- `ntru-oqxt-setup.cpp` / `ntru-oqxt-setup`: Reads the plaintext inverted index of IDs (`db6k.dat`) and sets up the encrypted database structures.
- `ntru-oqxt-search.cpp` / `ntru-oqxt-search`: Performs the actual search over the encrypted database using hexadecimal IDs provided via command-line arguments.
- `AES_256GCM.c` & `bloom_filter.cpp`: Supporting cryptographic and probabilistic data structure implementations used by the engine.

### Document Search Files
*Handles the parsing and ID-mapping of plain text files.*
- `main.py`: The FastAPI backend for document search. Handles file uploads, tokenization, ID assignment, and API endpoints for conjunctive search.
- `index.html`: The web frontend for the document search demo.
- `data/`: Directory where the document mapping CSV files are stored (`word_to_id.csv`, `doc_to_id.csv`, `id_to_word.csv`, `id_to_doc.csv`, and `inverted_index.csv`).

### RDBMS Search Files
*Handles the parsing and ID-mapping of SQLite databases.*
- `rdbms_backend_test.py`: The FastAPI backend for RDBMS search. Handles `.db` file uploads, delegates index generation, and serves search endpoints.
- `rdbms_frontend.html`: The web frontend for database searching using UI filters (e.g., Table = X, Column = Y, Value = Z).
- `rdbms_utils/inverted_index.py`: Parses the SQLite database, extracts schemas and table-column-value triples, and assigns `TCV` (Table-Column-Value) IDs and `TR` (Table-Row) IDs.
- `rdbms_test/`: Directory where RDBMS mapping CSV files and indices are stored.
- `demo_create_sqlite.py`: A utility script to generate a dummy SQLite database for testing purposes.

---

## 3. Workflow A: Text Document Search

This workflow converts unstructured text into a searchable encrypted index.

### 1. Indexing Flow
1. **Upload:** User uploads one or multiple `.txt` files via the `index.html` frontend to the `/upload` endpoint.
2. **Tokenization:** `main.py` reads the text, converts it to lowercase, and extracts alphanumeric words using regex.
3. **ID Assignment:**
   - Each unique document is assigned a stable 8-character hex **Document ID** (e.g., `0000000A`).
   - Each unique word is assigned a stable 8-character hex **Word ID** (e.g., `0000000B`).
   - Mappings are persisted in `data/word_to_id.csv` and `data/doc_to_id.csv`.
4. **Inverted Index Creation:** The backend builds a dictionary mapping `word_id -> set(doc_id)`.
5. **Disk Write:** The inverted index is written to `data/inverted_index.csv` (human-readable) and a raw, header-less format to `db6k.dat` in the root directory.
6. **Encryption Setup:** `main.py` executes the native `./ntru-oqxt-setup` binary, which consumes `db6k.dat` and generates the actual encrypted database files on disk.

### 2. Search Flow
1. **Query Resolution:** The user types a word in the frontend. The frontend calls `/search?q=<word>` to translate the plaintext word into its `word_id`.
2. **Execution:** The frontend sends a list of `word_id`s to `/conjunctive-search`.
3. **Native Search:** `main.py` invokes the C++ binary: `./ntru-oqxt-search <word_id_1> <word_id_2> ...`
4. **Result Translation:** The binary searches the encrypted structures and returns matched `doc_id`s, which the Python backend translates back to filenames using `id_to_doc.csv`.

---

## 4. Workflow B: RDBMS (SQLite) Search

This workflow flattens relational SQL data into an inverted index suitable for the SSE engine.

### 1. Indexing Flow
1. **Upload:** User uploads a SQLite `.db` file via `rdbms_frontend.html`.
2. **Data Extraction:** `rdbms_backend_test.py` calls `rdbms_utils/inverted_index.py`, which scans every user table and column (excluding primary keys like `id`).
3. **ID Assignment:**
   - **TCV ID (Table-Column-Value):** Every unique value in a specific column of a specific table gets a `tcv_id`. (e.g., `users.city=delhi` -> `0000001A`)
   - **TR ID (Table-Row):** Every specific row in a table gets a `tr_id`. (e.g., `users.row_5` -> `0000001B`)
   - Mappings are written to CSVs inside `rdbms_test/`.
4. **Inverted Index Creation:** An index mapping `tcv_id -> set(tr_id)` is built and written to `rdbms_test/inverted_index.csv`.
5. **Setup Propagation:** The CSV is copied to `db6k.dat` in the root folder, and `./ntru-oqxt-setup` is executed to build the encrypted database.

### 2. Search Flow
1. **Filter Construction:** In the frontend, the user selects a Table, Column, and Value to filter by (e.g., `table=users, column=city, value=delhi`).
2. **ID Resolution:** The frontend sends these filters to `/search`. The backend uses `tcv_to_id.csv` to look up the exact `tcv_id` for each filter condition.
3. **Native Search:** The backend invokes the C++ binary: `./ntru-oqxt-search <tcv_id_1> <tcv_id_2> ...`
4. **Result Translation:** The binary searches the encrypted index and returns matching `tr_id`s. The backend translates these back to specific database rows using `id_to_tr.csv`.

---

## 5. Important Development Considerations
- **Index Conflicts:** The file `db6k.dat` is hardcoded as the input for the setup binary. Running both document and RDBMS indexers concurrently or consecutively will overwrite this file. Treat the backends as mutually exclusive demos.
- **API Port Binding:** Both backends run on port `8000` by default. Only run one backend (`main.py` OR `rdbms_backend_test.py`) at a time.
- **Cryptographic Boundary:** Never modify the C++ binaries to parse plaintext files directly. The strict separation where C++ only handles hexadecimal IDs ensures the cryptographic logic remains decoupled from the data formats.
