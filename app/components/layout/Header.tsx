'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  variant?: 'gradient' | 'solid' | 'transparent' | 'douyin'
  title?: string
  showBack?: boolean
  showSearch?: boolean
  showMenu?: boolean
  onSearchClick?: () => void
  onMenuClick?: () => void
}

export default function Header({
  variant = 'gradient',
  title,
  showBack = true,
  showSearch = true,
  showMenu = true,
  onSearchClick,
  onMenuClick,
}: HeaderProps) {
  const pathname = usePathname()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isScrolled = scrollY > 50

  // 头部基础样式
  const baseStyles = 'sticky top-0 z-50 transition-all duration-300'
  
  // 变体样式
  const variantStyles = {
    gradient: isScrolled 
      ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800' 
      : 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500',
    solid: 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800',
    transparent: isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md' : 'bg-transparent',
    douyin: 'bg-gradient-to-b from-black/80 to-transparent',
  }

  // 文字颜色
  const textColor = variant === 'douyin' || (variant === 'gradient' && !isScrolled)
    ? 'text-white'
    : 'text-gray-900 dark:text-white'

  return (
    <header className={`${baseStyles} ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* 左侧：返回按钮或 Logo */}
        <div className="flex items-center gap-2">
          {showBack && pathname !== '/' ? (
            <Link href="/" className={`p-2 rounded-full hover:bg-black/10 transition ${textColor}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-red-500 font-bold text-lg">每</span>
              </div>
              <span className={`font-bold text-lg ${textColor}`}>每日博客</span>
            </Link>
          )}
        </div>

        {/* 中间：标题 */}
        {title && (
          <h1 className={`text-lg font-bold ${textColor} flex-1 text-center`}>
            {title}
          </h1>
        )}

        {/* 右侧：搜索和菜单 */}
        <div className="flex items-center gap-2">
          {showSearch && (
            <Link 
              href="/search" 
              className={`p-2 rounded-full hover:bg-black/10 transition ${textColor}`}
              onClick={onSearchClick}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          )}
          
          {showMenu && (
            <button 
              className={`p-2 rounded-full hover:bg-black/10 transition ${textColor}`}
              onClick={onMenuClick}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 抖音风格标签栏 */}
      {variant === 'douyin' && (
        <div className="flex items-center gap-6 px-4 pb-3">
          <button className={`text-sm font-medium transition-all ${textColor} opacity-60 hover:opacity-100`}>
            关注
          </button>
          <button className={`text-sm font-medium transition-all ${textColor} border-b-2 border-white pb-0.5`}>
            推荐
          </button>
        </div>
      )}
    </header>
  )
}
