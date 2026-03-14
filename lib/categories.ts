import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllCategories() {
  const fileNames = fs.readdirSync(postsDirectory)
  const categories = new Map<string, number>()

  fileNames.forEach((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    if (data.categories && Array.isArray(data.categories)) {
      data.categories.forEach((category: string) => {
        const count = categories.get(category) || 0
        categories.set(category, count + 1)
      })
    }
  })

  return Array.from(categories.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
}

export function getPostsByCategory(category: string) {
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    .filter((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return data.categories?.includes(category)
    })
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        categories: data.categories || [],
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}
