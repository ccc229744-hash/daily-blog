# 🎯 快速部署到 Vercel

## 方式一：网页部署（最简单）⭐

### 1. 访问 Vercel
打开浏览器访问：
```
https://vercel.com/new
```

### 2. 登录
- 点击 **"Continue with GitHub"**
- 授权 Vercel 访问你的 GitHub 账号

### 3. 导入项目
- 在 **"Import Git Repository"** 页面
- 找到 **daily-blog** 仓库
- 点击 **"Import"**

### 4. 配置项目（自动识别）
- Framework Preset: **Next.js** ✅
- Root Directory: `./` ✅
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅

### 5. 点击 "Deploy"
- 等待 2-3 分钟
- 🎉 部署完成！

### 6. 获得访问链接
```
https://daily-blog-xxxx.vercel.app
```

---

## 方式二：命令行部署

### 1. 登录 Vercel
```powershell
vercel login
```
（会打开浏览器，点击授权）

### 2. 连接项目
```powershell
cd C:\Users\15578\.openclaw\workspace\daily-blog
vercel link
```

### 3. 部署
```powershell
vercel --prod
```

---

## ✅ 部署后

### 访问你的网站
```
https://daily-blog-你的用户名.vercel.app
```

### 测试功能
- ✅ 首页：`/`
- ✅ 作品广场：`/works`
- ✅ 作品管理：`/works-manager`
- ✅ 搜索：`/search`

### 自动更新
```bash
# 修改代码后
git add .
git commit -m "修改说明"
git push

# Vercel 自动部署！
```

---

## 🎉 完成！

部署成功后：
1. 访问 Vercel 提供的链接
2. 测试所有功能
3. 分享给朋友！

---

**现在打开浏览器访问：https://vercel.com/new**
