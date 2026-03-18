'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TopicArticle {
  id: string
  title: string
  excerpt: string
  cover: string
  author: string
  date: string
  likes: number
  readTime: string
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest')

  // 模拟数据
  const topic = {
    name: 'Next.js 实战',
    description: '从入门到精通，全面掌握 Next.js 14 的核心技术和最佳实践',
    cover: 'https://picsum.photos/seed/nextjs-topic/1200/400',
    articleCount: 12,
    followers: 2340,
  }

  const articles: TopicArticle[] = [
    {
      id: '1',
      title: 'Next.js 14 入门指南',
      excerpt: '快速了解 Next.js 14 的核心特性和优势',
      cover: 'https://picsum.photos/seed/nextjs1/400/225',
      author: '前端小贝',
      date: '2026-03-17',
      likes: 1234,
      readTime: '5 分钟',
    },
    {
      id: '2',
      title: 'App Router 详解',
      excerpt: '深入理解 Next.js 14 的全新路由系统',
      cover: 'https://picsum.photos/seed/nextjs2/400/225',
      author: '前端小贝',
      date: '2026-03-16',
      likes: 890,
      readTime: '8 分钟',
    },
    {
      id: '3',
      title: 'Server Components 实践',
      excerpt: '掌握服务端组件的使用场景和最佳实践',
      cover: 'https://picsum.photos/seed/nextjs3/400/225',
      author: '前端小贝',
      date: '2026-03-15',
      likes: 756,
      readTime: '10 分钟',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* 专题封面 */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={topic.cover}
          alt={topic.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <span className="px-3 py-1 bg-red-500/20 backdrop-blur-sm text-red-400 text-sm rounded-full mb-3 inline-block">
              专题
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {topic.name}
            </h1>
            <p className="text-gray-300 text-lg mb-4 max-w-2xl">
              {topic.description}
            </p>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <span>{topic.articleCount} 篇文章</span>
              <span>{topic.followers.toLocaleString()} 人关注</span>
              <button className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition">
                关注专题
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 筛选栏 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">全部文章</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">排序：</span>
            <button
              onClick={() => setSortBy('latest')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                sortBy === 'latest'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              最新
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                sortBy === 'popular'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              最热
            </button>
          </div>
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/posts/${article.id}`}
              className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition"
            >
              {/* 封面 */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={article.cover}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* 内容 */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* 元信息 */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {article.author[0]}
                    </div>
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{article.readTime}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {article.likes}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 加载更多 */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition">
            加载更多
          </button>
        </div>
      </div>
    </div>
  )
}
