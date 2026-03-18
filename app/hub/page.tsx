'use client'

import Link from 'next/link'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Tag from '../components/ui/Tag'

const features = [
  {
    icon: '🏠',
    title: '首页',
    path: '/',
    description: '双列瀑布流，小红书风格',
    tags: ['推荐', '关注', '热门'],
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: '⚡',
    title: 'Feed',
    path: '/feed',
    description: '抖音风格单列沉浸式浏览',
    tags: ['全屏', '滚动', '互动'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: '📂',
    title: '分类',
    path: '/categories',
    description: '6 大分类，探索精彩内容',
    tags: ['技术', 'AI', '搞钱'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '📜',
    title: '归档',
    path: '/archive',
    description: '时间轴设计，单列滚动',
    tags: ['时间线', '月份', '历史'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: '🔍',
    title: '搜索',
    path: '/search',
    description: '热搜榜单，智能搜索',
    tags: ['热搜', '结果', '标签'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: '👤',
    title: '关于',
    path: '/about',
    description: '个人简介，数据统计',
    tags: ['简介', '数据', '历程'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: '🎨',
    title: '组件',
    path: '/components',
    description: '按钮、卡片、标签等 UI 组件',
    tags: ['Button', 'Card', 'Tag'],
    color: 'from-pink-500 to-rose-500',
  },
]

export default function Hub() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* 顶部 */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
        <div className="px-4 py-6 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">🎉 博客功能导航</h1>
          <p className="text-white/80 text-sm">探索所有页面和功能</p>
        </div>

        {/* 快速导航 */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          <Link href="/" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full whitespace-nowrap hover:bg-white/30 transition">
            🏠 首页
          </Link>
          <Link href="/feed" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full whitespace-nowrap hover:bg-white/30 transition">
            ⚡ Feed
          </Link>
          <Link href="/categories" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full whitespace-nowrap hover:bg-white/30 transition">
            📂 分类
          </Link>
          <Link href="/archive" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full whitespace-nowrap hover:bg-white/30 transition">
            📜 归档
          </Link>
          <Link href="/about" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full whitespace-nowrap hover:bg-white/30 transition">
            👤 关于
          </Link>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="px-4 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">7</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">页面</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">组件</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">∞</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">可能</div>
          </Card>
        </div>

        {/* 功能列表 */}
        <div className="space-y-4">
          {features.map((feature) => (
            <Link key={feature.path} href={feature.path}>
              <Card variant="interactive" className="p-4">
                <div className="flex items-start gap-4">
                  {/* 图标 */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                    {feature.icon}
                  </div>

                  {/* 内容 */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.tags.map((tag, i) => (
                        <Tag key={i} size="sm" variant="default">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  {/* 箭头 */}
                  <div className="text-gray-300 dark:text-gray-700 self-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* 快速操作 */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">⚡ 快速操作</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="primary" fullWidth leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }>
              发布文章
            </Button>
            <Button variant="outline" fullWidth leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }>
              写日记
            </Button>
          </div>
        </div>

        {/* 底部提示 */}
        <div className="mt-12 text-center text-gray-400 dark:text-gray-600 text-sm pb-8">
          <p>— 探索更多精彩内容 —</p>
          <p className="mt-2 text-xs">
            所有页面已整合到底部导航栏
          </p>
        </div>
      </main>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 safe-area-pb z-50">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">首页</span>
          </Link>
          <Link href="/hub" className="flex flex-col items-center gap-1 text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs font-medium">导航</span>
          </Link>
          <Link href="/feed" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs">Feed</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs">分类</span>
          </Link>
          <Link href="/about" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
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
