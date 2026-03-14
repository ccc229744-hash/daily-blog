import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface SearchResult {
  slug: string
  title: string
  date: string
  excerpt: string
  categories: string[]
  tags: string[]
  content: string
  score: number
}

export function searchPosts(query: string): SearchResult[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0)
  
  const results: SearchResult[] = []

  fileNames.forEach((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 构建搜索文本
    const searchText = `
      ${data.title || ''} 
      ${data.excerpt || ''} 
      ${content}
      ${(data.categories || []).join(' ')}
      ${(data.tags || []).join(' ')}
    `.toLowerCase()

    // 计算相关性得分
    let score = 0
    searchTerms.forEach(term => {
      if (data.title?.toLowerCase().includes(term)) score += 10
      if (data.excerpt?.toLowerCase().includes(term)) score += 5
      if (content.toLowerCase().includes(term)) score += 1
      if (data.categories?.some((c: string) => c.toLowerCase().includes(term))) score += 3
      if (data.tags?.some((t: string) => t.toLowerCase().includes(term))) score += 2
    })

    // 只返回有匹配的结果
    if (score > 0) {
      results.push({
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        categories: data.categories || [],
        tags: data.tags || [],
        content: content.substring(0, 200) + '...',
        score,
      })
    }
  })

  // 按相关性排序
  return results.sort((a, b) => b.score - a.score)
}

export function getSearchSuggestions(query: string, limit: number = 5): SearchResult[] {
  return searchPosts(query).slice(0, limit)
}

export function getPopularSearches(): string[] {
  // 可以从搜索历史或热门标签中获取
  return [
    'Next.js',
    'React',
    '博客',
    '技术',
    '成长',
    '学习',
    '思考',
  ]
}
