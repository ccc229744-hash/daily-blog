'use client'

interface ArticleData {
  id: string
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image: string
  tags: string[]
}

interface BreadcrumbItem {
  name: string
  url: string
  position: number
}

interface StructuredDataProps {
  article?: ArticleData
  type?: 'article' | 'blog' | 'website' | 'person'
  breadcrumbs?: BreadcrumbItem[]
}

export default function StructuredData({ article, type = 'article', breadcrumbs }: StructuredDataProps) {
  const generateStructuredData = () => {
    if (type === 'article' && article) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://beibei.openclaw.ai/posts/${article.id}`,
        },
        headline: article.title,
        description: article.description,
        image: article.image,
        author: {
          '@type': 'Person',
          name: article.author,
        },
        publisher: {
          '@type': 'Organization',
          name: '每日博客',
          logo: {
            '@type': 'ImageObject',
            url: 'https://openclaw.ai/logo.png',
            width: 600,
            height: 600
          },
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        keywords: article.tags.join(', '),
        articleBody: article.description,
        wordCount: article.description.length,
        articleSection: article.tags[0] || '未分类',
        inLanguage: 'zh-CN'
      }
    }

    if (type === 'website') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '每日博客',
        description: '发现更多有趣的技术文章和生活分享，记录每一天的思考与成长',
        url: 'https://beibei.openclaw.ai',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://beibei.openclaw.ai/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'zh-CN'
      }
    }

    if (type === 'blog') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: '每日博客',
        description: '发现更多有趣的技术文章和生活分享，记录每一天的思考与成长',
        author: {
          '@type': 'Person',
          name: '贝贝',
          url: 'https://beibei.openclaw.ai/profile'
        },
        publisher: {
          '@type': 'Organization',
          name: '每日博客',
          logo: {
            '@type': 'ImageObject',
            url: 'https://openclaw.ai/logo.png',
            width: 600,
            height: 600
          }
        },
        url: 'https://beibei.openclaw.ai',
        inLanguage: 'zh-CN',
        sameAs: [
          'https://github.com/openclaw/openclaw',
          'https://weibo.com/openclaw'
        ]
      }
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map(item => ({
          '@type': 'ListItem',
          position: item.position,
          name: item.name,
          item: item.url
        }))
      }
    }

    return {}
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
    />
  )
}
