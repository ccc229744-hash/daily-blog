'use client';

import { useState } from 'react';
import { articles } from '../data/articles';
import StitchCard from './stitch/Card';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <StitchCard elevation={3} className="mx-4">
          {/* 搜索框 */}
          <div className="mb-6">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="搜索文章、标签、分类..."
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-red-500 transition"
              autoFocus
            />
          </div>

          {/* 搜索结果 */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query && filteredArticles.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                未找到相关文章
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map(article => (
                  <div key={article.id} className="p-4 hover:bg-gray-50 rounded-[12px] transition cursor-pointer">
                    <div className="flex items-start gap-4">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-20 h-20 object-cover rounded-[8px]"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full">{article.category}</span>
                          <span>{article.date}</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </StitchCard>
      </div>
    </div>
  );
}
