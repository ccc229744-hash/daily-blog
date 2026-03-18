'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

interface LazyLoadProps {
  children: ReactNode
  placeholder?: ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
}

export default function LazyLoad({
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '100px',
  className = '',
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : placeholder || <div className="loading-shimmer w-full h-full" />}
    </div>
  )
}
