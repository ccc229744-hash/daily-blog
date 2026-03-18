'use client';

import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { getAllWorks, Work } from '../../data/works';
import Link from 'next/link';
import Image from 'next/image';

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [filter, setFilter] = useState<'all' | 'article' | 'video'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 加载作品数据（从 API）
    const loadWorks = async () => {
      try {
        console.log('开始加载作品...');
        const loadedWorks = await getAllWorks();
        console.log('加载到的作品:', loadedWorks);
        setWorks(loadedWorks);
      } catch (error) {
        console.error('加载作品失败:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWorks();
  }, []);

  const filteredWorks = works.filter(work => {
    if (filter === 'all') return true;
    return work.type === filter;
  });

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return '刚刚';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <>
      <SEO 
        title="作品广场 - 每日博客"
        description="浏览用户发布的精彩作品，包括文章和视频"
      />
      
      <div className="min-h-screen bg-black text-white">
        {/* Hero 区域 */}
        <section className="relative py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              作品广场
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              发现精彩创作，分享你的作品
            </p>
            
            {/* 筛选按钮 */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setFilter('article')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'article'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                📝 文章
              </button>
              <button
                onClick={() => setFilter('video')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === 'video'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                🎬 视频
              </button>
            </div>
            
            {/* 统计信息 */}
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <span>共 {works.length} 个作品</span>
              <span>•</span>
              <span>{filteredWorks.length} 个结果</span>
            </div>
          </div>
        </section>

        {/* 作品列表 */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-900 rounded-2xl overflow-hidden">
                    <div className="aspect-[3/4] bg-white/5" />
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-white/10 rounded w-3/4" />
                      <div className="h-4 bg-white/10 rounded w-full" />
                      <div className="flex gap-2">
                        <div className="h-4 w-16 bg-white/10 rounded" />
                        <div className="h-4 w-16 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredWorks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorks.map((work) => (
                  <div
                    key={work.id}
                    className="bg-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300 group"
                  >
                    {/* 封面图 */}
                    <div className="aspect-[3/4] relative bg-gradient-to-br from-red-500/20 to-pink-600/20 flex items-center justify-center">
                      {work.type === 'article' ? (
                        <div className="text-center p-8">
                          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-gray-400 text-sm">文章</p>
                        </div>
                      ) : (
                        <div className="text-center p-8">
                          <svg className="w-16 h-16 text-pink-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-gray-400 text-sm">视频</p>
                        </div>
                      )}
                      
                      {/* 类型标签 */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium">
                        {work.type === 'article' ? '📝 文章' : '🎬 视频'}
                      </div>
                    </div>

                    {/* 内容区 */}
                    <div className="p-4">
                      {/* 标题 */}
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-red-400 transition">
                        {work.title}
                      </h3>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {work.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs text-gray-400">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* 作者信息 */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                          <img src={work.authorAvatar} alt={work.authorName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">{work.authorName}</p>
                          <p className="text-xs text-gray-500">{timeAgo(work.createdAt)}</p>
                        </div>
                      </div>

                      {/* 数据统计 */}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                          </svg>
                          <span>{formatNumber(work.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                          </svg>
                          <span>{formatNumber(work.comments)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>{formatNumber(work.views)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg className="w-24 h-24 text-gray-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">暂无作品</h3>
                <p className="text-gray-400 mb-6">成为第一个发布作品的人吧！</p>
                <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-500/20 transition-all">
                  立即创作
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
