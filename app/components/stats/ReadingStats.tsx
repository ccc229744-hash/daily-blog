'use client'

import { useState, useEffect } from 'react'

interface ReadingStatsProps {
  articleId: string
}

export default function ReadingStats({ articleId }: ReadingStatsProps) {
  const [stats, setStats] = useState({
    views: 0,
    readTime: 0,
    scrollDepth: 0,
    lastRead: null as Date | null,
  })

  useEffect(() => {
    // 模拟获取阅读统计
    const mockStats = {
      views: Math.floor(Math.random() * 10000) + 1000,
      readTime: Math.floor(Math.random() * 10) + 3,
      scrollDepth: 0,
      lastRead: new Date(),
    }

    setStats(mockStats)

    // 追踪滚动深度
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setStats(prev => ({ ...prev, scrollDepth: Math.round(scrollPercent) }))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [articleId])

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
      <h3 className="text-sm font-bold text-gray-400 mb-4">阅读统计</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {/* 浏览量 */}
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {stats.views.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">浏览</div>
        </div>

        {/* 阅读时长 */}
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {stats.readTime}
          </div>
          <div className="text-xs text-gray-500">分钟</div>
        </div>

        {/* 滚动深度 */}
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {stats.scrollDepth}%
          </div>
          <div className="text-xs text-gray-500">已读</div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>阅读进度</span>
          <span>{stats.scrollDepth}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"
            style={{ width: `${stats.scrollDepth}%` }}
          />
        </div>
      </div>

      {/* 阅读时间 */}
      {stats.lastRead && (
        <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500">
          最后阅读：{stats.lastRead.toLocaleString('zh-CN')}
        </div>
      )}
    </div>
  )
}
