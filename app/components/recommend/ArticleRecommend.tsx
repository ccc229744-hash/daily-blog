'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  excerpt: string
  cover: string
  category: string
  tags: string[]
  likes: number
  views: number
  readTime: string
}

interface ArticleRecommendProps {
  currentArticleId: string
  currentCategory: string
  currentTags: string[]
  limit?: number
}

export default function ArticleRecommend({
  currentArticleId,
  currentCategory,
  currentTags,
  limit = 3,
}: ArticleRecommendProps) {
  const [recommendations, setRecommendations] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟推荐算法
    const mockArticles: Article[] = [
      {
        id: 'rec1',
        title: 'React 18 新特性详解',
        excerpt: '深入了解 React 18 的并发渲染、自动批处理等新特性',
        cover: 'https://picsum.photos/seed/react18/400/225',
        category: '技术',
        tags: ['React', '前端', '性能优化'],
        likes: 2340,
        views: 15670,
        readTime: '8 分钟',
      },
      {
        id: 'rec2',
        title: 'TypeScript 高级技巧',
        excerpt: '掌握 TypeScript 的高级类型系统和实用技巧',
        cover: 'https://picsum.photos/seed/ts/400/225',
        category: '技术',
        tags: ['TypeScript', '类型系统'],
        likes: 1890,
        views: 12340,
        readTime: '10 分钟',
      },
      {
        id: 'rec3',
        title: '前端性能优化实战',
        excerpt: '从加载速度到运行时性能的全面优化指南',
        cover: 'https://picsum.photos/seed/perf/400/225',
        category: '技术',
        tags: ['性能优化', '前端'],
        likes: 3450,
        views: 23450,
        readTime: '12 分钟',
      },
    ]

    // 模拟推荐算法延迟
    setTimeout(() => {
      setRecommendations(mockArticles.slice(0, limit))
      setLoading(false)
    }, 500)
  }, [currentArticleId, currentCategory, currentTags, limit])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-800" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-800 rounded w-3/4" />
              <div className="h-3 bg-gray-800 rounded w-full" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-800" />
                <div className="h-3 bg-gray-800 rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">为你推荐</h2>
        <Link href="/recommend" className="text-red-400 hover:text-red-300 text-sm">
          查看更多 →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((article, index) => (
          <Link
            key={article.id}
            href={`/posts/${article.id}`}
            className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* 封面 */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded">
                {article.readTime}
              </div>
            </div>

            {/* 内容 */}
            <div className="p-4">
              {/* 分类标签 */}
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                {article.category}
              </span>

              {/* 标题 */}
              <h3 className="text-lg font-bold text-white mt-2 mb-2 line-clamp-2 group-hover:text-red-400 transition">
                {article.title}
              </h3>

              {/* 摘要 */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              {/* 标签 */}
              <div className="flex flex-wrap gap-1 mb-3">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 数据 */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {article.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {article.views}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
