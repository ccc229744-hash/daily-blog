import { NextRequest, NextResponse } from 'next/server';
import { readPosts, writePosts } from '@/lib/posts-db';

// POST - 点赞作品
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await readPosts();
    const post = posts.find(p => p.id === params.id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: '作品不存在' },
        { status: 404 }
      );
    }

    post.likes += 1;
    await writePosts(posts);

    return NextResponse.json({
      success: true,
      data: { likes: post.likes },
      message: '点赞成功'
    });
  } catch (error) {
    console.error('点赞失败:', error);
    return NextResponse.json(
      { success: false, error: '点赞失败' },
      { status: 500 }
    );
  }
}
