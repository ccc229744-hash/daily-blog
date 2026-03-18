'use client'

import { useEffect, useState } from 'react'

interface WebVitalsData {
  fcp?: number
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
  tti?: number
  tbt?: number
}

interface OptimizationTip {
  metric: string
  status: 'good' | 'warning' | 'error'
  tip: string
}

export default function WebVitals() {
  const [metrics, setMetrics] = useState<WebVitalsData>({})
  const [showMetrics, setShowMetrics] = useState(false)
  const [optimizationTips, setOptimizationTips] = useState<OptimizationTip[]>([])

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

      // TTI - Time to Interactive
      setTimeout(() => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigationEntry) {
          // 简单估算 TTI
          const tti = navigationEntry.domContentLoadedEventEnd + 1000
          setMetrics(prev => ({ ...prev, tti }))
        }
      }, 2000)

      // TBT - Total Blocking Time
      let tbtValue = 0
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.duration > 50) {
            tbtValue += entry.duration - 50
          }
        }
        setMetrics(prev => ({ ...prev, tbt: tbtValue }))
      }).observe({ entryTypes: ['longtask'] })
    }

    getMetrics()

    // 生成优化建议
    const generateOptimizationTips = () => {
      const tips: OptimizationTip[] = []

      if (metrics.fcp && metrics.fcp > 1800) {
        tips.push({
          metric: 'FCP',
          status: metrics.fcp > 3000 ? 'error' : 'warning',
          tip: '优化首屏内容加载，考虑使用预加载和减少初始资源大小'
        })
      }

      if (metrics.lcp && metrics.lcp > 2500) {
        tips.push({
          metric: 'LCP',
          status: metrics.lcp > 4000 ? 'error' : 'warning',
          tip: '优化最大内容元素，考虑图片优化和服务器响应时间'
        })
      }

      if (metrics.fid && metrics.fid > 100) {
        tips.push({
          metric: 'FID',
          status: metrics.fid > 300 ? 'error' : 'warning',
          tip: '减少主线程阻塞，考虑代码分割和懒加载'
        })
      }

      if (metrics.cls && metrics.cls > 0.1) {
        tips.push({
          metric: 'CLS',
          status: metrics.cls > 0.25 ? 'error' : 'warning',
          tip: '固定元素尺寸，避免布局偏移'
        })
      }

      if (metrics.ttfb && metrics.ttfb > 800) {
        tips.push({
          metric: 'TTFB',
          status: metrics.ttfb > 1800 ? 'error' : 'warning',
          tip: '优化服务器响应时间，考虑缓存和CDN'
        })
      }

      if (metrics.tbt && metrics.tbt > 300) {
        tips.push({
          metric: 'TBT',
          status: metrics.tbt > 600 ? 'error' : 'warning',
          tip: '减少长任务，优化JavaScript执行时间'
        })
      }

      setOptimizationTips(tips)
    }

    // 定期更新优化建议
    const interval = setInterval(generateOptimizationTips, 1000)

    // 快捷键切换显示 (Shift + M)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'M') {
        setShowMetrics(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearInterval(interval)
    }
  }, [metrics])

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

  const tipStatusColors = {
    good: 'border-green-500 bg-green-500/10 text-green-400',
    warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
    error: 'border-red-500 bg-red-500/10 text-red-400',
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-xl p-4 shadow-xl max-w-xs">
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

        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">TTI</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[getStatus(metrics.tti, 3800, 7300) as keyof typeof statusColors]}`} />
            <span className="text-white font-mono">{formatMs(metrics.tti)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400">TBT</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[getStatus(metrics.tbt, 300, 600) as keyof typeof statusColors]}`} />
            <span className="text-white font-mono">{formatMs(metrics.tbt)}</span>
          </div>
        </div>
      </div>

      {optimizationTips.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <h4 className="text-white text-xs font-semibold mb-2">优化建议</h4>
          <div className="space-y-2">
            {optimizationTips.map((tip, index) => (
              <div key={index} className={`border ${tipStatusColors[tip.status]} rounded-md p-2 text-xs`}>
                <span className="font-medium">{tip.metric}:</span> {tip.tip}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-500">
        Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">M</kbd> to toggle
      </div>
    </div>
  )
}
