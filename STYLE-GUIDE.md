# 设计风格指南 - 抖音 × 小红书

## 核心理念

**主风格：抖音沉浸式体验**
- 黑色背景
- 全屏内容
- 渐变遮罩
- 白色文字

**融合元素：小红书精致感**
- 双列瀑布流
- 3:4 卡片比例
- 圆角设计
- 标签系统

---

## 颜色系统

### 主色调
```css
/* 抖音黑 */
--douyin-black: #000000
--douyin-dark: #0a0a0a
--douyin-gray: #1a1a1a

/* 渐变强调色 */
--gradient-start: #ef4444 (red-500)
--gradient-mid: #ec4899 (pink-500)
--gradient-end: #8b5cf6 (purple-500)
```

### 文字颜色
```css
/* 主要文字 */
--text-primary: #ffffff
--text-secondary: rgba(255, 255, 255, 0.6)
--text-tertiary: rgba(255, 255, 255, 0.4)

/* 强调文字 */
--text-accent: #ef4444
```

---

## 布局规范

### 首页布局
```
┌─────────────────────────┐
│   抖音风格顶部导航      │
│   (黑色渐变 + 标签栏)    │
├─────────────────────────┤
│                         │
│   小红书双列瀑布流      │
│   (3:4 卡片比例)         │
│                         │
├─────────────────────────┤
│   抖音风格底部导航      │
│   (5 Tab 黑色背景)       │
└─────────────────────────┘
```

### Feed 页布局
```
┌─────────────────────────┐
│   抖音风格顶部导航      │
│   (透明渐变)            │
├─────────────────────────┤
│                         │
│   全屏单列滚动          │
│   (Snap 滚动定位)        │
│                         │
├─────────────────────────┤
│   抖音风格底部导航      │
│   (三色渐变发布按钮)    │
└─────────────────────────┘
```

---

## 组件规范

### 卡片设计
```css
/* 卡片基础 */
.card {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
}

/* 封面图比例 */
.cover {
  aspect-ratio: 3/4;
  object-fit: cover;
}

/* 悬停效果 */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
```

### 按钮设计
```css
/* 主要按钮 */
.btn-primary {
  background: linear-gradient(to right, #ef4444, #ec4899);
  border-radius: 9999px;
  color: white;
}

/* 图标按钮 */
.btn-icon {
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}
```

### 标签设计
```css
/* 标签栏 */
.tab-bar {
  display: flex;
  gap: 24px;
  padding: 12px 16px;
}

/* 激活状态 */
.tab-active {
  color: white;
  font-size: 16px;
  border-bottom: 2px solid white;
}

/* 非激活状态 */
.tab {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}
```

---

## 交互规范

### 滚动行为
```css
/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* Snap 滚动 (Feed 页) */
.feed-container {
  scroll-snap-type: y mandatory;
}

.feed-item {
  scroll-snap-align: start;
}
```

### 动画效果
```css
/* 卡片悬停 */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 图片缩放 */
.card:hover img {
  transform: scale(1.05);
  transition: transform 0.5s ease-out;
}

/* 渐入动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 导航系统

### 底部导航 (5 Tab)
```
🏠 首页  →  /
⚡ Feed   →  /feed
🗺️ 导航  →  /hub
📂 分类  →  /categories
👤 我的  →  /about
```

### 导航样式
```css
/* 抖音风格 */
.nav-douyin {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 激活状态 */
.nav-item-active {
  color: white;
}

/* 非激活状态 */
.nav-item {
  color: rgba(255, 255, 255, 0.4);
}
```

---

## 页面清单

| 页面 | 风格 | 状态 |
|------|------|------|
| `/` | 抖音 + 小红书 | ✅ |
| `/feed` | 抖音 | ✅ |
| `/hub` | 抖音 | ✅ |
| `/categories` | 抖音 | ✅ |
| `/archive` | 抖音 | ✅ |
| `/search` | 抖音 | ✅ |
| `/about` | 抖音 | ✅ |
| `/components` | 抖音 | ✅ |
| `/showcase` | 抖音 | ✅ |

---

## 设计原则

### 1. 沉浸优先
- 全屏内容展示
- 最小化 UI 干扰
- 渐变遮罩过渡

### 2. 内容为王
- 大图封面
- 简洁文字
- 标签辅助

### 3. 流畅交互
- 60fps 动画
- 手势支持
- 即时反馈

### 4. 一致体验
- 统一颜色
- 统一圆角
- 统一间距

---

## 快速开始

```tsx
import AppLayout from './components/layout/AppLayout'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

export default function MyPage() {
  return (
    <AppLayout showHeader={false} showFooter={true}>
      <Header variant="douyin" title="页面标题" />
      
      <main className="bg-black min-h-screen">
        {/* 内容 */}
      </main>
      
      <Footer variant="douyin" />
    </AppLayout>
  )
}
```

---

**最后更新**: 2026-03-17
**版本**: 1.0.0
