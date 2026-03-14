# 🎬 FFmpeg 自动化剪辑脚本使用指南

**脚本位置**: `scripts/video-editor.py`

---

## 📦 第一步：安装 FFmpeg

### Windows 用户：

**方法 1：官网下载（推荐）**
1. 访问：https://ffmpeg.org/download.html
2. 点击 "Windows" 图标
3. 下载 "gyan.dev" 或 "BtbN" 版本
4. 解压到 `C:\ffmpeg`
5. 添加环境变量：
   - 右键"此电脑" → "属性" → "高级系统设置"
   - "环境变量" → "系统变量" → 找到 "Path"
   - 点击"编辑" → "新建" → 添加 `C:\ffmpeg\bin`
   - 确定保存

**方法 2：使用包管理器**
```bash
# 如果有 Chocolatey
choco install ffmpeg

# 如果有 Winget
winget install ffmpeg
```

### 验证安装：
打开命令提示符，输入：
```bash
ffmpeg -version
```
看到版本号就成功了！✅

---

## 🐍 第二步：安装 Python 依赖

脚本只需要 Python 标准库，无需额外安装！

但建议安装以下工具增强功能：

```bash
# 可选：安装进度条显示
pip install tqdm

# 可选：安装视频信息分析
pip install ffprobe
```

---

## 🚀 第三步：使用脚本

### 基础使用：

1. **打开脚本** `video-editor.py`
2. **找到底部示例代码**
3. **取消注释**你想用的功能
4. **修改参数**为你的文件路径
5. **运行脚本**：
   ```bash
   python scripts/video-editor.py
   ```

---

## 📖 功能详解

### 1️⃣ 裁剪视频

```python
editor.cut_video(
    'input.mp4',           # 输入文件
    'output.mp4',          # 输出文件
    start_time='00:00:10', # 从第 10 秒开始
    duration='00:00:30'    # 裁剪 30 秒
)
```

**时间格式**：
- `10` - 10 秒
- `00:10` - 10 秒
- `00:00:10` - 10 秒
- `01:30:00` - 1 小时 30 分钟

---

### 2️⃣ 拼接视频

```python
videos = ['video1.mp4', 'video2.mp4', 'video3.mp4']
editor.concat_videos(videos, 'merged.mp4')
```

**注意**：所有视频必须是相同编码格式！

---

### 3️⃣ 添加水印

```python
editor.add_watermark(
    'input.mp4',
    'output.mp4',
    'logo.png',            # 水印图片（PNG 透明背景最佳）
    position='bottomright' # 位置：topleft/topright/bottomleft/bottomright
)
```

---

### 4️⃣ 添加字幕

```python
editor.add_subtitles(
    'input.mp4',
    'output.mp4',
    'subtitle.srt'         # SRT 格式字幕
)
```

**SRT 字幕格式示例**：
```srt
1
00:00:01,000 --> 00:00:04,000
第一句字幕

2
00:00:05,000 --> 00:00:08,000
第二句字幕
```

---

### 5️⃣ 批量裁剪

```python
clips = [
    {'file': 'video1.mp4', 'start': '00:00:00', 'duration': '00:00:15', 'output': 'clip1.mp4'},
    {'file': 'video1.mp4', 'start': '00:00:30', 'duration': '00:00:20', 'output': 'clip2.mp4'},
    {'file': 'video2.mp4', 'start': '00:00:05', 'duration': '00:00:25', 'output': 'clip3.mp4'},
]
editor.batch_cut('./input', './output', clips)
```

---

### 6️⃣ 提取音频

```python
editor.extract_audio('video.mp4', 'audio.mp3')
```

---

### 7️⃣ 改变速度

```python
# 2 倍速
editor.change_speed('input.mp4', 'output.mp4', speed=2.0)

# 0.5 倍慢放
editor.change_speed('input.mp4', 'output.mp4', speed=0.5)
```

---

### 8️⃣ 格式转换

```python
editor.convert_format('input.avi', 'output.mp4')
```

---

## 💡 实战案例

### 案例 1：制作抖音短视频

```python
# 从长视频中裁剪 3 个精彩片段，然后拼接
clips = [
    {'file': 'raw.mp4', 'start': '00:01:20', 'duration': '00:00:15', 'output': 'clip1.mp4'},
    {'file': 'raw.mp4', 'start': '00:03:45', 'duration': '00:00:20', 'output': 'clip2.mp4'},
    {'file': 'raw.mp4', 'start': '00:05:10', 'duration': '00:00:15', 'output': 'clip3.mp4'},
]

editor.batch_cut('./raw', './clips', clips)
editor.concat_videos(['clips/clip1.mp4', 'clips/clip2.mp4', 'clips/clip3.mp4'], 'douyin.mp4')
```

---

### 案例 2：添加片头片尾

```python
# 片头 + 正片 + 片尾
videos = ['intro.mp4', 'main.mp4', 'outro.mp4']
editor.concat_videos(videos, 'final.mp4')

# 添加水印
editor.add_watermark('final.mp4', 'final_watermark.mp4', 'logo.png')
```

---

### 案例 3：批量处理 100 个视频

```python
import os

# 获取所有视频文件
video_files = [f for f in os.listdir('./input') if f.endswith('.mp4')]

# 批量裁剪每个视频的前 30 秒
for video in video_files:
    editor.cut_video(
        f'./input/{video}',
        f'./output/{video}',
        start_time='0',
        duration='30'
    )
```

---

## ⚠️ 常见问题

### Q1: "ffmpeg 不是内部命令"
**A**: FFmpeg 没安装或环境变量没配置好，重新安装并添加环境变量

### Q2: "文件路径错误"
**A**: 使用绝对路径，或确保脚本在工作目录运行

### Q3: "拼接失败"
**A**: 确保所有视频编码格式一致，先用格式工厂统一转换

### Q4: "处理速度慢"
**A**: 去掉 `'-c', 'copy'` 参数会让 FFmpeg 重新编码，速度慢但兼容性好

### Q5: "中文字幕乱码"
**A**: SRT 文件用 UTF-8 编码保存

---

## 🎯 进阶技巧

### 1. 添加转场效果

```python
# 交叉溶解转场
cmd = [
    'ffmpeg',
    '-i', 'video1.mp4',
    '-i', 'video2.mp4',
    '-filter_complex', '[0:v][1:v]xfade=transition=fade:duration=1:offset=10[v]',
    '-map', '[v]',
    'output.mp4'
]
```

### 2. 画中画效果

```python
# 主视频 + 小窗口
cmd = [
    'ffmpeg',
    '-i', 'main.mp4',
    '-i', 'pip.mp4',
    '-filter_complex', '[1:v]scale=320:180[pip];[0:v][pip]overlay=main_w-320-10:main_h-180-10[v]',
    '-map', '[v]',
    'output.mp4'
]
```

### 3. 自动检测场景

```python
# 使用场景检测裁剪
cmd = [
    'ffmpeg',
    '-i', 'input.mp4',
    '-filter_complex', 'scdet=threshold=0.4[out]',
    '-map', '[out]',
    'output.mp4'
]
```

---

## 📚 更多资源

- **FFmpeg 官方文档**: https://ffmpeg.org/documentation.html
- **FFmpeg 命令大全**: https://ffmpeg.org/ffmpeg.html
- **B 站教程**: 搜索 "FFmpeg 教程"
- **GitHub 项目**: 搜索 "ffmpeg-python"

---

## 🐛 脚本更新日志

**v1.0.0** (2026-03-12)
- ✅ 基础裁剪功能
- ✅ 视频拼接
- ✅ 添加水印
- ✅ 添加字幕
- ✅ 批量处理
- ✅ 音频提取
- ✅ 速度调整
- ✅ 格式转换

---

**有问题随时问你的 AI 助理贝贝哦！** 🐚✨

<qqimg>https://picsum.photos/800/600</qqimg>
（加油！视频剪辑大神就是你！🎬💪）
