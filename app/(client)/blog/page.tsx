import React from "react";
import Link from "next/link";
import handleTimeBlog from "@/utils/parseTime";
import { getBlogList } from "@/data/mockData";
import styles from "./index.module.scss";

export const metadata = {
  title: "博客列表 - 平头哥的技术博客",
  description: "分享前端开发、JavaScript、TypeScript、React、Vue 等技术文章",
  alternates: {
    canonical: 'http://yuanfang19959.tech',
  },
  openGraph: {
    title: '博客列表 - 平头哥的技术博客',
    description: "分享前端开发、JavaScript、TypeScript、React、Vue 等技术文章",
    image: "https://mdn.alipayobjects.com/huamei_22khvb/afts/img/A*RphFQIYS8h4AAAAAAAAAAAAADiGDAQ/original",
    type: "website",
  },
};

async function BlogList() {
  // 使用模拟数据替代 API 调用
  const { list } = getBlogList(1, 10);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>技术博客</h1>
        <p className={styles.heroSubtitle}>分享前端技术、探索编程之美</p>
      </div>

      <div className={styles.content}>
        <div className={styles.blogGrid}>
          {list.map((blog) => (
            <article className={styles.blogCard} key={blog.id}>
              <Link href={`/blog/${blog.id}`} className={styles.cardLink}>
                <div className={styles.cardHeader}>
                  <span className={styles.category}>{blog.category}</span>
                  {blog.readTime && (
                    <span className={styles.readTime}>{blog.readTime} 分钟阅读</span>
                  )}
                </div>
                
                <h2 className={styles.cardTitle}>{blog.title}</h2>
                <p className={styles.cardDescription}>{blog.description}</p>
                
                <div className={styles.cardFooter}>
                  <div className={styles.tags}>
                    {blog.tags?.slice(0, 3).map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.author}>{blog.author || '平头哥'}</span>
                    <span className={styles.date}>{handleTimeBlog(blog.date)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>关于作者</h3>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>
                <span className={styles.avatarText}>平头哥</span>
              </div>
              <p className={styles.authorDesc}>
                热爱编程，专注前端开发。
                <br />分享技术，记录成长。
              </p>
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>热门标签</h3>
            <div className={styles.tagCloud}>
              {['React', 'TypeScript', 'Next.js', 'Vue', 'CSS', 'JavaScript', '性能优化', 'Web开发'].map((tag, index) => (
                <span key={index} className={styles.cloudTag}>#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;