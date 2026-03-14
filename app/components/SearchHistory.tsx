'use client'

import { useState } from 'react'

export default function SearchHistory() {
  const [history] = useState([
    'AI 工具',
    '副业赚钱',
    '时间管理',
    '个人成长',
    '技术博客',
  ])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>🔍</span>
          <span>热门搜索</span>
        </h3>
        <button className="text-xs text-gray-400 hover:text-gray-600 transition">
          清除
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((tag, index) => (
          <a
            key={index}
            href={`/search?q=${encodeURIComponent(tag)}`}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  )
}
