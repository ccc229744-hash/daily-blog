'use client'

import { useState } from 'react'

export default function UpdateReminder() {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    setSubscribed(true)
    alert('✅ 订阅成功！更新时会通过 QQ 通知您~')
  }

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg p-6 text-white">
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm">
          🔔
        </div>
        <h3 className="text-lg font-bold mb-1">更新提醒</h3>
        <p className="text-sm text-green-100">订阅后更新第一时间通知</p>
      </div>

      {subscribed ? (
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
          <p className="text-sm font-medium">✅ 已订阅</p>
          <p className="text-xs text-green-100 mt-1">更新时会收到 QQ 通知</p>
        </div>
      ) : (
        <button
          onClick={handleSubscribe}
          className="w-full py-3 bg-white text-green-600 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
        >
          订阅更新
        </button>
      )}

      <p className="text-xs text-center text-green-100 mt-3">
        📱 通过 QQ 接收更新通知
      </p>
    </div>
  )
}
