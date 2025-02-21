# 启动后端服务
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ./src/backend; python -m uvicorn main:app --reload"

# 等待5秒让后端服务启动
Start-Sleep -Seconds 5

# 启动前端服务
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ./src/frontend; npm start" 