'use client'

import { useState } from 'react'
import Link from 'next/link'
import RichTextEditor from '@/app/components/editor/RichTextEditor'

export default function NewArticle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [uploading, setUploading] = useState(false)

  const categories = ['技术', 'AI', '搞钱', '工具', '生活', '艺术']

  const handlePublish = () => {
    setIsPublishing(true)
    // 模拟发布
    setTimeout(() => {
      setIsPublishing(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const handleSaveDraft = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    // 模拟上传
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file)
      setCoverImage(imageUrl)
      setUploading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* 顶部导航 */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-white">发布文章</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
            >
              保存草稿
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing || !title || !content}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-red-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? '发布中...' : '发布文章'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* 成功提示 */}
        {showSuccess && (
          <div className="fixed top-20 right-6 z-50 animate-slide-up">
            <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full">
              ✅ {isPublishing ? '发布成功！' : '草稿已保存'}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* 标题 */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">文章标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入文章标题..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>

          {/* 分类和标签 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">分类</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              >
                <option value="">选择分类</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">标签</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="用逗号分隔，例如：Next.js, React, 教程"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* 封面图片 */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">封面图片</label>
            <div className="flex items-center gap-4">
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="输入图片 URL..."
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
              <label className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition cursor-pointer">
                {uploading ? '上传中...' : '上传图片'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            {coverImage && (
              <div className="mt-4 relative">
                <img src={coverImage} alt="封面预览" className="w-full max-w-md rounded-xl" />
                <button
                  onClick={() => setCoverImage('')}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* 富文本编辑器 */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">文章内容</label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="开始写作..."
            />
          </div>

          {/* 提示 */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="text-blue-400 font-medium mb-1">写作提示</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• 标题建议控制在 20 字以内</li>
                  <li>• 添加合适的标签有助于 SEO</li>
                  <li>• 封面图片建议使用 16:9 比例</li>
                  <li>• 文章内容建议 800 字以上</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
