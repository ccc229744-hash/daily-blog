'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Notification {
  id: number
  type: 'comment' | 'like' | 'follow' | 'system'
  title: string
  content: string
  time: string
  isRead: boolean
  avatar?: string
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'comment',
      title: '张三 评论了你的文章',
      content: '写得非常好！学到了很多，期待更多干货分享！',
      time: '5 分钟前',
      isRead: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    },
    {
      id: 2,
      type: 'like',
      title: '李四 点赞了你的文章',
      content: 'Next.js 14 实战指南｜前端开发必备',
      time: '1 小时前',
      isRead: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    },
    {
      id: 3,
      type: 'follow',
      title: '王五 关注了你',
      content: '成为你的第 2341 位粉丝',
      time: '2 小时前',
      isRead: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    },
    {
      id: 4,
      type: 'system',
      title: '系统通知',
      content: '你的文章《AI 内容创作全流程》已通过审核',
      time: '3 小时前',
      isRead: true,
    },
    {
      id: 5,
      type: 'comment',
      title: '赵六 回复了你的评论',
      content: '感谢博主的分享，非常有帮助！',
      time: '昨天',
      isRead: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return '💬'
      case 'like':
        return '❤️'
      case 'follow':
        return '👤'
      case 'system':
        return '📢'
      default:
        return '🔔'
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* 顶部导航 */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
              每
            </div>
            <span className="font-bold">每日博客</span>
          </Link>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-red-400 hover:text-red-300 text-sm transition"
              >
                全部已读
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">消息通知</h1>
            <p className="text-gray-400">
              {unreadCount > 0 ? (
                <span className="text-red-400">{unreadCount} 条未读</span>
              ) : (
                '全部已读'
              )}
            </p>
          </div>
        </div>

        {/* Tab 导航 */}
        <div className="flex gap-6 border-b border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-4 text-sm font-medium transition ${
              activeTab === 'all'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            全部消息
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`pb-4 text-sm font-medium transition ${
              activeTab === 'unread'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            未读
          </button>
          <button
            onClick={() => setActiveTab('comment')}
            className={`pb-4 text-sm font-medium transition ${
              activeTab === 'comment'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            评论
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`pb-4 text-sm font-medium transition ${
              activeTab === 'system'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            系统
          </button>
        </div>

        {/* 通知列表 */}
        <div className="space-y-3">
          {notifications
            .filter(n => {
              if (activeTab === 'unread') return !n.isRead
              if (activeTab === 'comment') return n.type === 'comment'
              if (activeTab === 'system') return n.type === 'system'
              return true
            })
            .map((notification) => (
              <div
                key={notification.id}
                className={`bg-gray-900 rounded-xl p-4 border transition ${
                  notification.isRead
                    ? 'border-gray-800'
                    : 'border-red-500/30 bg-red-500/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* 图标 */}
                  <div className="text-2xl">
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* 内容 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-medium mb-1 ${
                          notification.isRead ? 'text-gray-300' : 'text-white'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {notification.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">{notification.time}</span>
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-red-400 hover:text-red-300 text-xs transition"
                          >
                            标记为已读
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-500 hover:text-red-400 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-2xl font-bold text-white mb-2">暂无通知</h2>
            <p className="text-gray-400">有 new 消息时会在这里显示</p>
          </div>
        )}
      </main>
    </div>
  )
}
