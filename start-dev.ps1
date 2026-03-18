# 每日博客独立启动脚本
# 不依赖 OpenClaw，独立运行

Write-Host "🚀 启动每日博客开发服务器..." -ForegroundColor Cyan
Write-Host ""

# 检查端口占用
$port = 3005
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1

if ($process) {
    Write-Host "⚠️  端口 $port 被占用 (PID: $($process.OwningProcess))" -ForegroundColor Yellow
    $choice = Read-Host "是否停止占用进程并继续？(y/n)"
    if ($choice -eq 'y') {
        Stop-Process -Id $process.OwningProcess -Force
        Write-Host "✅ 已停止占用进程" -ForegroundColor Green
        Start-Sleep -Seconds 1
    } else {
        Write-Host "❌ 启动已取消" -ForegroundColor Red
        exit 1
    }
}

# 清理缓存（可选）
$cleanCache = Read-Host "是否清理构建缓存？(y/n)"
if ($cleanCache -eq 'y') {
    Write-Host "🗑️  清理缓存..." -ForegroundColor Yellow
    if (Test-Path ".next") {
        Remove-Item ".next" -Recurse -Force
        Write-Host "✅ 已清理.next 文件夹" -ForegroundColor Green
    }
    if (Test-Path "node_modules\.cache") {
        Remove-Item "node_modules\.cache" -Recurse -Force
        Write-Host "✅ 已清理 node_modules 缓存" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🌐 访问地址：" -ForegroundColor Green
Write-Host "   http://localhost:3005" -ForegroundColor White
Write-Host ""
Write-Host "📝 其他页面：" -ForegroundColor Green
Write-Host "   - 作品广场：http://localhost:3005/works" -ForegroundColor White
Write-Host "   - 作品管理：http://localhost:3005/works-manager" -ForegroundColor White
Write-Host "   - 单列模式：http://localhost:3005/single" -ForegroundColor White
Write-Host ""
Write-Host "⏹️  按 Ctrl+C 停止服务器" -ForegroundColor Yellow
Write-Host ""

# 启动开发服务器
npm run dev
