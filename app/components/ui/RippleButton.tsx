'use client'

import { ButtonHTMLAttributes, ReactNode, forwardRef, useState, useCallback } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  rounded?: 'default' | 'full' | 'none'
  ripple?: boolean
  successText?: string
}

const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = 'full',
      ripple = true,
      successText,
      className = '',
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([])
    const [showSuccess, setShowSuccess] = useState(false)

    const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple) return

      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = {
        id: Date.now(),
        x,
        y,
        size,
      }

      setRipples((prev) => [...prev, newRipple])

      // 清理涟漪
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)
    }, [ripple])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event)
      
      // 显示成功反馈
      if (successText && !loading && !disabled) {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
      }

      onClick?.(event)
    }

    // 基础样式
    const baseStyles = 'inline-flex items-center justify-center font-medium relative overflow-hidden'
    
    // 变体样式
    const variants = {
      primary: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:shadow-red-500/30',
      secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30',
      outline: 'border-2 border-white/30 text-white hover:bg-white/10',
      ghost: 'text-white/80 hover:text-white hover:bg-white/10',
      danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-600/30',
      success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/30',
    }
    
    // 尺寸样式
    const sizes = {
      sm: 'px-4 py-1.5 text-xs gap-1.5',
      md: 'px-6 py-2.5 text-sm gap-2',
      lg: 'px-8 py-3 text-base gap-2.5',
      xl: 'px-10 py-4 text-lg gap-3',
    }

    // 圆角样式
    const roundeds = {
      default: 'rounded-lg',
      full: 'rounded-full',
      none: 'rounded-none',
    }

    const isDisabled = disabled || loading

    return (
      <>
        <button
          ref={ref}
          className={`
            ${baseStyles}
            ${variants[variant]}
            ${sizes[size]}
            ${roundeds[rounded]}
            ${fullWidth ? 'w-full' : ''}
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
            transition-all duration-300
            ${className}
          `}
          disabled={isDisabled}
          onClick={handleClick}
          {...props}
        >
          {/* 涟漪效果 */}
          {ripple && !isDisabled && ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute bg-white/30 rounded-full animate-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}

          {/* 成功状态 */}
          {showSuccess && successText ? (
            <span className="flex items-center gap-2 animate-fade-in">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {successText}
            </span>
          ) : (
            <>
              {loading ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                  {children}
                  {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </>
              )}
            </>
          )}
        </button>

        {/* 点击反馈提示 */}
        {showSuccess && successText && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {successText}
            </div>
          </div>
        )}
      </>
    )
  }
)

RippleButton.displayName = 'RippleButton'

export default RippleButton
