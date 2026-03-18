'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
  tti?: number // Time to Interactive
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    // 只在开发环境显示
    if (process.env.NODE_ENV !== 'development') return

    // FCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      setMetrics((prev) => ({ ...prev, fcp: lastEntry.startTime }))
    }).observe({ entryTypes: ['paint'] })

    // LCP
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }))
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // TTFB
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      setMetrics((prev) => ({ ...prev, ttfb: navigation.responseStart }))
    }

    // CLS
    let clsValue = 0
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      setMetrics((prev) => ({ ...prev, cls: clsValue }))
    }).observe({ entryTypes: ['layout-shift'] })

    // FID
    let fidValue: number | undefined
    const onFID = (entry: PerformanceEntry) => {
      fidValue = (entry as PerformanceEventTiming).processingStart - entry.startTime
      setMetrics((prev) => ({ ...prev, fid: fidValue }))
    }

    const observer = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(onFID)
    })
    observer.observe({ entryTypes: ['first-input'] })

    // 快捷键切换 (Shift + P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'P') {
        setShowPanel((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!showPanel || process.env.NODE_ENV !== 'development') return null

  const formatMs = (ms?: number) => {
    if (!ms) return '-'
    return `${Math.round(ms)}ms`
  }

  const getScore = (value?: number, good?: number, poor?: number) => {
    if (!value) return 'N/A'
    if (value <= (good || 0)) return '🟢'
    if (value <= (poor || 0)) return '🟡'
    return '🔴'
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-xl p-4 shadow-xl max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm">⚡ 性能监控</h3>
        <button
          onClick={() => setShowPanel(false)}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">FCP (首次内容绘制)</span>
          <span className="text-white font-mono">
            {getScore(metrics.fcp, 1800, 3000)} {formatMs(metrics.fcp)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">LCP (最大内容绘制)</span>
          <span className="text-white font-mono">
            {getScore(metrics.lcp, 2500, 4000)} {formatMs(metrics.lcp)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">FID (首次输入延迟)</span>
          <span className="text-white font-mono">
            {getScore(metrics.fid, 100, 300)} {formatMs(metrics.fid)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">CLS (累积布局偏移)</span>
          <span className="text-white font-mono">
            {getScore(metrics.cls, 0.1, 0.25)} {metrics.cls?.toFixed(3) || '-'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">TTFB (首字节时间)</span>
          <span className="text-white font-mono">
            {getScore(metrics.ttfb, 800, 1800)} {formatMs(metrics.ttfb)}
          </span>
        </div>
      </div>

      {/* 性能建议 */}
      <div className="mt-3 pt-3 border-t border-gray-800">
        <h4 className="text-xs font-bold text-gray-400 mb-2">优化建议</h4>
        <ul className="text-xs text-gray-500 space-y-1">
          {(metrics.fcp || 0) > 1800 && (
            <li>• 优化首屏加载速度</li>
          )}
          {(metrics.lcp || 0) > 2500 && (
            <li>• 优化大图加载</li>
          )}
          {(metrics.cls || 0) > 0.1 && (
            <li>• 避免布局偏移</li>
          )}
          {(metrics.ttfb || 0) > 800 && (
            <li>• 优化服务器响应</li>
          )}
        </ul>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-500">
        Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">Shift</kbd> +{' '}
        <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">P</kbd> to toggle
      </div>
    </div>
  )
}
