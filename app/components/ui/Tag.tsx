'use client'

import { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  clickable?: boolean
  onClick?: () => void
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  closable?: boolean
  onClose?: () => void
}

export default function Tag({
  children,
  variant = 'default',
  size = 'md',
  clickable = false,
  onClick,
  leftIcon,
  rightIcon,
  closable = false,
  onClose,
}: TagProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-300'
  
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    primary: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md shadow-red-500/30',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/30',
  }
  
  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-sm',
    lg: 'px-5 py-1.5 text-base',
  }

  const interactiveStyles = clickable 
    ? 'cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95' 
    : ''

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${interactiveStyles}`}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      {closable && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose?.()
          }}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
    </span>
  )
}
