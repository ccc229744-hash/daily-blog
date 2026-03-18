'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 模拟登录
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        // 实际项目中这里应该跳转到首页或后台
        window.location.href = '/admin'
      }, 1500)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4">
      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-slide-up">
          <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full">
            ✅ 登录成功！正在跳转...
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
              每
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">欢迎回来</h1>
          <p className="text-gray-400">登录到每日博客后台管理系统</p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleLogin} className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="space-y-6">
            {/* 邮箱 */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">邮箱地址</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* 记住我 & 忘记密码 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-red-500 focus:ring-red-500" />
                记住我
              </label>
              <Link href="/forgot-password" className="text-sm text-red-400 hover:text-red-300 transition">
                忘记密码？
              </Link>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>

            {/* 分隔线 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-500">或</span>
              </div>
            </div>

            {/* 第三方登录 */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.544-6.033-5.68s2.701-5.68 6.033-5.68c1.482 0 2.81 0.525 3.861 1.398l2.882-2.882c-1.82-1.694-4.19-2.735-6.743-2.735-5.037 0-9.125 4.088-9.125 9.125s4.088 9.125 9.125 9.125c4.613 0 8.458-3.254 9.053-7.771 0.053-0.413 0.084-0.836 0.084-1.268 0-0.428-0.031-0.848-0.081-1.262h-8.644z"/>
                </svg>
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </form>

        {/* 注册链接 */}
        <p className="text-center mt-6 text-gray-400">
          还没有账号？{' '}
          <Link href="/register" className="text-red-400 hover:text-red-300 font-medium transition">
            立即注册
          </Link>
        </p>

        {/* 返回前台 */}
        <div className="text-center mt-4">
          <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm transition">
            ← 返回前台首页
          </Link>
        </div>
      </div>
    </div>
  )
}
