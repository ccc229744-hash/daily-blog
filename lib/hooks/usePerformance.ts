'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * 图片预加载 Hook
 * @param srcs 图片 URL 数组
 */
export function useImagePreload(srcs: string[]) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    const images = srcs.map(src => {
      const img = new Image()
      img.src = src
      return img
    })

    Promise.all(
      images.map(
        img =>
          new Promise(resolve => {
            img.onload = resolve
            img.onerror = resolve
          })
      )
    ).then(() => {
      if (mounted) {
        setLoaded(true)
      }
    })

    return () => {
      mounted = false
    }
  }, [srcs])

  return loaded
}

/**
 * 防抖 Hook（增强版）
 * @param callback 回调函数
 * @param delay 延迟时间
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const newTimeoutId = setTimeout(() => {
        callback(...args)
      }, delay)

      setTimeoutId(newTimeoutId)
    },
    [callback, delay, timeoutId]
  )

  // 清理
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return debouncedCallback
}

/**
 * 节流 Hook
 * @param callback 回调函数
 * @param limit 时间限制
 */
export function useThrottleCallback<T extends (...args: any[]) => any>(
  callback: T,
  limit: number = 100
) {
  const [lastCall, setLastCall] = useState(0)

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastCall >= limit) {
        setLastCall(now)
        callback(...args)
      }
    },
    [callback, limit, lastCall]
  )
}

/**
 * 网络状态 Hook
 * @returns 网络状态信息
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSlow, setIsSlow] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    setIsOnline(navigator.onLine)

    // 检测慢速网络
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection) {
        setIsSlow(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline, isSlow }
}

/**
 * 页面可见性 Hook
 * @returns 是否可见
 */
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    setIsVisible(document.visibilityState === 'visible')

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return isVisible
}
