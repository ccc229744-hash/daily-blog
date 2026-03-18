'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { xhsArticles } from '../../data/articles';
import { useAuth } from '../components/auth/AuthContext';

const formatNumber = (num?: number | null) => {
  if (!num) return '0';
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

export default function SingleColumn() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [showComments, setShowComments] = useState(false);
  const [showAuthorProfile, setShowAuthorProfile] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const { isLoggedIn, openAuthModal } = useAuth();
  const [comments, setComments] = useState<Array<{id: string, user: string, avatar: string, content: string, likes: number, time: string}>>([]);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [followingAuthors, setFollowingAuthors] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // 初始化点赞数
  useEffect(() => {
    const initialLikeCounts: Record<string, number> = {};
    xhsArticles.forEach(post => {
      initialLikeCounts[post.id] = post.likes;
    });
    setLikeCounts(initialLikeCounts);
  }, []);

  // 监听滚动
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理点赞
  const handleLike = (postId: string) => {
    if (!isLoggedIn) {
      openAuthModal('login');
      return;
    }

    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    setLikeCounts(prev => ({
      ...prev,
      [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1)
    }));
  };

  // 处理评论
  const handleComment = (article: any) => {
    setSelectedAuthor(article);
    setShowComments(true);
  };

  // 处理评论提交
  const handleSubmitComment = () => {
    if (!isLoggedIn) {
      openAuthModal('login');
      return;
    }
    
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      const newComment = {
        id: Date.now().toString(),
        user: '用户',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
        content: commentText,
        likes: 0,
        time: '刚刚'
      };
      setComments(prev => [newComment, ...prev]);
      setCommentText('');
      setIsSubmitting(false);
    }, 800);
  };

  // 处理分享
  const handleShare = (article: any) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description || article.title,
        url: window.location.href
      }).catch(err => console.error('分享失败:', err));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板');
      }).catch(err => console.error('复制失败:', err));
    }
  };

  // 处理关注作者
  const handleFollowAuthor = (author: any) => {
    if (!isLoggedIn) {
      openAuthModal('login');
      return;
    }
    
    setFollowingAuthors(prev => ({
      ...prev,
      [author.author]: !prev[author.author]
    }));
  };

  // 处理点击作者头像
  const handleAuthorClick = (author: any) => {
    setSelectedAuthor(author);
    setShowAuthorProfile(true);
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
        <Link href="/" className="flex items-center gap-2 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>

        <h1 className="text-white font-medium">单列模式</h1>

        <div className="w-6"></div>
      </header>

      {/* 主内容区 - 抖音式垂直滚动 */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {xhsArticles.map((item, index) => (
          <article
            key={item.id}
            className="relative h-screen snap-start snap-always flex items-center justify-center"
          >
            {/* 背景图片 */}
            <div className="absolute inset-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
            </div>

            {/* 内容区域 */}
            <div className="relative z-10 w-full h-full flex">
              {/* 左侧内容 */}
              <div className="flex-1 flex flex-col justify-end p-6 pb-20">
                {/* 作者信息 */}
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => handleAuthorClick(item)}
                    className="cursor-pointer"
                  >
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-10 h-10 rounded-full border-2 border-white bg-white"
                    />
                  </button>
                  <span className="text-white font-medium text-base">{item.author}</span>
                  <button
                    onClick={() => handleFollowAuthor(item)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      followingAuthors[item.author]
                        ? 'bg-white/20 text-white border border-white/50 hover:bg-white/30'
                        : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30'
                    }`}
                  >
                    {followingAuthors[item.author] ? '已关注' : '关注'}
                  </button>
                </div>

                {/* 标题 */}
                <div className="mb-4">
                  <h2 className="text-white text-lg font-bold mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(item.tags || []).map((tag, i) => (
                    <span key={i} className="text-white text-sm">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* 右侧互动按钮 */}
              <div className="flex flex-col items-center gap-6 p-4 pb-20">
                {/* 点赞 */}
                <button
                  onClick={() => handleLike(item.id)}
                  className="flex flex-col items-center gap-1 text-white"
                >
                  <div className={`w-12 h-12 rounded-full ${likedPosts[item.id] ? 'bg-red-500/30' : 'bg-white/10'} backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition`}>
                    <svg className={`w-7 h-7 ${likedPosts[item.id] ? 'text-red-500' : 'text-white'}`} fill={likedPosts[item.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">{formatNumber(likeCounts[item.id] || item.likes)}</span>
                </button>

                {/* 评论 */}
                <button
                  onClick={() => handleComment(item)}
                  className="flex flex-col items-center gap-1 text-white transition-transform duration-300 hover:scale-110"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">{formatNumber(item.collects)}</span>
                </button>

                {/* 分享 */}
                <button
                  onClick={() => handleShare(item)}
                  className="flex flex-col items-center gap-1 text-white transition-transform duration-300 hover:scale-110"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 5h14v16l-7-3-7 3V5z"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">{formatNumber(item.likes)}</span>
                </button>

                {/* 头像 */}
                <div className="mt-4">
                  <button onClick={() => handleAuthorClick(item)}>
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white">
                      <img src={item.avatar} alt={item.author} className="w-full h-full" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* 进度指示器 */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
              {xhsArticles.map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'h-6 bg-white'
                      : 'h-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* 评论弹窗 */}
      {showComments && selectedAuthor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end">
          <div className="bg-gray-900 w-full max-h-[80vh] rounded-t-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-medium">评论 ({selectedAuthor.comments || 0})</h3>
              <button onClick={() => setShowComments(false)} className="text-white/60 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 mb-4">
                    <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white text-sm font-medium">{comment.user}</span>
                        <span className="text-white/40 text-xs">{comment.time}</span>
                      </div>
                      <p className="text-white/90 text-sm">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-white/60 hover:text-white text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-white/60 hover:text-white text-xs">回复</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">暂无评论，快来抢沙发吧！</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="我" className="w-8 h-8 rounded-full" />
                <input
                  type="text"
                  placeholder={isLoggedIn ? "说点什么..." : "登录后评论"}
                  className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                  disabled={!isLoggedIn}
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!isLoggedIn || !commentText.trim() || isSubmitting}
                  className="text-red-500 font-medium disabled:text-gray-500"
                >
                  {isSubmitting ? '发送中...' : '发送'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 作者主页弹窗 */}
      {showAuthorProfile && selectedAuthor && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden max-h-[80vh] flex flex-col">
            {/* 顶部栏 */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-medium text-lg">作者主页</h3>
              <button
                onClick={() => setShowAuthorProfile(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 作者信息 */}
            <div className="p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={selectedAuthor.avatar}
                  alt={selectedAuthor.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-white font-bold text-xl mb-1">{selectedAuthor.author}</h4>
              <p className="text-gray-400 text-sm mb-4">ID: {selectedAuthor.id}</p>

              {/* 统计信息 */}
              <div className="flex gap-8 mb-6">
                <div className="text-center">
                  <p className="text-white font-medium text-lg">128</p>
                  <p className="text-gray-400 text-xs">作品</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium text-lg">12.5w</p>
                  <p className="text-gray-400 text-xs">粉丝</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium text-lg">328</p>
                  <p className="text-gray-400 text-xs">关注</p>
                </div>
              </div>

              {/* 关注按钮 */}
              <button className="w-full py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition mb-4">
                关注
              </button>
            </div>

            {/* 作品列表 */}
            <div className="border-t border-white/10 flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 gap-1 p-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-white/5 relative">
                    <img
                      src={selectedAuthor.image || `https://picsum.photos/seed/${i}/300/300`}
                      alt={`作品${i}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
