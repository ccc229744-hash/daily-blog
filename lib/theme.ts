/**
 * 统一主题配置
 * 所有颜色和样式都在这里定义，确保一致性
 */

export const theme = {
  // 主色调 - 红粉渐变
  colors: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    secondary: {
      500: '#ec4899', // pink-500
      600: '#db2777', // pink-600
    },
    accent: {
      500: '#8b5cf6', // violet-500
      600: '#7c3aed', // violet-600
    },
  },

  // 渐变配置
  gradients: {
    // 主渐变 - 红粉紫
    main: 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500',
    // 抖音风格
    douyin: 'bg-gradient-to-r from-cyan-400 via-white to-red-500',
    // 小红书风格
    xiaohongshu: 'bg-gradient-to-r from-red-500 to-pink-500',
    // 柔和渐变
    soft: 'bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100',
  },

  // 阴影配置
  shadows: {
    // 轻微阴影
    sm: 'shadow-sm',
    // 中等阴影
    md: 'shadow-md',
    // 大阴影
    lg: 'shadow-lg',
    // 渐变阴影
    gradient: 'shadow-lg shadow-red-500/30',
    // 悬浮效果
    hover: 'hover:shadow-xl hover:shadow-red-500/40',
  },

  // 圆角配置
  radius: {
    // 小圆角
    sm: 'rounded-lg',
    // 中圆角
    md: 'rounded-xl',
    // 大圆角
    lg: 'rounded-2xl',
    // 超大圆角
    xl: 'rounded-3xl',
    // 完全圆角
    full: 'rounded-full',
  },

  // 间距配置
  spacing: {
    // 页面边距
    page: 'px-4',
    // 卡片内边距
    card: 'p-6',
    // 区块间距
    section: 'py-8',
  },

  // 动画配置
  animation: {
    // 过渡时间
    fast: 'duration-200',
    normal: 'duration-300',
    slow: 'duration-500',
    // 缓动函数
    ease: 'ease-in-out',
    bounce: 'ease-out',
  },

  // 字体配置
  typography: {
    // 标题字体
    heading: 'font-bold',
    // 正文字体
    body: 'font-normal',
    // 强调字体
    emphasis: 'font-semibold',
  },

  // 断点配置
  breakpoints: {
    // 手机
    mobile: 'max-w-md',
    // 平板
    tablet: 'max-w-2xl',
    // 桌面
    desktop: 'max-w-7xl',
  },

  // z-index 层级
  zIndex: {
    // 基础层
    base: 10,
    // sticky 层
    sticky: 50,
    // 弹窗层
    modal: 100,
    // 提示层
    tooltip: 200,
  },
} as const

// 导出常用组合
export const commonStyles = {
  // 卡片基础样式
  card: `${theme.radius.lg} bg-white dark:bg-gray-900 ${theme.shadows.sm}`,
  // 按钮基础样式
  button: `${theme.radius.full} font-medium ${theme.animation.normal} ${theme.animation.ease}`,
  // 渐变背景
  gradient: theme.gradients.main,
  // 页面容器
  page: `min-h-screen bg-gray-50 dark:bg-gray-950`,
} as const

// 导出类型
export type Theme = typeof theme
export type CommonStyles = typeof commonStyles
