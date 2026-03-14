'use client'

import { useState } from 'react'
import { FeedItem } from '@/types'
import SkinSelector from './SkinSelector'
import MusicPlayer from './MusicPlayer'
import VisitorRecord from './VisitorRecord'
import SaySay from './SaySay'

interface Post {
  id: string
  title: string
  content: string
  author: string
  avatar: string
  time: string
  likes: number
  comments: number
  shares: number
}

export default function QzoneFeed() {
  const [currentSkin, setCurrentSkin] = useState('default')
  const [posts] = useState<Post[]>([
    {
      id: '2026-03-12-hello-world',
      title: '你好，世界！我的博客诞生了',
      content: '这是我的第一篇博客文章，记录博客搭建的过程和未来的计划。相信每天进步 1%，一年后你会强大 37 倍！',
      author: '贝贝',
      avatar: '🤖',
      time: '30 分钟前',
      likes: 1234,
      comments: 56,
      shares: 23,
    },
    {
      id: '2026-03-11-nextjs-tips',
      title: 'Next.js 开发小技巧',
      content: '分享一些在使用 Next.js 过程中学到的实用技巧和最佳实践。',
      author: '贝贝',
      avatar: '🤖',
      time: '2 小时前',
      likes: 856,
      comments: 32,
      shares: 15,
    },
  ])

  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({
    '2026-03-12-hello-world': 1234,
    '2026-03-11-nextjs-tips': 856,
  })

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts)
    const newCounts = { ...likeCounts }
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
      newCounts[postId]--
    } else {
      newLiked.add(postId)
      newCounts[postId]++
    }
    setLikedPosts(newLiked)
    setLikeCounts(newCounts)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-lg font-bold text-gray-900">每日博客</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900 text-sm">首页</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">说说</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">日志</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm">相册</button>
              <button className="text-gray-600 hover:text-gray-900">🏠</button>
              <button className="text-gray-600 hover:text-gray-900">👤</button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区 */}
      <div className="max-w-6xl mx-auto py-4 px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 左侧边栏 */}
        <div className="hidden md:block space-y-4">
          <MusicPlayer />
          <VisitorRecord />
          <SaySay />
        </div>

        {/* 中间动态列表 */}
        <div className={`md:col-span-2 space-y-4 bg-gradient-to-br ${
          currentSkin === 'default' ? 'from-gray-100 to-gray-100' :
          currentSkin === 'blue' ? 'from-blue-100 to-blue-200' :
          currentSkin === 'pink' ? 'from-pink-100 to-pink-200' :
          currentSkin === 'purple' ? 'from-purple-100 to-purple-200' :
          currentSkin === 'green' ? 'from-green-100 to-green-200' :
          'from-gray-100 to-gray-100'
        }`}>
          <SkinSelector currentSkin={currentSkin} setCurrentSkin={setCurrentSkin} />
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* 作者信息 */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium hover:bg-blue-600 transition">
                  + 关注
                </button>
              </div>

              {/* 内容区域 */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.content}
                </p>

                {/* 配图占位 */}
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-gray-400">
                    <p className="text-4xl mb-2">📷</p>
                    <p className="text-sm">点击添加配图</p>
                  </div>
                </div>

                {/* 阅读全文 */}
                <a
                  href={`/posts/${post.id}`}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  阅读全文 →
                </a>
              </div>

              {/* 互动栏 */}
              <div className="flex items-center border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition ${
                    likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-600'
                  }`}
                >
                  <span className="text-xl">{likedPosts.has(post.id) ? '❤️' : '🤍'}</span>
                  <span className="text-sm font-medium">{likeCounts[post.id]}</span>
                </button>
                <button
                  onClick={() => {
                    console.log('打开评论区:', post.title)
                    window.location.href = `/posts/${post.id}#comments`
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition text-gray-600"
                >
                  <span className="text-xl">💬</span>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: post.title,
                        text: post.content,
                        url: `${window.location.origin}/posts/${post.id}`,
                      })
                    } catch (err) {
                      await navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`)
                      alert('链接已复制到剪贴板！')
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition text-gray-600"
                >
                  <span className="text-xl">📤</span>
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 右侧边栏 */}
        <div className="hidden lg:block space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">公告</h3>
            <p className="text-xs text-gray-600">
              🎉 欢迎来到我的博客！<br/>
              📝 每天更新原创文章<br/>
              💬 欢迎留言互动
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">统计</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>文章：</span>
                <span className="font-bold">15</span>
              </div>
              <div className="flex justify-between">
                <span>访问：</span>
                <span className="font-bold">12,345</span>
              </div>
              <div className="flex justify-between">
                <span>关注：</span>
                <span className="font-bold">520</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="text-center py-4 text-gray-400 text-sm">
        — 已经到底了 —
      </div>
    </div>
  )
}
