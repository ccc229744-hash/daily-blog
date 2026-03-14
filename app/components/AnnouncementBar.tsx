'use client'

import { useState, useEffect } from 'react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // 3 秒后自动隐藏
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm py-2 px-4 text-center relative">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
        <span className="animate-pulse">🎉</span>
        <span>欢迎来到我的每日博客！</span>
        <span className="hidden md:inline">·</span>
        <span className="hidden md:inline">每天一篇原创文章</span>
        <span className="hidden md:inline">·</span>
        <span className="hidden md:inline">订阅更新不错过精彩内容</span>
      </div>
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
        aria-label="关闭公告"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
