// 模拟文章数据（后续替换为真实 API）
import { Post } from '@/types'

export const mockPosts: Post[] = [
  {
    id: '2026-03-12-hello-world',
    title: '你好，世界！我的博客诞生了',
    date: '2026-03-12',
    excerpt: '这是我的第一篇博客文章，记录博客搭建的过程和未来的计划。',
    author: '贝贝',
    tags: ['博客', '生活'],
  },
  {
    id: '2026-03-11-nextjs-tips',
    title: 'Next.js 开发小技巧',
    date: '2026-03-11',
    excerpt: '分享一些在使用 Next.js 过程中学到的实用技巧和最佳实践。',
    author: '贝贝',
    tags: ['技术', 'Next.js'],
  },
]

// 模拟 API 调用（后续替换为真实 API）
export async function fetchPosts(): Promise<Post[]> {
  // TODO: 替换为真实 API 调用
  // const response = await fetch('/api/posts')
  // return response.json()
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPosts)
    }, 500)
  })
}

export async function fetchPost(id: string): Promise<Post | null> {
  // TODO: 替换为真实 API 调用
  const post = mockPosts.find(p => p.id === id)
  return post || null
}
