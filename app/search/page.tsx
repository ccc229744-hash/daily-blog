'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [popularSearches, setPopularSearches] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    // 获取热门搜索
    fetch('/api/search?q=')
      .then(res => res.json())
      .then(data => setPopularSearches(data.popular || []))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true)
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(data => {
            setResults(data.results || [])
            setIsSearching(false)
          })
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-xl font-bold text-gray-900">每日博客</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">首页</Link>
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">分类</Link>
              <Link href="/archive" className="text-gray-600 hover:text-gray-900">归档</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">关于</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">搜索文章</h1>
          <p className="text-xl text-gray-600 mb-8">找到你感兴趣的内容</p>
          
          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文章标题、内容、标签..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none transition-colors"
              autoFocus
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Popular Searches */}
        {!query && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">热门搜索</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {isSearching ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-4">搜索中...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.length > 0 && (
              <div className="text-sm text-gray-500 mb-4">
                找到 {results.length} 篇相关文章
              </div>
            )}

            {results.map((result) => (
              <article
                key={result.slug}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <Link href={`/posts/${result.slug}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {result.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <time>{result.date}</time>
                    <div className="flex gap-2">
                      {result.categories.slice(0, 3).map((category: string) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}

            {query && results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">未找到相关文章</p>
                <p className="text-gray-400 text-sm">试试其他关键词</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 每日博客 · 用 Next.js 构建</p>
        </div>
      </footer>
    </div>
  )
}
