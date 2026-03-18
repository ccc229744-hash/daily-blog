# PM2 稳定运行脚本

Write-Host "🚀 使用 PM2 启动每日博客..." -ForegroundColor Cyan
Write-Host ""

# 检查 PM2 是否安装
$pm2Version = npm list -g pm2 2>$null
if (-not $pm2Version) {
    Write-Host "📦 安装 PM2..." -ForegroundColor Yellow
    npm install -g pm2
}

# 创建日志目录
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
    Write-Host "✅ 创建日志目录" -ForegroundColor Green
}

# 停止旧进程
Write-Host "🛑 停止旧进程..." -ForegroundColor Yellow
pm2 stop daily-blog 2>$null
pm2 delete daily-blog 2>$null

# 启动
Write-Host ""
Write-Host "🚀 启动 PM2 进程..." -ForegroundColor Cyan
pm2 start ecosystem.config.json

Write-Host ""
Write-Host "✅ 启动成功！" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 访问地址：" -ForegroundColor Green
Write-Host "   http://localhost:3005" -ForegroundColor White
Write-Host ""
Write-Host "📊 PM2 管理命令：" -ForegroundColor Yellow
Write-Host "   pm2 status          # 查看状态" -ForegroundColor White
Write-Host "   pm2 logs daily-blog # 查看日志" -ForegroundColor White
Write-Host "   pm2 restart daily-blog # 重启" -ForegroundColor White
Write-Host "   pm2 stop daily-blog # 停止" -ForegroundColor White
Write-Host "   pm2 monit           # 监控面板" -ForegroundColor White
Write-Host ""
