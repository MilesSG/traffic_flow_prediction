$backendJob = Start-Process -FilePath "python" -ArgumentList "-m uvicorn main:app --reload" -WorkingDirectory ".\src\backend" -PassThru
Start-Sleep -Seconds 5
$frontendJob = Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory ".\src\frontend" -PassThru

Write-Host "Press any key to stop the servers..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Stop-Process -Id $backendJob.Id -Force
Stop-Process -Id $frontendJob.Id -Force 