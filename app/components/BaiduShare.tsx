'use client'

import { useState } from 'react'

export default function BaiduShare() {
  const [copied, setCopied] = useState(false)

  const shareToBaidu = () => {
    const title = document.title
    const url = window.location.href
    const shareUrl = `http://hi.baidu.com/share/home?uk=${encodeURIComponent(title)}&jumpFrom=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      alert('链接已复制！')
    } catch (err) {
      alert('复制失败')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={shareToBaidu}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
      >
        <span>百度</span>
      </button>

      <button
        onClick={copyLink}
        className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 text-white rounded text-sm hover:bg-gray-800 transition"
      >
        <span>{copied ? '已复制' : '复制链接'}</span>
      </button>
    </div>
  )
}
