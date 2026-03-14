import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 检查配置是否有效
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')

if (!isConfigured) {
  console.warn('Supabase 配置缺失或无效，请检查 .env.local 文件。评论功能将使用本地存储。')
}

// 创建 Supabase 客户端（如果配置有效）
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// 数据库表类型
export interface User {
  id: string
  email?: string
  phone?: string
  username?: string
  avatar?: string
  created_at: string
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  likes: number
  parent_id?: string
  user?: User
}
