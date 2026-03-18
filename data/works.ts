/**
 * 作品数据结构
 * 用于存储用户发布的作品
 */

export interface Work {
  id: string;
  type: 'article' | 'video';
  title: string;
  content?: string;        // 文章内容
  videoUrl?: string;       // 视频 URL
  coverImage?: string;     // 封面图
  tags: string[];          // 标签
  authorId: string;        // 作者 ID
  authorName: string;      // 作者名称
  authorAvatar: string;    // 作者头像
  createdAt: string;       // 创建时间
  likes: number;           // 点赞数
  comments: number;        // 评论数
  shares: number;          // 分享数
  views: number;           // 浏览量
  isPublished: boolean;    // 是否已发布
}

const API_BASE = '/api/posts';

/**
 * 发布作品（保存到 API）
 */
export async function publishWork(work: Omit<Work, 'id' | 'createdAt' | 'likes' | 'comments' | 'shares' | 'views' | 'isPublished'>): Promise<Work> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(work),
  });

  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || '发布失败');
  }

  return result.data;
}

/**
 * 获取所有作品（从 API 加载）
 */
export async function getAllWorks(limit?: number): Promise<Work[]> {
  const url = new URL(API_BASE, window.location.origin);
  if (limit) url.searchParams.set('limit', limit.toString());
  
  const response = await fetch(url.toString());
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || '获取失败');
  }

  return result.data;
}

/**
 * 获取单个作品
 */
export async function getWork(id: string): Promise<Work> {
  const response = await fetch(`${API_BASE}/${id}`);
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || '获取失败');
  }

  return result.data;
}

/**
 * 搜索作品
 */
export async function searchWorks(query: string, type?: 'article' | 'video'): Promise<Work[]> {
  const url = new URL(API_BASE, window.location.origin);
  url.searchParams.set('search', query);
  if (type) url.searchParams.set('type', type);
  
  const response = await fetch(url.toString());
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || '搜索失败');
  }

  return result.data;
}

/**
 * 点赞作品
 */
export async function likeWork(workId: string): Promise<number> {
  const response = await fetch(`${API_BASE}/${workId}/like`, {
    method: 'POST',
  });

  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || '点赞失败');
  }

  return result.data.likes;
}

/**
 * 删除作品
 */
export async function deleteWork(workId: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/${workId}`, {
    method: 'DELETE',
  });

  const result = await response.json();
  return result.success;
}

export default {
  publishWork,
  getAllWorks,
  getWork,
  searchWorks,
  likeWork,
  deleteWork,
};
