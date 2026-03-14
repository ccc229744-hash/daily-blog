'use client'

import { useState } from 'react'

interface Fan {
  rank: number
  name: string
  level: string
  fansValue: number
  color: string
}

export default function FanRanking() {
  const [fans] = useState<Fan[]>([
    { rank: 1, name: '张***3', level: '盟主', fansValue: 10000, color: 'from-yellow-400 to-orange-500' },
    { rank: 2, name: '李***8', level: '宗师', fansValue: 5200, color: 'from-purple-400 to-pink-500' },
    { rank: 3, name: '王***5', level: '宗师', fansValue: 5000, color: 'from-purple-400 to-pink-500' },
    { rank: 4, name: '刘***2', level: '掌门', fansValue: 2333, color: 'from-blue-400 to-cyan-500' },
    { rank: 5, name: '陈***9', level: '掌门', fansValue: 2000, color: 'from-blue-400 to-cyan-500' },
  ])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>👑</span>
          <span>粉丝榜</span>
        </h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
          更多 →
        </a>
      </div>

      <div className="space-y-3">
        {fans.map((fan) => (
          <div
            key={fan.rank}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3">
              {/* 排名 */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r ${fan.color}`}
              >
                {fan.rank}
              </div>

              {/* 用户名 */}
              <div>
                <p className="text-sm font-medium text-gray-900">{fan.name}</p>
                <p className="text-xs text-gray-500">{fan.level}</p>
              </div>
            </div>

            {/* 粉丝值 */}
            <div className="text-right">
              <p className="text-sm font-bold text-orange-500">{fan.fansValue}</p>
              <p className="text-xs text-gray-400">粉丝值</p>
            </div>
          </div>
        ))}
      </div>

      {/* 成为粉丝 */}
      <button className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
        成为粉丝
      </button>
    </div>
  )
}
