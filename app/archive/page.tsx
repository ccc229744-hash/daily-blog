'use client'

import { useState } from 'react'
import Link from 'next/link'

// 模拟数据
const archiveData = [
  {
    month: '2026 年 03 月',
    count: 6,
    posts: [
      { id: '1', title: 'Next.js 14 实战指南｜前端开发必备', date: '2026-03-11', likes: 1234, collects: 567 },
      { id: '2', title: 'AI 内容创作全流程分享✨', date: '2026-03-12', likes: 2890, collects: 1203 },
      { id: '3', title: '从零搭建个人博客📝超详细教程', date: '2026-03-13', likes: 856, collects: 432 },
      { id: '4', title: '我的 AI 变现之路💰月入过万', date: '2026-03-14', likes: 5670, collects: 3421 },
      { id: '5', title: '打工人必备 AI 工具清单🧰', date: '2026-03-15', likes: 3456, collects: 2100 },
      { id: '6', title: '30 天学会 AI 绘画🎨我的学习路径', date: '2026-03-16', likes: 1890, collects: 967 },
    ]
  },
  {
    month: '2026 年 02 月',
    count: 12,
    posts: [
      { id: '7', title: '2026 年 AI 趋势预测', date: '2026-02-28', likes: 4521, collects: 2341 },
      { id: '8', title: '我的 2026 年目标清单', date: '2026-02-15', likes: 2134, collects: 987 },
    ]
  },
  {
    month: '2026 年 01 月',
    count: 8,
    posts: [
      { id: '9', title: '新年第一篇文章', date: '2026-01-01', likes: 3210, collects: 1543 },
    ]
  },
]

export default function Archive() {
  const [activeMonth, setActiveMonth] = useState('全部')

  const allMonths = ['全部', ...archiveData.map(d => d.month)]
  
  const filteredData = activeMonth === '全部' 
    ? archiveData 
    : archiveData.filter(d => d.month === activeMonth)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-gray-900 dark:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-bold">返回</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">文章归档</h1>
          <div className="w-7" />
        </div>

        {/* 月份筛选 */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
          {allMonths.map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeMonth === month
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md shadow-red-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </header>

      {/* 统计信息 */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>共 {archiveData.reduce((sum, d) => sum + d.count, 0)} 篇文章</span>
          <span>跨越 {archiveData.length} 个月</span>
        </div>
      </div>

      {/* 时间轴列表 - 单列滚动设计 */}
      <main className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* 时间轴线 */}
          <div className="relative">
            {/* 垂直时间轴线 */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-pink-500 to-purple-500" />

            <div className="space-y-8">
              {filteredData.map((monthData, monthIndex) => (
                <div key={monthData.month} className="relative">
                  {/* 月份标记 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative z-10 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-4 border-white dark:border-gray-950 shadow-lg shadow-red-500/50" />
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{monthData.month}</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{monthData.count} 篇文章</p>
                    </div>
                  </div>

                  {/* 文章卡片列表 */}
                  <div className="space-y-4 pl-4">
                    {monthData.posts.map((post, postIndex) => (
                      <Link
                        key={post.id}
                        href={`/posts/${post.id}`}
                        className="group relative flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-900"
                      >
                        {/* 左侧时间线连接点 */}
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full group-hover:bg-red-500 transition-colors" />

                        {/* 封面图 */}
                        <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20">
                          <img 
                            src={`https://picsum.photos/seed/${post.id}/240/240`} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* 内容区域 */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-500 transition-colors mb-2 leading-snug">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                <span className="font-medium">{post.likes}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M5 5h14v16l-7-3-7 3V5z"/>
                                </svg>
                                <span className="font-medium">{post.collects}</span>
                              </span>
                            </div>
                          </div>
                          
                          {/* 日期标签 */}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <time className="text-xs text-gray-400 dark:text-gray-500">{post.date}</time>
                            <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">这个月份还没有文章</p>
              <Link href="/" className="text-red-500 hover:underline text-sm font-medium">
                返回首页看看 →
              </Link>
            </div>
          )}

          {/* 到底提示 */}
          {filteredData.length > 0 && (
            <div className="text-center py-8 text-gray-400 dark:text-gray-600 text-sm">
              — 已经到底啦 —
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
