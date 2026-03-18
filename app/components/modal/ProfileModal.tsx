'use client';

import { useAuth } from '../auth/AuthContext';
import Image from 'next/image';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { isLoggedIn, userInfo, openAuthModal } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden animate-slideUp">
        <div className="p-6">
          {/* 用户信息 */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {userInfo ? (
                    <Image
                      src={userInfo.avatar}
                      alt={userInfo.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
            <h3 className="text-white font-medium text-lg">
              {userInfo ? userInfo.name : '未登录'}
            </h3>
            <p className="text-gray-400 text-sm">
              {userInfo ? userInfo.email : '请登录以使用更多功能'}
            </p>
          </div>

          {/* 功能菜单 */}
          <div className="space-y-3">
            {isLoggedIn ? (
              <>
                <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <span className="text-white">我的收藏</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <span className="text-white">历史记录</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <span className="text-white">设置</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition"
              >
                立即登录
              </button>
            )}
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
