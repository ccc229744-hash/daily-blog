'use client'

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gradient-to-r focus:from-red-500 focus:to-pink-500 focus:text-white focus:rounded-lg focus:shadow-lg"
    >
      跳到主要内容
    </a>
  )
}
