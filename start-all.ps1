# 设置环境变量
$env:NODE_OPTIONS = "--openssl-legacy-provider"
$env:PYTHONPATH = "$PWD\src"

Write-Host "正在启动交通流量预测系统..." -ForegroundColor Green

# 检查Python环境
Write-Host "检查Python环境..." -ForegroundColor Yellow
if (!(Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 未找到Python。请安装Python 3.8或更高版本。" -ForegroundColor Red
    exit 1
}

# 检查pip
Write-Host "检查pip..." -ForegroundColor Yellow
if (!(Get-Command pip -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 未找到pip。请安装pip。" -ForegroundColor Red
    exit 1
}

# 检查Node.js
Write-Host "检查Node.js..." -ForegroundColor Yellow
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 未找到Node.js。请安装Node.js 16或更高版本。" -ForegroundColor Red
    exit 1
}

# 检查npm
Write-Host "检查npm..." -ForegroundColor Yellow
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "错误: 未找到npm。请安装npm。" -ForegroundColor Red
    exit 1
}

# 创建必要的目录
Write-Host "创建必要的目录..." -ForegroundColor Yellow
if (!(Test-Path "src/backend/models")) {
    New-Item -ItemType Directory -Path "src/backend/models" -Force
}
if (!(Test-Path "src/backend/utils")) {
    New-Item -ItemType Directory -Path "src/backend/utils" -Force
}

# 安装Python依赖
Write-Host "安装Python依赖..." -ForegroundColor Yellow
pip install -r requirements.txt

# 安装前端依赖
Write-Host "安装前端依赖..." -ForegroundColor Yellow
Set-Location src/frontend
npm install
Set-Location ../..

# 启动后端服务
Write-Host "启动后端服务..." -ForegroundColor Green
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    $env:PYTHONPATH = "$using:PWD\src"
    python -m uvicorn src.backend.main:app --reload --host 0.0.0.0 --port 8000
}

# 等待后端服务启动
Write-Host "等待后端服务启动..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 启动前端服务
Write-Host "启动前端服务..." -ForegroundColor Green
Set-Location src/frontend
npm start

# 清理进程
Stop-Job -Job $backendJob
Remove-Job -Job $backendJob 