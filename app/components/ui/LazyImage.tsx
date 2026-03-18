'use client'

import { useState, useEffect, useRef } from 'react'
import Skeleton from './Skeleton'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  aspectRatio?: 'square' | 'video' | 'portrait' | 'custom'
  className?: string
  placeholder?: 'blur' | 'color' | 'skeleton'
  blurDataURL?: string
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  aspectRatio = 'custom',
  className = '',
  placeholder = 'skeleton',
  blurDataURL,
  priority = false,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  // 懒加载检测
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    custom: '',
  }

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // 错误状态
  if (hasError) {
    return (
      <div className={`${aspectClasses[aspectRatio]} ${className} bg-gray-800 rounded-xl flex items-center justify-center`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">😕</div>
          <p className="text-gray-500 text-sm">图片加载失败</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={imgRef}
      className={`${aspectClasses[aspectRatio]} ${className} relative overflow-hidden rounded-xl bg-gray-800`}
    >
      {/* 占位符 */}
      {isLoading && placeholder === 'skeleton' && (
        <Skeleton
          variant="rectangular"
          className="absolute inset-0 w-full h-full"
          animation="pulse"
        />
      )}

      {/* 模糊占位图 */}
      {isLoading && blurDataURL && placeholder === 'blur' && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
        />
      )}

      {/* 实际图片 */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoading ? 'scale-105 blur-lg opacity-50' : 'scale-100 blur-0 opacity-100'
          } hover:scale-105`}
          width={width}
          height={height}
        />
      )}
    </div>
  )
}
