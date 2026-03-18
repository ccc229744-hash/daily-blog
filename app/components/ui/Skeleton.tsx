'use client'

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded' | 'card'
  width?: string | number
  height?: string | number
  className?: string
  animation?: 'pulse' | 'wave' | 'none'
  lines?: number
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'pulse',
  lines = 1,
}: SkeletonProps) {
  const baseStyles = 'bg-gray-800 overflow-hidden'
  
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    rounded: 'rounded-lg',
    card: 'rounded-xl',
  }

  const animationStyles = {
    pulse: 'loading-shimmer',
    wave: 'loading-shimmer',
    none: '',
  }

  // 卡片骨架屏
  if (variant === 'card') {
    return (
      <div className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}>
        <div className="aspect-video bg-gray-800" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-800 rounded w-3/4" />
          <div className="h-3 bg-gray-800 rounded w-full" />
          <div className="h-3 bg-gray-800 rounded w-5/6" />
          <div className="flex items-center gap-2 pt-2">
            <div className="w-6 h-6 rounded-full bg-gray-800" />
            <div className="h-3 bg-gray-800 rounded w-20" />
          </div>
        </div>
      </div>
    )
  }

  // 多行文本骨架屏
  if (lines > 1) {
    return (
      <div className={`${baseStyles} space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${variantStyles[variant]} ${animationStyles[animation]}`}
            style={{
              width: width || (i === lines - 1 ? '60%' : '100%'),
              height: height || '1rem',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={{
        width,
        height,
      }}
    />
  )
}
