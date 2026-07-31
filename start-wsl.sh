#!/bin/bash
echo "==================================================="
echo "  Starting Searchable Encryption (SSE) via WSL"
echo "==================================================="

# 1. Start Redis server if not running
if ! pgrep -x "redis-server" > /dev/null; then
    echo "[*] Starting Redis server..."
    sudo service redis-server start 2>/dev/null || redis-server --daemonize yes
fi

# 2. Start SRIC Backend on port 8000
echo "[*] Starting SRIC Backend on http://localhost:8000..."
cd /home/manjunath/SRIC
source .venv/bin/activate
nohup python3 main.py > /tmp/sric-backend.log 2>&1 &

# 3. Start ODXT Backend on port 8001
echo "[*] Starting ODXT Backend on http://localhost:8001..."
cd /home/manjunath/odxt
source .venv/bin/activate
nohup python3 main.py > /tmp/odxt-backend.log 2>&1 &

# 4. Start Frontend Dev Server
echo "[*] Starting Frontend Web UI..."
cd /home/manjunath/SRIC/frontend
nohup npm run dev > /tmp/frontend.log 2>&1 &

sleep 2

echo ""
echo "==================================================="
echo "  All Services Started in Background!"
echo "==================================================="
echo "  - Frontend Web UI:     http://localhost:5173"
echo "  - Primary API (SRIC):  http://localhost:8000"
echo "  - OR Search API (ODXT):http://localhost:8001"
echo "==================================================="
echo "  To view logs: tail -f /tmp/sric-backend.log"
echo "  To stop all:  bash ~/SRIC/stop-wsl.sh"
echo "==================================================="
