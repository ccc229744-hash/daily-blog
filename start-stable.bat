@echo off
REM 每日博客稳定启动脚本（生产模式）
REM 使用生产模式，更稳定可靠

echo.
echo 🚀 启动每日博客（生产模式）...
echo.

REM 清理缓存
echo 🗑️  清理旧缓存...
if exist ".next" (
    rmdir /s /q ".next"
    echo ✅ 已清理.next 文件夹
)

REM 构建
echo.
echo 📦 开始构建...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo.
echo ✅ 构建成功！
echo.
echo 🌐 访问地址：
echo    http://localhost:3005
echo.
echo 📝 其他页面：
echo    - 作品广场：http://localhost:3005/works
echo    - 作品管理：http://localhost:3005/works-manager
echo.
echo ⚠️  生产模式特点：
echo    ✅ 更稳定，不易崩溃
echo    ✅ 性能更好
echo    ✅ 适合长期使用
echo    ⚠️  修改代码后需要重新构建
echo.
echo ⏹️  按 Ctrl+C 停止服务器
echo.

REM 启动生产服务器
npm start
