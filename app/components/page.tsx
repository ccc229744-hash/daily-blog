'use client'

import Link from 'next/link'
import Button from './ui/Button'
import IconButton from './ui/IconButton'
import ToggleButton from './ui/ToggleButton'
import FloatingButton from './ui/FloatingButton'
import ButtonGroup from './ui/ButtonGroup'
import Tag from './ui/Tag'
import { useState } from 'react'

export default function ComponentsPage() {
  const [toggleState, setToggleState] = useState(false)
  const [iconBadge, setIconBadge] = useState(3)

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* 浮动按钮 */}
      <FloatingButton
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
        position="bottom-right"
        tooltip="新建内容"
        onClick={() => alert('点击了浮动按钮！')}
      />

      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-white">组件库</h1>
          <div className="w-7" />
        </div>
      </header>

      <main className="pt-24 px-4 space-y-12 max-w-4xl mx-auto">
        {/* 标题 */}
        <section className="text-center fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">
              组件库
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            按钮 · 图标 · 标签 · 更多组件
          </p>
        </section>

        {/* 主要按钮 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🔘 主要按钮</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="primary" size="lg">主要</Button>
            <Button variant="secondary" size="lg">次要</Button>
            <Button variant="outline" size="lg">边框</Button>
            <Button variant="ghost" size="lg">幽灵</Button>
          </div>
        </section>

        {/* 图标按钮 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 图标按钮</h2>
          <div className="flex flex-wrap gap-4">
            <IconButton
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              }
              badge={iconBadge}
              onClick={() => setIconBadge(0)}
            />
            <IconButton
              variant="primary"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            />
            <IconButton
              variant="ghost"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              }
            />
            <IconButton
              variant="danger"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            />
          </div>
        </section>

        {/* 切换按钮 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🔄 切换按钮</h2>
          <div className="flex flex-wrap gap-4">
            <ToggleButton
              checked={toggleState}
              onChange={setToggleState}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              {toggleState ? '已开启' : '已关闭'}
            </ToggleButton>
            <ToggleButton defaultChecked size="lg">
              默认开启
            </ToggleButton>
            <ToggleButton size="sm">
              小尺寸
            </ToggleButton>
          </div>
        </section>

        {/* 按钮组 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">📦 按钮组</h2>
          <div className="space-y-4">
            <ButtonGroup variant="horizontal" size="md">
              <Button variant="outline">左</Button>
              <Button variant="outline">中</Button>
              <Button variant="outline">右</Button>
            </ButtonGroup>
            <ButtonGroup variant="vertical" size="sm">
              <Button variant="ghost">选项 1</Button>
              <Button variant="ghost">选项 2</Button>
              <Button variant="ghost">选项 3</Button>
            </ButtonGroup>
          </div>
        </section>

        {/* 标签组件 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🏷️ 标签</h2>
          <div className="flex flex-wrap gap-3">
            <Tag variant="primary" size="lg">推荐</Tag>
            <Tag variant="gradient" size="lg">热门</Tag>
            <Tag variant="success" size="lg">技术</Tag>
            <Tag variant="warning" size="lg">AI</Tag>
            <Tag variant="danger" size="lg">搞钱</Tag>
            <Tag variant="default" size="lg">生活</Tag>
            <Tag variant="default" size="lg" closable>可关闭</Tag>
          </div>
        </section>

        {/* 尺寸对比 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">📏 尺寸对比</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-12">XL:</span>
              <Button variant="primary" size="xl">超大</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-12">LG:</span>
              <Button variant="primary" size="lg">大</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-12">MD:</span>
              <Button variant="primary" size="md">中</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 w-12">SM:</span>
              <Button variant="primary" size="sm">小</Button>
            </div>
          </div>
        </section>

        {/* 使用代码 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">📝 使用示例</h2>
          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-gray-300 text-sm space-y-2">
              <code>{`// 按钮
<Button variant="primary">按钮</Button>

// 图标按钮
<IconButton 
  icon={<HeartIcon />} 
  badge={3} 
/>

// 切换按钮
<ToggleButton 
  checked={state} 
  onChange={setState} 
>
  开关
</ToggleButton>

// 浮动按钮
<FloatingButton 
  icon={<PlusIcon />} 
  position="bottom-right" 
/>

// 按钮组
<ButtonGroup>
  <Button>左</Button>
  <Button>中</Button>
  <Button>右</Button>
</ButtonGroup>`}
              </code>
            </pre>
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
          <Link href="/buttons" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="text-xs">按钮</span>
          </Link>
          <Link href="/components" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs font-medium">组件</span>
          </Link>
          <Link href="/optimized" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-xs">优化</span>
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
