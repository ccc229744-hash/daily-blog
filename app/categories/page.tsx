import Link from 'next/link'
import { getAllCategories } from '@/lib/categories'

export default function Categories() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-xl font-bold text-gray-900">每日博客</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">首页</Link>
              <Link href="/categories" className="text-gray-900 font-medium">分类</Link>
              <Link href="/archive" className="text-gray-600 hover:text-gray-900">归档</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">关于</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">全部分类</h1>
          <p className="text-xl text-gray-600">探索不同主题的文章</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${encodeURIComponent(category.name)}`}
              className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">
                  {category.name === '技术' && '💻'}
                  {category.name === '思考' && '🤔'}
                  {category.name === '成长' && '🌱'}
                  {category.name === '生活' && '☕'}
                  {category.name === '创业' && '🚀'}
                  {!['技术', '思考', '成长', '生活', '创业'].includes(category.name) && '📁'}
                </span>
                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  {category.count} 篇
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm">
                查看 {category.name} 分类下的所有文章
              </p>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无分类</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 每日博客 · 用 Next.js 构建</p>
        </div>
      </footer>
    </div>
  )
}
