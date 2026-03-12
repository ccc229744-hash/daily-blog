import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
            📝 我的每日博客
          </Link>
          <p className="text-slate-600 mt-1">记录每一天的思考与成长</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">最新文章</h1>
        
        {allPostsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">还没有文章，开始写作吧！</p>
          </div>
        ) : (
          <div className="space-y-6">
            {allPostsData.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <Link href={`/posts/${post.id}`} className="block">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <time>{post.date}</time>
                  </div>
                  {post.excerpt && (
                    <p className="text-slate-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12 py-6">
        <div className="max-w-3xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 我的每日博客 · 用 Next.js 构建</p>
        </div>
      </footer>
    </div>
  )
}
