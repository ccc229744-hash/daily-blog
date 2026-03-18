'use client'

import { ReactNode, useEffect, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
  show?: boolean
  duration?: number
}

export default function PageTransition({
  children,
  show = true,
  duration = 300,
}: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(show)
  const [shouldRender, setShouldRender] = useState(show)

  useEffect(() => {
    if (show) {
      setShouldRender(true)
      // 强制重绘后添加可见类
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    } else {
      setIsVisible(false)
      const timeout = setTimeout(() => {
        setShouldRender(false)
      }, duration)
      return () => clearTimeout(timeout)
    }
  }, [show, duration])

  if (!shouldRender) return null

  return (
    <div
      className={`transition-all duration-${duration} ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}
