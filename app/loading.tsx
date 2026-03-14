export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* 加载动画 */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-purple-500 border-b-transparent rounded-full animate-spin animation-delay-200"></div>
        </div>

        {/* 加载文字 */}
        <p className="text-gray-600 font-medium mb-2">正在加载...</p>
        <p className="text-sm text-gray-400">精彩内容马上呈现</p>

        {/* 进度条 */}
        <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse w-2/3"></div>
        </div>
      </div>
    </div>
  )
}
