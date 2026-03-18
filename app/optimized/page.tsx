'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import OptimizedImage from '../components/ui/OptimizedImage'
import InteractiveCard from '../components/ui/InteractiveCard'
import { useDebounce } from '../../lib/hooks/useDebounce'
import Button from '../components/ui/Button'
import Tag from '../components/ui/Tag'

export default function OptimizedShowcase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDark, setIsDark] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  const debouncedSearch = useDebounce(searchTerm, 300)

  // 客户端挂载后才启用功能
  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
    
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* 渐变背景 */}
      <div className="fixed inset-0 gradient-primary opacity-10 pointer-events-none" />

      {/* 顶部导航 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-black/95 backdrop-blur-md shadow-glow' 
          : 'gradient-primary'
      }`}>
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-red-500 font-bold text-lg">每</span>
            </div>
            <span className="font-bold text-lg text-white">每日博客</span>
          </Link>

          {/* 搜索框 */}
          <div className="flex-1 mx-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索..."
              className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* 深色模式切换 - 仅客户端渲染 */}
          {mounted && (
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-white hover:bg-white/10 rounded-full transition"
            >
              {isDark ? '🌙' : '☀️'}
            </button>
          )}
        </div>
      </header>

      <main className="pt-36 px-4 space-y-12 max-w-6xl mx-auto">
        {/* 欢迎区域 */}
        <section className="text-center fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="gradient-primary bg-clip-text text-transparent">
              视觉效果优化
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            渐变增强 · 光影效果 · 微动画 · 性能优化
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" size="lg" className="btn-hover">
              开始探索
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/20 btn-hover">
              了解更多
            </Button>
          </div>
        </section>

        {/* 渐变效果展示 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🎨 渐变效果</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InteractiveCard variant="gradient" className="p-6">
              <div className="gradient-primary h-32 rounded-xl mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">主渐变</h3>
              <p className="text-gray-400 text-sm">红→粉→紫三色流动渐变</p>
            </InteractiveCard>
            <InteractiveCard variant="glass" className="p-6">
              <div className="glass-effect h-32 rounded-xl mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">毛玻璃</h3>
              <p className="text-gray-400 text-sm">半透明模糊背景效果</p>
            </InteractiveCard>
            <InteractiveCard variant="elevated" className="p-6">
              <div className="gradient-card h-32 rounded-xl mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">卡片渐变</h3>
              <p className="text-gray-400 text-sm">微妙的渐变叠加效果</p>
            </InteractiveCard>
          </div>
        </section>

        {/* 光影效果展示 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">💡 光影效果</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="shadow-soft p-6 rounded-xl bg-gray-900">
              <h3 className="text-lg font-bold text-white mb-2">柔和阴影</h3>
              <p className="text-gray-400">shadow-soft - 8px 32px 柔和阴影</p>
            </div>
            <div className="shadow-glow p-6 rounded-xl bg-gray-900">
              <h3 className="text-lg font-bold text-white mb-2">光晕效果</h3>
              <p className="text-gray-400">shadow-glow - 红色光晕效果</p>
            </div>
            <div className="shadow-layered p-6 rounded-xl bg-gray-900">
              <h3 className="text-lg font-bold text-white mb-2">多层阴影</h3>
              <p className="text-gray-400">shadow-layered - 三层叠加阴影</p>
            </div>
            <div className="shadow-glow-hover p-6 rounded-xl bg-gray-900 cursor-pointer">
              <h3 className="text-lg font-bold text-white mb-2">悬停光晕</h3>
              <p className="text-gray-400">悬停时增强光晕效果</p>
            </div>
          </div>
        </section>

        {/* 图片优化展示 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🖼️ 图片优化</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <OptimizedImage
              src="https://picsum.photos/seed/1/400/500"
              alt="图片 1"
              aspectRatio="portrait"
              showOverlay={true}
            />
            <OptimizedImage
              src="https://picsum.photos/seed/2/400/500"
              alt="图片 2"
              aspectRatio="portrait"
              showOverlay={true}
            />
            <OptimizedImage
              src="https://picsum.photos/seed/3/400/500"
              alt="图片 3"
              aspectRatio="portrait"
              showOverlay={true}
            />
            <OptimizedImage
              src="https://picsum.photos/seed/4/400/500"
              alt="图片 4"
              aspectRatio="portrait"
              showOverlay={true}
            />
          </div>
          <p className="text-gray-400 text-sm mt-4 text-center">
            ✨ 懒加载 + 渐变遮罩 + 悬停缩放
          </p>
        </section>

        {/* 交互动画展示 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">✨ 交互动画</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InteractiveCard variant="default" hoverEffect="lift" className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">🎯 悬浮抬升</h3>
              <p className="text-gray-400">悬停时向上移动 8px 并放大 2%</p>
            </InteractiveCard>
            <InteractiveCard variant="default" hoverEffect="glow" className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">💫 光晕效果</h3>
              <p className="text-gray-400">悬停时显示红色光晕</p>
            </InteractiveCard>
            <InteractiveCard variant="default" hoverEffect="scale" className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">📈 缩放效果</h3>
              <p className="text-gray-400">悬停时整体放大</p>
            </InteractiveCard>
            <InteractiveCard variant="glass" hoverEffect="lift" className="p-6">
              <h3 className="text-lg font-bold text-white mb-2">🪟 毛玻璃 + 抬升</h3>
              <p className="text-gray-400">组合效果展示</p>
            </InteractiveCard>
          </div>
        </section>

        {/* 标签展示 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🏷️ 标签系统</h2>
          <div className="flex flex-wrap gap-3">
            <Tag variant="primary" size="lg">推荐</Tag>
            <Tag variant="gradient" size="lg">热门</Tag>
            <Tag variant="success" size="lg">技术</Tag>
            <Tag variant="warning" size="lg">AI</Tag>
            <Tag variant="danger" size="lg">搞钱</Tag>
            <Tag variant="default" size="lg">生活</Tag>
          </div>
        </section>

        {/* 防抖搜索演示 */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">⚡ 防抖搜索</h2>
          <div className="p-6 bg-gray-900 rounded-xl">
            <p className="text-gray-400 mb-4">
              输入内容，300ms 后才会触发搜索（减少 API 调用）
            </p>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="输入搜索内容..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="mt-4 p-4 bg-black/50 rounded-lg">
              <p className="text-gray-400 text-sm">
                当前搜索值：<span className="text-red-400">{debouncedSearch || '空'}</span>
              </p>
              <p className="text-gray-500 text-xs mt-2">
                原始值：{searchTerm || '空'}
              </p>
            </div>
          </div>
        </section>

        {/* 底部导航提示 */}
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">使用底部导航栏访问其他页面</p>
        </div>
      </main>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 safe-area-pb z-50">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs">首页</span>
          </Link>
          <Link href="/feed" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs">Feed</span>
          </Link>
          <Link href="/optimized" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-xs font-medium">优化</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs">分类</span>
          </Link>
          <Link href="/about" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">我的</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
