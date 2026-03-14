# 📱 Authing 配置指南 - 每日博客

**保存时间**: 2026-03-12 20:24  
**状态**: ⏸️ 待续（明天继续）

---

## 🎯 目标

完成 Authing 登录系统配置，让博客支持 QQ/微信登录。

---

## 📋 已完成步骤

### ✅ 第 1 步：注册 Authing 账号
- 访问：https://console.authing.cn
- 使用手机号或邮箱注册
- **状态**: 已完成 ✔️

---

## 🔄 待完成步骤（明天继续）

### 第 2 步：创建用户池

1. 登录后，进入控制台：https://console.authing.cn
2. 点击页面右上角的 **「创建用户池」** 按钮
3. 填写信息：
   - **用户池名称**: 每日博客
   - **用户池标识**: daily-blog（自动填充）
   - **部署方式**: 公有云
4. 点击 **「确定」**

**需要记录的信息**:
- [ ] 用户池 ID（类似 `65f1a2b3c4d5e6f7g8h9i0j1`）
- [ ] 用户池域名（类似 `daily-blog.authing.cn`）

---

### 第 3 步：创建应用

1. 在左侧菜单点击 **「应用管理」**
2. 点击 **「创建应用」**
3. 选择应用类型：
   - 类型：**Web**
   - 名称：每日博客 Web
4. 点击 **「确定」**

**需要记录的信息**:
- [ ] App ID（类似 `65f1a2b3c4d5e6f7g8h9i0j2`）

---

### 第 4 步：配置回调地址

1. 在应用详情页，找到 **「认证配置」** 或 **「登录回调」**
2. 添加以下回调地址：
   ```
   http://localhost:3000/callback
   ```
3. 点击 **「保存」**

---

### 第 5 步：填写到代码

1. 打开文件：`C:\Users\15578\.openclaw\workspace\daily-blog\.env.local`
2. 编辑以下内容：

```bash
# 替换为你刚才复制的值
NEXT_PUBLIC_AUTHING_USER_POOL_ID="你的用户池 ID"
NEXT_PUBLIC_AUTHING_APP_ID="你的 App ID"
NEXT_PUBLIC_AUTHING_REDIRECT_URI="http://localhost:3000/callback"

# Supabase 配置（后续再填）
NEXT_PUBLIC_SUPABASE_URL="placeholder"
NEXT_PUBLIC_SUPABASE_ANON_KEY="placeholder"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

### 第 6 步：测试登录

1. 在终端运行：
   ```bash
   cd daily-blog
   npm run dev
   ```

2. 打开浏览器访问：http://localhost:3000

3. 点击右上角的 **「登录」** 按钮

4. 应该能看到 Authing 的登录页面！

---

## 📝 配置信息记录表

| 配置项 | 值 | 位置 |
|--------|-----|------|
| 用户池 ID | _待填写_ | Authing → 设置 → 基础配置 |
| 用户池域名 | _待填写_ | Authing → 设置 → 基础配置 |
| App ID | _待填写_ | Authing → 应用管理 → 应用详情 |
| 回调地址 | `http://localhost:3000/callback` | Authing → 应用 → 认证配置 |

---

## 🆘 常见问题

### Q: 找不到用户池 ID 在哪？
**A**: 进入用户池 → 设置 → 基础配置，第一行就是

### Q: 回调地址填了但还是报错？
**A**: 检查是否完全一致（包括 http:// 和端口号）

### Q: 微信/QQ 登录按钮不显示？
**A**: 需要先在「身份源」中启用，并填写对应的 AppID/Secret（可以后续再配置）

### Q: 创建用户池失败？
**A**: 检查账号是否已验证，或联系客服

---

## 📚 相关文档

- `QUICKSTART.md` - 5 分钟快速启动指南
- `CHINA-CHECKLIST.md` - 完整配置清单
- `CLOUDFLARE-DEPLOY.md` - Cloudflare 部署指南

---

## ✅ 明日计划

1. [ ] 完成 Authing 配置（用户池 + 应用）
2. [ ] 填写 `.env.local` 文件
3. [ ] 本地测试登录功能
4. [ ] 配置 Supabase（数据库）
5. [ ] 部署到 Cloudflare Pages

---

**备注**: 此文件保存在 `daily-blog/AUTHING-SETUP.md`，明天打开即可查看继续配置。

**加油！明天就能完成登录功能了！** 💪
