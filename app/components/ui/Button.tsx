'use client'

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: ReactNode
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  rounded?: 'default' | 'full' | 'none'
  animation?: 'default' | 'lift' | 'glow' | 'scale' | 'none'
  disabled?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      animation = 'lift',
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // 基础样式
    const baseStyles = 'inline-flex items-center justify-center font-medium relative overflow-hidden group'
    
    // 变体样式
    const variants = {
      primary: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:shadow-red-500/30 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black',
      secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black',
      outline: 'border-2 border-white/30 text-white hover:bg-white/10 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black',
      ghost: 'text-white/80 hover:text-white hover:bg-white/10 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black',
      danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-600/30 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black',
      success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/30 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black',
      warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/30 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black',
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

    // 动画样式
    const animations = {
      default: 'transition-all duration-300',
      lift: 'transition-all duration-300 hover:-translate-y-0.5',
      glow: 'transition-all duration-300 hover:shadow-glow',
      scale: 'transition-all duration-300 hover:scale-105',
      none: '',
    }

    // 禁用状态
    const disabledStyles = disabled || loading 
      ? 'opacity-50 cursor-not-allowed' 
      : 'cursor-pointer'

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${roundeds[rounded]}
          ${animations[animation]}
          ${disabledStyles}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {/* 光泽效果 */}
        {!disabled && !loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}

        {/* 加载动画 */}
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
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
