'use client'

import { useEffect, useState } from 'react'

interface WebVitalsData {
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
}

export default function WebVitals() {
  const [metrics, setMetrics] = useState<WebVitalsData>({})
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    // 只在开发环境显示
    if (process.env.NODE_ENV !== 'development') return

    // 获取 Web Vitals 指标
    const getMetrics = () => {
      // FCP - First Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        setMetrics(prev => ({ ...prev, fcp: lastEntry.startTime }))
      }).observe({ entryTypes: ['paint'] })

      // LCP - Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // TTFB - Time to First Byte
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        setMetrics(prev => ({ ...prev, ttfb: navigation.responseStart }))
      }

      // CLS - Cumulative Layout Shift
      let clsValue = 0
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }))
      }).observe({ entryTypes: ['layout-shift'] })

      // FID - First Input Delay
      let fidValue: number | undefined
      const onFID = (entry: PerformanceEntry) => {
        fidValue = (entry as PerformanceEventTiming).processingStart - entry.startTime
        setMetrics(prev => ({ ...prev, fid: fidValue }))
      }
      
      const observer = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach(onFID)
      })
      observer.observe({ entryTypes: ['first-input'] })
    }

    getMetrics()

    // 快捷键切换显示 (Shift + M)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'M') {
        setShowMetrics(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!showMetrics || process.env.NODE_ENV !== 'development') return null

  const formatMs = (ms?: number) => {
    if (!ms) return '-'
    return `${Math.round(ms)}ms`
  }

  const getStatus = (value?: number, good?: number, poor?: number) => {
    if (!value) return 'gray'
    if (value <= (good || 0)) return 'green'
    if (value <= (poor || 0)) return 'yellow'
    return 'red'
  }

  const statusColors = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    gray: 'bg-gray-500',
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm">Web Vitals</h3>
        <button
          onClick={() => setShowMetrics(false)}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">FCP</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[getStatus(metrics.fcp, 1800, 3000) as keyof typeof statusColors]}`} />
            <span className="text-white font-mono">{formatMs(metrics.fcp)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">LCP</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[getStatus(metrics.lcp, 2500, 4000) as keyof typeof statusColors]}`} />
            <span className="text-white font-mono">{formatMs(metrics.lcp)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">FID</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[getStatus(metrics.fid, 100, 300) as keyof typeof statusColors]}`} />
            <span className="text-white font-mono">{formatMs(metrics.fid)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">CLS</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[getStatus(metrics.cls, 0.1, 0.25) as keyof typeof statusColors]}`} />
            <span className="text-white font-mono">{metrics.cls?.toFixed(3) || '-'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">TTFB</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[getStatus(metrics.ttfb, 800, 1800) as keyof typeof statusColors]}`} />
            <span className="text-white font-mono">{formatMs(metrics.ttfb)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-500">
        Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">M</kbd> to toggle
      </div>
    </div>
  )
}
