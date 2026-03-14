# 调整图片尺寸为 100x100
from PIL import Image
import os

# 输入输出路径
input_path = input("请输入图片路径（直接拖拽图片到窗口）: ").strip().strip('"')
output_path = "qq-app-icon-100x100.png"

if not os.path.exists(input_path):
    print(f"❌ 文件不存在：{input_path}")
    input("按回车退出...")
    exit()

try:
    # 打开图片
    img = Image.open(input_path)
    print(f"✅ 原图尺寸：{img.size[0]}x{img.size[1]}")
    
    # 调整为 100x100
    img_resized = img.resize((100, 100), Image.Resampling.LANCZOS)
    
    # 保存
    img_resized.save(output_path, "PNG", quality=95)
    print(f"✅ 已保存到：{os.path.abspath(output_path)}")
    print(f"✅ 新图尺寸：100x100")
    
except Exception as e:
    print(f"❌ 处理失败：{e}")

input("\n按回车退出...")
