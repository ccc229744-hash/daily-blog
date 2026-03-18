'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Favorite {
  id: number
  title: string
  excerpt: string
  cover: string
  author: string
  category: string
  likes: number
  date: string
}

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [favorites, setFavorites] = useState<Favorite[]>([
    {
      id: 1,
      title: 'Next.js 14 实战指南｜前端开发必备',
      excerpt: '深入探索 Next.js 14 的新特性，包括 App Router、Server Components 等核心功能。',
      cover: 'https://picsum.photos/seed/nextjs/400/225',
      author: '前端小贝',
      category: '技术',
      likes: 1234,
      date: '2026-03-17',
    },
    {
      id: 2,
      title: 'AI 内容创作全流程分享✨',
      excerpt: '分享使用 AI 工具进行内容创作的经验和技巧，提高创作效率。',
      cover: 'https://picsum.photos/seed/ai/400/225',
      author: 'AI 探索者',
      category: 'AI',
      likes: 2890,
      date: '2026-03-16',
    },
    {
      id: 3,
      title: '我的 AI 变现之路💰月入过万',
      excerpt: '分享我的 AI 变现经验和方法，副业收入超过主业。',
      cover: 'https://picsum.photos/seed/money/400/225',
      author: '变现达人',
      category: '搞钱',
      likes: 5670,
      date: '2026-03-14',
    },
  ])

  const categories = ['全部', '技术', 'AI', '搞钱', '工具', '生活', '艺术']

  const filteredFavorites = activeTab === 'all'
    ? favorites
    : favorites.filter(f => f.category === activeTab)

  const handleRemove = (id: number) => {
    setFavorites(favorites.filter(f => f.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* 顶部导航 */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
              每
            </div>
            <span className="font-bold">每日博客</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-gray-400 hover:text-white transition text-sm">
              个人中心
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">我的收藏</h1>
          <p className="text-gray-400">管理你收藏的文章 ({favorites.length})</p>
        </div>

        {/* 分类筛选 */}
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat === '全部' ? 'all' : cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                (activeTab === 'all' && cat === '全部') || activeTab === cat
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 收藏列表 */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group hover:border-red-500/50 transition"
              >
                {/* 封面图 */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={favorite.cover}
                    alt={favorite.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleRemove(favorite.id)}
                      className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-red-500 transition"
                      title="取消收藏"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 5h14v16l-7-3-7 3V5z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 内容 */}
                <div className="p-4">
                  {/* 分类标签 */}
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                    {favorite.category}
                  </span>

                  {/* 标题 */}
                  <Link href={`/posts/${favorite.id}`}>
                    <h3 className="text-lg font-bold text-white mt-2 mb-2 line-clamp-2 group-hover:text-red-400 transition">
                      {favorite.title}
                    </h3>
                  </Link>

                  {/* 摘要 */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {favorite.excerpt}
                  </p>

                  {/* 作者和点赞 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                        {favorite.author[0]}
                      </div>
                      <span className="text-gray-400 text-xs">{favorite.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{favorite.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-2xl font-bold text-white mb-2">暂无收藏</h2>
            <p className="text-gray-400 mb-6">去探索更多好文章吧！</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-red-500/30 transition"
            >
              浏览首页
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
