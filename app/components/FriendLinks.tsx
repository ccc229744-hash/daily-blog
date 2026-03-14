'use client'

import Link from 'next/link'

export default function FriendLinks() {
  const friendLinks = [
    { name: '阮一峰的网络日志', url: 'https://www.ruanyifeng.com/blog/', icon: '📝' },
    { name: '酷壳 - CoolShell', url: 'https://coolshell.cn/', icon: '🐚' },
    { name: '廖雪峰的官方网站', url: 'https://www.liaoxuefeng.com/', icon: '📚' },
    { name: 'OpenClaw 文档', url: 'https://docs.openclaw.ai', icon: '🦞' },
    { name: '掘金', url: 'https://juejin.cn/', icon: '⛏️' },
    { name: '思否', url: 'https://segmentfault.com/', icon: '❓' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔗</span>
        <h3 className="text-lg font-bold text-gray-900">友情链接</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {friendLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition group"
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors truncate">
              {link.name}
            </span>
          </a>
        ))}
      </div>

      {/* 申请友链 */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <a
          href="/about"
          className="text-sm text-gray-500 hover:text-blue-600 transition"
        >
          申请友链 →
        </a>
      </div>
    </div>
  )
}
