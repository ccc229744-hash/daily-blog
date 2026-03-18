'use client';

// 文章卡片骨架屏
export function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white/10 rounded-2xl overflow-hidden">
        {/* 封面图占位 */}
        <div className="aspect-[3/4] bg-white/5" />
        
        {/* 内容区占位 */}
        <div className="p-4 space-y-3">
          {/* 标题占位 */}
          <div className="h-6 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-full" />
          
          {/* 标签占位 */}
          <div className="flex gap-2 pt-2">
            <div className="h-5 w-16 bg-white/10 rounded-full" />
            <div className="h-5 w-20 bg-white/10 rounded-full" />
          </div>
          
          {/* 作者信息占位 */}
          <div className="flex items-center gap-2 pt-2">
            <div className="w-8 h-8 rounded-full bg-white/10" />
            <div className="h-4 w-24 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 列表骨架屏（多个卡片）
export function ArticleListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </div>
  );
}

// 单列模式骨架屏
export function SingleColumnSkeleton() {
  return (
    <div className="space-y-4 max-w-md mx-auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse flex gap-4 p-4 bg-white/5 rounded-2xl">
          {/* 图片占位 */}
          <div className="w-24 h-24 bg-white/10 rounded-xl flex-shrink-0" />
          
          {/* 内容占位 */}
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-2/3" />
            
            {/* 标签占位 */}
            <div className="flex gap-2 pt-2">
              <div className="h-4 w-12 bg-white/10 rounded" />
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 个人资料骨架屏
export function ProfileSkeleton() {
  return (
    <div className="animate-pulse text-center p-6">
      <div className="w-24 h-24 rounded-full bg-white/10 mx-auto mb-4" />
      <div className="h-6 bg-white/10 rounded w-48 mx-auto mb-2" />
      <div className="h-4 bg-white/10 rounded w-64 mx-auto" />
    </div>
  );
}
