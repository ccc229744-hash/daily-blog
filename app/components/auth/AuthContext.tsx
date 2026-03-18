'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: User | null;
  showAuthModal: boolean;
  authMode: 'login' | 'register';
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 从 localStorage 初始化状态
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  });
  
  const [userInfo, setUserInfo] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('userInfo');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // 持久化状态到 localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [isLoggedIn, userInfo]);

  // 登录函数
  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: '用户 123',
          email: email,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user123'
        };
        
        setUserInfo(mockUser);
        setIsLoggedIn(true);
        setShowAuthModal(false);
        resolve();
      }, 1500);
    });
  };

  // 注册函数
  const register = async (name: string, email: string, password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        };
        
        setUserInfo(newUser);
        setIsLoggedIn(true);
        setShowAuthModal(false);
        resolve();
      }, 1500);
    });
  };

  // 登出函数
  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  // 打开认证弹窗
  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // 关闭认证弹窗
  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const value: AuthContextType = {
    isLoggedIn,
    userInfo,
    showAuthModal,
    authMode,
    login,
    register,
    logout,
    openAuthModal,
    closeAuthModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
