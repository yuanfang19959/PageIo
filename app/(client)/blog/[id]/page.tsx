import { notFound } from "next/navigation";
import BlogContent from "./components/BlogContent/index";
import { getBlogById } from "@/data/mockData";
import TopInfo from "./components/TopInfo/index";
import TableOfContents from "./components/TableOfContents/index";
import styles from "./index.module.scss";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}
 
export async function generateMetadata(
  { params }: Props
) {
  const info = getBlogById(params.id);
  return {
    title: info?.title + " - 技术博客",
    description: info?.description || info?.title + "博客内容",
    keywords: info?.tags?.join(', ') || "blog",
    alternates: {
      canonical: 'http://yuanfang19959.tech/blog/' + params.id,
    },
    openGraph: {
      title: info?.title + " - 技术博客",
      description: info?.description || info?.title + "博客内容",
      keywords: info?.tags?.join(', ') || "blog",
      image: "https://mdn.alipayobjects.com/huamei_22khvb/afts/img/A*RphFQIYS8h4AAAAAAAAAAAAADiGDAQ/original",
      type: "article",
    },
  }
}
 

async function Viewer({ params }: Props) {
  const info = getBlogById(params.id);
  
  if (!info) return notFound();
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {/* 文章头部 */}
            <article className={styles.article}>
              {/* 面包屑导航和分类 */}
              <div className={styles.breadcrumb}>
                <Link href="/blog" className={styles.breadcrumbLink}>← 返回博客列表</Link>
                <div className={styles.categoryBadge}>{info.category}</div>
              </div>
              
              <header className={styles.header}>
                <h1 className={styles.title}>{info.title}</h1>
                <p className={styles.description}>{info.description}</p>
                <TopInfo info={info} />
              </header>

              {/* 文章内容 */}
              <div className={`${styles.articleBody} articleBody`}>
                <BlogContent info={info.content} />
              </div>

              {/* 标签 */}
              {info.tags && info.tags.length > 0 && (
                <div className={styles.tagsSection}>
                  <div className={styles.tagsLabel}>标签：</div>
                  <div className={styles.tags}>
                    {info.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* 目录 */}
          <aside className={styles.tocAside}>
            <TableOfContents content={info.content} />
          </aside>
        </div>
      </div>
      
      {/* SEO用的隐藏内容 */}
      <div dangerouslySetInnerHTML={{__html: info?.content}} style={{display:'none'}}></div>
    </>
  );
}

export default Viewer;