'use client'

import { useState } from 'react'

export default function CustomerService() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed right-4 bottom-32 z-40">
      {/* 展开的菜单 */}
      {isExpanded && (
        <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-xl p-4 w-48 animate-fade-in">
          <h4 className="font-bold text-gray-900 mb-3 text-sm">联系方式</h4>
          
          {/* 微信 */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
              <span>💚</span>
              <span>微信</span>
            </div>
            <div className="w-24 h-24 bg-green-50 rounded-lg flex items-center justify-center mx-auto">
              <div className="text-center">
                <p className="text-2xl">📱</p>
                <p className="text-xs text-gray-500">beibei-ai</p>
              </div>
            </div>
          </div>

          {/* QQ */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
              <span>💙</span>
              <span>QQ</span>
            </div>
            <a 
              href="tencent://message/?uin=883A893A16A48612"
              className="block text-center py-1.5 px-3 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
            >
              点击咨询
            </a>
          </div>

          {/* 邮箱 */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
              <span>📧</span>
              <span>邮箱</span>
            </div>
            <a 
              href="mailto:beibei@openclaw.ai"
              className="text-xs text-blue-600 hover:underline"
            >
              beibei@openclaw.ai
            </a>
          </div>
        </div>
      )}

      {/* 客服按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        aria-label="联系客服"
        title="联系客服"
      >
        <span className="text-xl">💬</span>
      </button>

      {/* 在线状态 */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
    </div>
  )
}
