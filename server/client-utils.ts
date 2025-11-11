/**
 * Blog API 客户端工具
 * 用于 Next.js 项目中调用后端 API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  content: string;
  tags: string[];
  author: string;
  read_time: number;
  created_at?: string;
  updated_at?: string;
}

interface BlogListResponse {
  list: BlogItem[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 获取博客列表
 * @param page 页码
 * @param pageSize 每页数量
 */
export async function getBlogList(page: number = 1, pageSize: number = 10): Promise<BlogListResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blogs?page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Next.js 默认会缓存，如果需要实时数据可以添加 cache: 'no-store'
        // cache: 'no-store',
        next: { revalidate: 60 } // 60秒后重新验证
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('获取博客列表失败:', error);
    throw error;
  }
}

/**
 * 根据 ID 获取博客详情
 * @param id 博客ID
 */
export async function getBlogById(id: string): Promise<BlogItem> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blogs/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('博客不存在');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('获取博客详情失败:', error);
    throw error;
  }
}

/**
 * 创建博客
 * @param blog 博客数据
 */
export async function createBlog(blog: Omit<BlogItem, 'created_at' | 'updated_at'>): Promise<{ id: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blogs`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...blog,
          readTime: blog.read_time
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('创建博客失败:', error);
    throw error;
  }
}

/**
 * 更新博客
 * @param id 博客ID
 * @param blog 博客数据
 */
export async function updateBlog(
  id: string,
  blog: Partial<Omit<BlogItem, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ id: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blogs/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...blog,
          readTime: blog.read_time
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('更新博客失败:', error);
    throw error;
  }
}

/**
 * 删除博客
 * @param id 博客ID
 */
export async function deleteBlog(id: string): Promise<void> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blogs/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('删除博客失败:', error);
    throw error;
  }
}

// 导出类型
export type { BlogItem, BlogListResponse };
