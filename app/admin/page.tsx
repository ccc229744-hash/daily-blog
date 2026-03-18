'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    articles: 156,
    views: 12340,
    likes: 5670,
    comments: 890,
  }

  const recentArticles = [
    { id: 1, title: 'Next.js 14 实战指南', views: 1234, status: 'published', date: '2026-03-17' },
    { id: 2, title: 'AI 内容创作全流程', views: 2890, status: 'published', date: '2026-03-16' },
    { id: 3, title: '从零搭建个人博客', views: 856, status: 'draft', date: '2026-03-15' },
    { id: 4, title: '我的 AI 变现之路', views: 5670, status: 'published', date: '2026-03-14' },
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* 侧边栏 */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white mb-1">后台管理</h1>
          <p className="text-gray-500 text-sm">每日博客</p>
        </div>

        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-6 py-3 transition ${
              activeTab === 'overview'
                ? 'bg-red-500/20 text-red-400 border-r-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📊 概览
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full text-left px-6 py-3 transition ${
              activeTab === 'articles'
                ? 'bg-red-500/20 text-red-400 border-r-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📝 文章管理
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`w-full text-left px-6 py-3 transition ${
              activeTab === 'media'
                ? 'bg-red-500/20 text-red-400 border-r-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            🖼️ 媒体管理
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`w-full text-left px-6 py-3 transition ${
              activeTab === 'comments'
                ? 'bg-red-500/20 text-red-400 border-r-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            💬 评论管理
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-6 py-3 transition ${
              activeTab === 'settings'
                ? 'bg-red-500/20 text-red-400 border-r-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            ⚙️ 设置
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
            ← 返回前台
          </Link>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-64 p-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">文章总数</h3>
                  <span className="text-2xl">📝</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.articles}</div>
                <div className="text-green-400 text-sm mt-2">↑ 12% 较上月</div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">总浏览量</h3>
                  <span className="text-2xl">👁️</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.views.toLocaleString()}</div>
                <div className="text-green-400 text-sm mt-2">↑ 23% 较上月</div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">总点赞数</h3>
                  <span className="text-2xl">❤️</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.likes.toLocaleString()}</div>
                <div className="text-green-400 text-sm mt-2">↑ 18% 较上月</div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">评论总数</h3>
                  <span className="text-2xl">💬</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.comments.toLocaleString()}</div>
                <div className="text-green-400 text-sm mt-2">↑ 31% 较上月</div>
              </div>
            </div>

            {/* 最近文章 */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">最近文章</h2>
                <Link href="/admin/articles" className="text-red-400 hover:text-red-300 text-sm">
                  查看全部 →
                </Link>
              </div>
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">标题</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">浏览量</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">状态</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">日期</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {recentArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-800/30 transition">
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{article.title}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{article.views.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {article.status === 'published' ? '已发布' : '草稿'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{article.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 快速操作 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/admin/articles/new"
                className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white hover:shadow-lg hover:shadow-red-500/30 transition"
              >
                <div className="text-2xl mb-2">✍️</div>
                <h3 className="font-bold text-lg mb-1">发布文章</h3>
                <p className="text-white/80 text-sm">创建新的文章内容</p>
              </Link>

              <Link
                href="/admin/media"
                className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white hover:shadow-lg hover:shadow-purple-500/30 transition"
              >
                <div className="text-2xl mb-2">🖼️</div>
                <h3 className="font-bold text-lg mb-1">管理媒体</h3>
                <p className="text-white/80 text-sm">上传图片、视频等</p>
              </Link>

              <Link
                href="/admin/comments"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white hover:shadow-lg hover:shadow-blue-500/30 transition"
              >
                <div className="text-2xl mb-2">💬</div>
                <h3 className="font-bold text-lg mb-1">管理评论</h3>
                <p className="text-white/80 text-sm">审核用户评论</p>
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-white mb-2">文章管理</h2>
            <p className="text-gray-400 mb-6">功能开发中...</p>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-red-500/30 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              发布文章
            </Link>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🖼️</div>
            <h2 className="text-2xl font-bold text-white mb-2">媒体管理</h2>
            <p className="text-gray-400 mb-6">功能开发中...</p>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-2xl font-bold text-white mb-2">评论管理</h2>
            <p className="text-gray-400 mb-6">功能开发中...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold text-white mb-2">设置</h2>
            <p className="text-gray-400 mb-6">功能开发中...</p>
          </div>
        )}
      </main>
    </div>
  )
}
