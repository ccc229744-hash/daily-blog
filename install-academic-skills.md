# 📚 论文写作技能安装清单

**创建时间：** 2026-03-18 18:12  
**状态：** ⏳ 等待速率限制解除

---

## 🎯 待安装技能（按优先级）

### 核心技能（必装）⭐⭐⭐
1. **academic-writing** - 学术写作助手
2. **academic-writing-refiner** - 学术写作优化
3. **research-paper-writer** - 研究论文撰写
4. **writing-assistant** - 写作助手

### 辅助技能（推荐）⭐⭐
5. **academic-mentor** - 学术导师
6. **paper-summarize-academic** - 论文摘要
7. **paper-parse** - 论文解析
8. **academic-search** - 学术搜索

### 扩展技能（可选）⭐
9. **arxiv-paper-processor** - Arxiv 论文处理
10. **daily-paper-digest** - 每日论文摘要
11. **paper-fetcher** - 论文获取
12. **peer-reviewer** - 同行评审

---

## 📋 安装命令（批量执行）

```bash
# 核心技能
clawhub install academic-writing
clawhub install academic-writing-refiner
clawhub install research-paper-writer
clawhub install writing-assistant

# 辅助技能
clawhub install academic-mentor
clawhub install paper-summarize-academic
clawhub install paper-parse
clawhub install academic-search

# 扩展技能
clawhub install arxiv-paper-processor
clawhub install daily-paper-digest
clawhub install paper-fetcher
clawhub install peer-reviewer
```

---

## ⏱️ 安装策略

### 避免速率限制：
1. **每次安装间隔 10-15 秒**
2. **分批安装**（每次 3-4 个）
3. **遇到限制等待 1 分钟**

### 推荐流程：
```
第一批：academic-writing, academic-writing-refiner, research-paper-writer
等待 30 秒
第二批：writing-assistant, academic-mentor, paper-summarize-academic
等待 30 秒
第三批：paper-parse, academic-search, arxiv-paper-processor
```

---

## ✅ 跳过重复技能

安装前检查：
```bash
openclaw skills check
```

如果已存在，自动跳过。

---

## 📊 技能功能说明

| 技能名称 | 功能 | 使用场景 |
|----------|------|----------|
| academic-writing | 学术论文写作 | 撰写论文正文 |
| academic-writing-refiner | 写作优化 | 润色、改写、提升 |
| research-paper-writer | 研究论文 | 完整论文结构 |
| writing-assistant | 写作助手 | 通用写作辅助 |
| academic-mentor | 学术导师 | 研究指导、建议 |
| paper-summarize-academic | 论文摘要 | 快速理解论文 |
| paper-parse | 论文解析 | 提取关键信息 |
| academic-search | 学术搜索 | 查找文献 |

---

## 🚀 快速安装脚本

创建 `install-academic-skills.ps1`：

```powershell
# 论文写作技能批量安装脚本

Write-Host "📚 开始安装论文写作技能..." -ForegroundColor Cyan

$skills = @(
    "academic-writing",
    "academic-writing-refiner",
    "research-paper-writer",
    "writing-assistant",
    "academic-mentor",
    "paper-summarize-academic"
)

foreach ($skill in $skills) {
    Write-Host "`n🔧 安装 $skill ..." -ForegroundColor Yellow
    clawhub install $skill
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $skill 安装成功" -ForegroundColor Green
    } else {
        Write-Host "⚠️  $skill 安装失败，等待 15 秒..." -ForegroundColor Red
        Start-Sleep -Seconds 15
    }
    
    Start-Sleep -Seconds 10
}

Write-Host "`n🎉 安装完成！" -ForegroundColor Green
```

---

## 📝 注意事项

1. **速率限制**：ClawHub 有 API 调用限制
2. **重复检查**：已存在的技能会自动跳过
3. **网络稳定**：确保网络连接正常
4. **磁盘空间**：确保有足够空间

---

## 🔄 后续步骤

1. ✅ 等待速率限制解除（约 5-10 分钟）
2. ✅ 运行批量安装脚本
3. ✅ 验证技能安装成功
4. ✅ 测试技能功能

---

**当前状态：** ⏳ 等待速率限制解除

**预计完成时间：** 18:30 左右

---

*最后更新：2026-03-18 18:12*
