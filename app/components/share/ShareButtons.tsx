'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
  description?: string
}

export default function ShareButtons({ title, url, description = '' }: ShareButtonsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)
  const shareDesc = encodeURIComponent(description)

  const shareLinks = {
    wechat: ``,
    weibo: `https://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}`,
    qq: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareUrl}&title=${shareTitle}&desc=${shareDesc}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`,
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const handleShare = (platform: string) => {
    if (platform === 'wechat') {
      // 微信需要特殊处理，显示二维码
      setShowShareMenu(false)
      alert('请复制链接后在微信中打开')
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank')
    }
  }

  return (
    <div className="relative">
      {/* 分享按钮 */}
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span className="text-sm">分享</span>
      </button>

      {/* 分享菜单 */}
      {showShareMenu && (
        <>
          {/* 遮罩 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* 菜单 */}
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden z-50 animate-scale-in">
            {/* 标题 */}
            <div className="px-4 py-3 border-b border-gray-800">
              <h3 className="text-white font-medium">分享到</h3>
            </div>

            {/* 分享平台 */}
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleShare('wechat')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-800 transition"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.053l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.349-8.596-6.349z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">微信</span>
                </button>

                <button
                  onClick={() => handleShare('weibo')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-800 transition"
                >
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.388.622-1.202.894-1.818.607-.607-.278-.793-.99-.402-1.607.383-.612 1.187-.881 1.795-.607.614.278.803.986.415 1.604-.033.053.033-.053 0 0zm1.098-.987c-.142.23-.462.344-.704.23-.237-.109-.32-.424-.18-.659.137-.23.452-.342.69-.23.239.11.32.424.18.659-.014.023.028-.046.014 0zm6.328-2.825c-.657 2.526-3.504 3.98-6.354 3.238-2.85-.74-4.623-3.39-3.966-5.916.655-2.521 3.45-3.975 6.3-3.238 2.85.74 4.628 3.39 3.967 5.916-.019.072.072-.276 0 0zm-3.348-3.348c-1.227-.32-2.45.143-2.733 1.033-.287.89.476 1.874 1.703 2.194 1.225.32 2.448-.143 2.733-1.033.285-.89-.476-1.874-1.703-2.194z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">微博</span>
                </button>

                <button
                  onClick={() => handleShare('qq')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-800 transition"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.003 2c-5.523 0-9.997 4.474-9.997 9.997 0 4.22 2.614 7.826 6.322 9.27.469.094.641-.203.641-.45 0-.223-.009-.815-.013-1.6-2.591.564-3.137-1.25-3.137-1.25-.424-1.079-1.036-1.367-1.036-1.367-.848-.58.064-.568.064-.568.938.066 1.431.964 1.431.964.834 1.43 2.193 1.017 2.727.777.085-.604.326-1.017.593-1.25-2.074-.236-4.253-1.037-4.253-4.615 0-1.02.365-1.853.963-2.508-.096-.237-.417-1.189.091-2.478 0 0 .785-.251 2.575.959.747-.207 1.547-.311 2.343-.314.795.003 1.595.107 2.343.314 1.789-1.21 2.573-.959 2.573-.959.51 1.289.189 2.241.093 2.478.6.655.962 1.488.962 2.508 0 3.589-2.183 4.379-4.262 4.61.334.289.633.859.633 1.731 0 1.251-.011 2.259-.011 2.567 0 .25.17.549.646.454 3.705-1.447 6.317-5.052 6.317-9.272C21.997 6.474 17.523 2 12.003 2z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">QQ</span>
                </button>

                <button
                  onClick={() => handleShare('twitter')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-800 transition"
                >
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">Twitter</span>
                </button>

                <button
                  onClick={() => handleShare('facebook')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-800 transition"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">Facebook</span>
                </button>

                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-800 transition"
                >
                  <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">LinkedIn</span>
                </button>
              </div>

              {/* 复制链接 */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-400">已复制</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>复制链接</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
