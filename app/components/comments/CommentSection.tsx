'use client'

import { useState } from 'react'

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  likes: number
  replies: Comment[]
  date: string
  isLiked?: boolean
}

interface CommentSectionProps {
  postId: string
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: '张三',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      content: '写得非常好！学到了很多，期待更多干货分享！',
      likes: 128,
      replies: [
        {
          id: 2,
          author: '前端小贝',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beibei',
          content: '感谢支持！会继续努力的～',
          likes: 56,
          replies: [],
          date: '2 小时前',
        },
      ],
      date: '3 小时前',
    },
    {
      id: 3,
      author: '李四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      content: '这个教程太及时了，正好需要学习这个技术栈',
      likes: 89,
      replies: [],
      date: '5 小时前',
    },
    {
      id: 4,
      author: '王五',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      content: '博主能不能出一期关于性能优化的文章？',
      likes: 45,
      replies: [],
      date: '1 天前',
    },
  ])

  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const handlePostComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      author: '我',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
      content: newComment,
      likes: 0,
      replies: [],
      date: '刚刚',
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const handlePostReply = (parentId: number) => {
    if (!replyContent.trim()) return

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              author: '我',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
              content: replyContent,
              likes: 0,
              replies: [],
              date: '刚刚',
            } as Comment,
          ],
        }
      }
      return comment
    }))

    setReplyContent('')
    setReplyTo(null)
  }

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        }
      }
      return comment
    }))
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-6">
        评论 ({comments.reduce((sum, c) => sum + c.replies.length + 1, 0)})
      </h2>

      {/* 发表评论 */}
      <div className="flex gap-4 mb-8">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=me"
          alt="我"
          className="w-10 h-10 rounded-full bg-gray-800"
        />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="说点什么吧..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="text-gray-500 text-sm">
              支持 Markdown 语法
            </div>
            <button
              onClick={handlePostComment}
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-red-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发表评论
            </button>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-800 last:border-0 pb-6 last:pb-0">
            <div className="flex gap-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full bg-gray-800"
              />
              <div className="flex-1">
                {/* 评论头部 */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-white">{comment.author}</span>
                  <span className="text-gray-500 text-sm">{comment.date}</span>
                </div>

                {/* 评论内容 */}
                <p className="text-gray-300 mb-3">{comment.content}</p>

                {/* 评论操作 */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-sm transition ${
                      comment.isLiked ? 'text-red-400' : 'text-gray-500 hover:text-red-400'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="text-gray-500 hover:text-white text-sm transition"
                  >
                    回复
                  </button>
                </div>

                {/* 回复输入框 */}
                {replyTo === comment.id && (
                  <div className="mt-4 flex gap-3">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=me"
                      alt="我"
                      className="w-8 h-8 rounded-full bg-gray-800"
                    />
                    <div className="flex-1">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder={`回复 ${comment.author}...`}
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none text-sm"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handlePostReply(comment.id)}
                          disabled={!replyContent.trim()}
                          className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          回复
                        </button>
                        <button
                          onClick={() => {
                            setReplyTo(null)
                            setReplyContent('')
                          }}
                          className="px-4 py-1.5 bg-gray-800 text-gray-400 rounded-full text-sm font-medium hover:bg-gray-700 transition"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 回复列表 */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-800">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-8 h-8 rounded-full bg-gray-800"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white text-sm">{reply.author}</span>
                            <span className="text-gray-500 text-xs">{reply.date}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{reply.content}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-red-400 text-xs transition">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span>{reply.likes}</span>
                            </button>
                            <button className="text-gray-500 hover:text-white text-xs transition">
                              回复
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-gray-400">暂无评论，快来抢沙发吧！</p>
        </div>
      )}
    </div>
  )
}
