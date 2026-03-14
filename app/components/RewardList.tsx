'use client'

import { useState } from 'react'

interface RewardUser {
  name: string
  amount: number
  message: string
  time: string
}

export default function RewardList() {
  const [rewardUsers] = useState<RewardUser[]>([
    { name: '张***3', amount: 10, message: '写得真好！受益匪浅！', time: '1 分钟前' },
    { name: '李***8', amount: 5, message: '感谢分享，已收藏', time: '5 分钟前' },
    { name: '王***5', amount: 20, message: '支持作者，继续加油！', time: '10 分钟前' },
    { name: '刘***2', amount: 8.88, message: '加油，每天必来看', time: '30 分钟前' },
    { name: '陈***9', amount: 15, message: '受益匪浅，已推荐给朋友', time: '1 小时前' },
  ])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>💰</span>
          <span>打赏记录</span>
        </h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
          更多 →
        </a>
      </div>

      <div className="space-y-3">
        {rewardUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.message}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-orange-500">¥{user.amount}</p>
              <p className="text-xs text-gray-400">{user.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 打赏按钮 */}
      <button className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
        打赏作者
      </button>
    </div>
  )
}
