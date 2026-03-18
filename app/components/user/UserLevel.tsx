'use client'

interface UserLevelProps {
  userId: string
  level?: number
  experience?: number
  nextLevelExp?: number
}

export default function UserLevel({
  userId,
  level = 1,
  experience = 0,
  nextLevelExp = 100,
}: UserLevelProps) {
  const progress = (experience / nextLevelExp) * 100

  const getLevelInfo = (lvl: number) => {
    if (lvl >= 10) return { name: '传奇作者', color: 'from-yellow-400 to-orange-500', icon: '👑' }
    if (lvl >= 7) return { name: '知名博主', color: 'from-purple-400 to-pink-500', icon: '⭐' }
    if (lvl >= 5) return { name: '活跃作者', color: 'from-blue-400 to-cyan-500', icon: '✨' }
    if (lvl >= 3) return { name: '进阶作者', color: 'from-green-400 to-emerald-500', icon: '🌟' }
    return { name: '新手作者', color: 'from-gray-400 to-gray-500', icon: '🌱' }
  }

  const levelInfo = getLevelInfo(level)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      {/* 等级徽章 */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${levelInfo.color} flex items-center justify-center text-2xl`}>
          {levelInfo.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">Lv.{level}</span>
            <span className="text-xs text-gray-400">{levelInfo.name}</span>
          </div>
          <div className="text-xs text-gray-500">
            经验值：{experience} / {nextLevelExp}
          </div>
        </div>
      </div>

      {/* 经验进度条 */}
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden mb-2">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${levelInfo.color} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 等级特权 */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <h4 className="text-xs font-bold text-gray-400 mb-2">等级特权</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-2 rounded-lg ${level >= 3 ? 'bg-green-500/10 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
            <div className="text-xs">✓ 发表评论</div>
          </div>
          <div className={`p-2 rounded-lg ${level >= 5 ? 'bg-green-500/10 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
            <div className="text-xs">✓ 收藏文章</div>
          </div>
          <div className={`p-2 rounded-lg ${level >= 7 ? 'bg-green-500/10 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
            <div className="text-xs">✓ 发布文章</div>
          </div>
          <div className={`p-2 rounded-lg ${level >= 10 ? 'bg-green-500/10 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
            <div className="text-xs">✓ 专属徽章</div>
          </div>
        </div>
      </div>

      {/* 升级提示 */}
      {progress < 100 && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          再获得 <span className="text-red-400 font-bold">{nextLevelExp - experience}</span> 经验可升级
        </div>
      )}
    </div>
  )
}
