'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import SEO from './components/SEO';
import SearchModal from './components/SearchModal';
import PerformanceMonitor from './components/PerformanceMonitor';
import { xhsArticles } from '../data/articles';
import WorksGrid from './components/WorksGrid';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './components/auth/AuthContext';

// 懒加载组件
const ProfileModal = lazy(() => import('./components/modal/ProfileModal'));
const CreateContentModal = lazy(() => import('./components/modal/CreateContentModal'));
const FriendsModal = lazy(() => import('./components/modal/FriendsModal'));
const ChatModal = lazy(() => import('./components/modal/ChatModal'));

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen: string;
  isFollowing: boolean;
}

export default function HomePage() {
  const { isLoggedIn, userInfo, openAuthModal } = useAuth();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChatFriend, setSelectedChatFriend] = useState<Friend | null>(null);

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理聊天
  const handleChat = (friend: Friend) => {
    setSelectedChatFriend(friend);
    setShowChat(true);
  };

  // 打开创建弹窗
  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  // 格式化数字
  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <>
      <SEO
        title="每日博客 - 抖音风格"
        description="发现更多有趣的技术文章和生活分享"
      />

      {/* 顶部导航 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50
          ? 'bg-black/95 backdrop-blur-md'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-red-500 font-bold text-lg">每</span>
            </div>
            <span className="font-bold text-lg text-white">每日博客</span>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 mx-4 px-4 py-2 rounded-full flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm">搜索文章/作者</span>
          </button>

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {/* 个人中心弹窗 */}
      <Suspense fallback={null}>
        <ProfileModal 
          isOpen={showProfile} 
          onClose={() => setShowProfile(false)} 
        />
      </Suspense>

      {/* 创建内容弹窗 */}
      <Suspense fallback={null}>
        <CreateContentModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />
      </Suspense>

      {/* 好友弹窗 */}
      <Suspense fallback={null}>
        <FriendsModal 
          isOpen={showFriendsModal} 
          onClose={() => setShowFriendsModal(false)} 
          onChat={handleChat}
        />
      </Suspense>

      {/* 聊天弹窗 */}
      <Suspense fallback={null}>
        <ChatModal 
          isOpen={showChat} 
          onClose={() => setShowChat(false)} 
          friend={selectedChatFriend}
        />
      </Suspense>

      <main className="min-h-screen bg-black pb-20 pt-20">
        {/* 瀑布流布局 */}
        <div className="px-2">
          <div className="grid grid-cols-2 gap-2 max-w-4xl mx-auto">
            {xhsArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/posts/${article.id}`}
                className="group block"
              >
                <article className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={300}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {index % 3 === 0 && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-medium text-white mb-2 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {article.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Image
                          src={article.avatar}
                          alt={article.author}
                          width={20}
                          height={20}
                          className="w-5 h-5 rounded-full bg-gray-800"
                        />
                        <span className="text-xs text-gray-400 truncate max-w-[80px]">
                          {article.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-gray-400">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span className="text-xs">{formatNumber(article.likes)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-full shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all">
            加载更多
          </button>
        </div>
      </main>

      {/* 用户作品展示区 */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              最新作品
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              发现社区精彩创作
            </p>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"
            >
              查看更多
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <WorksGrid limit={6} showFilter={false} />
        </div>
      </section>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 safe-area-pb z-50">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-1 text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium">首页</span>
          </Link>
          <button
            onClick={() => setShowFriendsModal(true)}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs">好友</span>
          </button>
          <button
            onClick={handleCreateClick}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-white to-red-500 rounded-full flex items-center justify-center -mt-4 shadow-lg">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
          <Link href="/single" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-xs">单列</span>
          </Link>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">我的</span>
          </button>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <PerformanceMonitor />
    </>
  );
}
