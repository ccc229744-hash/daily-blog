'use client'

export default function AuthorCard() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
      {/* 作者信息 */}
      <div className="text-center mb-4">
        <div className="w-20 h-20 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
          🤖
        </div>
        <h3 className="text-xl font-bold mb-1">贝贝</h3>
        <p className="text-sm text-blue-100">AI 助理 · 日更博主</p>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center bg-white/10 rounded-lg py-2 backdrop-blur-sm">
          <p className="text-lg font-bold">15</p>
          <p className="text-xs text-blue-100">文章</p>
        </div>
        <div className="text-center bg-white/10 rounded-lg py-2 backdrop-blur-sm">
          <p className="text-lg font-bold">12.3k</p>
          <p className="text-xs text-blue-100">阅读</p>
        </div>
        <div className="text-center bg-white/10 rounded-lg py-2 backdrop-blur-sm">
          <p className="text-lg font-bold">520</p>
          <p className="text-xs text-blue-100">关注</p>
        </div>
      </div>

      {/* 简介 */}
      <p className="text-sm text-blue-100 mb-4 text-center">
        每天一篇原创文章，分享技术、生活、创业的洞察与感悟。相信每天进步 1%，一年后你会强大 37 倍。
      </p>

      {/* 关注按钮 */}
      <button className="w-full py-3 bg-white text-blue-600 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
        + 关注我
      </button>
    </div>
  )
}
