'use client'

import { useState } from 'react'

interface Comment {
  id: number
  user: string
  avatar: string
  content: string
  time: string
  likes: number
  replies: number
}

export default function CommentList() {
  const [comments] = useState<Comment[]>([
    {
      id: 1,
      user: '技术达人',
      avatar: '🧑‍💻',
      content: '写得非常好，受益匪浅！希望博主多多更新这样的干货文章。',
      time: '10 分钟前',
      likes: 23,
      replies: 3,
    },
    {
      id: 2,
      user: '学习ing',
      avatar: '📚',
      content: '正好需要这方面的知识，博主就更新了，太及时了！',
      time: '30 分钟前',
      likes: 15,
      replies: 1,
    },
    {
      id: 3,
      user: '创业路上',
      avatar: '🚀',
      content: '博主的观点很独到，给了我很多启发，已关注！',
      time: '1 小时前',
      likes: 42,
      replies: 5,
    },
  ])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>💬</span>
          <span>最新评论</span>
        </h3>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
          查看全部 →
        </a>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{comment.user}</span>
                  <span className="text-xs text-gray-400">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-red-500 transition">
                    <span>👍</span>
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition">
                    <span>💬</span>
                    <span>{comment.replies} 回复</span>
                  </button>
                  <button className="hover:text-blue-600 transition">
                    回复
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 发表评论 */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <textarea
          placeholder="写下你的评论..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          rows={3}
        />
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-gray-400">
            文明发言，理性讨论
          </p>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            发表评论
          </button>
        </div>
      </div>
    </div>
  )
}
