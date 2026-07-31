@echo off
title Start All Searchable Encryption Services
echo ==================================================
echo   Starting All Searchable Encryption Services...
echo ==================================================

:: Ensure shared Docker network exists
docker network create sse-network >nul 2>&1

set "SRIC_DIR=%~dp0"
set "ODXT_DIR=%~dp0..\odxt\"

echo [*] Launching SRIC primary backend, redis, and frontend...
docker compose -f "%SRIC_DIR%docker-compose.yml" up -d --build --remove-orphans

echo [*] Launching ODXT disjunction backend...
if exist "%ODXT_DIR%docker-compose.yml" (
    docker compose -f "%ODXT_DIR%docker-compose.yml" up -d --build --remove-orphans
)

echo.
echo ==================================================
echo   [SUCCESS] All services are starting up!
echo ==================================================
echo   - Frontend UI:          http://localhost:3000
echo   - Primary API (8000):   http://localhost:8000
echo   - ODXT API (8001):      http://localhost:8001
echo ==================================================
echo.

timeout /t 3 >nul
start http://localhost:3000
pause
