'use client'

import { useState } from 'react'

interface SkinSelectorProps {
  currentSkin: string
  setCurrentSkin: (skin: string) => void
}

export default function SkinSelector({ currentSkin, setCurrentSkin }: SkinSelectorProps) {
  const [skins] = useState([
    { id: 'default', name: '经典白', color: 'from-gray-100 to-gray-100' },
    { id: 'blue', name: '海洋蓝', color: 'from-blue-100 to-blue-200' },
    { id: 'pink', name: '樱花粉', color: 'from-pink-100 to-pink-200' },
    { id: 'purple', name: '薰衣草紫', color: 'from-purple-100 to-purple-200' },
    { id: 'green', name: '清新绿', color: 'from-green-100 to-green-200' },
  ])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
        <span>🎨</span>
        <span>更换皮肤</span>
      </h3>

      <div className="grid grid-cols-5 gap-2">
        {skins.map((skin) => (
          <button
            key={skin.id}
            onClick={() => setCurrentSkin(skin.id)}
            className={`h-12 rounded-lg bg-gradient-to-br ${skin.color} border-2 transition-all hover:scale-105 ${
              currentSkin === skin.id ? 'border-blue-500 shadow-md' : 'border-gray-200'
            }`}
            title={skin.name}
          />
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        当前：{skins.find(s => s.id === currentSkin)?.name}
      </p>
    </div>
  )
}
