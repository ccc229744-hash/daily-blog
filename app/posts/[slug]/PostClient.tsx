'use client'

import { useState } from 'react'
import Link from 'next/link'
import DarkModeToggle from '@/app/components/DarkModeToggle'
import OptimizedImage from '@/app/components/ui/OptimizedImage'

interface PostClientProps {
  slug: string
}

export default function PostClient({ slug }: PostClientProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  // 模拟数据 - 不依赖文件系统
  const article = {
    id: slug,
    title: 'Next.js 14 实战指南｜前端开发必备',
    author: '前端小贝',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    date: '2026-03-11',
    readTime: '5 分钟',
    likes: 1234,
    collects: 567,
    comments: 89,
    tags: ['前端开发', 'Next.js', 'React', '教程'],
    coverImage: 'https://picsum.photos/seed/nextjs/800/400',
    content: `
      <p class="lead">深入探索 Next.js 14 的新特性，包括 App Router、Server Components 等核心功能。</p>
      
      <h2>📚 什么是 Next.js 14？</h2>
      <p>Next.js 14 是 Vercel 推出的最新 React 框架，带来了革命性的变化。</p>
      
      <h2>✨ 核心特性</h2>
      <ul>
        <li><strong>App Router</strong> - 全新的路由系统</li>
        <li><strong>Server Components</strong> - 服务端组件</li>
        <li><strong>Streaming</strong> - 流式渲染</li>
      </ul>
      
      <h2>🚀 快速开始</h2>
      <pre><code>npx create-next-app@latest my-app
cd my-app
npm run dev</code></pre>
      
      <blockquote>
        <p>Next.js 14 让 React 开发变得更加简单和高效。</p>
      </blockquote>
    `,
  }

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
    return num.toString()
  }

  const [likes, setLikes] = useState(article.likes)
  const [collects, setCollects] = useState(article.collects)
  const [isLiked, setIsLiked] = useState(false)
  const [isCollected, setIsCollected] = useState(false)
  const [toast, setToast] = useState<{show: boolean, message: string}>({ show: false, message: '' })

  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 2000)
  }

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1)
      showToast('取消点赞')
    } else {
      setLikes(prev => prev + 1)
      showToast('❤️ 已点赞')
    }
    setIsLiked(!isLiked)
  }

  const handleCollect = () => {
    if (isCollected) {
      setCollects(prev => prev - 1)
      showToast('取消收藏')
    } else {
      setCollects(prev => prev + 1)
      showToast('⭐ 已收藏')
    }
    setIsCollected(!isCollected)
  }

  const handleComment = () => {
    showToast('💬 评论区开发中...')
  }

  return (
    <article className="min-h-screen bg-black pb-20">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 text-white/80 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="pt-14">
        {/* 封面图 */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <OptimizedImage
            src={article.coverImage}
            alt={article.title}
            aspectRatio="video"
            showOverlay={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* 标题区域 */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <h1 className="text-xl md:text-3xl font-bold text-white mb-3 leading-snug">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <img src={article.avatar} alt={article.author} className="w-6 h-6 rounded-full bg-white" />
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>

        {/* 互动按钮栏 */}
        <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-6">
              {/* 点赞 */}
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 transition ${
                  isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                } active:scale-90`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-sm font-medium">{formatNumber(likes)}</span>
              </button>
              {/* 收藏 */}
              <button 
                onClick={handleCollect}
                className={`flex items-center gap-2 transition ${
                  isCollected ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                } active:scale-90`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5h14v16l-7-3-7 3V5z"/>
                </svg>
                <span className="text-sm font-medium">{formatNumber(collects)}</span>
              </button>
              {/* 评论 */}
              <button 
                onClick={handleComment}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition active:scale-90"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                <span className="text-sm font-medium">{formatNumber(article.comments)}</span>
              </button>
            </div>
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                isFollowing 
                  ? 'bg-white/10 text-white border border-white/30' 
                  : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
              }`}
            >
              {isFollowing ? '已关注' : '关注作者'}
            </button>
          </div>
        </div>

        {/* 文章内容 */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          <article 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-white
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
              prose-code:text-pink-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
              prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:pl-4 prose-blockquote:italic
              prose-img:rounded-xl prose-img:my-6
              prose-ul:my-4 prose-ol:my-4
              prose-li:mb-2
              prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
            {article.tags.map((tag, i) => (
              <span 
                key={i}
                className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm hover:bg-red-500/20 hover:text-red-400 cursor-pointer transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 相关推荐 */}
          <div className="mt-12">
            <h3 className="text-lg font-bold text-white mb-4">相关推荐</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Link key={i} href="#" className="flex gap-4 group">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <OptimizedImage
                      src={`https://picsum.photos/seed/${i}/200/200`}
                      alt=""
                      aspectRatio="square"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-red-400 transition">
                      这是推荐文章的标题{i}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">
                      {i * 100 + 500} 点赞 · {i * 50 + 200} 收藏
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 底部评论区占位 */}
      <div className="max-w-3xl mx-auto px-4 py-8 border-t border-white/10">
        <div className="text-center text-gray-500 py-8">
          评论区开发中...
        </div>
      </div>

      {/* Toast 提示 */}
      {toast.show && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="px-6 py-3 bg-gray-900/95 backdrop-blur-md border border-white/10 text-white rounded-full shadow-lg">
            {toast.message}
          </div>
        </div>
      )}
    </article>
  )
}
