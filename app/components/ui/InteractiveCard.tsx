'use client'

import { ReactNode, useState, useEffect, useRef } from 'react'

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'glass' | 'gradient'
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none'
  onClick?: () => void
  delay?: number
}

export default function InteractiveCard({
  children,
  className = '',
  variant = 'default',
  hoverEffect = 'lift',
  onClick,
  delay = 0,
}: InteractiveCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 滚动入场动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  // 变体样式
  const variantStyles = {
    default: 'bg-gray-900 shadow-soft',
    elevated: 'bg-gray-900 shadow-layered',
    glass: 'glass-effect',
    gradient: 'gradient-card',
  }

  // 悬停效果
  const hoverStyles = {
    lift: 'card-hover',
    glow: 'btn-hover shadow-glow-hover',
    scale: 'card-hover',
    none: '',
  }

  return (
    <div
      ref={cardRef}
      className={`${variantStyles[variant]} ${hoverStyles[hoverEffect]} rounded-xl overflow-hidden ${className} ${
        isVisible ? 'animate-on-scroll visible' : 'animate-on-scroll'
      }`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}
