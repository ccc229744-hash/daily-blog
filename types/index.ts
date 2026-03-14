// 文章数据类型定义
export interface Post {
  id: string
  title: string
  date: string
  excerpt?: string
  content?: string
  author?: string
  tags?: string[]
  coverImage?: string
}

// 作者信息类型
export interface Author {
  name: string
  avatar: string
  bio: string
  followers: number
}

// 评论类型
export interface Comment {
  id: string
  postId: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
}

// 动态类型（QQ 空间风格）
export interface FeedItem {
  id: string
  author: Author
  content: string
  images?: string[]
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
}

// 皮肤类型
export interface Skin {
  id: string
  name: string
  colors: string[]
  preview: string
}

// 访客类型
export interface Visitor {
  id: string
  name: string
  avatar: string
  time: string
}

// 说说类型
export interface SaySay {
  id: string
  content: string
  timestamp: string
  likes: number
  comments: number
  images?: string[]
}

// 音乐类型
export interface MusicTrack {
  id: string
  title: string
  artist: string
  duration: string
  cover: string
  url: string
}

// 统计类型
export interface Stats {
  posts: number
  views: number
  followers: number
  comments: number
}
