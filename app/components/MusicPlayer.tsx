'use client'

import { useState } from 'react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack] = useState({
    title: '博客背景音乐',
    artist: '轻音乐',
    duration: '3:45',
  })

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-4 text-white mb-4">
      <div className="flex items-center gap-3">
        {/* 专辑封面 */}
        <div className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl ${
          isPlaying ? 'animate-spin' : ''
        }`}>
          🎵
        </div>

        {/* 歌曲信息 */}
        <div className="flex-1">
          <p className="text-sm font-bold">{currentTrack.title}</p>
          <p className="text-xs text-white/70">{currentTrack.artist}</p>
        </div>

        {/* 播放控制 */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      {/* 进度条 */}
      <div className="mt-3">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white w-1/3 rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-white/70 mt-1">
          <span>1:15</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>
    </div>
  )
}
