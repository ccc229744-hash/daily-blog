import { NextRequest, NextResponse } from 'next/server'

// 微信开放平台配置
const WECHAT_APPID = process.env.WECHAT_APPID || ''
const WECHAT_APP_SECRET = process.env.WECHAT_APP_SECRET || ''
const WECHAT_REDIRECT_URI = process.env.WECHAT_REDIRECT_URI || ''

/**
 * 微信登录回调处理
 * 
 * 流程：
 * 1. 获取 code（URL 参数）
 * 2. 用 code 换取 access_token 和 openid
 * 3. 用 access_token 获取用户信息
 * 4. 创建/更新用户
 * 5. 返回登录结果
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.json(
      { error: '缺少授权码' },
      { status: 400 }
    )
  }

  try {
    // Step 1: 用 code 换取 access_token 和 openid
    const tokenResponse = await fetch(
      `https://api.weixin.qq.com/sns/oauth2/access_token?` + new URLSearchParams({
        appid: WECHAT_APPID,
        secret: WECHAT_APP_SECRET,
        code: code,
        grant_type: 'authorization_code',
      })
    )

    const tokenData = await tokenResponse.json()

    if (tokenData.errcode) {
      throw new Error(`微信 API 错误：${tokenData.errmsg}`)
    }

    const accessToken = tokenData.access_token
    const openid = tokenData.openid

    // Step 2: 获取用户信息
    const userResponse = await fetch(
      `https://api.weixin.qq.com/sns/userinfo?` + new URLSearchParams({
        access_token: accessToken,
        openid: openid,
        lang: 'zh_CN',
      })
    )

    const userData = await userResponse.json()

    if (userData.errcode) {
      throw new Error(`获取用户信息失败：${userData.errmsg}`)
    }

    // Step 3: 创建/更新用户（这里简化处理，实际应该存数据库）
    const user = {
      id: 'wechat_' + openid,
      username: userData.nickname,
      avatar: userData.headimgurl,
      gender: userData.sex === 1 ? 'male' : userData.sex === 2 ? 'female' : 'unknown',
      province: userData.province,
      city: userData.city,
      country: userData.country,
      provider: 'wechat',
      created_at: new Date().toISOString(),
    }

    // Step 4: 返回登录结果
    const response = NextResponse.redirect(new URL('/', request.url))
    
    // 设置 Cookie（实际项目中应该用 JWT）
    response.cookies.set('user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: '/',
    })

    return response
  } catch (error) {
    console.error('微信登录失败:', error)
    
    // 重定向到首页并带上错误信息
    const redirectUrl = new URL('/', request.url)
    redirectUrl.searchParams.set('login_error', 'wechat_login_failed')
    return NextResponse.redirect(redirectUrl)
  }
}
