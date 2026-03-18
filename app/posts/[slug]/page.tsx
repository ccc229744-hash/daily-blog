import { getSortedPostsData } from '@/lib/posts'
import PostClient from './PostClient'

export async function generateStaticParams() {
  // 使用真实存在的文章 ID
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // 直接使用 slug 渲染，不依赖文件系统
  return <PostClient slug={slug} />
}
