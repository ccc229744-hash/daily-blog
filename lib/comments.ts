import fs from 'fs'
import path from 'path'

const commentsDirectory = path.join(process.cwd(), 'content/comments')

// 确保评论目录存在
if (!fs.existsSync(commentsDirectory)) {
  fs.mkdirSync(commentsDirectory, { recursive: true })
}

export interface Comment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  date: string
  parentId?: string
  likes: number
}

export function getCommentsByPost(postId: string): Comment[] {
  const commentsFile = path.join(commentsDirectory, `${postId}.json`)
  
  if (!fs.existsSync(commentsFile)) {
    return []
  }

  const fileContents = fs.readFileSync(commentsFile, 'utf8')
  const comments = JSON.parse(fileContents)
  
  return comments.sort((a: Comment, b: Comment) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function addComment(comment: Omit<Comment, 'id' | 'date' | 'likes'>) {
  const commentsFile = path.join(commentsDirectory, `${comment.postId}.json`)
  
  let comments: Comment[] = []
  if (fs.existsSync(commentsFile)) {
    const fileContents = fs.readFileSync(commentsFile, 'utf8')
    comments = JSON.parse(fileContents)
  }

  const newComment: Comment = {
    ...comment,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    likes: 0,
  }

  comments.push(newComment)
  fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2))

  return newComment
}

export function likeComment(postId: string, commentId: string) {
  const commentsFile = path.join(commentsDirectory, `${postId}.json`)
  
  if (!fs.existsSync(commentsFile)) {
    return null
  }

  const fileContents = fs.readFileSync(commentsFile, 'utf8')
  let comments = JSON.parse(fileContents)
  
  const comment = comments.find((c: Comment) => c.id === commentId)
  if (comment) {
    comment.likes += 1
    fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2))
    return comment
  }

  return null
}
