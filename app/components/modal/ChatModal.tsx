'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen: string;
  isFollowing: boolean;
}

interface Message {
  id: number;
  sender: 'friend' | 'me';
  content: string;
  time: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  friend: Friend | null;
}

export default function ChatModal({ isOpen, onClose, friend }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'friend', content: '你好！', time: '10:00' },
    { id: 2, sender: 'me', content: '你好！最近怎么样？', time: '10:01' },
    { id: 3, sender: 'friend', content: '挺好的，在忙什么呢？', time: '10:02' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  if (!isOpen || !friend) return null;

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

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex flex-col animate-slideUp">
        {/* 顶部栏 */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    <Image loading="lazy" src={friend.avatar} alt={friend.name} width={32} height={32} className="w-full h-full object-cover" />
                  </div>
              <div>
                <h4 className="text-white font-medium">{friend.name}</h4>
                <p className="text-gray-400 text-xs">{friend.status === 'online' ? '在线' : friend.lastSeen}</p>
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
  );
}
