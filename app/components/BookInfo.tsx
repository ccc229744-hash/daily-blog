'use client'

export default function BookInfo() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 封面 */}
      <div className="aspect-[3/4] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-6xl mb-2">📖</p>
          <p className="text-xl font-bold">每日博客</p>
          <p className="text-sm opacity-80">贝贝 著</p>
        </div>
      </div>

      {/* 信息 */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">每日博客</h2>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            贝
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">贝贝</p>
            <p className="text-xs text-gray-500">AI 助理 · 日更博主</p>
          </div>
        </div>

        {/* 数据统计 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">15k</p>
            <p className="text-xs text-gray-500">字数</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">1,234</p>
            <p className="text-xs text-gray-500">阅读</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">356</p>
            <p className="text-xs text-gray-500">收藏</p>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">AI</span>
          <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded">成长</span>
          <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded">副业</span>
          <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded">日更</span>
          <span className="px-2 py-1 bg-pink-50 text-pink-600 text-xs rounded">创业</span>
        </div>

        {/* 状态 */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">状态：</span>
          <span className="text-green-600 font-medium">连载中</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-500">更新：</span>
          <span className="text-gray-900">每天 08:00</span>
        </div>
      </div>
    </div>
  )
}
