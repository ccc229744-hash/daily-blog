'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Navigation from '../ui/Navigation'

interface AppLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
  headerVariant?: 'gradient' | 'solid' | 'transparent'
  title?: string
}

export default function AppLayout({
  children,
  showHeader = true,
  showFooter = true,
  headerVariant = 'gradient',
  title,
}: AppLayoutProps) {
  const pathname = usePathname()
  const [scrollY, setScrollY] = useState(0)

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 头部样式
  const headerStyles = {
    gradient: 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500',
    solid: 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800',
    transparent: 'bg-transparent',
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* 统一头部 */}
      {showHeader && (
        <header className={`sticky top-0 z-50 ${headerStyles[headerVariant]} transition-all duration-300`}>
          <div className="flex items-center justify-between px-4 py-3">
            {/* 返回按钮 */}
            {pathname !== '/' && (
              <Link href="/" className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            )}
            
            {/* 页面标题 */}
            {title && (
              <h1 className="text-lg font-bold text-white flex-1 text-center">
                {title}
              </h1>
            )}
            
            {/* 右侧工具 */}
            <div className="flex items-center gap-2">
              {/* 搜索按钮 */}
              <Link href="/search" className="p-2 text-white/80 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              
              {/* 更多选项 */}
              <button className="p-2 text-white/80 hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 渐变遮罩 */}
          {headerVariant === 'gradient' && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          )}
        </header>
      )}

      {/* 主要内容 */}
      <main>
        {children}
      </main>

      {/* 统一底部导航 */}
      {showFooter && <Navigation />}

      {/* 全局样式增强 */}
      <style jsx global>{`
        /* 平滑滚动 */
        html {
          scroll-behavior: smooth;
        }

        /* 隐藏滚动条但保持功能 */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* 安全区域 - 移动端底部导航 */
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }

        /* 选择文本颜色 */
        ::selection {
          background-color: rgb(239, 68, 68);
          color: white;
        }

        .dark ::selection {
          background-color: rgb(248, 113, 113);
          color: white;
        }
      `}</style>
    </div>
  )
}
