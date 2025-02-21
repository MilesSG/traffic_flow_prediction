# 在后台启动后端服务
$backendJob = Start-Job -ScriptBlock {
    Set-Location "D:\Thesis_Revision\Projects_Code\traffic_flow_prediction\src\backend"
    python -m uvicorn main:app --reload
}

Write-Host "后端服务已启动..."
Start-Sleep -Seconds 3

# 启动前端服务
Write-Host "正在启动前端服务..."
Set-Location "D:\Thesis_Revision\Projects_Code\traffic_flow_prediction\src\frontend"
npm start

# 当前端停止时，清理后端进程
Stop-Job -Job $backendJob
Remove-Job -Job $backendJob 