'use client'

import { useState } from 'react'

export default function VoteButtons() {
  const [recommend, setRecommend] = useState(2048)
  const [monthlyTicket, setMonthlyTicket] = useState(520)
  const [hasVoted, setHasVoted] = useState(false)
  const [hasMonthlyVoted, setHasMonthlyVoted] = useState(false)

  const handleRecommend = () => {
    if (!hasVoted) {
      setRecommend(recommend + 1)
      setHasVoted(true)
      alert('推荐票 +1！感谢支持~ 📖')
    }
  }

  const handleMonthlyTicket = () => {
    if (!hasMonthlyVoted) {
      setMonthlyTicket(monthlyTicket + 1)
      setHasMonthlyVoted(true)
      alert('月票 +1！感谢支持~ 🎫')
    }
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>📊</span>
        <span>支持作者</span>
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* 推荐票 */}
        <button
          onClick={handleRecommend}
          disabled={hasVoted}
          className={`py-3 rounded-lg font-medium transition-all ${
            hasVoted
              ? 'bg-white/30 cursor-not-allowed'
              : 'bg-white text-orange-600 hover:shadow-lg hover:scale-105'
          }`}
        >
          <div className="text-2xl mb-1">📖</div>
          <div className="text-sm font-bold">推荐票</div>
          <div className="text-xs">{recommend}</div>
        </button>

        {/* 月票 */}
        <button
          onClick={handleMonthlyTicket}
          disabled={hasMonthlyVoted}
          className={`py-3 rounded-lg font-medium transition-all ${
            hasMonthlyVoted
              ? 'bg-white/30 cursor-not-allowed'
              : 'bg-white text-orange-600 hover:shadow-lg hover:scale-105'
          }`}
        >
          <div className="text-2xl mb-1">🎫</div>
          <div className="text-sm font-bold">月票</div>
          <div className="text-xs">{monthlyTicket}</div>
        </button>
      </div>

      {/* 收藏按钮 */}
      <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition">
        <span className="mr-2">⭐</span>
        加入书架
      </button>
    </div>
  )
}
