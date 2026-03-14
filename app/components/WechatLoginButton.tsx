'use client'

import { useState } from 'react'

interface WechatLoginProps {
  onSuccess: (user: any) => void
  onError: (error: Error) => void
}

export default function WechatLoginButton({ onSuccess, onError }: WechatLoginProps) {
  const [isLoading, setIsLoading] = useState(false)

  // 微信开放平台 APP ID（需要替换成你的）
  const WECHAT_APPID = process.env.NEXT_PUBLIC_WECHAT_APPID || 'wx1234567890abcdef'
  const WECHAT_REDIRECT_URI = typeof window !== 'undefined' 
    ? window.location.origin + '/api/auth/wechat/callback'
    : ''

  // 判断是否在微信浏览器内
  const isWechat = typeof navigator !== 'undefined' && /micromessenger/i.test(navigator.userAgent)

  const handleWechatLogin = () => {
    setIsLoading(true)
    
    // 移动端 H5 登录：跳转到微信授权页
    const wechatAuthUrl = `https://open.weixin.qq.com/connect/oauth2/snsapi/userinfo?` + new URLSearchParams({
      appid: WECHAT_APPID,
      redirect_uri: WECHAT_REDIRECT_URI,
      response_type: 'code',
      scope: 'snsapi_userinfo',
      state: 'wechat_login_' + Date.now(),
    }).toString() + '#wechat_redirect'
    
    // 跳转微信授权页
    window.location.href = wechatAuthUrl
    
    // 30 秒超时检查
    setTimeout(() => {
      setIsLoading(false)
    }, 30000)
  }

  return (
    <button
      onClick={handleWechatLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#07C160] text-white rounded-xl font-medium hover:bg-[#06AD56] transition disabled:opacity-50"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.5 10.5h1v1h-1v-1zm4 0h1v1h-1v-1z"/>
        <path d="M12 2C6.48 2 2 5.98 2 10.89c0 2.79 1.5 5.29 3.84 7.01-.16.73-.53 1.79-.96 2.63-.13.26.13.56.41.43 2.56-1.18 4.3-2.32 5.34-3.07.44.07.89.11 1.37.11 5.52 0 10-3.98 10-8.89S17.52 2 12 2zm-5 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm6 0c-.83 0-1.5-.7-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
      {isLoading ? '登录中...' : (isWechat ? '微信一键登录' : '微信登录')}
    </button>
  )
}
