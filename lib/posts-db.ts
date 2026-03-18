import { promises as fs } from 'fs';
import path from 'path';

// 数据文件路径
export const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

// 作品接口
export interface Post {
  id: string;
  type: 'article' | 'video';
  title: string;
  content?: string;
  videoUrl?: string;
  coverImage?: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isPublished: boolean;
}

// 读取数据
export async function readPosts(): Promise<Post[]> {
  try {
    await fs.access(DATA_FILE);
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// 写入数据
export async function writePosts(posts: Post[]): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}
