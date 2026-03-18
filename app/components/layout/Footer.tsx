'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface FooterProps {
  variant?: 'default' | 'douyin' | 'minimal'
}

export default function Footer({ variant = 'douyin' }: FooterProps) {
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/feed', label: 'Feed', icon: '⚡' },
    { path: '/hub', label: '导航', icon: '🗺️', highlight: true },
    { path: '/categories', label: '分类', icon: '📂' },
    { path: '/about', label: '我的', icon: '👤' },
  ]

  // 默认风格
  if (variant === 'default') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 safe-area-pb z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive
                    ? 'text-red-500 scale-110'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    )
  }

  // 抖音风格
  if (variant === 'douyin') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/80 backdrop-blur-md border-t border-white/10 safe-area-pb z-50">
        <div className="flex items-center justify-around py-3">
          <Link href="/" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium">首页</span>
          </Link>
          <Link href="/feed" className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs">朋友</span>
          </Link>
          <button className="flex flex-col items-center gap-1">
            <div className="w-14 h-8 bg-gradient-to-r from-cyan-400 via-white to-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
          <Link href="/categories" className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
    )
  }

  // 极简风格
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-pb z-50">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-1 ${
                isActive ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
