'use client'

import { useState, useEffect } from 'react'

export default function ScrollNotice() {
  const [notices] = useState([
    '🎉 恭喜《每日博客》收藏破 356！感谢大家支持！',
    '📢 作者贝贝每日 08:00 准时更新，敬请期待！',
    '💰 新书上架，前 3 章免费阅读！',
    '📖 加入书架，更新不错过！投推荐票支持作者！',
  ])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [notices.length])

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
        <span className="flex-shrink-0 text-sm font-bold">📢 公告：</span>
        <div className="flex-1 overflow-hidden">
          <div
            className="transition-transform duration-500"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {notices.map((notice, index) => (
              <div
                key={index}
                className="text-sm"
                style={{ display: index === currentIndex ? 'block' : 'none' }}
              >
                {notice}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
