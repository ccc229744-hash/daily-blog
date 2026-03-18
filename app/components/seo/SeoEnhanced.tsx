'use client'

import { useEffect } from 'react'

interface SeoEnhancedProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
}

export default function SeoEnhanced({
  title,
  description,
  keywords,
  canonical,
  ogImage,
}: SeoEnhancedProps) {
  useEffect(() => {
    // 设置标题
    if (title) {
      document.title = title
    }

    // 设置描述
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', description)
    }

    // 设置关键词
    if (keywords && keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords.join(', '))
    }

    // 设置规范链接
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]')
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.setAttribute('rel', 'canonical')
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.setAttribute('href', canonical)
    }

    // 设置 Open Graph
    if (ogImage) {
      let metaOgImage = document.querySelector('meta[property="og:image"]')
      if (!metaOgImage) {
        metaOgImage = document.createElement('meta')
        metaOgImage.setAttribute('property', 'og:image')
        document.head.appendChild(metaOgImage)
      }
      metaOgImage.setAttribute('content', ogImage)
    }
  }, [title, description, keywords, canonical, ogImage])

  return null
}
