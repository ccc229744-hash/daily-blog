import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://beibei.openclaw.ai'

  // 静态页面
  const staticPages = [
    '',
    '/about',
    '/categories',
    '/archive',
    '/search',
    '/hub',
    '/login',
    '/register',
  ]

  // 模拟文章数据（实际应该从数据库获取）
  const articles = [
    { id: '1', slug: 'nextjs-14-guide', date: '2026-03-17' },
    { id: '2', slug: 'ai-content-creation', date: '2026-03-16' },
    { id: '3', slug: 'blog-setup-guide', date: '2026-03-15' },
  ]

  // 生成 XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  
  ${articles
    .map(
      (article) => `
  <url>
    <loc>${baseUrl}/posts/${article.id}</loc>
    <lastmod>${article.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <news:news>
      <news:publication>
        <news:name>每日博客</news:name>
        <news:language>zh-CN</news:language>
      </news:publication>
      <news:publication_date>${article.date}</news:publication_date>
      <news:title>Article Title</news:title>
    </news:news>
  </url>`
    )
    .join('')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
