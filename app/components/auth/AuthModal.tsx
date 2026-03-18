'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function AuthModal() {
  const { 
    authMode, 
    closeAuthModal, 
    login, 
    register 
  } = useAuth();

  // 登录表单状态
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // 注册表单状态
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState('');

  // 处理登录
  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('请输入邮箱和密码');
      return;
    }
    
    setIsLoggingIn(true);
    setLoginError('');
    
    try {
      await login(loginEmail, loginPassword);
    } catch (error) {
      setLoginError('登录失败，请检查邮箱和密码');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 处理注册
  const handleRegister = async () => {
    if (!registerName.trim() || !registerEmail.trim() || !registerPassword.trim()) {
      setRegisterError('请填写完整信息');
      return;
    }
    
    setIsRegistering(true);
    setRegisterError('');
    
    try {
      await register(registerName, registerEmail, registerPassword);
    } catch (error) {
      setRegisterError('注册失败，请稍后重试');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-slideUp">
        {/* 顶部栏 */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
          <h3 className="text-white font-medium text-lg">{authMode === 'login' ? '登录' : '注册'}</h3>
          <button 
            onClick={closeAuthModal}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 标签切换 */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => closeAuthModal()}
            className={`flex-1 py-3 text-center transition-all duration-300 ${
              authMode === 'login' 
                ? 'text-white border-b-2 border-red-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            登录
          </button>
          <button
            onClick={() => closeAuthModal()}
            className={`flex-1 py-3 text-center transition-all duration-300 ${
              authMode === 'register' 
                ? 'text-white border-b-2 border-red-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            注册
          </button>
        </div>

        {/* 表单 */}
        <div className="p-6">
          {/* 登录表单 */}
          {authMode === 'login' ? (
            <>
              {loginError && (
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm">{loginError}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">邮箱</label>
                  <input
                    type="email"
                    placeholder="请输入邮箱"
                    className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">密码</label>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 bg-white/10 border-white/30 rounded text-red-500 focus:ring-red-500"
                    />
                    <label htmlFor="remember" className="text-white text-sm">记住密码</label>
                  </div>
                  <button className="text-red-400 text-sm hover:text-red-300 transition-colors">
                    忘记密码？
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 注册表单 */}
              {registerError && (
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm">{registerError}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">用户名</label>
                  <input
                    type="text"
                    placeholder="请输入用户名"
                    className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">邮箱</label>
                  <input
                    type="email"
                    placeholder="请输入邮箱"
                    className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">密码</label>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* 底部操作栏 */}
        <div className="p-4 border-t border-white/10 bg-gradient-to-r from-gray-900 to-gray-800">
          {authMode === 'login' ? (
            <button
              onClick={handleLogin}
              disabled={isLoggingIn || !loginEmail.trim() || !loginPassword.trim()}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>登录中...</span>
                </div>
              ) : (
                '登录'
              )}
            </button>
          ) : (
            <button
              onClick={handleRegister}
              disabled={isRegistering || !registerName.trim() || !registerEmail.trim() || !registerPassword.trim()}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRegistering ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>注册中...</span>
                </div>
              ) : (
                '注册'
              )}
            </button>
          )}

          {/* 其他登录方式 */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-gray-400 text-sm">其他登录方式</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>
            <div className="flex justify-center gap-6">
              <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                  <path d="M9.75 15.02l5.75-3.27-5.75-3.27z" />
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 注册/登录切换 */}
          <div className="mt-4 text-center">
            {authMode === 'login' ? (
              <>
                <span className="text-gray-400 text-sm">还没有账号？</span>
                <button 
                  onClick={() => closeAuthModal()}
                  className="text-red-400 text-sm hover:text-red-300 transition-colors ml-1 font-medium"
                >
                  立即注册
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-400 text-sm">已有账号？</span>
                <button 
                  onClick={() => closeAuthModal()}
                  className="text-red-400 text-sm hover:text-red-300 transition-colors ml-1 font-medium"
                >
                  立即登录
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
