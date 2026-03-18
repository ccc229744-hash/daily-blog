'use client'

import { useState, useEffect, useRef } from 'react'
import { useDebounce } from '@/lib/hooks/useDebounce'

interface SearchEnhancedProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

interface SearchHistoryItem {
  query: string
  timestamp: number
}

// 模拟搜索建议
const searchSuggestions = [
  'Next.js 教程',
  'React Hooks',
  'TypeScript 入门',
  'AI 内容创作',
  '博客搭建',
  'Tailwind CSS',
  '前端优化',
  'Node.js 实战',
]

export default function SearchEnhanced({
  onSearch,
  placeholder = '搜索文章、作者、话题...',
  className = '',
}: SearchEnhancedProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState<SearchHistoryItem[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  
  const debouncedSearch = useDebounce(searchTerm, 300)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 加载搜索历史
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  // 实时搜索建议
  useEffect(() => {
    if (debouncedSearch.trim()) {
      const filtered = searchSuggestions.filter(s =>
        s.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestions(filtered.length > 0)
      setShowHistory(false)
      
      // 触发外部搜索
      onSearch?.(debouncedSearch)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setShowHistory(history.length > 0)
    }
  }, [debouncedSearch, onSearch, history.length])

  // 点击外部关闭建议
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setShowHistory(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => 
        prev < (suggestions.length - 1) ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSelect(suggestions[highlightedIndex])
      } else if (searchTerm.trim()) {
        handleSelect(searchTerm)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setShowHistory(false)
    }
  }

  const handleSelect = (query: string) => {
    setSearchTerm(query)
    setShowSuggestions(false)
    setShowHistory(false)
    setHighlightedIndex(-1)
    
    // 保存到历史
    const newHistory = [
      { query, timestamp: Date.now() },
      ...history.filter(h => h.query !== query)
    ].slice(0, 10)
    
    setHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
    
    onSearch?.(query)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('searchHistory')
  }

  const clearSearch = () => {
    setSearchTerm('')
    inputRef.current?.focus()
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* 搜索框 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
            if (history.length > 0) setShowHistory(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />
        
        {/* 搜索图标 */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {/* 清除按钮 */}
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        )}
      </div>

      {/* 搜索建议 */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl z-50">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-3 py-2">搜索建议</div>
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => handleSelect(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  index === highlightedIndex
                    ? 'bg-red-500/20 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span dangerouslySetInnerHTML={{
                    __html: suggestion.replace(
                      new RegExp(`(${searchTerm})`, 'gi'),
                      '<span class="text-red-400">$1</span>'
                    )
                  }} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 搜索历史 */}
      {showHistory && history.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl z-50">
          <div className="p-2">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="text-xs text-gray-500">搜索历史</div>
              <button
                onClick={clearHistory}
                className="text-xs text-gray-500 hover:text-white transition"
              >
                清除历史
              </button>
            </div>
            {history.slice(0, 5).map((item, index) => (
              <button
                key={item.query}
                onClick={() => handleSelect(item.query)}
                className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{item.query}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 无结果提示 */}
      {showSuggestions && suggestions.length === 0 && searchTerm.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl z-50 p-6 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-400">未找到相关建议</p>
          <p className="text-gray-500 text-sm mt-2">试试其他关键词～</p>
        </div>
      )}
    </div>
  )
}
