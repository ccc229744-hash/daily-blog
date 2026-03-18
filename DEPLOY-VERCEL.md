# 🚀 部署到 Vercel 指南

**最稳定的方案，完全不用管理服务器！**

---

## 🎯 方案优势

- ✅ **完全免费** - 个人使用免费
- ✅ **自动部署** - 推送代码自动发布
- ✅ **全球 CDN** - 访问速度快
- ✅ **自动 HTTPS** - 安全证书
- ✅ **无需维护** - Vercel 管理一切
- ✅ **永不崩溃** - 企业级稳定性

---

## 📋 部署步骤

### 方法一：Vercel CLI（推荐）

```powershell
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署（预览）
vercel

# 4. 生产部署
vercel --prod
```

### 方法二：GitHub 自动部署

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourname/daily-blog.git
   git push -u origin main
   ```

2. **连接 Vercel**
   - 访问 https://vercel.com/new
   - 导入 GitHub 仓库
   - 点击 "Deploy"

3. **自动部署**
   - 每次 push 到 main 分支自动部署
   - 生成预览链接

---

## 🌐 访问地址

部署后会获得：
- **生产域名**: `https://daily-blog.vercel.app`
- **自定义域名**: 可绑定自己的域名

---

## ⚙️ 配置优化

### vercel.json（可选）

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": ".next",
  "regions": ["hnd1"],
  "env": {
    "PORT": "3005"
  }
}
```

---

## 📊 性能对比

| 方案 | 稳定性 | 性能 | 成本 | 维护 |
|------|--------|------|------|------|
| 本地开发 | ❌ 低 | ⭐⭐ | 免费 | 高 |
| PM2 管理 | ✅ 中 | ⭐⭐⭐ | 免费 | 中 |
| **Vercel** | ✅✅✅ 极高 | ⭐⭐⭐⭐⭐ | 免费 | 无 |

---

## 🎁 Vercel 免费额度

- ✅ 无限次部署
- ✅ 100GB 流量/月
- ✅ 自动 SSL 证书
- ✅ 自动 CDN 加速
- ✅ 自动域名

**个人使用完全免费！**

---

## 🔄 更新流程

```bash
# 1. 修改代码
# 2. 提交
git add .
git commit -m "更新内容"

# 3. 推送（自动部署）
git push

# Vercel 会自动构建和部署！
```

---

## 📱 监控和管理

访问 Vercel Dashboard:
- 查看部署历史
- 查看访问统计
- 查看错误日志
- 管理域名设置

---

**推荐指数：⭐⭐⭐⭐⭐**

**立即部署：https://vercel.com/new**

---

*最后更新：2026-03-18*
