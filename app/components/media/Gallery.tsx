'use client'

import { useState } from 'react'

interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

interface GalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
}

export default function Gallery({ images, columns = 3 }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }

  return (
    <>
      {/* 画廊网格 */}
      <div className={`grid ${columnClasses[columns]} gap-4`}>
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-800"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {image.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 灯箱视图 */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* 关闭按钮 */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 上一张 */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage - 1)
              }}
              className="absolute left-4 text-white/60 hover:text-white transition"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* 下一张 */}
          {selectedImage < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage + 1)
              }}
              className="absolute right-4 text-white/60 hover:text-white transition"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* 大图 */}
          <img
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* 图片说明 */}
          {images[selectedImage].caption && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              {images[selectedImage].caption}
            </div>
          )}

          {/* 图片计数 */}
          <div className="absolute top-4 left-4 text-white/60 text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
