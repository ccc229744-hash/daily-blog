import Link from 'next/link'
import { getPostsByCategory, getAllCategories } from '@/lib/categories'

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const posts = getPostsByCategory(decodedCategory)
  const allCategories = getAllCategories()

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
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">
              {decodedCategory === '技术' && '💻'}
              {decodedCategory === '思考' && '🤔'}
              {decodedCategory === '成长' && '🌱'}
              {decodedCategory === '生活' && '☕'}
              {decodedCategory === '创业' && '🚀'}
              {!['技术', '思考', '成长', '生活', '创业'].includes(decodedCategory) && '📁'}
            </span>
            <h1 className="text-4xl font-bold text-gray-900">{decodedCategory}</h1>
          </div>
          <p className="text-xl text-gray-600">
            共 {posts.length} 篇文章
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/posts/${post.slug}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <time>{post.date}</time>
                    <div className="flex gap-2">
                      {post.categories.map((cat: string) => (
                        <Link
                          key={cat}
                          href={`/categories/${encodeURIComponent(cat)}`}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">该分类下暂无文章</p>
            <Link href="/categories" className="text-blue-600 hover:text-blue-700">
              返回分类列表 →
            </Link>
          </div>
        )}

        {/* Back to Categories */}
        {posts.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← 返回分类列表
            </Link>
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
