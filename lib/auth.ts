// Authing Web SDK
// 注意：Authing 主要通过浏览器重定向进行认证
// 这里提供辅助函数来构建登录 URL

const userPoolId = process.env.NEXT_PUBLIC_AUTHING_USER_POOL_ID
const appId = process.env.NEXT_PUBLIC_AUTHING_APP_ID
const redirectUri = process.env.NEXT_PUBLIC_AUTHING_REDIRECT_URI

if (!userPoolId || !appId || !redirectUri) {
  console.warn('Authing 配置缺失，请检查 .env.local 文件')
}

// 构建授权 URL
export function buildAuthorizeUrl() {
  const baseUrl = `https://${userPoolId}.authing.cn/login`
  const params = new URLSearchParams({
    app_id: appId || '',
    redirect_uri: redirectUri || window.location.origin + '/callback',
    response_type: 'id_token',
    scope: 'openid profile email',
  })
  
  return `${baseUrl}?${params.toString()}`
}

// 从 URL hash 中解析 token
export function parseHash() {
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  return {
    idToken: params.get('id_token'),
    accessToken: params.get('access_token'),
  }
}

// 用户类型
export interface AuthingUser {
  id: string
  username?: string
  email?: string
  phone?: string
  avatar?: string
  nickname?: string
  externalId?: string
}

// 登录状态
export interface AuthState {
  isAuthenticated: boolean
  user: AuthingUser | null
  loading: boolean
}
