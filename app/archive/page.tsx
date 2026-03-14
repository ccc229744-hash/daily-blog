import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

interface PostData {
  id: string
  slug: string
  title: string
  date: string
  excerpt?: string
}

export default function Archive() {
  const allPostsData = getSortedPostsData() as PostData[]
  
  // 按年月分组
  const postsByMonth = new Map<string, PostData[]>()
  
  allPostsData.forEach((post) => {
    const [year, month] = post.date.split('-')
    const key = `${year}年${month}月`
    
    if (!postsByMonth.has(key)) {
      postsByMonth.set(key, [])
    }
    postsByMonth.get(key)!.push(post)
  })

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
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">分类</Link>
              <Link href="/archive" className="text-gray-900 font-medium">归档</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">关于</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">文章归档</h1>
          <p className="text-xl text-gray-600">按时间顺序浏览所有文章</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gray-200"></div>

          {Array.from(postsByMonth.entries()).map(([month, posts], index) => (
            <div key={month} className="relative mb-12">
              {/* Month Badge */}
              <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <h2 className="text-2xl font-bold text-gray-900">{month}</h2>
                  <p className="text-gray-500 text-sm">{posts.length} 篇文章</p>
                </div>
              </div>

              {/* Posts List */}
              <div className={`space-y-4 ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12'}`}>
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="text-xs text-gray-500">
                      {post.date}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {allPostsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无文章</p>
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
