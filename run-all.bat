@echo off
echo ==================================================
echo   Starting All Encrypted Search Services...
echo ==================================================

:: 1. Start primary services (NTRU-OQXT Backend, Frontend, and Redis)
echo [*] Launching primary backend, redis, and frontend...
docker compose up -d

:: 2. Start disjunction services (ODXT Backend)
echo [*] Launching ODXT disjunction backend...
docker compose -f "backend_ORsearch\docker-compose.yml" up -d


echo ==================================================
echo   [SUCCESS] All services are starting up!
echo ==================================================
echo   - Frontend:             http://localhost:3000
echo   - Primary API (8000):   http://localhost:8000
echo   - ODXT API (8001):      http://localhost:8001
echo ==================================================
pause
