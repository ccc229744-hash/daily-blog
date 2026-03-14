import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getSortedPostsData() {
  // 获取 content/posts 目录下的所有文件
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx?$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title || '无标题',
      date: matterResult.data.date || '未知日期',
      excerpt: matterResult.data.excerpt || '',
    }
  })

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx?$/, ''),
      },
    }
  })
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  // 将 Markdown 转换为 HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id: slug,
    slug,
    contentHtml,
    title: matterResult.data.title || '无标题',
    date: matterResult.data.date || '未知日期',
    excerpt: matterResult.data.excerpt || '',
  }
}
