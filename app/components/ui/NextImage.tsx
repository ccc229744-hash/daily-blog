'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface NextImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'custom'
  showPlaceholder?: boolean
  className?: string
}

export default function NextImage({
  src,
  alt,
  aspectRatio = 'portrait',
  showPlaceholder = true,
  className = '',
  fill,
  width,
  height,
  ...props
}: NextImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // 占位图 - 使用简单灰色背景，避免 btoa 编码中文问题
  const placeholderSvg = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%231a1a1a" width="400" height="500"/%3E%3C/svg%3E'

  // 宽高比样式
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    custom: '',
  }

  if (hasError && alt) {
    return (
      <div className={`${aspectClasses[aspectRatio]} ${className} bg-gray-900 rounded-xl flex items-center justify-center`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">😕</div>
          <p className="text-gray-500 text-sm">图片加载失败</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${aspectClasses[aspectRatio]} ${className} relative overflow-hidden rounded-xl`}>
      {/* 加载状态 - 骨架屏 */}
      {isLoading && showPlaceholder && (
        <div className="absolute inset-0 loading-shimmer z-10" />
      )}

      {/* Next.js Image */}
      <Image
        src={src}
        alt={alt}
        fill={fill || !width || !height}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoading ? 'scale-105 opacity-50' : 'scale-100 opacity-100'
        } hover:scale-105`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
        loading="lazy"
        quality={85}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        {...props}
      />
    </div>
  )
}
