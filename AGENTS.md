# AGENTS.md - 每日博客项目规则

**项目类型**: Next.js 博客  
**最后更新**: 2026-03-12

---

## 🎯 项目概览

**每日博客** - 一个支持 QQ/微信登录的 Next.js 博客系统

**核心功能**:
- ✅ 文章发布与管理
- ✅ 分类系统
- ✅ 评论系统（支持登录）
- ✅ 搜索功能
- ✅ 订阅系统
- ✅ QQ/微信登录（Authing）
- ✅ 知识管理模块

**技术栈**:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Authing（登录）
- Supabase（数据库）

**部署**: Cloudflare Pages

---

## 📁 目录结构

```
daily-blog/
├── app/                      # Next.js App Router
├── content/posts/            # 博客文章
├── knowledge/                # 知识管理模块 ⭐ 新增
├── lib/                      # 工具函数
├── skills/                   # Agent Skills
└── ...配置文件
```

---

## 🧠 知识管理

**检索外部知识**:
1. 先读 `knowledge/_index.md`
2. 通过标签、摘要定位候选条目
3. 需要细节时再打开单篇全文
4. 禁止全量扫描 `knowledge/*.md`

**收录新知识**:
1. 新材料放入 `knowledge/inbox/manual/pending/`
2. 整理为正式条目格式
3. 移动到 `knowledge/` 根目录
4. 更新 `knowledge/_index.md`

**处理视频/音频素材**:
- 放入 `knowledge/inbox/video/raw/`
- 转写后整理为正式条目

**使用 Skill**: `knowledge-kb`

---

## 📝 博客文章

**位置**: `content/posts/`

**格式**:
```markdown
---
title: 文章标题
date: 2026-03-12
excerpt: 摘要
---

文章内容...
```

---

## 🔐 登录系统

**提供商**: Authing
**支持**: QQ、微信
**配置**: `.env.local`

---

## 🚀 开发命令

```bash
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run start    # 生产服务器
```

---

## 📊 部署

**平台**: Cloudflare Pages
**状态**: ✅ 已部署
**环境变量**: 在 Cloudflare 控制台设置

---

**最后更新**: 2026-03-12  
**版本**: v3.0.0-china
