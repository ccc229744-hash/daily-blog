'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  size?: 'md' | 'lg' | 'xl'
  tooltip?: string
}

const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      icon,
      position = 'bottom-right',
      size = 'lg',
      tooltip,
      className = '',
      ...props
    },
    ref
  ) => {
    const positions = {
      'bottom-right': 'right-4 bottom-4',
      'bottom-left': 'left-4 bottom-4',
      'bottom-center': 'left-1/2 -translate-x-1/2 bottom-4',
    }

    const sizes = {
      md: 'w-12 h-12',
      lg: 'w-14 h-14',
      xl: 'w-16 h-16',
    }

    return (
      <>
        <button
          ref={ref}
          className={`
            fixed ${positions[position]} z-50
            ${sizes[size]}
            bg-gradient-to-r from-red-500 to-pink-500
            text-white rounded-full
            flex items-center justify-center
            shadow-lg shadow-red-500/30
            hover:shadow-xl hover:shadow-red-500/50
            hover:scale-110
            transition-all duration-300
            ${className}
          `}
          {...props}
        >
          {icon}
          
          {/* 脉冲效果 */}
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
        </button>

        {/* Tooltip */}
        {tooltip && (
          <div className={`fixed ${position === 'bottom-center' ? 'left-1/2 -translate-x-1/2' : position === 'bottom-right' ? 'right-4' : 'left-4'} bottom-20 z-50`}>
            <div className="px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
              {tooltip}
            </div>
          </div>
        )}
      </>
    )
  }
)

FloatingButton.displayName = 'FloatingButton'

export default FloatingButton
