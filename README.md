# Post-Quantum Searchable Symmetric Encryption (NTRU-OQXT SSE)

> **SEAL Lab, IIT Kharagpur & Student Team Project**  
> *A high-performance, post-quantum secure Searchable Symmetric Encryption (SSE) engine featuring NTRU-OQXT boolean evaluation, Falcon-512 digital signatures, AES-256-GCM data encryption, BLAKE3 cryptographic hashing, Bloom Filter acceleration, and Redis in-memory storage.*

---

## Table of Contents
1. [Overview & Architecture](#overview--architecture)
2. [Key Features](#key-features)
3. [Quick Start: One-Click Batch Scripts (Windows & Docker)](#quick-start-one-click-batch-scripts-windows--docker)
4. [System Prerequisites & Dependencies](#system-prerequisites--dependencies)
5. [Manual Installation & Compilation Guide](#manual-installation--compilation-guide)
6. [Application Execution Modes](#application-execution-modes)
7. [Step-by-Step Result Reproduction Guide](#step-by-step-result-reproduction-guide)
8. [Complete REST API Reference](#complete-rest-api-reference)
9. [Repository Directory Map](#repository-directory-map)
10. [Exact GitHub Path Table](#exact-github-path-table)
11. [Git Collaboration & Remote Setup Guide](#git-collaboration--remote-setup-guide)
12. [Troubleshooting & FAQ](#troubleshooting--faq)

---

## Overview & Architecture

This repository implements a **Post-Quantum Searchable Symmetric Encryption (SSE)** system capable of performing sub-millisecond Boolean search over encrypted documents and relational databases without leaking underlying plaintext data or keyword identity to the server.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            User Interface Layer                             │
│    React 19 + Vite (Port 3000/5173)   │   Classic HTML (index.html / RDBMS) │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │ REST APIs / HTTP Fetch
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          FastAPI Middleware Engine                          │
│        main.py (Port 8000)   │   rdbms_backend_test.py (Port 8002/8003)    │
│  - Document Tokenization & Inverted Index Construction                      │
│  - Deterministic Hex ID Mapping (word_to_id, doc_to_id, tcv_to_id)          │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │ Subprocess Execution / IPC
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Native C++ Cryptographic Core Engine                     │
│   ./ntru-oqxt-setup (Index Setup)   │   ./ntru-oqxt-search (Query Engine)   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  - NTRU Lattice Encryption  - Falcon Round 3 Signatures  - AES-256-GCM      │
│  - BLAKE3 Fast Hashing      - Bloom Filter Indexing     - Redis Storage     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Cryptographic Stack Components
- **NTRU-OQXT SSE Core (`ntru-oqxt-setup.cpp`, `ntru-oqxt-search.cpp`)**: Constructs encrypted index structures ($EDB$) and evaluates conjunctive AND / disjunctive OR search queries over sub-linear index tables.
- **Falcon Digital Signatures (`falcon-round3/`)**: Provides NIST-standard post-quantum lattice-based digital signatures for token verification and integrity checking.
- **AES-256-GCM (`AES_256GCM.c`)**: Ensures confidentiality and authenticity of document contents and row-level relational database entries.
- **BLAKE3 Hashing (`blake3/`)**: Provides high-speed SIMD-optimized cryptographic digest generation for trapdoors and tokens.
- **Bloom Filters (`bloom_filter.cpp`)**: Fast probabilistic set membership test to prune query candidate spaces prior to cryptographic trapdoor evaluation.
- **Redis (`redis-plus-plus`)**: Ultra-fast in-memory storage engine for encrypted dynamic index state.

---

## Key Features

- **Conjunctive AND & Disjunctive OR Search**: Native support for complex Boolean expressions across documents and relational databases.
- **Microsecond Query Latency**: Optimized native C++ engine delivers keyword search results in under **100 microseconds**.
- **Privacy-Preserving Document & PDF Processing**: Server parses uploaded plain text (`.txt`) and PDF (`.pdf`) files into stable hexadecimal identifiers (`word_id`, `doc_id`), keeping raw vocabulary masked during native search execution.
- **Encrypted Relational Database (RDBMS) Search**: SQLite tables are automatically indexed into Table-Column-Value (TCV) triples and Table-Row (TR) identifiers.
- **Dual Frontend Interfaces**: Modern React + Vite UI with real-time performance graphs alongside a lightweight single-file HTML interface.
- **One-Click Batch Automation & Docker Support**: Instant containerized deployment across Windows, Linux, and macOS.

---

## Quick Start: One-Click Batch Scripts (Windows & Docker)

If you are running on Windows with **Docker Desktop** installed, you can launch the entire stack (Redis, FastAPI Backend, and React Frontend) with a single click.

### Option 1: Full System Startup (`run-all.bat`)
Double-click `run-all.bat` or run in terminal:

```cmd
run-all.bat
```

**What `run-all.bat` does:**
1. Checks and creates the shared Docker network (`sse-network`).
2. Starts the **Redis** container (`sse-redis`).
3. Builds and starts the **SRIC Backend** container on `http://localhost:8000`.
4. Builds and starts the **React Frontend** container on `http://localhost:3000`.
5. Automatically opens `http://localhost:3000` in your default web browser.

### Option 2: Docker Verification Script (`docker-start-all.bat`)
```cmd
docker-start-all.bat
```
Checks if Docker Desktop is running, starts missing containers, and verifies service health.

### Option 3: Stopping All Services (`docker-stop-all.bat`)
```cmd
docker-stop-all.bat
```
Stops and removes all running containers and networks cleanly.

---

## System Prerequisites & Dependencies

### Hardware & Operating System
- **OS**: Linux (Ubuntu 20.04/22.04 LTS recommended), macOS 12+, or Windows 10/11 (via Docker Desktop or WSL2).
- **CPU**: x86_64 architecture with SSE2 support.

### System Software & Tools
| Software | Required Version | Purpose |
| :--- | :--- | :--- |
| **GCC / G++** | 11.0+ (C++17 support) | Compiling native C++ SSE binaries |
| **Make** | 4.0+ | Automated build system |
| **Python** | 3.10+ | Running FastAPI backend servers |
| **Node.js** | 18.0+ | Building and running React Vite frontend |
| **Redis Server** | 6.0+ | In-memory storage for encrypted index |
| **Docker Desktop** | 4.0+ (Optional) | Containerized deployment |

### C++ Cryptographic Libraries
Ensure the following development packages are installed on your system:
- `libcrypto++-dev` (Crypto++)
- `libgmp-dev` & `libgmpxx-dev` (GNU Multiple Precision Arithmetic)
- `libssl-dev` (OpenSSL)
- `libntl-dev` (Number Theory Library)
- `libhiredis-dev` & `redis-plus-plus` (Redis C++ Client)

On Ubuntu / Debian:
```bash
sudo apt-get update
sudo apt-get install -y build-essential g++ make python3-venv python3-pip \
                        libssl-dev libcrypto++-dev libgmp-dev libgmpxx-dev \
                        libntl-dev libhiredis-dev redis-server
```

---

## Manual Installation & Compilation Guide

### Step 1: Clone Repository & Setup Environment
```bash
git clone https://github.com/ANKIT-is-here/SRIC.git
cd SRIC/search_engine/Encrypted-Search-via-Searchable-Symmetric-Encryption
```

### Step 2: Set Up Python Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate        # On Windows (cmd): venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 3: Start Redis In-Memory Service
```bash
# On Linux:
sudo service redis-server start

# On macOS:
brew services start redis

# Test connection:
redis-cli ping                  # Should output: PONG
```

### Step 4: Compile Native C++ Binaries
Use the provided `Makefile` to compile `./ntru-oqxt-setup` and `./ntru-oqxt-search`:

```bash
make ntru-oqxt-setup
make ntru-oqxt-search
```

*To clean compiled artifacts and clear Redis keys:*
```bash
make clean_all
```

### Step 5: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

---

## Application Execution Modes

### Mode 1: Modern Vite + React UI + FastAPI Backend (Recommended)

1. **Start Backend Server (Terminal 1):**
   ```bash
   source venv/bin/activate
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

2. **Start React Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   Open **`http://localhost:5173`** (or `http://localhost:3000` under Docker) in your browser.

---

### Mode 2: Classic Single-File HTML Frontend

1. Ensure the FastAPI backend is running on `http://localhost:8000`.
2. Open `index.html` directly in any standard browser (Chrome, Firefox, Edge).

---

### Mode 3: Encrypted Relational Database (RDBMS) Search Engine

1. **Generate Demo SQLite Database:**
   ```bash
   python3 demo_create_sqlite.py
   ```
   *Creates a sample SQLite database `demo.db` populated with user and transaction tables.*

2. **Start RDBMS Backend:**
   ```bash
   python3 rdbms_backend_test.py
   ```

3. **Open RDBMS Interface:**
   Open `rdbms_frontend.html` in your web browser to perform encrypted column/value searches.

---

### Mode 4: Fully Containerized Docker Stack

```bash
# Create shared Docker network
docker network create sse-network

# Build and start all services in detached mode
docker-compose up -d --build
```
Access points:
- React Web Interface: `http://localhost:3000`
- FastAPI REST Backend: `http://localhost:8000`
- Swagger API Docs: `http://localhost:8000/docs`

---

## Step-by-Step Result Reproduction Guide

Follow these exact steps to verify encrypted document indexing, setup binary execution, search execution, and metric reporting:

### Step 1: Upload Test Documents
Using either the web UI or HTTP POST request, upload sample text files (`first.txt`, `second.txt`) or custom PDF documents to the `/upload` endpoint:

```bash
curl -X POST "http://localhost:8000/upload" \
  -F "files=@first.txt" \
  -F "files=@second.txt"
```

### Step 2: Inspect Generated Index Mapping Files
Upon upload, `main.py` parses the documents, tokenizes words, and creates mapping files inside the `data/` directory:
- `data/word_to_id.csv`: Maps words to 8-character hexadecimal IDs (e.g., `crypto` -> `00000001`).
- `data/doc_to_id.csv`: Maps document filenames to hexadecimal IDs.
- `data/inverted_index.csv`: Maps `word_id` -> list of `doc_id`s.
- `db6k.dat`: Formatted raw index file consumed directly by the native setup binary.

### Step 3: Verify Automated Setup Binary Execution
During file upload, the backend automatically invokes:
```bash
./ntru-oqxt-setup
```
This builds the post-quantum encrypted database ($EDB$) and updates Redis keys.

### Step 4: Execute Single & Conjunctive Keyword Queries
1. **Single Keyword Lookup:**
   ```bash
   curl "http://localhost:8000/search?q=encryption"
   ```
   *Returns mapped `word_id` and associated matching document names.*

2. **Conjunctive (AND) Search:**
   ```bash
   curl -X POST "http://localhost:8000/conjunctive-search" \
     -H "Content-Type: application/json" \
     -d '{"word_ids": ["00000001", "00000002"], "words": ["crypto", "search"]}'
   ```
   *Executes `./ntru-oqxt-search 00000001 00000002` natively and returns search time in milliseconds.*

### Step 5: Verify Performance & Debug Logs
View full binary execution output (stdout/stderr/exit code):
```bash
curl "http://localhost:8000/debug/last-run"
```

### Step 6: Reset State
To reset all indexes and start fresh:
```bash
curl -X DELETE "http://localhost:8000/reset"
```

---

## Complete REST API Reference

| Endpoint | Method | Description | Request / Parameters | Response Summary |
| :--- | :--- | :--- | :--- | :--- |
| `/upload` | `POST` | Upload `.txt`/`.pdf` files or `.csv` database files | `multipart/form-data` (`files`) | Token counts, `dat_path`, setup execution results |
| `/search` | `GET` | Resolve keyword to word ID and document matches | Query param `q=<word>` | Mapped `word_id`, document list, search time |
| `/conjunctive-search` | `POST` | Run native C++ search binary over word IDs | JSON `{"word_ids": ["..."], "words": ["..."]}` | Raw binary stdout/stderr, search execution time |
| `/stats` | `GET` | View vocabulary size, document count, & index stats | None | Total words, total docs, index entries, `dat_exists` |
| `/download/{filename}`| `GET` | Download generated CSV index map files | Path param `{filename}` | CSV file download (`word_to_id.csv`, etc.) |
| `/debug/last-run` | `GET` | Fetch stdout, stderr, and exit code of last run | None | Full command run details |
| `/reset` | `DELETE` | Clear all `data/` maps, `db6k.dat`, and Redis state | None | `{"status": "reset complete"}` |

---

## Repository Directory Map

```text
SRIC/
└── search_engine/Encrypted-Search-via-Searchable-Symmetric-Encryption/
    ├── README.md                      # Comprehensive system documentation
    ├── main.py                        # Primary FastAPI backend for document search
    ├── Makefile                       # C++ build system file
    ├── AES_256GCM.c / AES_256GCM.h    # AES-256-GCM symmetric cipher module
    ├── bloom_filter.cpp / .h          # Bloom filter candidate pruning engine
    ├── rawdatautil.cpp / .h           # Data serialization & file reading utilities
    ├── ntru-oqxt-setup.cpp / .h       # C++ NTRU-OQXT encrypted index setup binary source
    ├── ntru-oqxt-search.cpp / .h      # C++ NTRU-OQXT query search binary source
    ├── size_parameters.h              # Cryptographic parameter size constants
    ├── utils.h                        # Helper utility definitions
    ├── demo_create_sqlite.py          # Script generating sample SQLite databases
    ├── sqlite_inverted_index.py       # RDBMS index generation logic
    ├── rdbms_backend_and.py           # RDBMS AND search FastAPI backend
    ├── rdbms_backend_test.py          # RDBMS test backend server
    ├── rdbms_frontend.html            # Standalone RDBMS web interface
    ├── index.html                     # Standalone classic HTML document search UI
    ├── docker-compose.yml             # Docker container orchestration manifest
    ├── Dockerfile.backend             # Docker build file for FastAPI C++ backend
    ├── run-all.bat                    # One-click Windows batch startup script
    ├── docker-start-all.bat           # Docker container startup check script
    ├── docker-stop-all.bat            # Docker container shutdown script
    ├── requirements.txt               # Python package dependencies
    ├── falcon-round3/                 # Falcon-512 post-quantum digital signature C library
    ├── blake3/                        # BLAKE3 cryptographic hash implementation
    ├── frontend/                      # Modern React 19 + Vite frontend
    │   ├── src/                       # React components, styles, & App logic
    │   ├── package.json               # Node.js dependencies & scripts
    │   └── Dockerfile.frontend        # Docker build file for React frontend
    └── data/                          # Automatically generated CSV index maps & db6k.dat
```

---

## Exact GitHub Path Table

Click any link below to inspect the corresponding source code on GitHub:

| Component Description | Local Path | Exact GitHub Path |
| :--- | :--- | :--- |
| **Repository Root** | `/` | [`github.com/ANKIT-is-here/SRIC`](https://github.com/ANKIT-is-here/SRIC) |
| **System README** | `README.md` | [`github.com/ANKIT-is-here/SRIC/blob/main/README.md`](https://github.com/ANKIT-is-here/SRIC/blob/main/README.md) |
| **FastAPI Backend Server** | `main.py` | [`github.com/ANKIT-is-here/SRIC/blob/main/main.py`](https://github.com/ANKIT-is-here/SRIC/blob/main/main.py) |
| **Modern React Frontend** | `frontend/` | [`github.com/ANKIT-is-here/SRIC/tree/main/frontend`](https://github.com/ANKIT-is-here/SRIC/tree/main/frontend) |
| **Classic HTML Frontend** | `index.html` | [`github.com/ANKIT-is-here/SRIC/blob/main/index.html`](https://github.com/ANKIT-is-here/SRIC/blob/main/index.html) |
| **NTRU-OQXT Setup C++ Source**| `ntru-oqxt-setup.cpp` | [`github.com/ANKIT-is-here/SRIC/blob/main/ntru-oqxt-setup.cpp`](https://github.com/ANKIT-is-here/SRIC/blob/main/ntru-oqxt-setup.cpp) |
| **NTRU-OQXT Search C++ Source**| `ntru-oqxt-search.cpp` | [`github.com/ANKIT-is-here/SRIC/blob/main/ntru-oqxt-search.cpp`](https://github.com/ANKIT-is-here/SRIC/blob/main/ntru-oqxt-search.cpp) |
| **RDBMS Search Engine Backend** | `rdbms_backend_and.py`| [`github.com/ANKIT-is-here/SRIC/blob/main/rdbms_backend_and.py`](https://github.com/ANKIT-is-here/SRIC/blob/main/rdbms_backend_and.py) |
| **RDBMS Web Interface** | `rdbms_frontend.html` | [`github.com/ANKIT-is-here/SRIC/blob/main/rdbms_frontend.html`](https://github.com/ANKIT-is-here/SRIC/blob/main/rdbms_frontend.html) |
| **Docker Compose Config** | `docker-compose.yml` | [`github.com/ANKIT-is-here/SRIC/blob/main/docker-compose.yml`](https://github.com/ANKIT-is-here/SRIC/blob/main/docker-compose.yml) |
| **Build Makefile** | `Makefile` | [`github.com/ANKIT-is-here/SRIC/blob/main/Makefile`](https://github.com/ANKIT-is-here/SRIC/blob/main/Makefile) |

---

## Git Collaboration & Remote Setup Guide

### Option 1: Adding a Collaborator to this Repository (Recommended)
1. Go to the repository on GitHub: [https://github.com/ANKIT-is-here/SRIC](https://github.com/ANKIT-is-here/SRIC)
2. Click **Settings** (top navigation bar) -> **Collaborators**.
3. Click **Add people**, search for her GitHub username or email address, and select **Add to repository**.
4. Share the invitation link with her. This allows full code access while preserving the repository commit history.

### Option 2: Pushing the Code to Her Remote Repository
If your supervisor requires the codebase to be hosted under her GitHub profile:
```bash
# Add her repository as a secondary remote named 'supervisor'
git remote add supervisor https://github.com/<her-username>/<her-repo-name>.git

# Push main branch and tags to her repository
git push -u supervisor main
```

---

## Troubleshooting & FAQ

### 1. `Binary './ntru-oqxt-setup' not found`
**Fix**: Compile the native C++ binaries using `make`:
```bash
make ntru-oqxt-setup ntru-oqxt-search
chmod +x ntru-oqxt-setup ntru-oqxt-search
```

### 2. `Redis connection error / Connection refused`
**Fix**: Ensure the Redis server daemon is active:
```bash
sudo service redis-server start
# or test with
redis-cli ping
```

### 3. `CORS policy error` when fetching from frontend
**Fix**: Verify that `main.py` has `CORSMiddleware` configured with `allow_origins=["*"]` (enabled by default) and that the backend server is running on port `8000`.

### 4. How to view native binary crash messages?
Send a GET request to `http://localhost:8000/debug/last-run` to view untruncated stdout and stderr from the compiled binaries.

---

*Developed for research and evaluation in Searchable Symmetric Encryption (SSE) and Post-Quantum Cryptography.*
