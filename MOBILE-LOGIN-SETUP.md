# 📱 移动端登录配置指南

**更新时间**: 2026-03-13 13:35  
**版本**: v1.0

---

## 🎯 功能概述

已实现三种移动端登录方式：

| 方式 | 适用场景 | 用户体验 |
|------|----------|----------|
| **微信 H5 登录** | 微信浏览器内 | ⭐⭐⭐⭐⭐ 一键授权 |
| **QQ H5 登录** | 手机 QQ 内 | ⭐⭐⭐⭐⭐ 一键授权 |
| **手机号验证码** | 所有场景 | ⭐⭐⭐⭐ 通用方案 |

---

## 🔧 配置步骤

### Step 1: 申请微信登录资质

#### 1.1 注册微信开放平台
- 网址：https://open.weixin.qq.com/
- 需要企业营业执照（个人无法申请）
- 费用：300 元/年（认证费用）

#### 1.2 创建网站应用
1. 登录开放平台 → 管理中心 → 网站应用
2. 点击"创建网站应用"
3. 填写信息：
   - 应用名称：你的博客名称
   - 网站 URL：你的域名
   - 回调域名：`your-domain.com`
4. 提交审核（1-3 个工作日）

#### 1.3 获取配置信息
审核通过后，获得：
- **AppID**: `wx1234567890abcdef`
- **AppSecret**: 32 位字符串

#### 1.4 配置回调域名
在"网站应用详情" → "开发信息"中：
- 授权回调域：`your-domain.com`

---

### Step 2: 申请 QQ 登录资质

#### 2.1 注册 QQ 互联
- 网址：https://connect.qq.com/
- 需要企业营业执照（部分个人可申請）
- 免费

#### 2.2 创建网站应用
1. 登录 QQ 互联 → 管理中心 → 网站应用
2. 点击"创建网站应用"
3. 填写信息：
   - 应用名称：你的博客名称
   - 网站 URL：你的域名
   - 回调地址：`https://your-domain.com/api/auth/qq/callback`
4. 提交审核（1-3 个工作日）

#### 2.3 获取配置信息
审核通过后，获得：
- **AppID**: `123456789`
- **AppKey**: 32 位字符串

---

### Step 3: 配置环境变量

复制示例文件：
```bash
cd daily-blog
cp .env.local.example .env.local
```

编辑 `.env.local`：
```env
# 微信登录配置
NEXT_PUBLIC_WECHAT_APPID=wx1234567890abcdef
WECHAT_APP_SECRET=your_real_wechat_secret
WECHAT_REDIRECT_URI=https://your-domain.com/api/auth/wechat/callback

# QQ 登录配置
NEXT_PUBLIC_QQ_APP_ID=123456789
QQ_APP_SECRET=your_real_qq_secret
QQ_REDIRECT_URI=https://your-domain.com/api/auth/qq/callback
```

---

### Step 4: 测试登录

#### 本地测试
```bash
npm run dev
```

访问 http://localhost:3000，点击登录按钮测试。

#### 注意事项
- 本地测试时，回调域名需要配置为 `http://localhost:3000`
- 微信/QQ 后台的回调域名也要临时改成 `localhost`
- 正式上线前改回真实域名

---

## 📱 移动端用户体验流程

### 微信 H5 登录
1. 用户点击"微信登录"
2. 跳转到微信授权页（`open.weixin.qq.com`）
3. 用户点击"同意"
4. 自动跳转回网站，完成登录
5. 全程 3-5 秒

### QQ H5 登录
1. 用户点击"QQ 登录"
2. 跳转到 QQ 授权页（`graph.qq.com`）
3. 用户点击"同意"
4. 自动跳转回网站，完成登录
5. 全程 3-5 秒

### 手机号验证码登录
1. 用户输入手机号
2. 点击"获取验证码"
3. 收到短信（模拟：123456）
4. 输入验证码
5. 点击"登录"
6. 完成登录

---

## 🚀 部署上线

### Vercel 部署
```bash
vercel --prod
```

### 环境变量配置
在 Vercel 项目设置中添加：
- `NEXT_PUBLIC_WECHAT_APPID`
- `WECHAT_APP_SECRET`
- `WECHAT_REDIRECT_URI`
- `NEXT_PUBLIC_QQ_APP_ID`
- `QQ_APP_SECRET`
- `QQ_REDIRECT_URI`

### 生产环境检查清单
- [ ] 微信/QQ 回调域名改为正式域名
- [ ] 使用 HTTPS（Vercel 自动提供）
- [ ] 测试真实设备登录
- [ ] 测试微信浏览器内登录
- [ ] 测试 QQ 浏览器内登录

---

## 🐛 常见问题

### Q1: 个人没有营业执照怎么办？
**方案 1**: 使用手机号验证码登录（无需资质）
**方案 2**: 找有执照的朋友帮忙申请
**方案 3**: 使用第三方登录服务（Authing、Okta）

### Q2: 回调域名配置错误？
检查三点：
1. `.env.local` 中的 `REDIRECT_URI`
2. 微信/QQ 开放平台后台的回调域名
3. 必须是 `https://` 开头（本地测试可用 `http://`）

### Q3: 移动端和 PC 端如何区分？
代码已自动检测：
- PC 端：显示二维码扫码
- 移动端：H5 跳转授权

### Q4: 登录后如何获取用户信息？
查看 `/api/auth/wechat/callback` 和 `/api/auth/qq/callback` 的返回数据，包含：
- `openid`: 用户唯一标识
- `nickname`: 昵称
- `avatar`: 头像 URL
- `gender`: 性别

---

## 📊 登录数据设计

### 用户表结构（示例）
```typescript
interface User {
  id: string          // 主键
  openid: string      // 微信/QQ OpenID
  provider: string    // 'wechat' | 'qq' | 'phone'
  username: string    // 昵称
  avatar: string      // 头像 URL
  phone?: string      // 手机号（手机登录时）
  created_at: string  // 创建时间
}
```

### Cookie 存储
```typescript
// 登录成功后设置
cookies.set('user', JSON.stringify(user), {
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 24 * 7, // 7 天
  path: '/',
})
```

---

## 🔒 安全建议

1. **AppSecret 不要泄露**
   - 只存在服务器端
   - 不要提交到 Git

2. **使用 HTTPS**
   - 生产环境强制 HTTPS
   - Vercel 自动提供

3. **Token 验证**
   - 实际项目中应该用 JWT
   - 示例代码用的是简化版 Cookie

4. **防刷机制**
   - 手机号验证码需要限流
   - 同一手机号 1 分钟只能发 1 次

---

## 📝 相关文档

- [微信登录官方文档](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)
- [QQ 登录官方文档](https://wiki.connect.qq.com/%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C_oauth2-0)
- [OAuth 2.0 协议详解](https://oauth.net/2/)

---

**配置完成！** 🎉

现在你的博客支持微信、QQ、手机号三种移动端登录方式了！

有问题随时问我！🐚
