'use client'

import Link from 'next/link'
import Button from '../components/ui/Button'

export default function ButtonsShowcase() {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-white">按钮组件</h1>
          <div className="w-7" />
        </div>
      </header>

      <main className="pt-24 px-4 space-y-12 max-w-4xl mx-auto">
        {/* 标题区域 */}
        <section className="text-center fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">
              按钮组件库
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            7 种变体 · 4 种尺寸 · 多种动画效果
          </p>
        </section>

        {/* 主要按钮 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🎨 主要变体</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="primary" size="lg">主要</Button>
            <Button variant="secondary" size="lg">次要</Button>
            <Button variant="outline" size="lg">边框</Button>
            <Button variant="ghost" size="lg">幽灵</Button>
          </div>
        </section>

        {/* 功能按钮 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">⚡ 功能按钮</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="success" size="lg">✅ 成功</Button>
            <Button variant="warning" size="lg">⚠️ 警告</Button>
            <Button variant="danger" size="lg">❌ 危险</Button>
          </div>
        </section>

        {/* 尺寸对比 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">📏 尺寸对比</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-16">XL:</span>
              <Button variant="primary" size="xl">超大按钮</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-16">LG:</span>
              <Button variant="primary" size="lg">大按钮</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-16">MD:</span>
              <Button variant="primary" size="md">中按钮</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-16">SM:</span>
              <Button variant="primary" size="sm">小按钮</Button>
            </div>
          </div>
        </section>

        {/* 带图标按钮 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🔧 带图标按钮</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="primary" 
              size="lg"
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              添加
            </Button>
            <Button 
              variant="primary" 
              size="lg"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              }
            >
              下一步
            </Button>
          </div>
        </section>

        {/* 加载状态 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">⏳ 加载状态</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="primary" size="lg" loading>
              加载中
            </Button>
            <Button variant="secondary" size="lg" loading>
              处理中
            </Button>
            <Button variant="outline" size="lg" loading>
              提交中
            </Button>
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
          <Link href="/buttons" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="text-xs font-medium">按钮</span>
          </Link>
          <Link href="/optimizations" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-xs">优化</span>
          </Link>
          <Link href="/components" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs">组件</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
