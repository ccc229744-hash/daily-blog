# 🌩️ Cloudflare Pages 部署指南

## 快速部署（5 分钟）

### 步骤 1：准备 GitHub 仓库

```bash
# 初始化 Git（如果还没有）
cd daily-blog
git init
git add .
git commit -m "Initial commit with China deployment"

# 推送到 GitHub
git remote add origin https://github.com/YOUR_USERNAME/daily-blog.git
git push -u origin main
```

### 步骤 2：连接 Cloudflare Pages

1. 访问 https://pages.cloudflare.com/
2. 点击 "Create a project"
3. 选择 "Connect to Git"
4. 选择你的 `daily-blog` 仓库
5. 点击 "Begin setup"

### 步骤 3：配置构建设置

**构建配置**：
- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Root directory**: （留空）

**环境变量**（点击 "Add variable"）：
```
NEXT_PUBLIC_AUTHING_USER_POOL_ID=你的用户池 ID
NEXT_PUBLIC_AUTHING_APP_ID=你的 App ID
NEXT_PUBLIC_AUTHING_REDIRECT_URI=https://你的域名.com/callback
NEXT_PUBLIC_SUPABASE_URL=你的 Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 Supabase Anon Key
```

### 步骤 4：部署！

点击 "Save and Deploy"

Cloudflare Pages 会自动：
- ✅ 安装依赖
- ✅ 构建项目
- ✅ 全球 CDN 分发
- ✅ 自动 HTTPS

### 步骤 5：绑定自定义域名（可选）

1. 进入项目设置
2. 点击 "Custom domains"
3. 输入你的域名
4. 按照提示配置 DNS

---

## 🇨🇳 中国大陆访问优化

### 自动优化（已包含）

Cloudflare 自动提供：
- ✅ 全球 275+ 数据中心
- ✅ 中国大陆边缘节点（北京、上海、广州等）
- ✅ 自动路由优化
- ✅ HTTP/2 + HTTP/3 支持

### 手动优化（可选）

1. **启用中国 CDN**：
   - 进入 Cloudflare Dashboard
   - 选择你的域名
   - 进入 "Speed" → "Optimization"
   - 启用 "Chinese Network"

2. **配置 DNS**：
   - 使用 Cloudflare DNS
   - 启用 CDN 代理（橙色云朵）

---

## 🔧 后续更新

每次推送到 `main` 分支都会自动部署：

```bash
git add .
git commit -m "更新内容"
git push
```

预览部署（Pull Request）：
- 每个 PR 自动创建预览链接
- 审核通过后再合并到 main

---

## 📊 免费额度

| 资源 | 额度 | 说明 |
|------|------|------|
| 请求数 | 无限 | 个人博客足够 |
| 带宽 | 100GB/月 | 约 10 万页面浏览 |
| 构建次数 | 500 次/月 | 每天 16 次构建 |
| 预览部署 | 无限 | 测试用 |

---

## ⚠️ 注意事项

1. **Next.js 兼容性**：
   - Cloudflare Pages 支持 Next.js 14
   - 部分 ISR 功能可能受限
   - 建议使用 SSG（静态生成）

2. **环境变量**：
   - 生产环境变量在 Cloudflare 控制台设置
   - 本地开发用 `.env.local`

3. **函数限制**：
   - Cloudflare Functions 有执行时间限制（10s）
   - 复杂操作建议用外部 API

---

## 🆘 故障排查

**构建失败**：
```bash
# 本地测试构建
npm run build

# 查看详细日志
cat .next/build-manifest.json
```

**访问慢**：
- 检查 Cloudflare 状态页
- 启用缓存优化
- 检查图片大小

**登录不工作**：
- 检查 Authing 回调地址
- 确认环境变量正确
- 查看浏览器控制台错误

---

**部署完成后，你的博客将：**
- ✅ 中国大陆可访问（无需 VPN）
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 免费托管
