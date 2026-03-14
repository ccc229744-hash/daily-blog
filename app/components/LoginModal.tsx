'use client'

import { useState, useEffect } from 'react'
import WechatLoginButton from './WechatLoginButton'
import QQLoginButton from './QQLoginButton'

interface User {
  id: string
  email: string
  username: string
  avatar?: string
  created_at: string
}

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: (user: any) => void
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<'quick' | 'phone'>('quick')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // 处理登录成功
  const handleLoginSuccess = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user))
    onClose()
    if (onLoginSuccess) {
      onLoginSuccess(user)
    }
  }

  // 处理登录失败
  const handleLoginError = (error: Error) => {
    console.error('登录失败:', error)
    alert('登录失败：' + error.message)
  }

  // 发送验证码
  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      alert('请输入正确的手机号')
      return
    }

    setIsSendingCode(true)
    
    // 模拟发送验证码（实际项目中调用后端 API）
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setCountdown(60)
    setIsSendingCode(false)
    alert('验证码已发送（模拟：123456）')
  }

  // 倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // 手机号登录
  const handlePhoneLogin = async () => {
    if (!phoneNumber || !verifyCode) {
      alert('请输入手机号和验证码')
      return
    }

    if (verifyCode !== '123456') {
      alert('验证码错误')
      return
    }

    // 模拟登录成功
    const user = {
      id: 'phone_' + phoneNumber,
      username: '手机用户' + phoneNumber.slice(7),
      avatar: null,
      phone: phoneNumber,
      provider: 'phone',
    }

    handleLoginSuccess(user)
  }

  useEffect(() => {
    // 监听登录回调
    const handleLoginCallback = async () => {
      const hash = window.location.hash
      if (hash.includes('id_token')) {
        try {
          const params = new URLSearchParams(hash.substring(1))
          const idToken = params.get('id_token')
          
          if (idToken) {
            // 解析 token 获取用户信息
            const payload = JSON.parse(atob(idToken.split('.')[1]))
            
            // 保存用户到 Supabase
            const user: User = {
              id: payload.sub,
              email: payload.email,
              username: payload.username || payload.nickname,
              avatar: payload.picture,
              created_at: new Date().toISOString(),
            }
            
            // 存储到 localStorage
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('auth_token', idToken)
            
            // 清除 URL hash
            window.history.replaceState({}, document.title, window.location.pathname)
            
            // 关闭弹窗
            onClose()
            
            // 回调
            if (onLoginSuccess) {
              onLoginSuccess(user)
            }
          }
        } catch (error) {
          console.error('登录解析失败:', error)
        }
      }
    }

    handleLoginCallback()
  }, [onClose, onLoginSuccess])

  const handleLogin = (method: 'wechat' | 'qq') => {
    setIsLoggingIn(true)
    
    // TODO: 实现 Authing 授权 URL 构建
    // const loginUrl = buildAuthorizeUrl()
    // window.location.href = loginUrl
    
    alert('Authing 登录功能待实现，请先配置 Authing 密钥')
    setIsLoggingIn(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal - 移动端从底部弹出，桌面端居中 */}
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md sm:mx-4 shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-2 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎登录</h2>
          <p className="text-gray-600 text-sm">选择以下方式快速登录</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 mx-6">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-3 text-sm font-medium transition ${
              activeTab === 'quick'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500'
            }`}
          >
            快捷登录
          </button>
          <button
            onClick={() => setActiveTab('phone')}
            className={`flex-1 py-3 text-sm font-medium transition ${
              activeTab === 'phone'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500'
            }`}
          >
            手机号登录
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'quick' && (
            <div className="space-y-4">
              {/* WeChat Login */}
              <WechatLoginButton
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />

              {/* QQ Login */}
              <QQLoginButton
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />

              <p className="text-xs text-gray-500 text-center mt-6">
                快捷登录无需注册，自动创建账号
              </p>
            </div>
          )}

          {activeTab === 'phone' && (
            <div className="space-y-4">
              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  手机号
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="请输入手机号"
                  maxLength={11}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                />
              </div>

              {/* Verify Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  验证码
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="输入验证码"
                    maxLength={6}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  />
                  <button
                    onClick={handleSendCode}
                    disabled={countdown > 0 || isSendingCode}
                    className="px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition disabled:opacity-50 whitespace-nowrap"
                  >
                    {countdown > 0 ? `${countdown}秒` : '获取验证码'}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handlePhoneLogin}
                className="w-full py-3 px-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition mt-4"
              >
                登录
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                登录即表示同意
                <a href="/terms" className="text-green-600 hover:underline">服务条款</a>
                和
                <a href="/privacy" className="text-green-600 hover:underline">隐私政策</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
