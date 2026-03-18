# 每日博客稳定启动脚本
# 使用生产模式，更稳定可靠

Write-Host "🚀 启动每日博客（生产模式）..." -ForegroundColor Cyan
Write-Host ""

# 清理缓存
Write-Host "🗑️  清理旧缓存..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "✅ 已清理.next 文件夹" -ForegroundColor Green
}

# 构建
Write-Host ""
Write-Host "📦 开始构建..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ 构建成功！" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 访问地址：" -ForegroundColor Green
Write-Host "   http://localhost:3005" -ForegroundColor White
Write-Host ""
Write-Host "📝 其他页面：" -ForegroundColor Green
Write-Host "   - 作品广场：http://localhost:3005/works" -ForegroundColor White
Write-Host "   - 作品管理：http://localhost:3005/works-manager" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  生产模式特点：" -ForegroundColor Yellow
Write-Host "   ✅ 更稳定，不易崩溃" -ForegroundColor Green
Write-Host "   ✅ 性能更好" -ForegroundColor Green
Write-Host "   ✅ 适合长期使用" -ForegroundColor Green
Write-Host "   ⚠️  修改代码后需要重新构建" -ForegroundColor Yellow
Write-Host ""
Write-Host "⏹️  按 Ctrl+C 停止服务器" -ForegroundColor Yellow
Write-Host ""

# 启动生产服务器
npm start
