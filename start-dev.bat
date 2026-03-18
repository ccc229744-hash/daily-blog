@echo off
REM 每日博客独立启动脚本 (CMD 版本)
REM 不依赖 OpenClaw，独立运行

echo.
echo 🚀 启动每日博客开发服务器...
echo.

REM 检查端口占用
netstat -ano | findstr ":3005" >nul
if %errorlevel% equ 0 (
    echo ⚠️  端口 3005 被占用
    echo 是否停止占用进程并继续？(y/n)
    set /p choice=
    if /i "%choice%"=="y" (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3005"') do (
            taskkill /F /PID %%a
        )
        echo ✅ 已停止占用进程
        timeout /t 2 /nobreak >nul
    ) else (
        echo ❌ 启动已取消
        exit /b 1
    )
)

echo.
echo 🌐 访问地址：
echo    http://localhost:3005
echo.
echo 📝 其他页面：
echo    - 作品广场：http://localhost:3005/works
echo    - 作品管理：http://localhost:3005/works-manager
echo    - 单列模式：http://localhost:3005/single
echo.
echo ⏹️  按 Ctrl+C 停止服务器
echo.

REM 启动开发服务器
npm run dev
