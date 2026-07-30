#!/bin/bash
echo "Stopping all SSE processes..."
pkill -f "python3 main.py"
pkill -f "vite"
echo "All WSL backend and frontend processes stopped."
