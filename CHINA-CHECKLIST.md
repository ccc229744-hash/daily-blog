# 🇨🇳 每日博客 - 中国化配置清单

**版本**: v3.0.0  
**更新时间**: 2026-03-12  
**状态**: 🔄 配置中

---

## ✅ 已完成

### 1. 登录系统
- [x] 安装 Authing SDK
- [x] 创建登录组件（LoginModal.tsx）
- [x] 创建用户菜单（UserMenu.tsx）
- [x] 集成到首页导航
- [x] 支持 QQ/微信登录（通过 Authing）

### 2. 数据库
- [x] 安装 Supabase SDK
- [x] 创建数据库客户端
- [x] 创建数据库 Schema（supabase-schema.sql）
- [x] 评论系统集成数据库
- [x] 本地存储回退方案

### 3. 部署方案
- [x] Cloudflare Pages 部署文档
- [x] 环境变量配置示例
- [x] 中国大陆访问优化说明

---

## 🔄 待完成（需要用户操作）

### 第一步：注册 Authing（10 分钟）

1. 访问 https://console.authing.cn
2. 注册账号（支持手机号/邮箱）
3. 创建用户池
   - 名称：每日博客
   - 类型：Web 应用
4. 获取配置信息：
   - 用户池 ID
   - App ID
   - App Secret

5. 配置登录方式：
   - 进入「身份源」
   - 启用「微信」
   - 启用「QQ」
   - （需要时填写对应的 AppID/Secret）

6. 配置回调地址：
   - 开发环境：`http://localhost:3000/callback`
   - 生产环境：`https://你的域名.com/callback`

### 第二步：注册 Supabase（10 分钟）

1. 访问 https://supabase.com
2. 注册账号（支持 GitHub/邮箱）
3. 创建新项目
   - 名称：daily-blog
   - 数据库密码：（记住这个密码）
   - 区域：选择最近的（推荐 Asia）

4. 获取配置信息：
   - Project URL
   - anon public key

5. 运行数据库脚本：
   - 进入 SQL Editor
   - 复制 `supabase-schema.sql` 内容
   - 点击 "Run" 执行

### 第三步：配置环境变量（5 分钟）

编辑 `.env.local` 文件：

```bash
# Authing 配置
NEXT_PUBLIC_AUTHING_USER_POOL_ID="你的用户池 ID"
NEXT_PUBLIC_AUTHING_APP_ID="你的 App ID"
NEXT_PUBLIC_AUTHING_REDIRECT_URI="http://localhost:3000/callback"

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="你的 anon key"

# 生产环境
NEXT_PUBLIC_SITE_URL="https://你的域名.com"
```

### 第四步：本地测试（5 分钟）

```bash
# 安装依赖（已完成）
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

测试项目：
- [ ] 点击右上角「登录」
- [ ] 选择微信/QQ 登录
- [ ] 成功登录后显示用户菜单
- [ ] 打开文章详情页
- [ ] 尝试发布评论

### 第五步：部署到 Cloudflare Pages（10 分钟）

1. 推送到 GitHub：
```bash
git init
git add .
git commit -m "Ready for China deployment"
# 然后创建 GitHub 仓库并推送
```

2. 连接 Cloudflare Pages：
   - 访问 https://pages.cloudflare.com
   - Connect to Git
   - 选择你的仓库

3. 配置构建：
   - Framework preset: Next.js
   - Build command: `npm run build`
   - 添加环境变量（复制 .env.local 的内容）

4. 点击 Deploy！

---

## 📋 完整文件清单

```
daily-blog/
├── app/
│   ├── components/
│   │   ├── LoginModal.tsx       ✅ 新增 - 登录弹窗
│   │   ├── UserMenu.tsx         ✅ 新增 - 用户菜单
│   │   ├── CommentSection.tsx   ✅ 更新 - 支持数据库
│   │   └── SearchBar.tsx        ✅ 已有
│   ├── page.tsx                 ✅ 更新 - 集成登录
│   └── ...
├── lib/
│   ├── auth.ts                  ✅ 新增 - Authing 配置
│   ├── supabase.ts              ✅ 新增 - Supabase 配置
│   ├── posts.ts                 ✅ 更新 - 添加 id 字段
│   ├── search.ts                ✅ 更新 - 类型修复
│   └── comments.ts              ✅ 已有 - 本地回退
├── .env.local                   ✅ 新增 - 环境变量
├── .env.local.example           ✅ 新增 - 示例配置
├── supabase-schema.sql          ✅ 新增 - 数据库脚本
├── CLOUDFLARE-DEPLOY.md         ✅ 新增 - 部署指南
├── CHINA-DEPLOYMENT.md          ✅ 新增 - 中国化方案
└── CHINA-CHECKLIST.md           ✅ 本文件
```

---

## 🎯 最终效果

**用户侧**：
- ✅ 中国大陆直接访问（无需 VPN）
- ✅ QQ/微信一键登录
- ✅ 登录后评论、点赞
- ✅ 访问速度快（CDN 加速）

**管理员侧**：
- ✅ 免费托管（Cloudflare Pages）
- ✅ 自动部署（Git 推送即部署）
- ✅ 数据库管理（Supabase Dashboard）
- ✅ 用户管理（Authing Console）

---

## 💰 成本

| 服务 | 免费额度 | 超出后 |
|------|---------|--------|
| Cloudflare Pages | 无限请求 + 100GB/月 | $0（个人足够） |
| Authing | 5000 MAU/月 | ¥0.02/用户 |
| Supabase | 500MB 数据库 | $25/月 |

**预计月成本**: ¥0（免费额度内完全够用）

---

## ⚠️ 重要提醒

1. **Authing 回调地址**：
   - 开发环境：`http://localhost:3000/callback`
   - 生产环境：部署后更新为实际域名

2. **数据库安全**：
   - 已配置行级安全（RLS）
   - 用户只能修改自己的评论
   - 不要泄露 Supabase Service Key

3. **隐私合规**：
   - 需要添加隐私政策页面
   - 用户数据存储在中国境内（Supabase 可选区域）
   - 遵守《个人信息保护法》

---

## 🆘 遇到问题？

### 登录不工作
- 检查 Authing 回调地址是否匹配
- 确认环境变量已正确设置
- 查看浏览器控制台错误

### 数据库连接失败
- 检查 Supabase URL 和 Key
- 确认数据库脚本已执行
- 查看 Supabase Logs

### 部署失败
- 本地运行 `npm run build` 测试
- 检查 Cloudflare 构建日志
- 确认 Node.js 版本兼容

---

**下一步**：按照清单完成 5 步配置，然后就可以上线啦！🚀
