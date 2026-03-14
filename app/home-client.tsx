'use client'

import QzoneFeed from '@/app/components/QzoneFeed'
import SubscribePopup from '@/app/components/SubscribePopup'
import { useState } from 'react'

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* QQ 空间风格动态 */}
      <QzoneFeed />
      
      {/* 订阅弹窗 */}
      <SubscribePopup />
    </div>
  )
}
