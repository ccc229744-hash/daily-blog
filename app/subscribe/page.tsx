'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 实际订阅逻辑（连接邮件服务）
    console.log('Subscribe:', { email, frequency })
    setSubscribed(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-xl font-bold text-gray-900">每日博客</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">首页</Link>
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">分类</Link>
              <Link href="/archive" className="text-gray-600 hover:text-gray-900">归档</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">关于</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        {subscribed ? (
          /* Success State */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-5xl">✅</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">订阅成功！</h1>
            <p className="text-xl text-gray-600 mb-8">
              感谢你订阅每日博客，{frequency === 'daily' ? '每天' : '每周'}早上 8 点准时推送
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              ← 返回首页
            </Link>
          </div>
        ) : (
          /* Subscribe Form */
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl">
                📧
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">订阅每日博客</h1>
              <p className="text-xl text-gray-600 mb-8">
                每天一篇原创文章，直接送到你的邮箱
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-blue-50 rounded-xl text-center">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="font-bold text-gray-900 mb-2">原创内容</h3>
                <p className="text-gray-600 text-sm">
                  每篇文章都是原创思考和实践经验
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl text-center">
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="font-bold text-gray-900 mb-2">持续成长</h3>
                <p className="text-gray-600 text-sm">
                  记录技术、生活、创业的洞察与感悟
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-bold text-gray-900 mb-2">隐私保护</h3>
                <p className="text-gray-600 text-sm">
                  你的邮箱地址不会被分享给任何人
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
                <div className="text-sm text-gray-600">订阅者</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">打开率</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                <div className="text-sm text-gray-600">垃圾邮件</div>
              </div>
            </div>

            {/* Form */}
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    订阅频率
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFrequency('daily')}
                      className={`p-4 border-2 rounded-xl text-center transition-all ${
                        frequency === 'daily'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">📅</div>
                      <div className="font-medium">每日推送</div>
                      <div className="text-xs text-gray-500 mt-1">每天早上 8 点</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('weekly')}
                      className={`p-4 border-2 rounded-xl text-center transition-all ${
                        frequency === 'weekly'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">📆</div>
                      <div className="font-medium">每周精选</div>
                      <div className="text-xs text-gray-500 mt-1">每周一早上 8 点</div>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                >
                  立即订阅
                </button>

                <p className="text-xs text-gray-500 text-center">
                  🔒 我们尊重你的隐私，不会分享你的邮箱地址
                </p>
              </form>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 每日博客 · 用 Next.js 构建</p>
        </div>
      </footer>
    </div>
  )
}
