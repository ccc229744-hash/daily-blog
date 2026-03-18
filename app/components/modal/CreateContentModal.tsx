'use client';

import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { publishWork } from '../../../data/works';
import { useToast } from '../notification/ToastProvider';

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateContentModal({ isOpen, onClose }: CreateContentModalProps) {
  const { userInfo } = useAuth();
  const toast = useToast();
  
  const [createType, setCreateType] = useState<'article' | 'video'>('article');
  const [isPublishing, setIsPublishing] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleTags, setArticleTags] = useState('');

  if (!isOpen) return null;

  const handlePublish = async () => {
    // 验证输入
    if (createType === 'article' && (!articleTitle.trim() || !articleContent.trim())) {
      toast.showToast('请填写文章标题和内容！', 'warning');
      return;
    }
    
    if (createType === 'video' && !articleTitle.trim()) {
      toast.showToast('请填写视频标题！', 'warning');
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
      
      toast.showToast('作品发布成功！', 'success');
      
      // 重置表单
      setIsPublishing(false);
      onClose();
      setArticleTitle('');
      setArticleContent('');
      setArticleTags('');
      
      console.log('已发布作品:', work);
      console.log('作品 ID:', work.id);
    } catch (error: any) {
      toast.showToast(`发布失败：${error.message || '请稍后重试'}`, 'error');
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gray-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex flex-col animate-slideUp">
        {/* 顶部栏 */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800">
          <h3 className="text-white font-medium text-lg">创建内容</h3>
          <button
            onClick={onClose}
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
            onClick={onClose}
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
  );
}
