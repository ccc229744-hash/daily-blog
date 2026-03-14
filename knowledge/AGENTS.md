# Knowledge 模块 - 使用指南

**角色**: Knowledge 模块接入助手  
**目标**: 让系统具备知识收录、索引检索、素材流转能力

---

## 🎯 核心规则

### 1. 检索机制：先索引，后全文

**默认流程**：
1. ✅ 先读 `knowledge/_index.md`
2. ✅ 通过标签、摘要定位候选条目
3. ✅ 用户需要细节时，才打开单篇全文
4. ❌ 禁止默认全量扫描 `knowledge/*.md`

### 2. 条目结构

每条正式知识必须包含：

```markdown
---
date: 2026-03-12
source: 来源名称
source_type: video/article
source_url: "https://..."
tags:
  - 标签 1
  - 标签 2
confidence: processed
---

# 标题

## 核心观点
[1-3 句摘要]

## 我的思考
[与当前工作的关联，可选]

## 原始内容
[保留全文、转写或完整摘录]
```

**规则**：
- ✅ 不允许只存摘要，不存原文
- ✅ 不建议只存原文，不做摘要
- ✅ `_index.md` 只承载检索摘要，不承载全文

### 3. Inbox 流转机制

新材料先进入 `inbox/`，再根据情况流转：

| 状态 | 路径 | 说明 |
|------|------|------|
| 待处理 | `inbox/manual/pending/` | 新素材入口 |
| 已入库 | `inbox/manual/processed/` | 原文备查 |
| 待确认 | `inbox/manual/review/` | 不确定/冲突/疑似重复 |

**视频素材**：
- `inbox/video/raw/` - 原始视频/音频
- `inbox/video/work/` - 中间处理文件
- `inbox/video/transcripts/` - 转写文本与元数据
- `inbox/video/logs/` - 日志

### 4. 新增条目流程

1. 新材料放入 `inbox/manual/pending/`
2. 整理为正式条目格式
3. 移动到 `knowledge/` 根目录，命名：`YYYY-MM-DD-标题.md`
4. 原文移入 `inbox/manual/processed/`
5. **更新 `_index.md`**（必须！）

---

## 🛠️ Skill 支持

**已安装 Skill**: `knowledge-kb`  
**位置**: `skills/knowledge-kb/SKILL.md`

**触发方式**:
- 收录新知识
- 检索知识
- 处理视频/音频素材

---

## 📁 目录结构

```
knowledge/
├── AGENTS.md                 # 本文件 - 模块说明
├── _index.md                 # 索引检索入口
├── inbox/                    # 待处理素材
│   ├── manual/
│   │   ├── pending/
│   │   ├── processed/
│   │   └── review/
│   └── video/
│       ├── raw/
│       ├── work/
│       ├── transcripts/
│       └── logs/
└── YYYY-MM-DD-标题.md         # 正式知识条目
```

---

## ⚠️ 注意事项

1. **每次新增条目后必须更新 `_index.md`**
2. **不要删除或移动已有正式条目**（除非用户明确要求）
3. **视频素材先转写，再整理为正式条目**
4. **保持索引与条目同步**

---

**最后更新**: 2026-03-12  
**版本**: v1.0.0
