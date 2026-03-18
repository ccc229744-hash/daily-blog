'use client'

import { useState, useEffect } from 'react'

export default function GestureNav() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hideNav, setHideNav] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // 显示返回顶部按钮
      setShowScrollTop(currentScrollY > windowHeight / 2)

      // 根据滚动方向隐藏/显示导航
      if (currentScrollY > lastScrollY && currentScrollY > windowHeight) {
        setHideNav(true)
      } else {
        setHideNav(false)
      }

      setLastScrollY(currentScrollY)

      // 到达底部时显示导航
      if (currentScrollY + windowHeight >= documentHeight - 100) {
        setHideNav(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* 返回顶部按钮 */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-4 z-40 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg shadow-red-500/30 flex items-center justify-center transition-all duration-300 ${
          showScrollTop && !hideNav
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="返回顶部"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* 底部手势提示条 */}
      <div
        className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 ${
          hideNav ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="w-32 h-1 bg-white/30 rounded-full" />
      </div>

      {/* 滚动进度条 */}
      <ScrollProgress hide={hideNav} />
    </>
  )
}

// 滚动进度条组件
function ScrollProgress({ hide }: { hide: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrolled = window.scrollY
      const maxScroll = documentHeight - windowHeight
      const percentage = (scrolled / maxScroll) * 100
      setProgress(percentage)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 z-50 transition-transform duration-300 ${
        hide ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ width: `${progress}%` }}
    />
  )
}
