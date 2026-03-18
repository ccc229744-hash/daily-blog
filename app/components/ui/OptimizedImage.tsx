'use client'

import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'custom'
  showOverlay?: boolean
  priority?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  aspectRatio = 'portrait',
  showOverlay = true,
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // 宽高比
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    custom: '',
  }

  // 占位图
  const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNTMzIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUzMyIgZmlsbD0iIzFhMWExYSIvPjwvc3ZnPg=='

  return (
    <div className={`relative overflow-hidden rounded-xl ${aspectClasses[aspectRatio]} ${className}`}>
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 loading-shimmer" />
      )}

      {/* 图片 */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover image-zoom ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />

      {/* 渐变遮罩 */}
      {showOverlay && !isLoading && (
        <div className="absolute inset-0 gradient-overlay opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  )
}
