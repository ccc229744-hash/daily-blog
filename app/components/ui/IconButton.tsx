'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  variant?: 'default' | 'primary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  badge?: number
  tooltip?: string
  rounded?: 'default' | 'full' | 'none'
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'default',
      size = 'md',
      badge,
      tooltip,
      rounded = 'full',
      className = '',
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white',
      primary: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:shadow-red-500/30',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      ghost: 'text-gray-400 hover:text-white hover:bg-white/10',
    }

    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-14 h-14',
    }

    const roundeds = {
      default: 'rounded-lg',
      full: 'rounded-full',
      none: 'rounded-none',
    }

    return (
      <>
        <button
          ref={ref}
          className={`
            inline-flex items-center justify-center
            ${variants[variant]}
            ${sizes[size]}
            ${roundeds[rounded]}
            transition-all duration-300
            relative
            ${className}
          `}
          {...props}
        >
          {icon}
          
          {/* 徽章 */}
          {badge !== undefined && badge > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-black">
              {badge > 99 ? '99+' : badge}
            </span>
          )}

          {/* 光泽效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 rounded-full" />
        </button>

        {/* Tooltip */}
        {tooltip && (
          <div className="group relative">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        )}
      </>
    )
  }
)

IconButton.displayName = 'IconButton'

export default IconButton
