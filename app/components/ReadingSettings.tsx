'use client'

import { useState } from 'react'

export default function ReadingSettings() {
  const [fontSize, setFontSize] = useState(16)
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light')
  const [showSettings, setShowSettings] = useState(false)

  const themes = {
    light: { bg: 'bg-white', text: 'text-gray-900', label: '日间' },
    dark: { bg: 'bg-gray-900', text: 'text-gray-100', label: '夜间' },
    sepia: { bg: 'bg-amber-50', text: 'text-amber-900', label: '护眼' },
  }

  return (
    <>
      {/* 设置按钮 */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed right-4 top-24 z-40 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        aria-label="阅读设置"
        title="阅读设置"
      >
        <span className="text-xl">⚙️</span>
      </button>

      {/* 设置面板 */}
      {showSettings && (
        <div className="fixed right-20 top-24 z-40 bg-white rounded-xl shadow-2xl p-6 w-72 animate-scale-in">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>⚙️</span>
            <span>阅读设置</span>
          </h3>

          {/* 主题切换 */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">阅读主题</p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(themes) as Array<keyof typeof themes>).map((key) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`py-2 rounded-lg text-sm font-medium transition ${
                    theme === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {themes[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* 字体大小 */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">字体大小</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
              >
                <span className="text-sm">A-</span>
              </button>
              <div className="flex-1 text-center">
                <span className="text-lg font-bold text-gray-900">{fontSize}px</span>
              </div>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="w-8 h-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
              >
                <span className="text-lg">A+</span>
              </button>
            </div>
          </div>

          {/* 快捷键提示 */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              💡 快捷键：← 上一章 · → 下一章
            </p>
          </div>
        </div>
      )}
    </>
  )
}
