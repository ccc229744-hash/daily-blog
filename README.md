# 我的每日博客

一个简洁现代的个人博客，使用 Next.js 构建。

## 功能特点

- ✅ 简洁现代的设计风格
- ✅ 首页展示文章列表
- ✅ 每篇文章有独立页面
- ✅ 支持 Markdown 渲染
- ✅ 响应式设计（手机/电脑都能看）
- ✅ SEO 友好
- ✅ 快速加载
- ✅ 好友社交功能
- ✅ 性能优化

## 技术栈

- **Next.js 14** - React 框架
- **Tailwind CSS** - 样式框架
- **TypeScript** - 类型安全
- **gray-matter** - Markdown 元数据解析
- **remark** - Markdown 转 HTML

## 快速开始

### 1. 安装依赖

```bash
cd daily-blog
npm install
```

### 2. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 发布新文章

在 `content/posts/` 目录下创建新的 Markdown 文件：

```markdown
---
title: '文章标题'
date: '2026-03-12'
excerpt: '文章摘要，会显示在首页'
---

这里是文章内容，支持 **Markdown** 语法。

## 标题

- 列表项 1
- 列表项 2

[链接](https://example.com)
```

文件名格式：`YYYY-MM-DD-文章 slug.md`

## 部署到 Vercel

### 方法一：Vercel CLI（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 方法二：GitHub + Vercel

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. 点击 "Deploy"

## 项目结构

```
daily-blog/
├── app/                    # Next.js App Router
│   ├── components/         # 可复用组件
│   ├── posts/[slug]/       # 文章详情页
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   └── not-found.tsx       # 404 页面
├── content/posts/          # Markdown 文章
├── lib/                    # 工具函数
│   └── posts.ts            # 文章处理
├── package.json
├── tailwind.config.js
└── README.md
```

## 自定义

### 修改网站标题

编辑 `app/layout.tsx`：

```tsx
export const metadata: Metadata = {
  title: '你的博客名称',
  description: '你的博客描述',
}
```

### 修改配色

编辑 `tailwind.config.js`，修改 `colors` 配置。

### 添加更多页面

在 `app/` 目录下创建新文件夹，例如 `app/about/page.tsx` 会生成 `/about` 页面。

## 许可证

MIT
