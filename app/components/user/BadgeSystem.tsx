'use client'

import { useState } from 'react'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earnedDate?: string
}

interface BadgeSystemProps {
  userId: string
}

export default function BadgeSystem({ userId }: BadgeSystemProps) {
  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: '首篇文章',
      description: '发布第一篇文章',
      icon: '📝',
      unlocked: true,
      rarity: 'common',
      earnedDate: '2026-03-01',
    },
    {
      id: '2',
      name: '人气作者',
      description: '单篇文章阅读量破万',
      icon: '🔥',
      unlocked: true,
      rarity: 'rare',
      earnedDate: '2026-03-05',
    },
    {
      id: '3',
      name: '日更达人',
      description: '连续日更 30 天',
      icon: '📅',
      unlocked: false,
      rarity: 'epic',
    },
    {
      id: '4',
      name: '社区之星',
      description: '获得 1000 个赞',
      icon: '⭐',
      unlocked: false,
      rarity: 'legendary',
    },
    {
      id: '5',
      name: '优质创作者',
      description: '发布 10 篇优质文章',
      icon: '✨',
      unlocked: true,
      rarity: 'rare',
      earnedDate: '2026-03-10',
    },
    {
      id: '6',
      name: '评论达人',
      description: '发表 100 条评论',
      icon: '💬',
      unlocked: false,
      rarity: 'common',
    },
  ])

  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-400 to-cyan-500',
    epic: 'from-purple-400 to-pink-500',
    legendary: 'from-yellow-400 to-orange-500',
  }

  const rarityBorders = {
    common: 'border-gray-600',
    rare: 'border-blue-500',
    epic: 'border-purple-500',
    legendary: 'border-yellow-500',
  }

  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">我的徽章</h3>
        <span className="text-sm text-gray-400">
          {unlockedCount} / {badges.length}
        </span>
      </div>

      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>收集进度</span>
          <span>{Math.round((unlockedCount / badges.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-500"
            style={{ width: `${(unlockedCount / badges.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 徽章网格 */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative group p-4 rounded-xl border-2 ${
              badge.unlocked
                ? `${rarityBorders[badge.rarity]} bg-gray-800/50`
                : 'border-gray-800 bg-gray-800/30 opacity-50'
            } transition-all duration-300 hover:scale-105`}
          >
            {/* 徽章图标 */}
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${
              badge.unlocked
                ? rarityColors[badge.rarity]
                : 'from-gray-600 to-gray-700'
            } flex items-center justify-center text-2xl`}>
              {badge.icon}
            </div>

            {/* 徽章名称 */}
            <div className="text-center">
              <div className={`text-xs font-bold ${
                badge.unlocked ? 'text-white' : 'text-gray-500'
              }`}>
                {badge.name}
              </div>
              {badge.earnedDate && (
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(badge.earnedDate).toLocaleDateString('zh-CN')}
                </div>
              )}
            </div>

            {/* 稀有度标签 */}
            {badge.unlocked && (
              <span className={`absolute top-2 right-2 px-1.5 py-0.5 text-[10px] rounded-full ${
                badge.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                badge.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                badge.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {badge.rarity === 'common' && '普通'}
                {badge.rarity === 'rare' && '稀有'}
                {badge.rarity === 'epic' && '史诗'}
                {badge.rarity === 'legendary' && '传说'}
              </span>
            )}

            {/* 悬停提示 */}
            <div className="absolute inset-0 bg-black/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 pointer-events-none">
              <div className="text-center">
                <div className="text-white text-sm font-bold mb-1">{badge.name}</div>
                <div className="text-gray-400 text-xs">{badge.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 更多徽章提示 */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          继续创作解锁更多专属徽章 🎯
        </p>
      </div>
    </div>
  )
}
