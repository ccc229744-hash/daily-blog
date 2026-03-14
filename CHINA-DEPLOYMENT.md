# 🇨🇳 每日博客 - 中国化改造方案

**目标**：让博客在中国大陆可访问，支持 QQ/微信登录

---

## 📋 改造清单

### 1. 部署方案（解决访问问题）

**当前问题**：Vercel 在中国大陆访问不稳定，有时被墙

**解决方案**（三选一）：

#### 方案 A：Cloudflare Pages（推荐 ⭐⭐⭐⭐⭐）
- ✅ 免费
- ✅ 中国大陆可访问（速度快）
- ✅ 支持 Next.js
- ✅ 自动 HTTPS
- 📝 需要 Cloudflare 账号

**部署步骤**：
1. 注册 Cloudflare 账号
2. 连接 GitHub 仓库
3. 自动部署

#### 方案 B：阿里云/腾讯云（⭐⭐⭐⭐）
- ✅ 国内访问最快
- ✅ 完全可控
- ❌ 需要备案（个人博客较麻烦）
- ❌ 需要付费（约 ¥50-100/月）

#### 方案 C：Netlify（⭐⭐⭐）
- ✅ 免费
- ✅ 支持 Next.js
- ⚠️ 国内访问速度一般

---

### 2. 登录系统（QQ/微信）

**技术方案**：使用第三方 OAuth

#### QQ 登录
- **平台**：QQ 互联 (connect.qq.com)
- **申请**：需要网站备案后才能申请
- **文档**：https://wiki.connect.qq.com/

#### 微信登录
- **平台**：微信开放平台 (open.weixin.qq.com)
- **申请**：需要企业资质 + 网站备案
- **文档**：https://developers.weixin.qq.com/doc/

#### 简化方案：使用 Authing（推荐 ⭐⭐⭐⭐⭐）
- **网址**：https://authing.cn/
- **优势**：
  - ✅ 国内服务，访问快
  - ✅ 支持 QQ、微信、微博等多种登录
  - ✅ 免费额度够用（月活 5000 以内免费）
  - ✅ 无需自己处理 OAuth 复杂流程
  - ✅ 提供 Next.js SDK

---

### 3. 数据库（存储用户和评论）

**方案 A：Supabase（推荐 ⭐⭐⭐⭐⭐）**
- **网址**：https://supabase.com/
- **优势**：
  - ✅ 免费额度大
  - ✅ PostgreSQL 数据库
  - ✅ 实时订阅
  - ✅ 内置用户认证
  - ✅ 提供 Next.js SDK

**方案 B：MongoDB Atlas**
- **网址**：https://www.mongodb.com/atlas
- **优势**：
  - ✅ 免费 512MB
  - ✅ 灵活的数据结构
  - ⚠️ 国内访问速度一般

**方案 C：LeanCloud（国内 ⭐⭐⭐⭐）**
- **网址**：https://leancloud.cn/
- **优势**：
  - ✅ 国内服务，速度快
  - ✅ 免费额度够用
  - ✅ 支持即时通讯、存储等

---

## 🚀 推荐技术栈

| 功能 | 推荐方案 | 备选方案 |
|------|---------|---------|
| 部署 | Cloudflare Pages | Vercel（备用） |
| 登录 | Authing | 自己接 QQ/微信 OAuth |
| 数据库 | Supabase | LeanCloud |
| 评论 | 自建（Supabase） | 使用第三方（如 Waline） |

---

## 📁 需要新增的文件

```
daily-blog/
├── lib/
│   ├── auth.ts              # 认证逻辑
│   ├── db.ts                # 数据库连接
│   └── api/
│       ├── auth/
│       │   ├── qq/route.ts  # QQ 登录回调
│       │   └── wechat/route.ts  # 微信登录回调
│       └── comments/
│           └── route.ts     # 评论 API
│
├── app/
│   ├── components/
│   │   ├── LoginModal.tsx   # 登录弹窗
│   │   └── UserMenu.tsx     # 用户菜单
│   ├── login/
│   │   └── page.tsx         # 登录页面
│   └── api/
│       └── auth/            # 认证 API
│
├── .env.local               # 环境变量（不提交到 Git）
└── CHINA-DEPLOYMENT.md      # 本文件
```

---

## 🔑 需要申请的关键

1. **Authing 账号**
   - 用户池 ID
   - App ID
   - App Secret

2. **Supabase 项目**
   - Project URL
   - Anon Key

3. **Cloudflare 账号**
   - 用于部署

---

## 📝 实施步骤

### 第一阶段：添加登录功能（今天）
- [ ] 注册 Authing 账号
- [ ] 配置 QQ/微信登录
- [ ] 安装 Authing Next.js SDK
- [ ] 创建登录组件
- [ ] 修改评论系统（需要登录才能评论）

### 第二阶段：添加数据库（明天）
- [ ] 注册 Supabase
- [ ] 创建用户表和评论表
- [ ] 连接数据库
- [ ] 迁移评论数据到数据库

### 第三阶段：国内部署（后天）
- [ ] 注册 Cloudflare
- [ ] 连接 GitHub 仓库
- [ ] 配置自动部署
- [ ] 绑定自定义域名（可选）

---

## 💰 成本估算

| 服务 | 免费额度 | 超出后费用 |
|------|---------|-----------|
| Cloudflare Pages | 无限 | $0（个人使用足够） |
| Authing | 5000 MAU | ¥0.02/用户/月 |
| Supabase | 500MB 数据库 | $25/月 |

**预计月成本**：¥0（免费额度内）

---

## ⚠️ 注意事项

1. **网站备案**：
   - 如果使用国内服务器（阿里云/腾讯云），需要 ICP 备案
   - 使用 Cloudflare/Vercel 等海外服务，不需要备案（但访问速度可能受影响）

2. **QQ/微信登录申请**：
   - 直接申请需要网站备案
   - 使用 Authing 可以绕过这个限制（他们用已备案的域名）

3. **数据合规**：
   - 存储用户数据需要遵守《个人信息保护法》
   - 需要添加隐私政策页面

---

**下一步**：问用户想先做哪一步？

1. 先加登录功能（Authing + QQ/微信）
2. 先换国内可访问的部署（Cloudflare Pages）
3. 全都要，一起上
