'use client'

import { useState } from 'react'
import Link from 'next/link'
import RippleButton from '../components/ui/RippleButton'

export default function TestButtonsPage() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  const handleClick = () => {
    setCount(prev => prev + 1)
    setMessage(`点击了 ${count + 1} 次！`)
    console.log('按钮被点击！次数:', count + 1)
  }

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
          <h1 className="text-lg font-bold text-white">按钮测试</h1>
          <div className="w-7" />
        </div>
      </header>

      <main className="pt-24 px-4 space-y-8 max-w-4xl mx-auto">
        {/* 标题 */}
        <section className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">🔧 按钮功能测试</h1>
          <p className="text-gray-400">如果按钮有反应，说明修复成功！</p>
        </section>

        {/* 计数测试 */}
        <section className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">📊 点击测试</h2>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
              {count}
            </div>
            <p className="text-gray-400">{message || '点击下面的按钮'}</p>
          </div>
          <div className="flex justify-center gap-4">
            <RippleButton 
              variant="primary" 
              size="lg"
              onClick={handleClick}
              successText="点击成功！"
            >
              点我测试
            </RippleButton>
            <RippleButton 
              variant="outline" 
              size="lg"
              onClick={() => {
                setCount(0)
                setMessage('已重置')
              }}
            >
              重置
            </RippleButton>
          </div>
        </section>

        {/* 不同变体测试 */}
        <section className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">🎨 变体测试</h2>
          <div className="flex flex-wrap gap-4">
            <RippleButton variant="primary" onClick={() => alert('主要按钮')}>
              主要
            </RippleButton>
            <RippleButton variant="secondary" onClick={() => alert('次要按钮')}>
              次要
            </RippleButton>
            <RippleButton variant="outline" onClick={() => alert('边框按钮')}>
              边框
            </RippleButton>
            <RippleButton variant="ghost" onClick={() => alert('幽灵按钮')}>
              幽灵
            </RippleButton>
            <RippleButton variant="success" onClick={() => alert('成功按钮')}>
              成功
            </RippleButton>
          </div>
        </section>

        {/* 加载测试 */}
        <section className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">⏳ 加载测试</h2>
          <LoadingTest />
        </section>

        {/* 控制台提示 */}
        <section className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">📝 调试信息</h2>
          <div className="text-gray-400 space-y-2">
            <p>✅ 检查点 1: 按钮是否可点击</p>
            <p>✅ 检查点 2: 点击后计数是否增加</p>
            <p>✅ 检查点 3: 是否显示成功提示</p>
            <p>✅ 检查点 4: 控制台是否有日志</p>
            <p>✅ 检查点 5: 涟漪动画是否播放</p>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            打开浏览器控制台 (F12) 查看详细日志
          </p>
        </section>
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
          <Link href="/test-buttons" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="text-xs font-medium">测试</span>
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

// 加载测试组件
function LoadingTest() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('加载完成！')
    }, 2000)
  }

  return (
    <div className="flex flex-wrap gap-4">
      <RippleButton 
        variant="primary" 
        size="lg"
        loading={loading}
        onClick={handleClick}
      >
        {loading ? '加载中...' : '点击加载'}
      </RippleButton>
      <RippleButton 
        variant="success" 
        size="lg"
        loading={loading}
        onClick={handleClick}
        successText="操作成功！"
      >
        {loading ? '处理中...' : '点击成功'}
      </RippleButton>
    </div>
  )
}
