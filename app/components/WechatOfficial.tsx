'use client'

import { useState } from 'react'

export default function WechatOfficial() {
  const [showQR, setShowQR] = useState(false)

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg p-6 text-white">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold mb-1">📱 关注公众号</h3>
        <p className="text-sm text-green-100">获取最新文章推送</p>
      </div>

      <button
        onClick={() => setShowQR(!showQR)}
        className="w-full py-3 bg-white text-green-600 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
      >
        {showQR ? '收起二维码' : '点击查看二维码'}
      </button>

      {showQR && (
        <div className="mt-4 bg-white rounded-lg p-4">
          <div className="w-40 h-40 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-2">📱</p>
              <p className="text-sm text-gray-500">公众号二维码</p>
              <p className="text-xs text-gray-400 mt-1">每日博客 AI</p>
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mt-3">
            扫描二维码关注公众号
          </p>
        </div>
      )}
    </div>
  )
}
