# 🎨 组件使用指南

## 新增组件快速上手

---

## 📸 骨架屏组件

**位置：** `app/components/Skeleton.tsx`

### 文章列表骨架屏
```tsx
import { ArticleListSkeleton } from '@/app/components/Skeleton';

// 加载时显示
{isLoading ? (
  <ArticleListSkeleton count={6} />
) : (
  <ArticleList articles={articles} />
)}
```

### 单列模式骨架屏
```tsx
import { SingleColumnSkeleton } from '@/app/components/Skeleton';

<SingleColumnSkeleton />
```

### 个人资料骨架屏
```tsx
import { ProfileSkeleton } from '@/app/components/Skeleton';

<ProfileSkeleton />
```

---

## ⏳ Loading 组件

**位置：** `app/components/Loading.tsx`

### 全局加载
```tsx
import Loading from '@/app/components/Loading';

// 页面加载时
{isLoading && <Loading />}
```

---

## 🔍 SEO 组件

**位置：** `app/components/SEO.tsx`

### 基础使用
```tsx
import SEO from '@/app/components/SEO';

<SEO 
  title="文章标题 - 每日博客"
  description="文章描述内容"
/>
```

### 完整配置
```tsx
<SEO 
  title="深度解析 React 19 新特性"
  description="全面解读 React 19 的重大更新..."
  image="/og-image.png"
  url="https://yourblog.com/posts/react-19"
  type="article"
/>
```

---

## 📊 性能监控组件

**位置：** `app/components/PerformanceMonitor.tsx`

### 添加到页面
```tsx
import PerformanceMonitor from '@/app/components/PerformanceMonitor';

// 添加到 layout 或页面底部
<PerformanceMonitor />
```

### 快捷键
- **Shift + P** - 显示/隐藏监控面板

### 监控指标
- 🟢 FCP (First Contentful Paint)
- 🟢 LCP (Largest Contentful Paint)  
- 🟢 TTFB (Time to First Byte)

---

## 🖼️ Next.js Image 组件（推荐）

### 替代传统 img 标签
```tsx
// ❌ 旧方式
<img src="/image.jpg" alt="描述" />

// ✅ 新方式（自动优化）
import Image from 'next/image';
<Image 
  src="/image.jpg" 
  width={300} 
  height={400} 
  alt="描述"
  loading="lazy"
  priority={true} // 首屏图片
/>
```

### 远程图片
```tsx
<Image
  src="https://picsum.photos/400/300"
  width={400}
  height={300}
  alt="随机图片"
/>
```

---

## 🎯 最佳实践

### 1. 懒加载非首屏内容
```tsx
const Comments = dynamic(() => import('./Comments'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

### 2. 图片优化
```tsx
// 使用 WebP 格式
<Image
  src="/photo.jpg"
  width={800}
  height={600}
  alt="照片"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 3. 字体优化
```tsx
// 使用 next/font
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>;
}
```

---

## 📋 检查清单

发布前检查：
- [ ] 所有图片添加 `loading="lazy"`
- [ ] 首屏图片使用 `priority`
- [ ] 添加 SEO 元数据
- [ ] 测试骨架屏显示
- [ ] 检查性能监控数据
- [ ] 运行 Lighthouse 测试

---

*更多组件文档持续更新中...*
