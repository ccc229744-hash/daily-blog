'use client'

import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light' | 'auto'
type AccentColor = 'red' | 'blue' | 'green' | 'purple' | 'orange'

interface ThemePreset {
  name: string
  primary: string
  secondary: string
  background: string
}

const themePresets: Record<string, ThemePreset> = {
  default: {
    name: '默认主题',
    primary: 'from-red-500 to-pink-500',
    secondary: 'from-purple-500 to-pink-500',
    background: 'bg-gray-950',
  },
  ocean: {
    name: '海洋主题',
    primary: 'from-blue-500 to-cyan-500',
    secondary: 'from-cyan-500 to-teal-500',
    background: 'bg-slate-950',
  },
  forest: {
    name: '森林主题',
    primary: 'from-green-500 to-emerald-500',
    secondary: 'from-emerald-500 to-teal-500',
    background: 'bg-green-950',
  },
  sunset: {
    name: '日落主题',
    primary: 'from-orange-500 to-red-500',
    secondary: 'from-red-500 to-pink-500',
    background: 'bg-orange-950',
  },
  midnight: {
    name: '午夜主题',
    primary: 'from-purple-500 to-indigo-500',
    secondary: 'from-indigo-500 to-blue-500',
    background: 'bg-purple-950',
  },
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [accentColor, setAccentColor] = useState<AccentColor>('red')
  const [currentPreset, setCurrentPreset] = useState('default')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 应用主题
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme === 'auto' ? 'dark' : theme)

    // 保存偏好
    localStorage.setItem('theme', theme)
    localStorage.setItem('accentColor', accentColor)
    localStorage.setItem('themePreset', currentPreset)
  }, [theme, accentColor, currentPreset])

  const applyPreset = (presetKey: string) => {
    setCurrentPreset(presetKey)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* 主题切换按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {/* 主题面板 */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden">
            {/* 头部 */}
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-white font-bold">主题设置</h3>
              <p className="text-gray-400 text-xs mt-1">自定义你的博客外观</p>
            </div>

            {/* 内容 */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {/* 主题预设 */}
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-2">主题预设</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(themePresets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key)}
                      className={`p-3 rounded-xl border-2 transition ${
                        currentPreset === key
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className={`h-8 rounded-lg bg-gradient-to-r ${preset.primary} mb-2`} />
                      <div className="text-xs text-white">{preset.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 强调色 */}
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-2">强调色</h4>
                <div className="flex gap-2">
                  {(['red', 'blue', 'green', 'purple', 'orange'] as AccentColor[]).map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-8 h-8 rounded-full transition ${
                        accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
                      }`}
                      style={{
                        background: `var(--color-${color}-500)`,
                        backgroundColor: color === 'red' ? '#ef4444' :
                                        color === 'blue' ? '#3b82f6' :
                                        color === 'green' ? '#22c55e' :
                                        color === 'purple' ? '#a855f7' :
                                        '#f97316',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 明暗模式 */}
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-2">明暗模式</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 p-2 rounded-xl border-2 transition ${
                      theme === 'light' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-800'
                    }`}
                  >
                    ☀️ 明亮
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 p-2 rounded-xl border-2 transition ${
                      theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-800'
                    }`}
                  >
                    🌙 黑暗
                  </button>
                  <button
                    onClick={() => setTheme('auto')}
                    className={`flex-1 p-2 rounded-xl border-2 transition ${
                      theme === 'auto' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-800'
                    }`}
                  >
                    🤖 自动
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
