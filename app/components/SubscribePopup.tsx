'use client'

import { useState, useEffect } from 'react'

export default function SubscribePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // 5 秒后显示订阅弹窗
    const timer = setTimeout(() => {
      const hasSubscribed = localStorage.getItem('hasSubscribed')
      if (!hasSubscribed) {
        setIsVisible(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 调用订阅 API
    localStorage.setItem('hasSubscribed', 'true')
    setIsVisible(false)
    alert('订阅成功！🎉')
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
        {/* 关闭按钮 */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="关闭"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 内容 */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
            📬
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            订阅更新
          </h3>
          <p className="text-gray-600 mb-6">
            每天一篇原创文章，订阅后不错过任何精彩内容
          </p>

          {/* 订阅表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱地址"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              立即订阅
            </button>
          </form>

          {/* 提示信息 */}
          <p className="text-xs text-gray-400 mt-4">
            🔒 我们保护你的隐私，不会泄露邮箱地址
          </p>
        </div>
      </div>
    </div>
  )
}
