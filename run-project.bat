@echo off
echo Checking if Docker is running...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker daemon is not running. Starting Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo Waiting for Docker daemon to become ready...
    :wait_loop
    timeout /t 5 >nul
    docker info >nul 2>&1
    if %errorlevel% neq 0 (
        echo Still waiting for Docker...
        goto wait_loop
    )
)
echo Docker is running. Starting docker compose...
docker compose up
