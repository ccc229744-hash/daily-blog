'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center">
        {/* 加载动画 */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 border-r-pink-500 animate-spin"
            style={{ 
              animation: 'spin 1s linear infinite',
              animationDuration: '0.8s'
            }}
          ></div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-500 to-pink-600 animate-pulse"></div>
        </div>

        {/* 进度条 */}
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-pink-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 加载文字 */}
        <p className="text-white text-sm font-medium animate-pulse">
          加载中...
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
