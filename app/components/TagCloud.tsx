'use client'

import { useState } from 'react'

export default function TagCloud() {
  const [tags] = useState([
    { name: 'AI', count: 12, color: 'from-blue-500 to-cyan-500' },
    { name: '成长', count: 8, color: 'from-green-500 to-emerald-500' },
    { name: '思考', count: 6, color: 'from-purple-500 to-pink-500' },
    { name: '学习', count: 5, color: 'from-orange-500 to-red-500' },
    { name: '技术', count: 4, color: 'from-indigo-500 to-blue-500' },
    { name: '副业', count: 3, color: 'from-yellow-500 to-orange-500' },
    { name: '创业', count: 2, color: 'from-red-500 to-pink-500' },
    { name: '生活', count: 2, color: 'from-teal-500 to-green-500' },
  ])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🏷️</span>
        <h3 className="text-lg font-bold text-gray-900">标签云</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <a
            key={tag.name}
            href={`/tags/${tag.name}`}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r ${tag.color} hover:shadow-md hover:scale-105 transition-all`}
          >
            <span>{tag.name}</span>
            <span className="text-xs opacity-80">({tag.count})</span>
          </a>
        ))}
      </div>
    </div>
  )
}
