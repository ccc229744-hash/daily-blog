import { NextRequest, NextResponse } from 'next/server';
import { readPosts, writePosts, Post } from '@/lib/posts-db';

// GET - 获取所有作品
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const authorId = searchParams.get('authorId');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    let posts = await readPosts();

    // 筛选
    if (type) {
      posts = posts.filter(p => p.type === type);
    }
    if (authorId) {
      posts = posts.filter(p => p.authorId === authorId);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.tags.some(t => t.toLowerCase().includes(searchLower)) ||
        p.authorName.toLowerCase().includes(searchLower)
      );
    }

    // 按时间倒序
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // 限制数量
    if (limit) {
      posts = posts.slice(0, parseInt(limit));
    }

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length
    });
  } catch (error) {
    console.error('获取作品失败:', error);
    return NextResponse.json(
      { success: false, error: '获取作品失败' },
      { status: 500 }
    );
  }
}

// POST - 创建新作品
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.title || !body.type || !body.authorId) {
      return NextResponse.json(
        { success: false, error: '缺少必填字段' },
        { status: 400 }
      );
    }

    const posts = await readPosts();
    
    const newPost: Post = {
      id: Date.now().toString(),
      type: body.type,
      title: body.title,
      content: body.content || '',
      videoUrl: body.videoUrl || '',
      coverImage: body.coverImage || '',
      tags: body.tags || [],
      authorId: body.authorId,
      authorName: body.authorName || '匿名用户',
      authorAvatar: body.authorAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=anonymous',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      isPublished: true,
    };

    posts.unshift(newPost);
    await writePosts(posts);

    return NextResponse.json({
      success: true,
      data: newPost,
      message: '作品发布成功'
    });
  } catch (error) {
    console.error('创建作品失败:', error);
    return NextResponse.json(
      { success: false, error: '创建作品失败' },
      { status: 500 }
    );
  }
}
