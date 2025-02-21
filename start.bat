@echo off
cd src\backend
start cmd /k "python -m uvicorn main:app --reload"
cd ..\frontend
timeout /t 5
start cmd /k "npm start" 