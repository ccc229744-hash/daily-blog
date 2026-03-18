/**
 * 本地存储系统
 * 使用 localStorage 持久化保存用户作品
 */

import { Work } from '../data/works';

const STORAGE_KEY = 'daily_blog_works';

/**
 * 从 localStorage 加载作品
 */
export function loadWorksFromStorage(): Work[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const works = JSON.parse(data);
    return Array.isArray(works) ? works : [];
  } catch (error) {
    console.error('加载作品失败:', error);
    return [];
  }
}

/**
 * 保存作品到 localStorage
 */
export function saveWorksToStorage(works: Work[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
  } catch (error) {
    console.error('保存作品失败:', error);
  }
}

/**
 * 添加作品
 */
export function addWorkToStorage(work: Work): Work[] {
  const works = loadWorksFromStorage();
  works.unshift(work); // 添加到开头
  saveWorksToStorage(works);
  return works;
}

/**
 * 删除作品
 */
export function deleteWorkFromStorage(workId: string): boolean {
  const works = loadWorksFromStorage();
  const index = works.findIndex(w => w.id === workId);
  
  if (index !== -1) {
    works.splice(index, 1);
    saveWorksToStorage(works);
    return true;
  }
  return false;
}

/**
 * 更新作品
 */
export function updateWorkInStorage(workId: string, updates: Partial<Work>): Work | null {
  const works = loadWorksFromStorage();
  const index = works.findIndex(w => w.id === workId);
  
  if (index !== -1) {
    works[index] = { ...works[index], ...updates };
    saveWorksToStorage(works);
    return works[index];
  }
  return null;
}

/**
 * 点赞作品
 */
export function likeWorkInStorage(workId: string): Work | null {
  return updateWorkInStorage(workId, {
    likes: (loadWorksFromStorage().find(w => w.id === workId)?.likes || 0) + 1
  });
}

/**
 * 增加浏览量
 */
export function incrementViews(workId: string): Work | null {
  const works = loadWorksFromStorage();
  const work = works.find(w => w.id === workId);
  
  if (work) {
    return updateWorkInStorage(workId, {
      views: work.views + 1
    });
  }
  return null;
}

/**
 * 获取用户的所有作品
 */
export function getUserWorksFromStorage(userId: string): Work[] {
  const works = loadWorksFromStorage();
  return works.filter(w => w.authorId === userId);
}

/**
 * 清空所有作品（调试用）
 */
export function clearAllWorks(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export default {
  loadWorksFromStorage,
  saveWorksToStorage,
  addWorkToStorage,
  deleteWorkFromStorage,
  updateWorkInStorage,
  likeWorkInStorage,
  incrementViews,
  getUserWorksFromStorage,
  clearAllWorks,
};
