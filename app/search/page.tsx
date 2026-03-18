'use client'

import { useState } from 'react'
import Link from 'next/link'

// 模拟热搜数据
const hotSearch = [
  { rank: 1, keyword: 'Next.js 14 教程', views: '1234.5w', hot: true },
  { rank: 2, keyword: 'AI 内容创作', views: '987.2w', hot: true },
  { rank: 3, keyword: '博客搭建', views: '654.8w', hot: true },
  { rank: 4, keyword: 'React Hooks', views: '432.1w', hot: false },
  { rank: 5, keyword: 'TypeScript 入门', views: '321.5w', hot: false },
  { rank: 6, keyword: 'Tailwind CSS', views: '210.3w', hot: false },
  { rank: 7, keyword: 'Node.js 实战', views: '198.7w', hot: false },
  { rank: 8, keyword: '前端面试', views: '156.2w', hot: false },
  { rank: 9, keyword: 'CSS 技巧', views: '134.8w', hot: false },
  { rank: 10, keyword: 'JavaScript 进阶', views: '123.4w', hot: false },
]

// 模拟搜索结果
const searchResults = [
  {
    id: '1',
    title: 'Next.js 14 实战指南｜前端开发必备',
    author: '前端小贝',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    likes: 12340,
    cover: 'https://picsum.photos/seed/nextjs/300/400',
  },
  {
    id: '2',
    title: '从零开始学 Next.js',
    author: '技术达人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    likes: 8760,
    cover: 'https://picsum.photos/seed/learn/300/400',
  },
  {
    id: '3',
    title: 'Next.js 部署教程',
    author: 'DevOps 专家',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    likes: 5430,
    cover: 'https://picsum.photos/seed/deploy/300/400',
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('hot') // 'hot' | 'results'

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* 顶部搜索栏 */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-1 text-gray-900 dark:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>

          {/* 搜索框 */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索文章、作者、话题"
              className="w-full px-4 py-2.5 pl-10 bg-gray-100 dark:bg-gray-800 border-0 rounded-full text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              autoFocus
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>

          <button className="text-red-500 font-medium text-sm px-4">
            搜索
          </button>
        </div>

        {/* Tab 切换 */}
        <div className="flex items-center gap-6 px-4 border-b border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('hot')}
            className={`py-3 text-sm font-medium transition-all ${
              activeTab === 'hot'
                ? 'text-gray-900 dark:text-white border-b-2 border-red-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            🔥 热搜榜
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`py-3 text-sm font-medium transition-all ${
              activeTab === 'results'
                ? 'text-gray-900 dark:text-white border-b-2 border-red-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            综合
          </button>
        </div>
      </header>

      {/* 主要内容 */}
      <main>
        {activeTab === 'hot' ? (
          /* 热搜榜 */
          <div className="px-4 py-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              🔥 实时热搜
            </h2>
            <div className="space-y-3">
              {hotSearch.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-4 p-3 bg-white dark:bg-gray-900 rounded-xl hover:shadow-md transition cursor-pointer"
                >
                  {/* 排名 */}
                  <div className={`w-6 h-6 flex items-center justify-center rounded text-sm font-bold ${
                    item.rank <= 3 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  }`}>
                    {item.rank}
                  </div>

                  {/* 关键词 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {item.keyword}
                      </span>
                      {item.hot && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                          热
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.views} 次浏览
                    </div>
                  </div>

                  {/* 搜索图标 */}
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              ))}
            </div>

            {/* 底部提示 */}
            <div className="text-center py-8 text-gray-400 text-sm">
              — 热搜榜单实时更新 —
            </div>
          </div>
        ) : (
          /* 搜索结果 */
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                搜索结果
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                共 {searchResults.length} 条结果
              </span>
            </div>

            <div className="space-y-4">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={`/posts/${result.id}`}
                  className="group flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800"
                >
                  {/* 封面图 */}
                  <div className="w-28 h-36 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={result.cover} 
                      alt={result.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-500 transition-colors mb-2">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <img 
                          src={result.avatar} 
                          alt={result.author}
                          className="w-5 h-5 rounded-full bg-gray-100"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {result.author}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        {formatNumber(result.likes)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {searchResults.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 dark:text-gray-400">暂无搜索结果</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
