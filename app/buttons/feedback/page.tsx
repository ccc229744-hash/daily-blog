'use client'

import { useState } from 'react'
import Link from 'next/link'
import RippleButton from '../../components/ui/RippleButton'
import Button from '../../components/ui/Button'

export default function ButtonFeedbackShowcase() {
  const [clickCount, setClickCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleLoadingClick = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleSuccessClick = () => {
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/buttons" className="flex items-center gap-2 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-white">按钮反馈</h1>
          <div className="w-7" />
        </div>
      </header>

      <main className="pt-24 px-4 space-y-12 max-w-4xl mx-auto">
        {/* 标题 */}
        <section className="text-center fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">
              按钮反馈系统
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            涟漪效果 · 点击缩放 · 成功提示 · 加载状态
          </p>
        </section>

        {/* 涟漪效果 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🌊 涟漪效果</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">带涟漪</h3>
              <RippleButton variant="primary" size="lg" ripple={true}>
                点击看我
              </RippleButton>
              <p className="text-gray-400 text-sm mt-4">
                点击按钮时会产生涟漪扩散效果
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">无涟漪</h3>
              <RippleButton variant="primary" size="lg" ripple={false}>
                点击看我
              </RippleButton>
              <p className="text-gray-400 text-sm mt-4">
                禁用涟漪效果
              </p>
            </div>
          </div>
        </section>

        {/* 点击缩放 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">📏 点击缩放</h2>
          <div className="bg-gray-900 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              所有按钮都支持点击时自动缩放（active:scale-95）
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">主要</Button>
              <Button variant="secondary" size="lg">次要</Button>
              <Button variant="outline" size="lg">边框</Button>
              <Button variant="ghost" size="lg">幽灵</Button>
            </div>
          </div>
        </section>

        {/* 计数演示 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🔢 点击计数</h2>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                {clickCount}
              </div>
              <p className="text-gray-400">点击次数</p>
            </div>
            <div className="flex justify-center gap-4">
              <RippleButton 
                variant="primary" 
                size="lg"
                onClick={() => setClickCount(prev => prev + 1)}
              >
                点击 +1
              </RippleButton>
              <RippleButton 
                variant="outline" 
                size="lg"
                onClick={() => setClickCount(0)}
              >
                重置
              </RippleButton>
            </div>
          </div>
        </section>

        {/* 加载状态 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">⏳ 加载反馈</h2>
          <div className="bg-gray-900 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              点击后进入加载状态，2 秒后恢复
            </p>
            <div className="flex flex-wrap gap-4">
              <RippleButton 
                variant="primary" 
                size="lg"
                loading={isLoading}
                onClick={handleLoadingClick}
              >
                {isLoading ? '加载中...' : '点击加载'}
              </RippleButton>
              <RippleButton 
                variant="secondary" 
                size="lg"
                loading={isLoading}
                onClick={handleLoadingClick}
              >
                {isLoading ? '处理中...' : '点击处理'}
              </RippleButton>
            </div>
          </div>
        </section>

        {/* 成功反馈 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">✅ 成功反馈</h2>
          <div className="bg-gray-900 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              点击后显示成功提示（按钮内 + 底部弹窗）
            </p>
            <div className="flex flex-wrap gap-4">
              <RippleButton 
                variant="success" 
                size="lg"
                successText="操作成功！"
                onClick={handleSuccessClick}
              >
                {isSuccess ? '已成功' : '点击成功'}
              </RippleButton>
              <RippleButton 
                variant="primary" 
                size="lg"
                successText="已保存"
              >
                保存
              </RippleButton>
              <RippleButton 
                variant="primary" 
                size="lg"
                successText="已提交"
              >
                提交
              </RippleButton>
            </div>
          </div>
        </section>

        {/* 组合效果 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 组合效果</h2>
          <div className="bg-gray-900 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              涟漪 + 缩放 + 成功提示 同时生效
            </p>
            <div className="flex flex-wrap gap-4">
              <RippleButton 
                variant="primary" 
                size="xl"
                ripple={true}
                successText="太棒了！"
                leftIcon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                }
              >
                完美组合
              </RippleButton>
            </div>
          </div>
        </section>

        {/* 使用代码 */}
        <section className="fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-6">📝 使用示例</h2>
          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-gray-300 text-sm space-y-2">
              <code>{`// 基础涟漪效果
<RippleButton variant="primary">
  点击看我
</RippleButton>

// 禁用涟漪
<RippleButton ripple={false}>
  无涟漪
</RippleButton>

// 成功反馈
<RippleButton 
  variant="success"
  successText="操作成功！"
>
  保存
</RippleButton>

// 加载状态
<RippleButton loading={isLoading}>
  {isLoading ? '加载中' : '点击'}
</RippleButton>

// 组合效果
<RippleButton 
  variant="primary"
  ripple={true}
  successText="太棒了！"
  leftIcon={<StarIcon />}
>
  完美组合
</RippleButton>`}
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
          <Link href="/buttons/feedback" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs font-medium">反馈</span>
          </Link>
          <Link href="/components" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-xs">组件</span>
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
