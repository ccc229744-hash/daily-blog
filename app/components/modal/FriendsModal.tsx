'use client';

import { useState } from 'react';
import { searchUsers, User, allUsers } from '../../../data/users';
import Image from 'next/image';
import { useToast } from '../notification/ToastProvider';

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

interface FriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChat: (friend: Friend) => void;
}

export default function FriendsModal({ isOpen, onClose, onChat }: FriendsModalProps) {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');

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

  if (!isOpen) return null;

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
      toast.showToast('添加好友成功！', 'success');
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
      toast.showToast('已接受好友请求！', 'success');
    }
  };

  const handleRejectRequest = (requestId: number) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    toast.showToast('已拒绝好友请求！', 'info');
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
      toast.showToast('已关注 ' + user.name + '！', 'success');
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
    toast.showToast('好友添加成功！', 'success');
  };

  // 过滤好友列表
  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex flex-col animate-slideUp">
          {/* 顶部栏 */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
            <h3 className="text-white font-medium text-lg">好友</h3>
            <button
              onClick={onClose}
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
                              <Image loading="lazy" src={user.avatar} alt={user.name} width={48} height={48} className="w-full h-full object-cover" />
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
                              <Image loading="lazy" src={friend.avatar} alt={friend.name} width={48} height={48} className="w-full h-full object-cover" />
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
                          <Image loading="lazy" src={friend.avatar} alt={friend.name} width={48} height={48} className="w-full h-full object-cover" />
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
                      onClick={() => onChat(friend)}
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
                      <Image loading="lazy" src={friend.avatar} alt={friend.name} width={48} height={48} className="w-full h-full object-cover opacity-70" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{friend.name}</h4>
                      <p className="text-gray-500 text-xs">{friend.lastSeen}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onChat(friend)}
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
                          <Image loading="lazy" src={request.avatar} alt={request.name} width={48} height={48} className="w-full h-full object-cover" />
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
    </>
  );
}
