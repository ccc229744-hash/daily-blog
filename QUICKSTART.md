# 🚀 每日博客 - 5 分钟快速启动

## 前置要求

- Node.js 18+ ✅ (已安装)
- npm ✅ (已安装)
- 一个 GitHub 账号

---

## 第一步：获取必要账号（10 分钟）

### 1. Authing（登录系统）
1. 访问 https://console.authing.cn
2. 注册账号
3. 创建用户池
4. 记下：
   - 用户池 ID
   - App ID

### 2. Supabase（数据库）
1. 访问 https://supabase.com
2. 注册账号
3. 创建项目
4. 记下：
   - Project URL
   - anon public key
5. 进入 SQL Editor，运行 `supabase-schema.sql` 中的 SQL

---

## 第二步：配置环境变量（2 分钟）

编辑 `.env.local` 文件：

```bash
# 复制以下内容，替换为你的真实值
NEXT_PUBLIC_AUTHING_USER_POOL_ID="你的用户池 ID"
NEXT_PUBLIC_AUTHING_APP_ID="你的 App ID"
NEXT_PUBLIC_AUTHING_REDIRECT_URI="http://localhost:3000/callback"
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="你的 anon key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 第三步：启动开发服务器（1 分钟）

```bash
# 已经在 daily-blog 目录中
npm run dev
```

访问 http://localhost:3000

---

## 第四步：测试功能

### 测试登录
1. 点击右上角「登录」
2. 选择微信或 QQ
3. 扫码登录
4. 登录后显示用户头像

### 测试评论
1. 打开任意文章
2. 点击「写评论」
3. 输入内容并发布
4. 评论应该出现在下方

---

## 第五步：部署上线（10 分钟）

### 1. 推送到 GitHub

```bash
git init
git add .
git commit -m "Ready for deployment"

# 在 GitHub 创建新仓库，然后：
git remote add origin https://github.com/YOUR_USERNAME/daily-blog.git
git push -u origin main
```

### 2. 连接 Cloudflare Pages

1. 访问 https://pages.cloudflare.com
2. 点击 "Create a project"
3. 选择 "Connect to Git"
4. 选择 `daily-blog` 仓库
5. 配置：
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - 添加环境变量（同 `.env.local`）
6. 点击 "Save and Deploy"

### 3. 等待部署完成

大约 2-5 分钟，完成后会显示：
- ✅ 生产 URL：`https://daily-blog-xxx.pages.dev`
- ✅ 全球 CDN 已启用
- ✅ 中国大陆可访问

---

## 🎉 完成！

现在你的博客已经：
- ✅ 支持 QQ/微信登录
- ✅ 评论系统已启用
- ✅ 中国大陆可访问
- ✅ 免费托管

---

## 📚 更多文档

- `CHINA-CHECKLIST.md` - 完整配置清单
- `CLOUDFLARE-DEPLOY.md` - Cloudflare 部署详解
- `CHINA-DEPLOYMENT.md` - 中国化技术方案

---

## 🆘 常见问题

**Q: 登录后跳转失败？**  
A: 检查 Authing 回调地址是否设置为 `http://localhost:3000/callback`

**Q: 评论发布失败？**  
A: 检查 Supabase 数据库脚本是否已执行

**Q: 构建失败？**  
A: 本地运行 `npm run build` 查看具体错误

**Q: 国内访问慢？**  
A: Cloudflare 自动优化，首次访问可能稍慢，后续会缓存

---

**技术支持**：查看各文档文件的故障排查章节
