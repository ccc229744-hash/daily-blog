import { NextRequest, NextResponse } from 'next/server';
import { readPosts, writePosts, Post } from '@/lib/posts-db';

// GET - 获取单个作品
export async function GET(
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

    // 增加浏览量
    post.views += 1;
    await writePosts(posts);

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('获取作品失败:', error);
    return NextResponse.json(
      { success: false, error: '获取作品失败' },
      { status: 500 }
    );
  }
}

// PUT - 更新作品
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await readPosts();
    const index = posts.findIndex(p => p.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: '作品不存在' },
        { status: 404 }
      );
    }

    const body = await request.json();
    posts[index] = {
      ...posts[index],
      ...body,
      updatedAt: new Date().toISOString()
    };

    await writePosts(posts);

    return NextResponse.json({
      success: true,
      data: posts[index],
      message: '作品更新成功'
    });
  } catch (error) {
    console.error('更新作品失败:', error);
    return NextResponse.json(
      { success: false, error: '更新作品失败' },
      { status: 500 }
    );
  }
}

// DELETE - 删除作品
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await readPosts();
    const index = posts.findIndex(p => p.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: '作品不存在' },
        { status: 404 }
      );
    }

    posts.splice(index, 1);
    await writePosts(posts);

    return NextResponse.json({
      success: true,
      message: '作品删除成功'
    });
  } catch (error) {
    console.error('删除作品失败:', error);
    return NextResponse.json(
      { success: false, error: '删除作品失败' },
      { status: 500 }
    );
  }
}
