'use client'

import Link from 'next/link'
import AppLayout from '../components/layout/AppLayout'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Tag from '../components/ui/Tag'

export default function Showcase() {
  return (
    <AppLayout showHeader={false} showFooter={true}>
      {/* 自定义头部 */}
      <Header variant="gradient" title="功能展示" />

      <main className="px-4 py-8 space-y-8">
        {/* 欢迎卡片 */}
        <Card className="p-6 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white">
          <h1 className="text-2xl font-bold mb-2">🎉 欢迎来到每日博客</h1>
          <p className="text-white/90 mb-4">
            这里整合了所有页面和功能，探索更多精彩内容
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }>
              开始探索
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
              了解更多
            </Button>
          </div>
        </Card>

        {/* 页面导航 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📱 主要页面</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/">
              <Card variant="interactive" className="p-4 text-center">
                <div className="text-4xl mb-2">🏠</div>
                <h3 className="font-bold text-gray-900 dark:text-white">首页</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">小红书风格</p>
              </Card>
            </Link>
            <Link href="/feed">
              <Card variant="interactive" className="p-4 text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-bold text-gray-900 dark:text-white">Feed</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">抖音风格</p>
              </Card>
            </Link>
            <Link href="/categories">
              <Card variant="interactive" className="p-4 text-center">
                <div className="text-4xl mb-2">📂</div>
                <h3 className="font-bold text-gray-900 dark:text-white">分类</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">6 大分类</p>
              </Card>
            </Link>
            <Link href="/archive">
              <Card variant="interactive" className="p-4 text-center">
                <div className="text-4xl mb-2">📜</div>
                <h3 className="font-bold text-gray-900 dark:text-white">归档</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">时间轴</p>
              </Card>
            </Link>
          </div>
        </section>

        {/* 功能特性 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">✨ 功能特性</h2>
          <div className="space-y-3">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
                  🎨
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">统一设计</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    所有页面使用一致的设计语言和交互模式
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
                  📱
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">移动优先</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    针对移动端优化的布局和交互体验
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0">
                  🔧
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">组件化</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    可复用的 UI 组件库，快速构建页面
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 标签展示 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🏷️ 标签系统</h2>
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              <Tag variant="primary">推荐</Tag>
              <Tag variant="gradient">热门</Tag>
              <Tag variant="success">技术</Tag>
              <Tag variant="warning">AI</Tag>
              <Tag variant="danger">搞钱</Tag>
              <Tag variant="default">生活</Tag>
              <Tag variant="default">工具</Tag>
              <Tag variant="default">艺术</Tag>
            </div>
          </Card>
        </section>

        {/* 快速操作 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 快速操作</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="primary" size="lg" fullWidth leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }>
              发布文章
            </Button>
            <Button variant="outline" size="lg" fullWidth leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }>
              写日记
            </Button>
          </div>
        </section>

        {/* 底部提示 */}
        <div className="text-center py-8 text-gray-400 dark:text-gray-600 text-sm">
          <p>— 探索更多精彩内容 —</p>
          <p className="mt-2 text-xs">
            使用底部导航栏快速切换页面
          </p>
        </div>
      </main>

      {/* 统一底部导航 */}
      <Footer variant="default" />
    </AppLayout>
  )
}
