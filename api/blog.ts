/**
 * Blog API 客户端工具
 */

import { cache } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  content: string;
  tags?: string[];
  author?: string;
  read_time?: number;
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
        // 列表页缓存 30 秒
        next: { revalidate: 30 }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('获取博客列表失败:', error);
    // 如果 API 失败，返回空数据
    return {
      list: [],
      total: 0,
      page,
      pageSize
    };
  }
}

/**
 * 根据 ID 获取博客详情（使用 React Cache 避免重复请求）
 */
export const getBlogById = cache(async (id: string): Promise<BlogItem | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blogs/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // 详情页缓存 60 秒
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('获取博客详情失败:', error);
    return null;
  }
});
