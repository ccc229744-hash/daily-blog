import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''

  if (!query.trim()) {
    return NextResponse.json({ results: [], popular: getPopularSearches() })
  }

  const results = searchPosts(query)
  return NextResponse.json({ results, popular: getPopularSearches() })
}

function searchPosts(query: string) {
  const fileNames = fs.readdirSync(postsDirectory)
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0)
  
  const results: any[] = []

  fileNames.forEach((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const searchText = `
      ${data.title || ''} 
      ${data.excerpt || ''} 
      ${content}
      ${(data.categories || []).join(' ')}
      ${(data.tags || []).join(' ')}
    `.toLowerCase()

    let score = 0
    searchTerms.forEach(term => {
      if (data.title?.toLowerCase().includes(term)) score += 10
      if (data.excerpt?.toLowerCase().includes(term)) score += 5
      if (content.toLowerCase().includes(term)) score += 1
      if (data.categories?.some((c: string) => c.toLowerCase().includes(term))) score += 3
      if (data.tags?.some((t: string) => t.toLowerCase().includes(term))) score += 2
    })

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

  return results.sort((a, b) => b.score - a.score)
}

function getPopularSearches(): string[] {
  return ['Next.js', 'React', '博客', '技术', '成长', '学习', '思考']
}
