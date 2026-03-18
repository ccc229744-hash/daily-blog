'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const user = {
    name: '前端小贝',
    email: 'beibei@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beibei',
    bio: '热爱技术分享，专注前端开发和 AI 应用实践。相信每天进步 1%，一年后你会强大 37 倍。',
    role: '管理员',
    joinDate: '2026-01-01',
    articles: 156,
    followers: 2340,
    following: 89,
  }

  const handleSave = () => {
    setIsEditing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-slide-up">
          <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full">
            ✅ 保存成功！
          </div>
        </div>
      )}

      {/* 顶部导航 */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
              每
            </div>
            <span className="font-bold">每日博客</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white transition text-sm">
              后台管理
            </Link>
            <Link href="/logout" className="text-gray-400 hover:text-white transition text-sm">
              退出登录
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* 个人封面 */}
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-2xl h-48 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* 个人信息区域 */}
        <div className="relative -mt-32 mb-8">
          <div className="flex items-end gap-6">
            {/* 头像 */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-gray-950 bg-white"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </button>
            </div>

            {/* 基本信息 */}
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                  <p className="text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
                >
                  {isEditing ? '取消' : '编辑资料'}
                </button>
              </div>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="flex gap-8 mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user.articles}</div>
              <div className="text-gray-400 text-sm">文章</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user.followers.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">粉丝</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user.following}</div>
              <div className="text-gray-400 text-sm">关注</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user.role}</div>
              <div className="text-gray-400 text-sm">角色</div>
            </div>
          </div>
        </div>

        {/* Tab 导航 */}
        <div className="flex gap-6 border-b border-gray-800 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-4 text-sm font-medium transition ${
              activeTab === 'profile'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            个人资料
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`pb-4 text-sm font-medium transition ${
              activeTab === 'articles'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            我的文章
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-4 text-sm font-medium transition ${
              activeTab === 'favorites'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            收藏夹
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-4 text-sm font-medium transition ${
              activeTab === 'settings'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            账号设置
          </button>
        </div>

        {/* Tab 内容 */}
        {activeTab === 'profile' && (
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">基本信息</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">用户名</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">邮箱</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">个人简介</label>
                <textarea
                  defaultValue={user.bio}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                />
              </div>
              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/30 transition"
                  >
                    保存修改
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
                  >
                    取消
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-white mb-2">我的文章</h2>
            <p className="text-gray-400 mb-6">共 {user.articles} 篇文章</p>
            <Link
              href="/admin/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-red-500/30 transition"
            >
              管理文章
            </Link>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold text-white mb-2">收藏夹</h2>
            <p className="text-gray-400 mb-6">管理你收藏的文章</p>
            <Link
              href="/favorites"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition"
            >
              查看收藏
            </Link>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">账号设置</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">修改密码</label>
                <input
                  type="password"
                  placeholder="当前密码"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition mb-3"
                />
                <input
                  type="password"
                  placeholder="新密码"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition mb-3"
                />
                <input
                  type="password"
                  placeholder="确认新密码"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
              <div className="pt-4">
                <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/30 transition">
                  更新密码
                </button>
              </div>
              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-bold text-white mb-4">危险区域</h3>
                <button className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition">
                  注销账号
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
