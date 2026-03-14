'use client'

import { useState } from 'react'

export default function SaySay() {
  const [says] = useState([
    {
      id: '1',
      content: '今天天气真好，适合写博客！☀️',
      time: '10 分钟前',
      likes: 23,
      comments: 5,
    },
    {
      content: '新博客上线啦，欢迎大家来踩！🎉',
      time: '1 小时前',
      likes: 56,
      comments: 12,
    },
    {
      content: '坚持每天更新，一起进步！💪',
      time: '3 小时前',
      likes: 89,
      comments: 18,
    },
  ])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span>💭</span>
          <span>说说</span>
        </h3>
        <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600 transition">
          写说说
        </button>
      </div>

      <div className="space-y-3">
        {says.map((say) => (
          <div key={say.id} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
            <p className="text-sm text-gray-700 mb-2">{say.content}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{say.time}</span>
              <div className="flex items-center gap-3">
                <button className="hover:text-red-500 transition">
                  ❤️ {say.likes}
                </button>
                <button className="hover:text-blue-500 transition">
                  💬 {say.comments}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
