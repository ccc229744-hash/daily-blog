import Link from 'next/link'
import { getAllPostIds, getPostData } from '@/lib/posts'
import { notFound } from 'next/navigation'

// 生成静态路径
export async function generateStaticParams() {
  const allPostIds = getAllPostIds()
  return allPostIds
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostData(params.slug)
    return {
      title: `${post.title} | 我的每日博客`,
      description: post.excerpt,
    }
  } catch {
    return {
      title: '文章未找到 | 我的每日博客',
    }
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  let post
  
  try {
    post = await getPostData(params.slug)
  } catch {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-2"
          >
            ← 返回首页
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <article className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <time>{post.date}</time>
            </div>
          </header>

          <div 
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
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
