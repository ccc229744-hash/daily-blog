'use client'

import { useState } from 'react'

interface Chapter {
  id: string
  title: string
  isFree: boolean
  isVip: boolean
}

export default function ChapterList() {
  const [chapters] = useState<Chapter[]>([
    { id: '2026-03-12-hello-world', title: '第一章 你好，世界！', isFree: true, isVip: false },
    { id: '2026-03-11-nextjs-tips', title: '第二章 Next.js 开发技巧', isFree: true, isVip: false },
    { id: '3', title: '第三章 AI 大洗牌', isFree: true, isVip: false },
    { id: '4', title: '第四章 35 岁裁员逆袭', isFree: true, isVip: false },
    { id: '5', title: '第五章 AI 一天赚 500', isFree: true, isVip: false },
    { id: '6', title: '第六章 如果不缺钱', isFree: true, isVip: false },
  ])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>📑</span>
          <span>全部章节</span>
        </h3>
        <span className="text-sm text-gray-500">共 6 章</span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`/posts/${chapter.id}`}
            className={`flex items-center justify-between p-3 rounded-lg transition ${
              chapter.isFree
                ? 'hover:bg-blue-50'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${
                chapter.isFree ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {chapter.title}
              </span>
              {chapter.isVip && (
                <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded font-bold">
                  VIP
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {chapter.isFree ? (
                <span className="text-xs text-green-600 font-medium">免费</span>
              ) : (
                <span className="text-xs text-orange-600 font-medium">
                  {chapter.isVip ? 'VIP' : '订阅'}
                </span>
              )}
              <span className="text-gray-400">→</span>
            </div>
          </a>
        ))}
      </div>

      {/* 更新提示 */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          📢 每周一、三、五更新
        </p>
      </div>
    </div>
  )
}
