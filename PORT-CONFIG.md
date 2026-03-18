# 🌐 端口配置说明

**更新日期：** 2026-03-18  
**目的：** 将每日博客与 OpenClaw 主服务端口分离，避免冲突

---

## 📊 端口分配

| 服务 | 端口 | 说明 |
|------|------|------|
| **OpenClaw 主服务** | 18789 | Gateway 服务 |
| **每日博客** | 3005 | 独立开发服务器 |
| **OpenClaw Webchat** | 18788 | Web 聊天界面 |

---

## 🎯 配置变更

### 每日博客 (`daily-blog/`)

**修改文件：**
1. `package.json` - 修改启动端口
2. `.env` - 环境变量配置
3. `.env.local` - 本地配置

**端口：** `3005`

**访问地址：**
- 首页：http://localhost:3005
- 作品广场：http://localhost:3005/works
- 作品管理：http://localhost:3005/works-manager
- 单列模式：http://localhost:3005/single

---

## 🚀 启动方式

### 方式一：独立启动脚本（推荐）

**PowerShell:**
```powershell
cd C:\Users\15578\.openclaw\workspace\daily-blog
.\start-dev.ps1
```

**CMD:**
```cmd
cd C:\Users\15578\.openclaw\workspace\daily-blog
start-dev.bat
```

**优点：**
- ✅ 自动检查端口占用
- ✅ 可选清理缓存
- ✅ 不依赖 OpenClaw
- ✅ 友好的提示信息

### 方式二：直接启动

```bash
cd daily-blog
npm run dev
```

---

## 🔧 端口冲突解决

### 检查端口占用

**PowerShell:**
```powershell
Get-NetTCPConnection -LocalPort 3005 -ErrorAction SilentlyContinue
```

**CMD:**
```cmd
netstat -ano | findstr ":3005"
```

### 释放端口

**PowerShell:**
```powershell
$process = Get-NetTCPConnection -LocalPort 3005 | Select-Object -First 1
Stop-Process -Id $process.OwningProcess -Force
```

**CMD:**
```cmd
for /f "tokens=5" %a in ('netstat -ano ^| findstr ":3005"') do taskkill /F /PID %a
```

---

## 📝 配置文件

### package.json
```json
{
  "scripts": {
    "dev": "next dev -p 3005",
    "build": "next build",
    "start": "next start -p 3005"
  }
}
```

### .env.local
```bash
# 每日博客独立端口
PORT=3005
NEXT_PUBLIC_PORT=3005
NEXT_PUBLIC_SITE_URL=http://localhost:3005
```

---

## ✅ 优势

### 分离前
- ❌ 共用 3000 端口
- ❌ 修复缓存需要重启 OpenClaw
- ❌ 服务相互影响
- ❌ 调试困难

### 分离后
- ✅ 独立 3005 端口
- ✅ 可独立重启每日博客
- ✅ 服务互不影响
- ✅ 易于调试和维护

---

## 🔍 故障排查

### 问题 1：端口被占用

**症状：**
```
Error: listen EADDRINUSE: address already in use :::3005
```

**解决：**
1. 运行启动脚本（自动检测）
2. 或手动停止占用进程
3. 或修改为其他端口（如 3006）

### 问题 2：无法访问

**症状：**
```
无法访问 localhost:3005
```

**检查：**
1. 服务器是否运行
2. 防火墙是否阻止
3. 端口配置是否正确

**解决：**
```bash
# 检查服务器状态
npm run dev

# 查看监听端口
netstat -ano | findstr ":3005"
```

### 问题 3：缓存损坏

**症状：**
```
Module not found / webpack 缓存错误
```

**解决：**
```bash
# 停止服务器
Ctrl+C

# 清理缓存
Remove-Item .next -Recurse -Force
Remove-Item node_modules\.cache -Recurse -Force

# 重新启动
npm run dev
```

**注意：** 现在只需重启每日博客，不需要重启 OpenClaw！

---

## 📚 相关文档

- [OpenClaw 配置](../../openclaw.json)
- [Next.js 配置](next.config.js)
- [环境变量配置](.env.local)

---

## 🎯 快速参考

**启动每日博客：**
```bash
cd daily-blog
.\start-dev.ps1
```

**访问地址：**
- 首页：http://localhost:3005
- 管理：http://localhost:3005/works-manager

**停止服务：**
- 按 `Ctrl+C`

**清理缓存：**
```bash
Remove-Item .next -Recurse -Force
npm run dev
```

---

*最后更新：2026-03-18 15:05*
