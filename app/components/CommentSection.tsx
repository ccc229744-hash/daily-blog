'use client'

import { useState, useEffect } from 'react'
import { supabase, Comment, User } from '@/lib/supabase'
import LoginModal from './LoginModal'

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 加载用户信息
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // 加载评论
  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = async () => {
    if (!supabase) {
      // Supabase 未配置，使用本地存储
      loadLocalComments()
      return
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*, user:user_id(id, username, email, avatar)')
        .eq('post_id', postId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('加载评论失败:', error)
      // 如果数据库不可用，使用本地文件
      loadLocalComments()
    }
  }

  const loadLocalComments = () => {
    // 回退到本地文件存储
    try {
      const stored = localStorage.getItem(`comments-${postId}`)
      if (stored) {
        setComments(JSON.parse(stored))
      }
    } catch (error) {
      console.error('加载本地评论失败:', error)
    }
  }

  const handleLoginRequired = () => {
    setShowForm(false)
    setIsLoginModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentUser) {
      handleLoginRequired()
      return
    }

    setIsSubmitting(true)

    try {
      if (supabase) {
        // 尝试保存到 Supabase
        const newComment: Partial<Comment> = {
          post_id: postId,
          user_id: currentUser.id,
          content,
          likes: 0,
        }

        const { data, error } = await supabase
          .from('comments')
          .insert([newComment])
          .select()

        if (error) throw error

        const commentWithUser: Comment = {
          ...data[0],
          user: currentUser,
        }

        setComments([commentWithUser, ...comments])
      } else {
        // Supabase 未配置，使用本地存储
        saveLocalComment()
      }
      
      setContent('')
      setShowForm(false)
    } catch (error) {
      console.error('发布评论失败:', error)
      // 回退到本地存储
      saveLocalComment()
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveLocalComment = () => {
    // 本地存储回退方案
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      post_id: postId,
      user_id: currentUser?.id || 'anonymous',
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      likes: 0,
      user: currentUser || undefined,
    }
    setComments([newComment, ...comments])
    
    // 保存到 localStorage
    const stored = localStorage.getItem(`comments-${postId}`)
    const localComments = stored ? JSON.parse(stored) : []
    localStorage.setItem(`comments-${postId}`, JSON.stringify([newComment, ...localComments]))
    
    setContent('')
    setShowForm(false)
  }

  const handleLike = async (commentId: string) => {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .update({ likes: (comments.find(c => c.id === commentId)?.likes || 0) + 1 })
          .eq('id', commentId)
          .select()

        if (error) throw error
        
        setComments(comments.map(c => 
          c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        ))
        return
      } catch (error) {
        console.error('点赞失败:', error)
      }
    }
    
    // 本地更新（回退方案）
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ))
  }

  if (isLoading) {
    return (
      <section className="mt-12">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">加载评论中...</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          评论 ({comments.length})
        </h3>

        {/* Comment Form */}
        {showForm ? (
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  评论
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="写下你的想法..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isSubmitting ? '提交中...' : '发布评论'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition"
                >
                  取消
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center mb-8">
            <p className="text-gray-600 mb-4">
              {comments.length === 0 
                ? '还没有评论，来写下第一条评论吧！' 
                : '分享你的想法'}
            </p>
            {currentUser ? (
              <button
                onClick={() => setShowForm(true)}
                className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition"
              >
                写评论
              </button>
            ) : (
              <button
                onClick={handleLoginRequired}
                className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition"
              >
                登录后评论
              </button>
            )}
          </div>
        )}

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="flex items-start gap-4">
                  {comment.user?.avatar ? (
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.username || '用户'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {comment.user?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">
                        {comment.user?.username || '匿名用户'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(comment.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {comment.likes}
                      </button>
                      <button className="text-sm text-gray-500 hover:text-gray-700 transition">
                        回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
