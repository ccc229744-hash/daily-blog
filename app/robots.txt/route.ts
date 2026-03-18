import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `# robots.txt for 每日博客
# https://beibei.openclaw.ai

User-agent: *
Allow: /
Allow: /posts/
Allow: /categories/
Allow: /archive/
Allow: /about/

# 禁止爬取后台和 API
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /*?*

# 网站地图
Sitemap: https://beibei.openclaw.ai/sitemap.xml

# 通用爬虫规则
Crawl-delay: 1

# Google 爬虫
User-agent: Googlebot
Allow: /
Allow: /posts/*
Allow: /categories/*
Sitemap: https://beibei.openclaw.ai/sitemap.xml

# 百度爬虫
User-agent: Baiduspider
Allow: /
Allow: /posts/*
Allow: /categories/*
Sitemap: https://beibei.openclaw.ai/sitemap.xml
Crawl-delay: 2

# Bing 爬虫
User-agent: Bingbot
Allow: /
Allow: /posts/*
Allow: /categories/*
Sitemap: https://beibei.openclaw.ai/sitemap.xml
Crawl-delay: 1
`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
