'use client'

import Link from 'next/link'

interface SeriesArticle {
  id: string
  title: string
  order: number
  isCurrent?: boolean
}

interface SeriesCardProps {
  seriesName: string
  seriesDescription: string
  articles: SeriesArticle[]
  coverImage?: string
}

export default function SeriesCard({
  seriesName,
  seriesDescription,
  articles,
  coverImage,
}: SeriesCardProps) {
  const currentArticle = articles.find(a => a.isCurrent)
  const currentIndex = articles.findIndex(a => a.isCurrent)
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  return (
    <div className="bg-gradient-to-br from-red-500/10 via-pink-500/10 to-purple-500/10 border border-red-500/20 rounded-2xl p-6">
      {/* 系列头部 */}
      <div className="flex items-start gap-4 mb-6">
        {coverImage && (
          <img
            src={coverImage}
            alt={seriesName}
            className="w-20 h-20 rounded-xl object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium">
              系列文章
            </span>
            <span className="text-gray-400 text-xs">
              {articles.length} 篇
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{seriesName}</h3>
          <p className="text-gray-400 text-sm">{seriesDescription}</p>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="space-y-2 mb-6">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/posts/${article.id}`}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              article.isCurrent
                ? 'bg-red-500/20 border border-red-500/30'
                : 'hover:bg-gray-800/50'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              article.isCurrent
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}>
              {article.order}
            </span>
            <span className={`flex-1 text-sm ${
              article.isCurrent ? 'text-white font-medium' : 'text-gray-400'
            }`}>
              {article.title}
            </span>
            {article.isCurrent && (
              <span className="text-xs text-red-400">当前阅读</span>
            )}
          </Link>
        ))}
      </div>

      {/* 上一篇/下一篇导航 */}
      {(prevArticle || nextArticle) && (
        <div className="flex items-center gap-4 pt-4 border-t border-red-500/20">
          {prevArticle ? (
            <Link
              href={`/posts/${prevArticle.id}`}
              className="flex-1 flex items-center gap-2 p-3 rounded-xl hover:bg-gray-800/50 transition"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-500">上一篇</div>
                <div className="text-sm text-white truncate">{prevArticle.title}</div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextArticle ? (
            <Link
              href={`/posts/${nextArticle.id}`}
              className="flex-1 flex items-center gap-2 p-3 rounded-xl hover:bg-gray-800/50 transition text-right"
            >
              <div className="text-right">
                <div className="text-xs text-gray-500">下一篇</div>
                <div className="text-sm text-white truncate">{nextArticle.title}</div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      )}
    </div>
  )
}
