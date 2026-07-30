@echo off
title Stop All SSE Services (Docker)
echo ===================================================
echo     Stopping Searchable Encryption (SSE) Services
echo ===================================================
echo.

set "SRIC_DIR=%~dp0"
set "BASE_DIR=%~dp0..\"

if exist "%SRIC_DIR%..\odxt\docker-compose.yml" (
    echo Stopping ODXT backend...
    docker compose -f "%SRIC_DIR%..\odxt\docker-compose.yml" down
)

if exist "%SRIC_DIR%docker-compose.yml" (
    echo Stopping SRIC services...
    docker compose -f "%SRIC_DIR%docker-compose.yml" down
)

docker network rm sse-network >nul 2>&1

echo.
echo All Docker services stopped.
pause
