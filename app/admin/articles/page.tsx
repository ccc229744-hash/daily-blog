'use client'

import { useState } from 'react'
import Link from 'next/link'

// 模拟文章数据
const articles = [
  { id: 1, title: 'Next.js 14 实战指南', category: '技术', views: 1234, likes: 567, comments: 89, status: 'published', date: '2026-03-17' },
  { id: 2, title: 'AI 内容创作全流程', category: 'AI', views: 2890, likes: 1203, comments: 234, status: 'published', date: '2026-03-16' },
  { id: 3, title: '从零搭建个人博客', category: '技术', views: 856, likes: 432, comments: 67, status: 'draft', date: '2026-03-15' },
  { id: 4, title: '我的 AI 变现之路', category: '搞钱', views: 5670, likes: 3421, comments: 456, status: 'published', date: '2026-03-14' },
  { id: 5, title: '打工人必备 AI 工具', category: '工具', views: 3456, likes: 2100, comments: 321, status: 'published', date: '2026-03-13' },
  { id: 6, title: '30 天学会 AI 绘画', category: '艺术', views: 1890, likes: 967, comments: 145, status: 'published', date: '2026-03-12' },
]

export default function ArticlesList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selectedArticles, setSelectedArticles] = useState<number[]>([])

  const categories = ['技术', 'AI', '搞钱', '工具', '生活', '艺术']

  const filteredArticles = articles.filter(article => {
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = !filterCategory || article.category === filterCategory
    const matchStatus = !filterStatus || article.status === filterStatus
    return matchSearch && matchCategory && matchStatus
  })

  const toggleSelect = (id: number) => {
    setSelectedArticles(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(filteredArticles.map(a => a.id))
    }
  }

  const handleBatchDelete = () => {
    if (confirm(`确定要删除选中的 ${selectedArticles.length} 篇文章吗？`)) {
      setSelectedArticles([])
      alert('删除成功！')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* 侧边栏 */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white mb-1">后台管理</h1>
          <p className="text-gray-500 text-sm">每日博客</p>
        </div>

        <nav className="mt-6">
          <Link href="/admin" className="block w-full text-left px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-800 transition">
            📊 概览
          </Link>
          <Link href="/admin/articles" className="block w-full text-left px-6 py-3 bg-red-500/20 text-red-400 border-r-2 border-red-500 transition">
            📝 文章管理
          </Link>
          <Link href="/admin/media" className="block w-full text-left px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-800 transition">
            🖼️ 媒体管理
          </Link>
          <Link href="/admin/comments" className="block w-full text-left px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-800 transition">
            💬 评论管理
          </Link>
          <Link href="/admin/settings" className="block w-full text-left px-6 py-3 text-gray-400 hover:text-white hover:bg-gray-800 transition">
            ⚙️ 设置
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
            ← 返回前台
          </Link>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="ml-64 p-8">
        {/* 顶部操作栏 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">文章管理</h1>
            <p className="text-gray-400">管理所有已发布和草稿文章</p>
          </div>
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

        {/* 筛选和搜索 */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索文章标题..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            >
              <option value="">所有分类</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            >
              <option value="">所有状态</option>
              <option value="published">已发布</option>
              <option value="draft">草稿</option>
            </select>
          </div>
        </div>

        {/* 批量操作栏 */}
        {selectedArticles.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="text-red-400">
              已选择 <span className="font-bold">{selectedArticles.length}</span> 篇文章
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                批量发布
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                批量移动
              </button>
              <button
                onClick={handleBatchDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                批量删除
              </button>
            </div>
          </div>
        )}

        {/* 文章列表 */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-red-500 focus:ring-red-500"
                  />
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">标题</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">分类</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">浏览量</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">点赞</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">评论</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">状态</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">日期</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedArticles.includes(article.id)}
                      onChange={() => toggleSelect(article.id)}
                      className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-red-500 focus:ring-red-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{article.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{article.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-400">{article.likes.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-400">{article.comments.toLocaleString()}</td>
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
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/articles/edit/${article.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        编辑
                      </Link>
                      <button className="text-red-400 hover:text-red-300 text-sm">
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-400">没有找到相关文章</p>
            </div>
          )}
        </div>

        {/* 分页 */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-gray-400 text-sm">
            显示 <span className="text-white font-medium">{filteredArticles.length}</span> 篇文章
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition disabled:opacity-50" disabled>
              上一页
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg">1</button>
            <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition">
              2
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition">
              3
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition">
              下一页
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
