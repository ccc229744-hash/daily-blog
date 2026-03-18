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

interface StructuredDataProps {
  article?: ArticleData
  type?: 'article' | 'blog' | 'website' | 'person'
}

export default function StructuredData({ article, type = 'article' }: StructuredDataProps) {
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
            url: 'https://beibei.openclaw.ai/logo.png',
          },
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified || article.datePublished,
        keywords: article.tags.join(', '),
        articleBody: article.description,
        wordCount: article.description.length,
      }
    }

    if (type === 'website') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '每日博客',
        description: '记录每一天的思考与成长',
        url: 'https://beibei.openclaw.ai',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://beibei.openclaw.ai/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
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
