import { NextRequest, NextResponse } from 'next/server'

// QQ 互联配置
const QQ_APP_ID = process.env.QQ_APP_ID || ''
const QQ_APP_SECRET = process.env.QQ_APP_SECRET || ''
const QQ_REDIRECT_URI = process.env.QQ_REDIRECT_URI || ''

/**
 * QQ 登录回调处理
 * 
 * 流程：
 * 1. 获取 code（URL 参数）
 * 2. 用 code 换取 access_token
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
    // Step 1: 用 code 换取 access_token
    const tokenResponse = await fetch(
      `https://graph.qq.com/oauth2.0/token?` + new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: QQ_APP_ID,
        client_secret: QQ_APP_SECRET,
        code: code,
        redirect_uri: QQ_REDIRECT_URI,
      })
    )

    if (!tokenResponse.ok) {
      throw new Error('获取 access_token 失败')
    }

    // QQ 返回的是 text 格式，需要解析
    const tokenText = await tokenResponse.text()
    const tokenParams = new URLSearchParams(tokenText)
    const accessToken = tokenParams.get('access_token')

    if (!accessToken) {
      throw new Error('未获取到 access_token')
    }

    // Step 2: 获取用户 OpenID
    const openidResponse = await fetch(
      `https://graph.qq.com/oauth2.0/me?access_token=${accessToken}`
    )
    const openidText = await openidResponse.text()
    
    // 解析 callback( {"client_id":"xxx","openid":"xxx"} );
    const openidMatch = openidText.match(/callback\(\s*({.*?})\s*\)/)
    if (!openidMatch) {
      throw new Error('获取 OpenID 失败')
    }
    const openidData = JSON.parse(openidMatch[1])
    const openid = openidData.openid

    // Step 3: 获取用户信息
    const userResponse = await fetch(
      `https://graph.qq.com/user/get_user_info?` + new URLSearchParams({
        access_token: accessToken,
        oauth_consumer_key: QQ_APP_ID,
        openid: openid,
      })
    )
    const userData = await userResponse.json()

    if (userData.ret !== 0) {
      throw new Error('获取用户信息失败')
    }

    // Step 4: 创建/更新用户（这里简化处理，实际应该存数据库）
    const user = {
      id: 'qq_' + openid,
      username: userData.nickname,
      avatar: userData.figureurl_qq_2 || userData.figureurl_qq_1,
      gender: userData.gender,
      provider: 'qq',
      created_at: new Date().toISOString(),
    }

    // Step 5: 返回登录结果
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
    console.error('QQ 登录失败:', error)
    
    // 重定向到首页并带上错误信息
    const redirectUrl = new URL('/', request.url)
    redirectUrl.searchParams.set('login_error', 'qq_login_failed')
    return NextResponse.redirect(redirectUrl)
  }
}
