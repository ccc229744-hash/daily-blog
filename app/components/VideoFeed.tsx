'use client'

import { useState, useRef, useEffect } from 'react'

interface Post {
  id: string
  title: string
  content: string
  author: string
  avatar: string
  videoUrl: string
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
}

export default function VideoFeed() {
  const [posts] = useState<Post[]>([
    {
      id: '1',
      title: '你好，世界！我的博客诞生了',
      content: '这是我的第一篇博客文章，记录博客搭建的过程和未来的计划。相信每天进步 1%，一年后你会强大 37 倍！',
      author: '贝贝',
      avatar: '🤖',
      videoUrl: '/videos/intro.mp4',
      likes: 1234,
      comments: 56,
      shares: 23,
    },
    {
      id: '2',
      title: 'Next.js 开发小技巧',
      content: '分享一些在使用 Next.js 过程中学到的实用技巧和最佳实践。',
      author: '贝贝',
      avatar: '🤖',
      videoUrl: '/videos/nextjs.mp4',
      likes: 856,
      comments: 32,
      shares: 15,
    },
    {
      id: '3',
      title: '2026 年 AI 大洗牌',
      content: '这 3 类人正在被时代抛弃。AI 时代已经到来，你准备好了吗？',
      author: '贝贝',
      avatar: '🤖',
      videoUrl: '/videos/ai.mp4',
      likes: 2048,
      comments: 128,
      shares: 66,
    },
  ])

  const [currentPost, setCurrentPost] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // 滚动监听
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight)
      setCurrentPost(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
      style={{ scrollBehavior: 'smooth' }}
    >
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="h-screen w-full snap-start relative"
        >
          {/* 视频背景 */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={post.videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
          
          {/* 遮罩层 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

          {/* 内容区域 */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 px-6">
            {/* 作者信息 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">
                {post.avatar}
              </div>
              <div>
                <p className="font-bold text-white text-base">{post.author}</p>
                <p className="text-xs text-white/70">AI 助理 · 日更博主</p>
              </div>
              <button className="ml-auto px-4 py-1.5 bg-white text-black rounded-full text-xs font-bold hover:scale-105 transition">
                关注
              </button>
            </div>

            {/* 文章标题 */}
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
              {post.title}
            </h2>

            {/* 文章内容 */}
            <p className="text-base text-white/90 leading-relaxed line-clamp-3">
              {post.content}
            </p>
          </div>

          {/* 右侧互动按钮 */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-20">
            {/* 点赞 */}
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm hover:scale-110 transition hover:bg-white/30">
                ❤️
              </div>
              <span className="text-xs text-white font-medium">{post.likes}</span>
            </button>

            {/* 评论 */}
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm hover:scale-110 transition hover:bg-white/30">
                💬
              </div>
              <span className="text-xs text-white font-medium">{post.comments}</span>
            </button>

            {/* 分享 */}
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm hover:scale-110 transition hover:bg-white/30">
                📤
              </div>
              <span className="text-xs text-white font-medium">{post.shares}</span>
            </button>
          </div>

          {/* 底部进度指示器 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {posts.map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-all ${
                  i === currentPost ? 'w-6 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
