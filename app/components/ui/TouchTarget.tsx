'use client'

import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react'

interface TouchTargetProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'icon' | 'text'
}

const TouchTarget = forwardRef<HTMLButtonElement, TouchTargetProps>(
  ({ children, size = 'md', variant = 'default', className = '', ...props }, ref) => {
    // 最小触摸目标 44x44px (WCAG 标准)
    const sizes = {
      sm: 'min-w-[44px] min-h-[44px] px-3 py-2',
      md: 'min-w-[48px] min-h-[48px] px-4 py-3',
      lg: 'min-w-[56px] min-h-[56px] px-6 py-4',
    }

    const variants = {
      default: '',
      icon: 'flex items-center justify-center p-3',
      text: 'px-4 py-3',
    }

    return (
      <button
        ref={ref}
        className={`
          ${sizes[size]}
          ${variants[variant]}
          touch-manipulation
          active:scale-95
          transition-transform
          duration-150
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TouchTarget.displayName = 'TouchTarget'

export default TouchTarget
