'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 验证密码
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    if (password.length < 6) {
      setError('密码长度至少 6 位')
      return
    }

    setIsLoading(true)
    
    // 模拟注册
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        window.location.href = '/login'
      }, 1500)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-12">
      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-slide-up">
          <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full">
            ✅ 注册成功！正在跳转到登录页...
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
          <h1 className="text-3xl font-bold text-white mb-2">创建账号</h1>
          <p className="text-gray-400">注册每日博客后台管理系统</p>
        </div>

        {/* 注册表单 */}
        <form onSubmit={handleRegister} className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="space-y-6">
            {/* 错误提示 */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* 用户名 */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_name"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

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
                minLength={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* 确认密码 */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">确认密码</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* 同意条款 */}
            <div>
              <label className="flex items-start gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-gray-700 bg-gray-800 text-red-500 focus:ring-red-500" />
                <span>
                  我已阅读并同意{' '}
                  <Link href="/terms" className="text-red-400 hover:text-red-300 transition">
                    服务条款
                  </Link>
                  {' '}和{' '}
                  <Link href="/privacy" className="text-red-400 hover:text-red-300 transition">
                    隐私政策
                  </Link>
                </span>
              </label>
            </div>

            {/* 注册按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '注册中...' : '创建账号'}
            </button>

            {/* 分隔线 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-500">已有账号？</span>
              </div>
            </div>

            {/* 登录链接 */}
            <Link
              href="/login"
              className="block w-full py-3 text-center bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition font-medium"
            >
              立即登录
            </Link>
          </div>
        </form>

        {/* 返回前台 */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm transition">
            ← 返回前台首页
          </Link>
        </div>
      </div>
    </div>
  )
}
