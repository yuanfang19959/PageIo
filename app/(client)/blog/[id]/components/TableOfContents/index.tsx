"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [readProgress, setReadProgress] = useState<number>(0);

  useEffect(() => {
    // 从 HTML 内容中提取标题
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h2, h3, h4");

    const tocItems: TocItem[] = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));
      const text = heading.textContent || "";
      const id = `heading-${index}`;
      
      return { id, text, level };
    });

    setToc(tocItems);

    // 为实际的 DOM 中的标题添加 ID（增加延迟确保 DOM 加载完成）
    const timer = setTimeout(() => {
      const actualHeadings = document.querySelectorAll(".articleBody h2, .articleBody h3, .articleBody h4");
      actualHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    // 监听滚动事件，高亮当前可见的标题
    const handleScroll = () => {
      const headings = document.querySelectorAll(".articleBody h2, .articleBody h3, .articleBody h4");
      const scrollPosition = window.scrollY + 100;

      let currentActiveId = "";
      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        if (element.offsetTop <= scrollPosition) {
          currentActiveId = element.id;
        }
      });

      setActiveId(currentActiveId);

      // 计算阅读进度
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadProgress(Math.min(scrolled, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToHeading = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // 稍微延迟以确保 DOM 已加载
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  if (toc.length === 0) return null;

  return (
    <div className={styles.tocContainer}>
      <div className={styles.tocSticky}>
        <div className={styles.tocHeader}>
          <span className={styles.tocIcon}>📑</span>
          <h3 className={styles.tocTitle}>目录</h3>
        </div>
        <nav className={styles.tocNav}>
          {toc.map((item) => (
            <button
              key={item.id}
              className={`${styles.tocItem} ${styles[`level${item.level}`]} ${
                activeId === item.id ? styles.active : ""
              }`}
              onClick={(e) => scrollToHeading(item.id, e)}
              type="button"
            >
              <span className={styles.tocDot}></span>
              <span className={styles.tocText}>{item.text}</span>
            </button>
          ))}
        </nav>
        <div className={styles.progressBar}>
          <div className={styles.progressText}>阅读进度 {Math.round(readProgress)}%</div>
          <div className={styles.progressTrack}>
            <div 
              className={styles.progressFill}
              style={{ width: `${readProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}