'use client'

import { useState, useEffect } from 'react'
import { User } from '@/lib/supabase'

interface UserMenuProps {
  onLoginClick?: () => void
}

export default function UserMenu({ onLoginClick }: UserMenuProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 从 localStorage 获取用户信息
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('auth_token')
    setUser(null)
    setIsOpen(false)
  }

  if (!user) {
    return (
      <button
        onClick={onLoginClick}
        className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
      >
        登录
      </button>
    )
  }

  return (
    <div className="relative">
      {/* User Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.username || '用户'}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user.username?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 hidden md:block">
          {user.username || '用户'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user.username || '用户'}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            
            <button
              onClick={() => {
                // TODO: 个人中心
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              个人中心
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition"
            >
              退出登录
            </button>
          </div>
        </>
      )}
    </div>
  )
}
