@echo off
title Start All SSE Services (Docker)
echo ===================================================
echo     Starting Searchable Encryption (SSE) Services
echo ===================================================
echo.

:: Ensure shared Docker network exists
docker network create sse-network >nul 2>&1

set "SRIC_DIR=%~dp0"
set "BASE_DIR=%~dp0..\"

echo [1/2] Starting SRIC Services (Redis, SRIC Backend:8000, Frontend:3000)...
if exist "%SRIC_DIR%docker-compose.yml" (
    docker compose -f "%SRIC_DIR%docker-compose.yml" up -d --build --remove-orphans
) else (
    docker compose -f "%BASE_DIR%SRIC\docker-compose.yml" up -d --build --remove-orphans
)

if %errorlevel% neq 0 (
    echo [ERROR] Failed to start SRIC Docker services. Ensure Docker Desktop is running.
    pause
    exit /b %errorlevel%
)

echo [2/2] Starting ODXT Services (ODXT OR Backend:8001)...
if exist "%SRIC_DIR%..\odxt\docker-compose.yml" (
    docker compose -f "%SRIC_DIR%..\odxt\docker-compose.yml" up -d --build --remove-orphans
) else if exist "%BASE_DIR%odxt\docker-compose.yml" (
    docker compose -f "%BASE_DIR%odxt\docker-compose.yml" up -d --build --remove-orphans
)

if %errorlevel% neq 0 (
    echo [ERROR] Failed to start ODXT Docker service. Ensure Docker Desktop is running.
    pause
    exit /b %errorlevel%
)

echo.
echo ===================================================
echo     All Services Started Successfully!
echo ===================================================
echo   - Frontend Web UI:     http://localhost:3000
echo   - Primary API (SRIC):  http://localhost:8000
echo   - OR Search API (ODXT):http://localhost:8001
echo ===================================================
echo.

timeout /t 3 >nul
start http://localhost:3000
pause
