'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  hover?: boolean
  className?: string
  onClick?: () => void
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  hover = false,
  className = '',
  onClick,
}: CardProps) {
  const baseStyles = 'bg-white dark:bg-gray-900 transition-all duration-300'
  
  const variants = {
    default: 'shadow-sm',
    elevated: 'shadow-lg hover:shadow-xl',
    outlined: 'border border-gray-200 dark:border-gray-800',
    interactive: 'shadow-md hover:shadow-xl cursor-pointer transform hover:-translate-y-1',
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  const radiuses = {
    none: '',
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
  }

  const hoverStyles = hover && !onClick
    ? 'hover:shadow-lg hover:scale-[1.02]'
    : ''

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${radiuses[radius]} ${hoverStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  )
}
