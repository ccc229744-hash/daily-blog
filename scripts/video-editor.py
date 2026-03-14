#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FFmpeg 自动化视频剪辑脚本
功能：裁剪、拼接、添加字幕、水印、转场、批量处理
"""

import subprocess
import os
from pathlib import Path
from typing import List, Optional

class VideoEditor:
    """视频编辑器类"""
    
    def __init__(self, ffmpeg_path: str = 'ffmpeg'):
        """
        初始化
        :param ffmpeg_path: FFmpeg 路径，默认使用系统 PATH 中的
        """
        self.ffmpeg = ffmpeg_path
    
    def check_ffmpeg(self) -> bool:
        """检查 FFmpeg 是否可用"""
        try:
            result = subprocess.run(
                [self.ffmpeg, '-version'],
                capture_output=True,
                text=True
            )
            return result.returncode == 0
        except:
            return False
    
    def cut_video(self, input_file: str, output_file: str, 
                  start_time: str, duration: str):
        """
        裁剪视频
        :param input_file: 输入文件路径
        :param output_file: 输出文件路径
        :param start_time: 开始时间 (格式：HH:MM:SS 或 SS)
        :param duration: 持续时间 (格式：HH:MM:SS 或 SS)
        """
        cmd = [
            self.ffmpeg,
            '-i', input_file,
            '-ss', start_time,
            '-t', duration,
            '-c', 'copy',  # 不重新编码，速度快
            '-y',  # 覆盖输出文件
            output_file
        ]
        
        print(f"✂️  正在裁剪：{input_file}")
        print(f"   从 {start_time} 开始，持续 {duration}")
        subprocess.run(cmd, check=True)
        print(f"✅ 裁剪完成：{output_file}\n")
    
    def concat_videos(self, video_files: List[str], output_file: str):
        """
        拼接多个视频
        :param video_files: 视频文件列表
        :param output_file: 输出文件路径
        """
        # 创建临时文件列表
        temp_file = 'temp_concat_list.txt'
        with open(temp_file, 'w', encoding='utf-8') as f:
            for video in video_files:
                f.write(f"file '{video}'\n")
        
        cmd = [
            self.ffmpeg,
            '-f', 'concat',
            '-safe', '0',
            '-i', temp_file,
            '-c', 'copy',
            '-y',
            output_file
        ]
        
        print(f"🔗 正在拼接 {len(video_files)} 个视频...")
        subprocess.run(cmd, check=True)
        
        # 删除临时文件
        if os.path.exists(temp_file):
            os.remove(temp_file)
        
        print(f"✅ 拼接完成：{output_file}\n")
    
    def add_watermark(self, input_file: str, output_file: str, 
                      watermark_file: str, position: str = 'bottomright'):
        """
        添加水印
        :param input_file: 输入视频
        :param output_file: 输出视频
        :param watermark_file: 水印图片路径
        :param position: 位置 (topleft, topright, bottomleft, bottomright)
        """
        # 位置映射
        positions = {
            'topleft': '10:10',
            'topright': 'main_w-overlay_w-10:10',
            'bottomleft': '10:main_h-overlay_h-10',
            'bottomright': 'main_w-overlay_w-10:main_h-overlay_h-10'
        }
        
        pos = positions.get(position, positions['bottomright'])
        
        cmd = [
            self.ffmpeg,
            '-i', input_file,
            '-i', watermark_file,
            '-filter_complex', f'overlay={pos}',
            '-c:a', 'copy',
            '-y',
            output_file
        ]
        
        print(f"💧 正在添加水印 ({position})...")
        subprocess.run(cmd, check=True)
        print(f"✅ 水印添加完成：{output_file}\n")
    
    def add_subtitles(self, input_file: str, output_file: str, 
                      subtitle_file: str):
        """
        添加字幕
        :param input_file: 输入视频
        :param output_file: 输出视频
        :param subtitle_file: 字幕文件 (.srt 或 .ass)
        """
        cmd = [
            self.ffmpeg,
            '-i', input_file,
            '-vf', f'subtitles={subtitle_file}',
            '-c:a', 'copy',
            '-y',
            output_file
        ]
        
        print(f"📝 正在添加字幕...")
        subprocess.run(cmd, check=True)
        print(f"✅ 字幕添加完成：{output_file}\n")
    
    def change_speed(self, input_file: str, output_file: str, speed: float):
        """
        改变播放速度
        :param input_file: 输入视频
        :param output_file: 输出视频
        :param speed: 速度倍数 (0.5=慢放，2.0=快进)
        """
        cmd = [
            self.ffmpeg,
            '-i', input_file,
            '-filter_complex', f'[0:v]setpts={1/speed}*PTS[v];[0:a]atempo={speed}[a]',
            '-map', '[v]',
            '-map', '[a]',
            '-y',
            output_file
        ]
        
        print(f"⚡ 正在调整速度 ({speed}x)...")
        subprocess.run(cmd, check=True)
        print(f"✅ 速度调整完成：{output_file}\n")
    
    def extract_audio(self, input_file: str, output_file: str):
        """
        提取音频
        :param input_file: 输入视频
        :param output_file: 输出音频
        """
        cmd = [
            self.ffmpeg,
            '-i', input_file,
            '-vn',
            '-acodec', 'libmp3lame',
            '-ab', '192k',
            '-y',
            output_file
        ]
        
        print(f"🎵 正在提取音频...")
        subprocess.run(cmd, check=True)
        print(f"✅ 音频提取完成：{output_file}\n")
    
    def convert_format(self, input_file: str, output_file: str, 
                       output_format: str = 'mp4'):
        """
        转换格式
        :param input_file: 输入文件
        :param output_file: 输出文件
        :param output_format: 输出格式
        """
        cmd = [
            self.ffmpeg,
            '-i', input_file,
            '-y',
            output_file
        ]
        
        print(f"🔄 正在转换格式为 {output_format}...")
        subprocess.run(cmd, check=True)
        print(f"✅ 格式转换完成：{output_file}\n")
    
    def batch_cut(self, input_dir: str, output_dir: str, 
                  clips: List[dict]):
        """
        批量裁剪
        :param input_dir: 输入目录
        :param output_dir: 输出目录
        :param clips: 裁剪列表 [{file, start, duration, output}]
        """
        # 创建输出目录
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        print(f"📦 开始批量处理 {len(clips)} 个片段...\n")
        
        for i, clip in enumerate(clips, 1):
            print(f"[{i}/{len(clips)}]")
            input_file = os.path.join(input_dir, clip['file'])
            output_file = os.path.join(output_dir, clip.get('output', f'clip_{i}.mp4'))
            
            self.cut_video(input_file, output_file, 
                          clip['start'], clip['duration'])
        
        print(f"🎉 批量处理完成！输出目录：{output_dir}\n")
    
    def get_video_info(self, video_file: str) -> dict:
        """
        获取视频信息
        :param video_file: 视频文件
        :return: 视频信息字典
        """
        cmd = [
            self.ffmpeg,
            '-i', video_file,
            '-f', 'null',
            '-'
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        # FFmpeg 输出到 stderr
        info = result.stderr
        
        # 简单解析（可以根据需要扩展）
        return {'file': video_file, 'raw_info': info}


# ==================== 使用示例 ====================

if __name__ == '__main__':
    # 创建编辑器实例
    editor = VideoEditor()
    
    # 检查 FFmpeg
    if not editor.check_ffmpeg():
        print("❌ FFmpeg 未安装或不在 PATH 中！")
        print("请先安装 FFmpeg：https://ffmpeg.org/download.html")
        exit(1)
    
    print("✅ FFmpeg 检测通过！\n")
    
    # ========== 示例 1：裁剪视频 ==========
    # editor.cut_video(
    #     'input.mp4',
    #     'output_cut.mp4',
    #     start_time='00:00:10',  # 从 10 秒开始
    #     duration='00:00:30'      # 裁剪 30 秒
    # )
    
    # ========== 示例 2：拼接视频 ==========
    # videos = ['video1.mp4', 'video2.mp4', 'video3.mp4']
    # editor.concat_videos(videos, 'merged.mp4')
    
    # ========== 示例 3：添加水印 ==========
    # editor.add_watermark(
    #     'input.mp4',
    #     'output_watermark.mp4',
    #     'logo.png',
    #     position='bottomright'
    # )
    
    # ========== 示例 4：添加字幕 ==========
    # editor.add_subtitles(
    #     'input.mp4',
    #     'output_sub.mp4',
    #     'subtitle.srt'
    # )
    
    # ========== 示例 5：批量裁剪 ==========
    # clips = [
    #     {'file': 'video1.mp4', 'start': '00:00:00', 'duration': '00:00:15', 'output': 'clip1.mp4'},
    #     {'file': 'video1.mp4', 'start': '00:00:30', 'duration': '00:00:20', 'output': 'clip2.mp4'},
    #     {'file': 'video2.mp4', 'start': '00:00:05', 'duration': '00:00:25', 'output': 'clip3.mp4'},
    # ]
    # editor.batch_cut('./input', './output', clips)
    
    # ========== 示例 6：提取音频 ==========
    # editor.extract_audio('video.mp4', 'audio.mp3')
    
    # ========== 示例 7：改变速度 ==========
    # editor.change_speed('input.mp4', 'output_fast.mp4', speed=2.0)  # 2 倍速
    
    print("🎬 脚本就绪！取消注释上面的代码来使用相应功能～")
