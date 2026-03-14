'use client'

import { useState } from 'react'

interface Visitor {
  id: string
  name: string
  avatar: string
  time: string
}

export default function VisitorRecord() {
  const [visitors] = useState<Visitor[]>([
    { id: '1', name: '张三', avatar: '👨', time: '刚刚' },
    { id: '2', name: '李四', avatar: '👩', time: '5 分钟前' },
    { id: '3', name: '王五', avatar: '👨‍🦱', time: '10 分钟前' },
    { id: '4', name: '赵六', avatar: '👧', time: '30 分钟前' },
    { id: '5', name: '匿名', avatar: '👤', time: '1 小时前' },
  ])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <span>👣</span>
          <span>最近访客</span>
        </h3>
        <a href="#" className="text-xs text-blue-500 hover:text-blue-600">
          更多 →
        </a>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg hover:scale-110 transition cursor-pointer">
              {visitor.avatar}
            </div>
            <p className="text-xs text-gray-600 truncate w-full text-center">
              {visitor.name}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          今日访问：<span className="font-bold text-blue-600">520</span> 人次
        </p>
      </div>
    </div>
  )
}
