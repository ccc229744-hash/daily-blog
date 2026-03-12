---
title: 'Next.js 开发小技巧'
date: '2026-03-11'
excerpt: '分享一些在使用 Next.js 过程中学到的实用技巧和最佳实践。'
---

## Next.js 开发小技巧

最近在用 Next.js 搭建博客，总结了一些实用的技巧。

### 1. 使用 App Router

Next.js 13+ 引入了 App Router，推荐使用：

```tsx
// app/page.tsx
export default function Home() {
  return <main>...</main>
}
```

### 2. 静态生成 vs 服务端渲染

- **静态生成 (SSG)**: 构建时生成 HTML，适合博客文章
- **服务端渲染 (SSR)**: 每次请求生成 HTML，适合动态内容

```tsx
// 静态生成
export const dynamic = 'force-static'

// 服务端渲染
export const dynamic = 'force-dynamic'
```

### 3. 图片优化

使用 `next/image` 组件自动优化图片：

```tsx
import Image from 'next/image'

<Image 
  src="/photo.jpg" 
  alt="描述"
  width={800}
  height={600}
/>
```

### 4. 字体优化

使用 `next/font` 加载字体，避免布局偏移：

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

### 小结

Next.js 是一个强大的框架，掌握这些技巧可以让开发更高效！
