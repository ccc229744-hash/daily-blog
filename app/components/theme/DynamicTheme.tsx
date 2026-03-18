'use client'

import { useState, useEffect } from 'react'

export default function DynamicTheme() {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon')
  const [autoSwitch, setAutoSwitch] = useState(true)

  useEffect(() => {
    if (!autoSwitch) return

    const updateTimeTheme = () => {
      const hour = new Date().getHours()
      let theme: typeof timeOfDay

      if (hour >= 5 && hour < 11) {
        theme = 'morning'
      } else if (hour >= 11 && hour < 17) {
        theme = 'afternoon'
      } else if (hour >= 17 && hour < 22) {
        theme = 'evening'
      } else {
        theme = 'night'
      }

      setTimeOfDay(theme)

      // 应用主题类
      const root = document.documentElement
      root.setAttribute('data-time-theme', theme)
    }

    updateTimeTheme()
    const interval = setInterval(updateTimeTheme, 60000) // 每分钟更新

    return () => clearInterval(interval)
  }, [autoSwitch])

  const themes = {
    morning: {
      name: '清晨',
      icon: '🌅',
      gradient: 'from-orange-400 via-pink-400 to-purple-400',
      bg: 'from-orange-950 via-purple-950 to-slate-950',
      description: '一日之计在于晨',
    },
    afternoon: {
      name: '午后',
      icon: '☀️',
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      bg: 'from-blue-950 via-cyan-950 to-teal-950',
      description: '阳光明媚的时光',
    },
    evening: {
      name: '黄昏',
      icon: '🌇',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bg: 'from-orange-950 via-red-950 to-pink-950',
      description: '夕阳无限好',
    },
    night: {
      name: '深夜',
      icon: '🌙',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      bg: 'from-slate-950 via-indigo-950 to-purple-950',
      description: '静谧的夜晚',
    },
  }

  const currentTheme = themes[timeOfDay]

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">动态主题</h3>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={autoSwitch}
            onChange={(e) => setAutoSwitch(e.target.checked)}
            className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-red-500 focus:ring-red-500"
          />
          自动切换
        </label>
      </div>

      {/* 当前主题 */}
      <div className={`bg-gradient-to-r ${currentTheme.gradient} rounded-xl p-6 mb-6`}>
        <div className="text-4xl mb-2">{currentTheme.icon}</div>
        <h4 className="text-2xl font-bold text-white mb-1">{currentTheme.name}</h4>
        <p className="text-white/80">{currentTheme.description}</p>
      </div>

      {/* 主题预览 */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(themes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => {
              setAutoSwitch(false)
              setTimeOfDay(key as typeof timeOfDay)
              document.documentElement.setAttribute('data-time-theme', key)
            }}
            className={`p-3 rounded-xl border-2 transition ${
              timeOfDay === key
                ? 'border-white bg-white/10'
                : 'border-gray-800 hover:border-gray-700'
            }`}
          >
            <div className={`h-12 rounded-lg bg-gradient-to-br ${theme.gradient} mb-2`} />
            <div className="text-xs text-white">{theme.icon} {theme.name}</div>
          </button>
        ))}
      </div>

      {/* 说明 */}
      <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500">
        <p>• 清晨 (5:00-11:00)</p>
        <p>• 午后 (11:00-17:00)</p>
        <p>• 黄昏 (17:00-22:00)</p>
        <p>• 深夜 (22:00-5:00)</p>
      </div>
    </div>
  )
}
