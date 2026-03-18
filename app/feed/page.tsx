'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import DarkModeToggle from '@/app/components/DarkModeToggle'

// 模拟抖音风格数据
const feedData = [
  {
    id: '1',
    title: 'Next.js 14 实战指南｜前端开发必备',
    cover: 'https://picsum.photos/seed/nextjs/400/700',
    author: '前端小贝',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    likes: 12340,
    comments: 567,
    shares: 234,
    description: '深入探索 Next.js 14 的新特性，包括 App Router、Server Components 等核心功能。#前端开发 #Next.js #React',
    music: '🎵 原创音乐 - 前端小贝',
  },
  {
    id: '2',
    title: 'AI 内容创作全流程分享✨',
    cover: 'https://picsum.photos/seed/ai/400/700',
    author: 'AI 探索者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    likes: 28900,
    comments: 1203,
    shares: 891,
    description: '分享使用 AI 工具进行内容创作的经验和技巧，提高创作效率。#AI 工具 #内容创作 #效率',
    music: '🎵 热门 BGM - AI 探索者',
  },
  {
    id: '3',
    title: '从零搭建个人博客📝超详细教程',
    cover: 'https://picsum.photos/seed/blog/400/700',
    author: '博主日记',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    likes: 8560,
    comments: 432,
    shares: 321,
    description: '从零开始搭建个人博客的全过程，包括技术选型、部署和优化。#博客搭建 #教程 #技术分享',
    music: '🎵 轻音乐 - 博主日记',
  },
  {
    id: '4',
    title: '我的 AI 变现之路💰月入过万',
    cover: 'https://picsum.photos/seed/money/400/700',
    author: '变现达人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    likes: 56700,
    comments: 3421,
    shares: 2100,
    description: '分享我的 AI 变现经验和方法，副业收入超过主业。#AI 变现 #副业 #赚钱',
    music: '🎵 励志音乐 - 变现达人',
  },
]

// 格式化数字
const formatNumber = (num: number) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

export default function DouyinFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({})
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 初始化点赞数
  useEffect(() => {
    const initialLikeCounts: Record<string, number> = {}
    feedData.forEach(post => {
      initialLikeCounts[post.id] = post.likes
    })
    setLikeCounts(initialLikeCounts)
  }, [])

  // 监听滚动
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight)
      setCurrentIndex(index)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // 处理点赞
  const handleLike = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
    setLikeCounts(prev => ({
      ...prev,
      [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1)
    }))
  }

  // 处理评论
  const handleComment = () => {
    setShowComments(true)
  }

  // 处理分享
  const handleShare = () => {
    setShowShare(true)
    // 模拟分享功能
    setTimeout(() => {
      alert('分享成功！')
      setShowShare(false)
    }, 1000)
  }

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
        <Link href="/" className="flex items-center gap-2 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        
        {/* 标签切换 */}
        <div className="flex items-center gap-6 text-white font-medium">
          <button className="text-white/60 hover:text-white transition">关注</button>
          <button className="text-white border-b-2 border-white pb-0.5">推荐</button>
        </div>

        <div className="w-6">
          <DarkModeToggle />
        </div>
      </header>

      {/* 主内容区 - 抖音式垂直滚动 */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {feedData.map((item, index) => (
          <article 
            key={item.id}
            className="relative h-screen snap-start snap-always flex items-center justify-center"
          >
            {/* 背景视频/图片 */}
            <div className="absolute inset-0">
              <img 
                src={item.cover} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
            </div>

            {/* 内容区域 */}
            <div className="relative z-10 w-full h-full flex">
              {/* 左侧内容 */}
              <div className="flex-1 flex flex-col justify-end p-6 pb-20">
                {/* 作者信息 */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={item.avatar} 
                    alt={item.author}
                    className="w-10 h-10 rounded-full border-2 border-white bg-white"
                  />
                  <span className="text-white font-medium text-base">{item.author}</span>
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                      isFollowing 
                        ? 'bg-white/20 text-white border border-white/50' 
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isFollowing ? '已关注' : '关注'}
                  </button>
                </div>

                {/* 标题和描述 */}
                <div className="mb-4">
                  <h2 className="text-white text-lg font-bold mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* 音乐 */}
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                  <span className="truncate">{item.music}</span>
                </div>
              </div>

              {/* 右侧互动按钮 */}
              <div className="flex flex-col items-center gap-6 p-4 pb-20">
                {/* 点赞 */}
                <button 
                  onClick={() => handleLike(item.id)}
                  className="flex flex-col items-center gap-1 text-white"
                >
                  <div className={`w-12 h-12 rounded-full ${likedPosts[item.id] ? 'bg-red-500/30' : 'bg-white/10'} backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition`}>
                    <svg className={`w-7 h-7 ${likedPosts[item.id] ? 'text-red-500' : 'text-white'}`} fill={likedPosts[item.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">{formatNumber(likeCounts[item.id] || item.likes)}</span>
                </button>

                {/* 评论 */}
                <button 
                  onClick={handleComment}
                  className="flex flex-col items-center gap-1 text-white"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">{formatNumber(item.comments)}</span>
                </button>

                {/* 分享 */}
                <button 
                  onClick={handleShare}
                  className="flex flex-col items-center gap-1 text-white"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 5h14v16l-7-3-7 3V5z"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">{formatNumber(item.shares)}</span>
                </button>

                {/* 头像（底部） */}
                <div className="mt-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white">
                    <img src={item.avatar} alt={item.author} className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 进度指示器 */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
              {feedData.map((_, i) => (
                <div 
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? 'h-6 bg-white' 
                      : 'h-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* 底部导航 - 抖音风格 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black to-black/80 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around py-3">
          <Link href="/" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium">首页</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs">朋友</span>
          </Link>
          <Link href="/hub" className="flex flex-col items-center gap-1">
            <div className="w-14 h-8 bg-gradient-to-r from-cyan-400 via-white to-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </Link>
          <Link href="/categories" className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs">消息</span>
          </Link>
          <Link href="/about" className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">我</span>
          </Link>
        </div>
      </nav>

      {/* 评论弹窗 */}
      {showComments && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end">
          <div className="bg-gray-900 w-full max-h-[80vh] rounded-t-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-medium">评论 ({feedData[currentIndex]?.comments || 0})</h3>
              <button onClick={() => setShowComments(false)} className="text-white/60 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {/* 评论列表 */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="用户" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white text-sm font-medium">用户{i}</span>
                        <span className="text-white/40 text-xs">2 小时前</span>
                      </div>
                      <p className="text-white/90 text-sm">这是一条评论内容，非常精彩！{i}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-white/60 hover:text-white text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <span>{i * 100}</span>
                        </button>
                        <button className="text-white/60 hover:text-white text-xs">回复</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 评论输入 */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="我" className="w-8 h-8 rounded-full" />
                <input 
                  type="text" 
                  placeholder="说点什么..." 
                  className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="text-red-500 font-medium">发送</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
