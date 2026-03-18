'use client';

import { useState, useEffect } from 'react';
import { loadWorksFromStorage, clearAllWorks, deleteWorkFromStorage } from '../../lib/storage';
import { Work } from '../../data/works';

export default function WorksManager() {
  const [works, setWorks] = useState<Work[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadedWorks = loadWorksFromStorage();
    setWorks(loadedWorks);
  }, []);

  const handleDelete = (workId: string) => {
    if (confirm('确定要删除这个作品吗？')) {
      const success = deleteWorkFromStorage(workId);
      if (success) {
        setWorks(works.filter(w => w.id !== workId));
        alert('✅ 作品已删除');
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('⚠️ 确定要清空所有作品吗？此操作不可恢复！')) {
      clearAllWorks();
      setWorks([]);
      alert('✅ 已清空所有作品');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">📊 作品管理</h1>
        
        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-red-500">{works.length}</div>
            <div className="text-gray-400 text-sm mt-2">总作品数</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-blue-500">
              {works.filter(w => w.type === 'article').length}
            </div>
            <div className="text-gray-400 text-sm mt-2">文章数</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-pink-500">
              {works.filter(w => w.type === 'video').length}
            </div>
            <div className="text-gray-400 text-sm mt-2">视频数</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-green-500">
              {works.reduce((sum, w) => sum + w.likes, 0)}
            </div>
            <div className="text-gray-400 text-sm mt-2">总点赞数</div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              const works = loadWorksFromStorage();
              console.log('当前所有作品:', works);
              alert(`已导出 ${works.length} 个作品到控制台`);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📥 导出数据
          </button>
          <button
            onClick={handleClearAll}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            🗑️ 清空所有
          </button>
        </div>

        {/* 作品列表 */}
        <div className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">类型</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">标题</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">作者</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">标签</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">数据</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">时间</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {works.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                      暂无作品数据
                    </td>
                  </tr>
                ) : (
                  works.map((work) => (
                    <tr key={work.id} className="hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          work.type === 'article' 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-pink-500/20 text-pink-400'
                        }`}>
                          {work.type === 'article' ? '📝 文章' : '🎬 视频'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">{work.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img 
                            src={work.authorAvatar} 
                            alt={work.authorName}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{work.authorName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {work.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs text-gray-400">#{tag}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        <div>❤️ {work.likes}</div>
                        <div>💬 {work.comments}</div>
                        <div>👁️ {work.views}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(work.createdAt).toLocaleString('zh-CN')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(work.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 存储信息 */}
        <div className="mt-8 p-6 bg-gray-900 rounded-xl border border-white/10">
          <h2 className="text-xl font-bold mb-4">💾 存储信息</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <div>• 存储方式：localStorage</div>
            <div>• 存储键名：daily_blog_works</div>
            <div>• 数据持久化：是（关闭浏览器后仍然保留）</div>
            <div>• 存储位置：浏览器本地</div>
            <div>• 清空方式：点击"清空所有"按钮或清除浏览器数据</div>
          </div>
        </div>
      </div>
    </div>
  );
}
