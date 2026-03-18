'use client';

import { useState, useEffect } from 'react';
import SEO from './components/SEO';
import SearchModal from './components/SearchModal';
import PerformanceMonitor from './components/PerformanceMonitor';
import { xhsArticles } from '../data/articles';
import { searchUsers, User, allUsers } from '../data/users';
import { publishWork, getAllWorks, Work } from '../data/works';
import WorksGrid from './components/WorksGrid';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './components/auth/AuthContext';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen: string;
  isFollowing: boolean;
}

interface RecommendedFriend {
  id: number;
  name: string;
  avatar: string;
  commonFriends: number;
  isFollowing: boolean;
}

interface FriendRequest {
  id: number;
  name: string;
  avatar: string;
  requestTime: string;
}

interface Message {
  id: number;
  sender: 'friend' | 'me';
  content: string;
  time: string;
}

export default function HomePage() {
  const { isLoggedIn, userInfo, openAuthModal } = useAuth();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChatFriend, setSelectedChatFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'friend', content: '你好！', time: '10:00' },
    { id: 2, sender: 'me', content: '你好！最近怎么样？', time: '10:01' },
    { id: 3, sender: 'friend', content: '挺好的，在忙什么呢？', time: '10:02' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // 添加好友弹窗相关
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');

  // 用户搜索相关
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 创建内容相关
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'article' | 'video'>('article');
  const [isPublishing, setIsPublishing] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleTags, setArticleTags] = useState('');

  // 好友数据
  const [friends, setFriends] = useState<Friend[]>([
    { id: 1, name: '好友 1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', status: 'online', lastSeen: '刚刚在线', isFollowing: true },
    { id: 2, name: '好友 2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', status: 'online', lastSeen: '5 分钟前', isFollowing: true },
    { id: 3, name: '好友 3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', status: 'online', lastSeen: '10 分钟前', isFollowing: true },
    { id: 4, name: '好友 4', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4', status: 'offline', lastSeen: '3 小时前', isFollowing: true },
    { id: 5, name: '好友 5', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5', status: 'offline', lastSeen: '昨天', isFollowing: true },
  ]);

  const [recommendedFriends, setRecommendedFriends] = useState<RecommendedFriend[]>([
    { id: 6, name: '推荐好友 1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6', commonFriends: 3, isFollowing: false },
    { id: 7, name: '推荐好友 2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7', commonFriends: 5, isFollowing: false },
  ]);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    { id: 8, name: '请求用户 1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8', requestTime: '10 分钟前' },
    { id: 9, name: '请求用户 2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9', requestTime: '1 小时前' },
  ]);

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 格式化数字
  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  // 处理关注/取消关注
  const handleFollow = (friendId: number) => {
    setRecommendedFriends(prev => prev.map(friend =>
      friend.id === friendId
        ? { ...friend, isFollowing: !friend.isFollowing }
        : friend
    ));
  };

  // 处理添加好友
  const handleAddFriend = (friendId: number) => {
    const friend = recommendedFriends.find(f => f.id === friendId);
    if (friend) {
      setFriends(prev => [...prev, {
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
        status: 'offline' as const,
        lastSeen: '刚刚添加',
        isFollowing: true
      }]);
      setRecommendedFriends(prev => prev.filter(f => f.id !== friendId));
      alert('✅ 添加好友成功！');
    }
  };

  // 处理好友请求
  const handleAcceptRequest = (requestId: number) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      setFriends(prev => [...prev, {
        id: request.id,
        name: request.name,
        avatar: request.avatar,
        status: 'offline' as const,
        lastSeen: '刚刚添加',
        isFollowing: true
      }]);
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
      alert('✅ 已接受好友请求！');
    }
  };

  const handleRejectRequest = (requestId: number) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    alert('❌ 已拒绝好友请求！');
  };

  // 处理删除好友
  const handleRemoveFriend = (friendId: number) => {
    if (confirm('确定要删除这个好友吗？')) {
      setFriends(prev => prev.filter(f => f.id !== friendId));
      alert('好友已删除！');
    }
  };

  // 处理搜索好友
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // 搜索所有用户
    setIsSearching(true);
    const friendIds = friends.map(f => f.id);
    const results = searchUsers(query, friendIds);
    setSearchResults(results);
    setTimeout(() => setIsSearching(false), 300);
  };

  // 处理关注/取消关注用户
  const handleFollowUser = (userId: number) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setFriends(prev => [...prev, {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        status: 'offline' as const,
        lastSeen: '刚刚添加',
        isFollowing: true
      }]);
      alert('✅ 已关注 ' + user.name + '！');
    }
  };

  // 处理添加新好友
  const handleAddNewFriend = () => {
    if (!newFriendName.trim()) return;
    const newFriend = {
      id: Date.now(),
      name: newFriendName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newFriendName}`,
      status: 'offline' as const,
      lastSeen: '刚刚添加',
      isFollowing: true
    };
    setFriends(prev => [...prev, newFriend]);
    setNewFriendName('');
    setShowAddFriendModal(false);
    alert('🎉 好友添加成功！');
  };

  // 处理聊天
  const handleChat = (friend: Friend) => {
    setSelectedChatFriend(friend);
    setShowChat(true);
  };

  // 发送消息
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'me',
        content: newMessage,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  // 打开创建弹窗
  const handleCreateClick = () => {
    setShowCreateModal(true);
    setCreateType('article');
  };

  // 发布内容
  const handlePublish = async () => {
    // 验证输入
    if (createType === 'article' && (!articleTitle.trim() || !articleContent.trim())) {
      alert('⚠️ 请填写文章标题和内容！');
      return;
    }
    
    if (createType === 'video' && !articleTitle.trim()) {
      alert('⚠️ 请填写视频标题！');
      return;
    }
    
    setIsPublishing(true);
    
    try {
      // 发布作品（保存到 API）
      const work = await publishWork({
        type: createType,
        title: articleTitle,
        content: articleContent,
        tags: articleTags.split(',').map(t => t.trim()).filter(t => t),
        authorId: userInfo?.id || 'anonymous',
        authorName: userInfo?.name || '匿名用户',
        authorAvatar: userInfo?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous',
      });
      
      alert('✅ 作品发布成功！');
      
      // 重置表单
      setIsPublishing(false);
      setShowCreateModal(false);
      setArticleTitle('');
      setArticleContent('');
      setArticleTags('');
      
      console.log('已发布作品:', work);
      console.log('作品 ID:', work.id);
    } catch (error: any) {
      alert(`❌ 发布失败：${error.message || '请稍后重试'}`);
      setIsPublishing(false);
    }
  };

  // 过滤好友列表
  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {showProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden animate-slideUp">
            <div className="p-6">
              {/* 用户信息 */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {userInfo ? (
                    <img
                      src={userInfo.avatar}
                      alt={userInfo.name}
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
                onClick={() => setShowProfile(false)}
                className="w-full mt-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 创建内容弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex flex-col animate-slideUp">
            {/* 顶部栏 */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
              <h3 className="text-white font-medium text-lg">创建内容</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 类型切换 */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setCreateType('article')}
                className={`flex-1 py-3 text-sm font-medium transition ${
                  createType === 'article'
                    ? 'text-white border-b-2 border-red-500 bg-white/5'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                文章
              </button>
              <button
                onClick={() => setCreateType('video')}
                className={`flex-1 py-3 text-sm font-medium transition ${
                  createType === 'video'
                    ? 'text-white border-b-2 border-red-500 bg-white/5'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                视频
              </button>
            </div>

            {/* 内容区 */}
            <div className="p-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {createType === 'article' ? (
                <div className="space-y-4">
                  {/* 标题输入 */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">标题</label>
                    <input
                      type="text"
                      placeholder="请输入文章标题"
                      className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                    />
                  </div>

                  {/* 内容输入 */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">内容</label>
                    <textarea
                      placeholder="请输入文章内容"
                      rows={6}
                      className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                      value={articleContent}
                      onChange={(e) => setArticleContent(e.target.value)}
                    />
                  </div>

                  {/* 标签输入 */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">标签</label>
                    <input
                      type="text"
                      placeholder="请输入标签，用逗号分隔"
                      className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                      value={articleTags}
                      onChange={(e) => setArticleTags(e.target.value)}
                    />
                  </div>

                  {/* 封面图选择 */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">封面图</label>
                    <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-white/50 transition-all duration-300">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-400 text-sm">点击上传封面图</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 视频上传 */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">视频</label>
                    <div className="border-2 border-dashed border-white/30 rounded-lg p-12 text-center hover:border-white/50 transition-all duration-300">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-400 text-sm">点击上传视频</p>
                      <input type="file" className="hidden" accept="video/*" />
                    </div>
                  </div>

                  {/* 视频标题 */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">标题</label>
                    <input
                      type="text"
                      placeholder="请输入视频标题"
                      className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* 视频描述 */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">描述</label>
                    <textarea
                      placeholder="请输入视频描述"
                      rows={4}
                      className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 底部操作栏 */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-gray-900 to-gray-800">
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-full py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300 mb-3"
              >
                取消
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing || (createType === 'article' && (!articleTitle.trim() || !articleContent.trim()))}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>发布中...</span>
                  </div>
                ) : (
                  '发布'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 好友弹窗 */}
      {showFriendsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex flex-col animate-slideUp">
            {/* 顶部栏 */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
              <h3 className="text-white font-medium text-lg">好友</h3>
              <button
                onClick={() => setShowFriendsModal(false)}
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
                onClick={() => setActiveTab('friends')}
                className={`flex-1 py-3 text-center transition-all duration-300 ${
                  activeTab === 'friends'
                    ? 'text-white border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                好友
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex-1 py-3 text-center transition-all duration-300 relative ${
                  activeTab === 'requests'
                    ? 'text-white border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                请求
                {friendRequests.length > 0 && (
                  <span className="absolute top-2 right-1/2 transform -translate-x-1/2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {friendRequests.length}
                  </span>
                )}
              </button>
            </div>

            {/* 搜索栏 */}
            <div className="p-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 transition-all duration-300 hover:bg-white/15">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="搜索用户（输入名字搜索）"
                  className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder-gray-500"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* 搜索结果 */}
            {searchQuery && (
              <div className="px-4 pb-2">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>搜索结果</span>
                  <span>{searchResults.length} 个用户</span>
                </div>
              </div>
            )}

            {/* 好友列表 */}
            {activeTab === 'friends' && (
              <div className="space-y-1 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {/* 搜索结果 */}
                {searchQuery && searchResults.length > 0 && (
                  <>
                    <div className="px-4 py-2">
                      <h4 className="text-gray-400 text-xs font-medium">搜索到的用户</h4>
                    </div>
                    {searchResults.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center overflow-hidden">
                              <img loading="lazy" decoding="async" src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{user.name}</h4>
                            <p className="text-gray-400 text-xs">{user.bio}</p>
                            <p className="text-gray-500 text-xs mt-1">共同好友：{user.mutualFriends}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFollowUser(user.id)}
                          className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                        >
                          关注
                        </button>
                      </div>
                    ))}
                  </>
                )}

                {/* 无搜索结果 */}
                {searchQuery && searchResults.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <svg className="w-16 h-16 text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-gray-400 text-sm">未找到匹配的用户</p>
                    <p className="text-gray-500 text-xs mt-2">试试搜索其他关键词</p>
                  </div>
                )}

                {/* 推荐好友 */}
                {!searchQuery && recommendedFriends.length > 0 && (
                  <>
                    <div className="px-4 py-3">
                      <h4 className="text-gray-400 text-xs font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        推荐好友
                      </h4>
                    </div>

                    {recommendedFriends.map((friend) => (
                      <div key={friend.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                              <img loading="lazy" decoding="async" src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{friend.name}</h4>
                            <p className="text-gray-400 text-xs">共同好友：{friend.commonFriends}</p>
                          </div>
                        </div>
                        {friend.isFollowing ? (
                          <button
                            onClick={() => handleFollow(friend.id)}
                            className="px-5 py-2 rounded-full text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
                          >
                            已关注
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddFriend(friend.id)}
                            className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                          >
                            关注
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {/* 在线好友 */}
                <div className="px-4 py-3 border-t border-white/5">
                  <h4 className="text-gray-400 text-xs font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    在线好友 ({filteredFriends.filter(f => f.status === 'online').length})
                  </h4>
                </div>

                {filteredFriends.filter(f => f.status === 'online').map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                          <img loading="lazy" decoding="async" src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{friend.name}</h4>
                        <p className="text-gray-400 text-xs">{friend.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleChat(friend)}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
                      >
                        聊天
                      </button>
                      <button
                        onClick={() => handleRemoveFriend(friend.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* 离线好友 */}
                <div className="px-4 py-3 border-t border-white/5">
                  <h4 className="text-gray-400 text-xs font-medium">离线好友</h4>
                </div>

                {filteredFriends.filter(f => f.status === 'offline').map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                        <img loading="lazy" decoding="async" src={friend.avatar} alt={friend.name} className="w-full h-full object-cover opacity-70" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{friend.name}</h4>
                        <p className="text-gray-500 text-xs">{friend.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleChat(friend)}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all duration-300"
                      >
                        聊天
                      </button>
                      <button
                        onClick={() => handleRemoveFriend(friend.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 好友请求 */}
            {activeTab === 'requests' && (
              <div className="space-y-1 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {friendRequests.length > 0 ? (
                  friendRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                          <img loading="lazy" decoding="async" src={request.avatar} alt={request.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{request.name}</h4>
                          <p className="text-gray-400 text-xs">{request.requestTime}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
                        >
                          接受
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
                        >
                          拒绝
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <svg className="w-16 h-16 text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-500">暂无好友请求</p>
                  </div>
                )}
              </div>
            )}

            {/* 底部操作栏 */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-gray-900 to-gray-800">
              <button
                onClick={() => setShowAddFriendModal(true)}
                className="w-full py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>添加好友</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 添加好友弹窗 */}
      {showAddFriendModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-slideUp">
            {/* 顶部栏 */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
              <h3 className="text-white font-medium text-lg">添加好友</h3>
              <button
                onClick={() => setShowAddFriendModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 内容区 */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">好友名称</label>
                  <input
                    type="text"
                    placeholder="请输入好友名称"
                    className="w-full bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-white border-none outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNewFriend()}
                  />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-gray-400 text-xs">
                    💡 提示：输入好友名称后，系统将自动生成头像并添加到您的好友列表。
                  </p>
                </div>
              </div>
            </div>

            {/* 底部操作栏 */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-gray-900 to-gray-800">
              <button
                onClick={handleAddNewFriend}
                disabled={!newFriendName.trim()}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                添加好友
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 聊天弹窗 */}
      {showChat && selectedChatFriend && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex flex-col animate-slideUp">
            {/* 顶部栏 */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowChat(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    <img loading="lazy" decoding="async" src={selectedChatFriend.avatar} alt={selectedChatFriend.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{selectedChatFriend.name}</h4>
                    <p className="text-gray-400 text-xs">{selectedChatFriend.status === 'online' ? '在线' : selectedChatFriend.lastSeen}</p>
                  </div>
                </div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>

            {/* 消息列表 */}
            <div className="p-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      message.sender === 'me'
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                        : 'bg-white/10 text-white'
                    } p-3 rounded-2xl ${
                      message.sender === 'me'
                        ? 'rounded-tl-full rounded-br-none'
                        : 'rounded-tr-full rounded-bl-none'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-white/60 mt-1 text-right">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 消息输入 */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="发送消息..."
                  className="flex-1 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 text-white text-sm border-none outline-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
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
                        <img
                          src={article.avatar}
                          alt={article.author}
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
