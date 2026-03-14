'use client'

import { useState, useEffect } from 'react'

interface HotPost {
  id: string
  title: string
  views: number
  rank: number
}

export default function HotPosts() {
  const [hotPosts, setHotPosts] = useState<HotPost[]>([])

  useEffect(() => {
    // 模拟热门数据（实际应从 API 获取）
    setHotPosts([
      { id: '1', title: '你好，世界！我的博客诞生了', views: 1234, rank: 1 },
      { id: '2', title: 'Next.js 开发小技巧', views: 856, rank: 2 },
      { id: '3', title: '2026 年 AI 大洗牌：这 3 类人正在被时代抛弃', views: 723, rank: 3 },
      { id: '4', title: '35 岁被裁员，我用 AI 副业 3 个月逆袭', views: 612, rank: 4 },
      { id: '5', title: '普通人用 AI 一天赚 500 的 5 个野路子', views: 589, rank: 5 },
    ])
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔥</span>
        <h3 className="text-lg font-bold text-gray-900">热门文章</h3>
      </div>

      <div className="space-y-3">
        {hotPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-3 group cursor-pointer"
          >
            {/* 排名 */}
            <div
              className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-sm font-bold ${
                post.rank <= 3
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {post.rank}
            </div>

            {/* 标题 */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                🔥 {post.views} 次阅读
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 查看更多 */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <a
          href="/archive"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          查看更多 →
        </a>
      </div>
    </div>
  )
}
