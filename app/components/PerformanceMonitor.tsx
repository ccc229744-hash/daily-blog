'use client';

import { useEffect, useState } from 'react';

interface WebVitals {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<WebVitals>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 监听 Web Vitals
    const reportMetric = (name: string, value: number) => {
      setMetrics(prev => ({ ...prev, [name.toLowerCase()]: value }));
      console.log(`[Performance] ${name}:`, value);
    };

    // FCP (First Contentful Paint)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportMetric('FCP', entry.startTime);
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });

    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      reportMetric('LCP', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // TTFB (Time to First Byte) - 通过 navigation timing
    if (performance.getEntriesByType) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
        reportMetric('TTFB', navEntry.responseStart);
      }
    }

    // 快捷键切换显示（Shift + P）
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isVisible) return null;

  const getRating = (value: number | undefined, good: number, poor: number) => {
    if (!value) return '⚪';
    if (value <= good) return '🟢';
    if (value <= poor) return '🟡';
    return '🔴';
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-black/90 backdrop-blur-md rounded-lg p-3 text-xs text-white shadow-lg border border-white/10">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
        <span className="font-bold">⚡ 性能监控</span>
        <span className="text-gray-400 text-[10px]">Shift+P 隐藏</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span>FCP:</span>
          <span>{getRating(metrics.fcp, 1800, 3000)} {metrics.fcp?.toFixed(0) || '-'}ms</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>LCP:</span>
          <span>{getRating(metrics.lcp, 2500, 4000)} {metrics.lcp?.toFixed(0) || '-'}ms</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>TTFB:</span>
          <span>{getRating(metrics.ttfb, 800, 1800)} {metrics.ttfb?.toFixed(0) || '-'}ms</span>
        </div>
      </div>

      {/* 评级说明 */}
      <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-gray-400">
        🟢 优秀 🟡 一般 🔴 需优化
      </div>
    </div>
  );
}
