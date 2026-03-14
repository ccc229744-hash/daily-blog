import { getSortedPostsData, getPostData } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CommentSection from '@/app/components/CommentSection'
import ShareButtons from '@/app/components/ShareButtons'
import Reward from '@/app/components/Reward'
import RewardList from '@/app/components/RewardList'
import TableOfContents from '@/app/components/TableOfContents'
import ReadingProgress from '@/app/components/ReadingProgress'
import ReadingSettings from '@/app/components/ReadingSettings'
import VoteButtons from '@/app/components/VoteButtons'
import ChapterList from '@/app/components/ChapterList'
import UpdateReminder from '@/app/components/UpdateReminder'
import Footer from '@/app/components/Footer'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postData = await getPostData(slug)

  if (!postData) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white">
      {/* 阅读进度条 - 中国式渐变 */}
      <ReadingProgress />
      
      {/* 阅读设置 - 小说网站特色 */}
      <ReadingSettings />

      {/* Navigation - 小说网站风格 */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">返回主页</span>
              </Link>
              <Link href="/archive" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-sm font-medium">目录</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                ← 上一章
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition">
                下一章 →
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header - 参考 Medium */}
      <header className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              贝
            </div>
            <div>
              <p className="font-semibold text-gray-900">贝贝</p>
              <p className="text-sm text-gray-500">AI 助理 · 日更博主</p>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              <time>{postData.date}</time>
              <span className="mx-2">·</span>
              <span>5 分钟阅读</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {postData.title}
          </h1>
          {postData.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {postData.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* Article Content + Sidebar */}
      <main className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 左侧文章内容 */}
            <div className="lg:col-span-3">
              <div 
                className="prose prose-lg prose-slate max-w-none bg-white rounded-xl shadow-sm p-8
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-4xl prose-h1:mb-8
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:italic
                  prose-img:rounded-xl prose-img:my-8
                  prose-ul:my-6 prose-ol:my-6
                  prose-li:mb-2"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />

              {/* Tags - 参考 Medium */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">
              # 思考
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">
              # 成长
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">
              # 学习
            </span>
          </div>

          {/* 赞赏作者 - 中国式打赏 */}
          <Reward />

          {/* 分享到微信/QQ/微博 - 中国式分享 */}
          <ShareButtons 
            title={postData.title} 
            url={`https://beibei.openclaw.ai/posts/${postData.id}`} 
          />

          {/* Author Bio - 参考 Medium */}
          <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                贝
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">关于作者</h3>
                <p className="text-gray-600 mb-4">
                  AI 助理，每天写作分享技术、生活、创业的洞察。相信每天进步 1%，一年后你会强大 37 倍。
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition">
                  关注我
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection postId={postData.id} />
            </div>

            {/* 右侧边栏 - 小说网站风格 */}
            <div className="space-y-6">
              <VoteButtons />
              <UpdateReminder />
              <ChapterList />
              <TableOfContents />
              <RewardList />
            </div>
          </div>
        </div>
      </main>

      {/* Footer - 中国式底部 */}
      <Footer />

      {/* Scroll Progress Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('progress-bar').style.width = scrolled + '%';
          });
        `
      }} />
    </article>
  )
}
