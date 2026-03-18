/**
 * 模拟用户数据库
 * 实际项目中应该从后端 API 获取
 */

export interface User {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  isFriend: boolean;
  mutualFriends: number;
}

// 模拟所有用户数据
export const allUsers: User[] = [
  {
    id: 1,
    name: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
    bio: '热爱编程，喜欢分享技术心得',
    followers: 1234,
    following: 567,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 5,
  },
  {
    id: 2,
    name: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
    bio: '设计师，追求极致用户体验',
    followers: 2345,
    following: 678,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 8,
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
    bio: '产品经理，关注 AI 与互联网',
    followers: 3456,
    following: 789,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 3,
  },
  {
    id: 4,
    name: '赵六',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu',
    bio: '创业者，正在做有趣的项目',
    followers: 4567,
    following: 890,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 12,
  },
  {
    id: 5,
    name: '小明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming',
    bio: '学生党，热爱学习',
    followers: 567,
    following: 234,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 2,
  },
  {
    id: 6,
    name: '小红',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaohong',
    bio: '摄影师，记录美好生活',
    followers: 5678,
    following: 901,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 7,
  },
  {
    id: 7,
    name: '小刚',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaogang',
    bio: '健身达人，自律即自由',
    followers: 6789,
    following: 123,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 4,
  },
  {
    id: 8,
    name: '小美',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaomei',
    bio: '旅行博主，环游世界中',
    followers: 7890,
    following: 234,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 9,
  },
  {
    id: 9,
    name: '阿强',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aqiang',
    bio: '美食家，探索城市味道',
    followers: 8901,
    following: 345,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 6,
  },
  {
    id: 10,
    name: '阿珍',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=azhen',
    bio: '音乐人，用音符表达情感',
    followers: 9012,
    following: 456,
    isFollowing: false,
    isFriend: false,
    mutualFriends: 11,
  },
];

/**
 * 搜索用户
 * @param query 搜索关键词
 * @param excludeIds 排除的用户 ID（如已添加的好友）
 * @returns 匹配的用户列表
 */
export function searchUsers(query: string, excludeIds: number[] = []): User[] {
  if (!query.trim()) {
    return allUsers.filter(user => !excludeIds.includes(user.id));
  }
  
  const lowerQuery = query.toLowerCase();
  return allUsers
    .filter(user => 
      !excludeIds.includes(user.id) &&
      (user.name.toLowerCase().includes(lowerQuery) ||
       user.bio?.toLowerCase().includes(lowerQuery))
    )
    .slice(0, 20); // 限制返回数量
}

/**
 * 获取推荐用户（基于共同好友数排序）
 * @param excludeIds 排除的用户 ID
 * @returns 推荐用户列表
 */
export function getRecommendedUsers(excludeIds: number[] = []): User[] {
  return allUsers
    .filter(user => !excludeIds.includes(user.id))
    .sort((a, b) => b.mutualFriends - a.mutualFriends)
    .slice(0, 10);
}

export default {
  allUsers,
  searchUsers,
  getRecommendedUsers,
};
