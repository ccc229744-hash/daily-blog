'use client'

import { useState } from 'react'

interface QQLoginProps {
  onSuccess: (user: any) => void
  onError: (error: Error) => void
}

export default function QQLoginButton({ onSuccess, onError }: QQLoginProps) {
  const [isLoading, setIsLoading] = useState(false)

  // QQ 互联 APP ID（需要替换成你的）
  const QQ_APP_ID = process.env.NEXT_PUBLIC_QQ_APP_ID || '123456789'
  const QQ_REDIRECT_URI = typeof window !== 'undefined' 
    ? window.location.origin + '/api/auth/qq/callback'
    : ''

  const handleQQLogin = () => {
    setIsLoading(true)
    
    // 移动端 H5 登录：跳转到 QQ 授权页
    const qqAuthUrl = `https://graph.qq.com/oauth2.0/authorize?` + new URLSearchParams({
      response_type: 'code',
      client_id: QQ_APP_ID,
      redirect_uri: QQ_REDIRECT_URI,
      scope: 'get_user_info',
      state: 'qq_login_' + Date.now(),
    }).toString()
    
    // 跳转 QQ 授权页
    window.location.href = qqAuthUrl
    
    // 30 秒超时检查
    setTimeout(() => {
      setIsLoading(false)
    }, 30000)
  }

  return (
    <button
      onClick={handleQQLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#12B7F5] text-white rounded-xl font-medium hover:bg-[#0FA8E3] transition disabled:opacity-50"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.5 2 5.5 4.5 5.5 8c0 1.5.5 2.5 1 3.5V14c0 2.5 2 4.5 4.5 4.5h2c2.5 0 4.5-2 4.5-4.5v-2.5c.5-1 1-2 1-3.5 0-3.5-3-6-6.5-6z"/>
      </svg>
      {isLoading ? '登录中...' : 'QQ 登录'}
    </button>
  )
}
