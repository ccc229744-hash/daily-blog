'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
  description?: string
}

export default function ShareButtons({ title, url, description = '' }: ShareButtonsProps) {
  const [showQR, setShowQR] = useState(false)

  // 微信分享（生成二维码）
  const shareWechat = () => {
    setShowQR(!showQR)
  }

  // QQ 分享
  const shareQQ = () => {
    const shareUrl = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`
    window.open(shareUrl, '_blank')
  }

  // 微博分享
  const shareWeibo = () => {
    const shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
    window.open(shareUrl, '_blank')
  }

  // 复制链接 - 使用真实域名
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url.replace('your-domain.com', 'beibei.openclaw.ai'))
      alert('链接已复制！')
    } catch (err) {
      alert('复制失败，请手动复制')
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">分享到：</span>
      
      {/* 微信 */}
      <button
        onClick={shareWechat}
        className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition"
        aria-label="分享到微信"
      >
        <span>微信</span>
      </button>

      {/* QQ */}
      <button
        onClick={shareQQ}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-400 text-white rounded-full text-sm hover:bg-blue-500 transition"
        aria-label="分享到 QQ"
      >
        <span>QQ</span>
      </button>

      {/* 微博 */}
      <button
        onClick={shareWeibo}
        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
        aria-label="分享到微博"
      >
        <span>微博</span>
      </button>

      {/* 复制链接 */}
      <button
        onClick={copyLink}
        className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 text-white rounded-full text-sm hover:bg-gray-800 transition"
        aria-label="复制链接"
      >
        <span>复制</span>
      </button>

      {/* 微信二维码弹窗 */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowQR(false)}>
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">微信扫码分享</h3>
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {/* TODO: 使用二维码生成库生成真实二维码 */}
                <div className="text-center text-gray-500">
                  <p className="text-4xl mb-2">📱</p>
                  <p className="text-sm">二维码生成中...</p>
                  <p className="text-xs mt-2">{url}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">打开手机微信扫描二维码</p>
              <button
                onClick={() => setShowQR(false)}
                className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
