'use client'

import { useState } from 'react'

export default function Reward() {
  const [showQR, setShowQR] = useState(false)

  return (
    <div className="my-12 text-center">
      <button
        onClick={() => setShowQR(!showQR)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
        aria-label="赞赏作者"
      >
        <span>💰</span>
        <span>赞赏作者</span>
      </button>

      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowQR(false)}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">感谢支持</h3>
              <p className="text-gray-600 mb-6">您的支持是我创作的最大动力</p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* 微信支付 */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-green-50 rounded-lg flex items-center justify-center mb-2">
                    <div className="text-center">
                      <p className="text-4xl mb-1">💚</p>
                      <p className="text-xs text-gray-500">微信支付</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-green-600">微信支付</p>
                </div>

                {/* 支付宝 */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                    <div className="text-center">
                      <p className="text-4xl mb-1">💙</p>
                      <p className="text-xs text-gray-500">支付宝</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-blue-600">支付宝</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                请作者喝杯咖啡 ☕
              </p>

              <button
                onClick={() => setShowQR(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
