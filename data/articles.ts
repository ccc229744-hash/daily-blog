export interface XhsArticle {
  id: string;
  title: string;
  image: string;
  author: string;
  avatar: string;
  likes: number;
  collects: number;
  tags: string[];
  category: string;
}

export const xhsArticles: XhsArticle[] = [
  {
    id: '1',
    title: 'Next.js 14 实战指南｜前端开发必备',
    image: 'https://picsum.photos/seed/nextjs/400/500',
    author: '前端小贝',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    likes: 1234,
    collects: 567,
    tags: ['前端开发', 'Next.js', 'React'],
    category: '技术',
  },
  {
    id: '2',
    title: 'AI 内容创作全流程分享✨',
    image: 'https://picsum.photos/seed/ai/400/500',
    author: 'AI 探索者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    likes: 2890,
    collects: 1203,
    tags: ['AI 工具', '内容创作', '效率'],
    category: 'AI',
  },
  {
    id: '3',
    title: '从零搭建个人博客📝超详细教程',
    image: 'https://picsum.photos/seed/blog/400/500',
    author: '博主日记',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    likes: 856,
    collects: 432,
    tags: ['博客搭建', '教程', '技术分享'],
    category: '生活',
  },
  {
    id: '4',
    title: '我的 AI 变现之路💰月入过万',
    image: 'https://picsum.photos/seed/money/400/500',
    author: '变现达人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    likes: 5670,
    collects: 3421,
    tags: ['AI 变现', '副业', '赚钱'],
    category: '搞钱',
  },
  {
    id: '5',
    title: '打工人必备 AI 工具清单🧰',
    image: 'https://picsum.photos/seed/tools/400/500',
    author: '效率控',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    likes: 3456,
    collects: 2100,
    tags: ['AI 工具', '效率', '打工人'],
    category: '工具',
  },
  {
    id: '6',
    title: '30 天学会 AI 绘画🎨我的学习路径',
    image: 'https://picsum.photos/seed/art/400/500',
    author: '艺术 AI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
    likes: 1890,
    collects: 967,
    tags: ['AI 绘画', '学习', '艺术'],
    category: '艺术',
  },
];
