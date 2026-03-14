'use client'

import { useState, useEffect } from 'react'

export default function SiteStats() {
  const [runDays, setRunDays] = useState(0)

  useEffect(() => {
    // 计算网站运行天数（从 2026-03-11 开始）
    const startDate = new Date('2026-03-11')
    const now = new Date()
    const diff = now.getTime() - startDate.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    setRunDays(days)
  }, [])

  return (
    <div className="text-center py-4 border-t border-gray-200 mt-8">
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-2">
        <span className="flex items-center gap-1">
          <span>📊</span>
          <span>累计访问 <span className="font-bold text-blue-600">12,345</span> 次</span>
        </span>
        <span className="flex items-center gap-1">
          <span>👥</span>
          <span>今日访问 <span className="font-bold text-green-600">520</span> 人</span>
        </span>
        <span className="flex items-center gap-1">
          <span>📝</span>
          <span>文章总数 <span className="font-bold text-purple-600">15</span> 篇</span>
        </span>
      </div>
      
      <div className="text-xs text-gray-400">
        <span>🚀</span>
        <span>本站已安全运行 </span>
        <span className="font-bold text-orange-600">{runDays}</span>
        <span> 天</span>
      </div>
    </div>
  )
}
