'use client'

import Link from 'next/link'

// 模拟分类数据
const categories = [
  { 
    id: 'tech', 
    name: '技术', 
    icon: '💻', 
    count: 45, 
    color: 'from-blue-500 to-cyan-500',
    description: '前端开发、后端技术、编程技巧',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js'],
  },
  { 
    id: 'ai', 
    name: 'AI', 
    icon: '🤖', 
    count: 38, 
    color: 'from-purple-500 to-pink-500',
    description: '人工智能、机器学习、AIGC',
    tags: ['AI 工具', '内容创作', '自动化'],
  },
  { 
    id: 'money', 
    name: '搞钱', 
    icon: '💰', 
    count: 22, 
    color: 'from-green-500 to-emerald-500',
    description: '副业变现、投资理财、商业模式',
    tags: ['AI 变现', '副业', '被动收入'],
  },
  { 
    id: 'tools', 
    name: '工具', 
    icon: '🧰', 
    count: 31, 
    color: 'from-orange-500 to-red-500',
    description: '效率工具、软件推荐、生产力',
    tags: ['效率', '自动化', 'SaaS'],
  },
  { 
    id: 'life', 
    name: '生活', 
    icon: '🌈', 
    count: 28, 
    color: 'from-pink-500 to-rose-500',
    description: '生活感悟、个人成长、读书心得',
    tags: ['成长', '读书', '思考'],
  },
  { 
    id: 'art', 
    name: '艺术', 
    icon: '🎨', 
    count: 15, 
    color: 'from-indigo-500 to-purple-500',
    description: 'AI 绘画、设计灵感、创意作品',
    tags: ['AI 绘画', '设计', '创意'],
  },
]

// 热门标签
const allTags = [
  'Next.js', 'React', 'TypeScript', 'AI 工具', '内容创作', 
  'AI 变现', '副业', '效率', '自动化', '成长', '读书', 
  '思考', 'AI 绘画', '设计', '创意', 'Node.js', 'SaaS'
]

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-white">分类目录</h1>
          <div className="w-7" />
        </div>
      </header>

      <main className="px-4 py-6">
        {/* 统计信息 */}
        <div className="mb-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>共 {categories.length} 个分类</span>
          <span>总计 {categories.reduce((sum, c) => sum + c.count, 0)} 篇文章</span>
        </div>

        {/* 分类网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* 渐变背景装饰 */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`} />
              
              <div className="relative">
                {/* 分类头部 */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {category.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.count}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      篇文章
                    </div>
                  </div>
                </div>

                {/* 标签云 */}
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 group-hover:text-red-500 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 箭头指示 */}
                <div className="absolute bottom-6 right-6 text-gray-300 dark:text-gray-700 group-hover:text-red-500 group-hover:translate-x-2 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 热门标签 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔥 热门标签</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, i) => (
              <Link
                key={i}
                href={`/search?q=${tag}`}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-red-500/30 transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="text-center py-8 text-gray-400 dark:text-gray-600 text-sm">
          — 探索更多精彩内容 —
        </div>
      </main>
    </div>
  )
}
