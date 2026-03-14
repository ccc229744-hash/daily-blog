import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 图标 */}
        <div className="mb-8">
          <div className="text-8xl mb-4">😅</div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl text-gray-600">页面走丢了</p>
        </div>

        {/* 提示信息 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <p className="text-gray-600 mb-4">
            抱歉，您访问的页面不存在
          </p>
          <div className="text-sm text-gray-500 space-y-2">
            <p>🔍 可能的原因：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>链接已失效</li>
              <li>页面已删除</li>
              <li>输入的地址有误</li>
            </ul>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            <span>🏠</span>
            <span>返回首页</span>
          </Link>
          <Link
            href="/archive"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition"
          >
            <span>📚</span>
            <span>查看全部文章</span>
          </Link>
        </div>

        {/* 网站统计 */}
        <div className="mt-12 text-sm text-gray-400">
          <p>💡 小提示：试试搜索功能，也许能找到你想要的内容</p>
        </div>
      </div>
    </div>
  )
}
