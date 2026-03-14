# 🚀 Authing 第三方登录 - 10 分钟快速配置

**更新时间**: 2026-03-13 13:35  
**适合人群**: 个人开发者、快速上线项目

---

## 🎯 为什么用 Authing？

| 对比项 | 自己申请微信/QQ | Authing 第三方 |
|--------|----------------|---------------|
| 资质要求 | 企业营业执照 | 个人可用 ✅ |
| 费用 | 300 元/年（微信） | 免费额度 ✅ |
| 审核时间 | 1-3 天 | 无需审核 ✅ |
| 配置难度 | 复杂 | 简单 ✅ |
| 登录方式 | 微信 + QQ | 微信 + QQ + 谷歌 + 苹果等 |

**结论：** 个人项目/快速上线 → 用 Authing！

---

## 📋 配置步骤（10 分钟）

### Step 1: 注册 Authing 账号（2 分钟）

1. 打开 Authing 官网：https://authing.cn
2. 点击右上角"免费注册"
3. 用邮箱或手机号注册
4. 验证邮箱/手机

**无需营业执照！个人就能注册！**

---

### Step 2: 创建用户池（3 分钟）

1. 登录后进入控制台
2. 点击"创建用户池"
3. 填写信息：
   - **用户池名称**: 每日博客
   - **用户池标识**: `daily-blog`（英文，唯一）
   - **描述**: 我的个人博客
4. 点击"创建"

创建成功后，获得：
- **用户池 ID**: 类似 `65a1b2c3d4e5f6g7h8i9j0k1`
- **域名**: `daily-blog.authing.cn`

---

### Step 3: 配置社交登录（3 分钟）

1. 在用户池控制台，点击左侧"连接身份源"
2. 找到"社交登录"分类
3. 启用以下方式：
   - ✅ 微信公众号（服务号）
   - ✅ 微信网页授权
   - ✅ QQ 登录
   - ✅ 谷歌（可选）
   - ✅ Apple（可选）

4. 点击每个方式，按提示配置：
   - **微信网页授权**（最简单）：
     - AppID: 先留空（用 Authing 的测试账号）
     - AppSecret: 先留空
     - 勾选"启用测试账号"
   
   - **QQ 登录**：
     - AppID: 先留空
     - AppKey: 先留空
     - 勾选"启用测试账号"

**重点：** 勾选"启用测试账号"后，**无需自己申请微信/QQ 资质**，Authing 提供测试账号给你用！

---

### Step 4: 获取配置信息（1 分钟）

在用户池控制台 → 应用详情 中获取：

- **AUTHING_USER_POOL_ID**: `65a1b2c3d4e5f6g7h8i9j0k1`（你的用户池 ID）
- **AUTHING_APP_ID**: `65a1b2c3d4e5f6g7h8i9j0k2`（应用 ID）
- **AUTHING_REDIRECT_URI**: `http://localhost:3000/callback`（本地测试）

---

### Step 5: 配置环境变量（1 分钟）

编辑 `daily-blog/.env.local`：

```env
# Authing 配置
NEXT_PUBLIC_AUTHING_USER_POOL_ID=65a1b2c3d4e5f6g7h8i9j0k1
NEXT_PUBLIC_AUTHING_APP_ID=65a1b2c3d4e5f6g7h8i9j0k2
NEXT_PUBLIC_AUTHING_REDIRECT_URI=http://localhost:3000/callback
```

---

### Step 6: 测试登录（1 分钟）

```bash
cd daily-blog
npm run dev
```

打开 http://localhost:3000，点击登录，选择微信或 QQ 登录，会跳转到 Authing 的登录页，选择测试账号登录即可。

---

## 🎉 完成！

现在你的博客支持：
- ✅ 微信登录（测试账号）
- ✅ QQ 登录（测试账号）
- ✅ 手机号登录
- ✅ 邮箱登录

**无需营业执照，无需等审核，今天就能上线！**

---

## 📊 免费额度

Authing 免费版额度：
- **MAU（月活用户）**: 5000
- **社交登录**: 支持所有主流平台
- **短信**: 100 条/月
- **邮件**: 1000 封/月

**个人博客完全够用！**

---

## 🚀 正式上线后

### 1. 修改回调域名
在 Authing 控制台 → 应用设置 → 回调 URL：
```
https://your-domain.com/callback
```

### 2. 修改环境变量
```env
NEXT_PUBLIC_AUTHING_REDIRECT_URI=https://your-domain.com/callback
```

### 3. 部署到 Vercel
```bash
vercel --prod
```

在 Vercel 项目设置中添加 Authing 环境变量。

---

## 💡 进阶：用自己的微信/QQ 账号

如果你后续申请到了微信/QQ 资质，可以在 Authing 中配置自己的账号：

### 微信配置
1. Authing 控制台 → 连接身份源 → 微信
2. 填入你的：
   - AppID
   - AppSecret
3. 取消勾选"启用测试账号"

### QQ 配置
1. Authing 控制台 → 连接身份源 → QQ
2. 填入你的：
   - AppID
   - AppKey
3. 取消勾选"启用测试账号"

**好处：** 用户看到的是你自己的品牌，不是 Authing 的测试账号。

---

## 📞 Authing 支持

- **文档**: https://docs.authing.cn/
- **社区**: https://forum.authing.cn/
- **工单**: 控制台内提交
- **微信**: 关注"Authing"公众号

---

## 🆚 对比总结

| 方案 | 费用 | 时间 | 资质 | 推荐度 |
|------|------|------|------|--------|
| 自己申请微信/QQ | 300 元/年 | 1-3 天 | 需要执照 | ⭐⭐⭐ |
| Authing 测试账号 | 免费 | 10 分钟 | 无需执照 | ⭐⭐⭐⭐⭐ |
| Authing + 自己账号 | 免费 + 300 元/年 | 10 分钟 + 1-3 天 | 需要执照 | ⭐⭐⭐⭐ |

**建议：** 先用 Authing 测试账号上线 → 有收入后再申请正式资质！

---

**开始配置吧！** 🚀

有问题随时问我！🐚
