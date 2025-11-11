"use client";

import Link from "next/link";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";

export default function BaseHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>平头哥的小站</span>
        </Link>

        <nav className={styles.nav}>
          <a 
            href="https://github.com/yuanfang19959" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <img 
              src="https://mdn.alipayobjects.com/huamei_22khvb/afts/img/A*GnwCQaB0Wx4AAAAAAAAAAAAADiGDAQ/original" 
              alt="GitHub" 
              className={styles.githubAvatar}
            />
            <span>yuanfang19959</span>
          </a>
        </nav>
      </div>
    </header>
  );
}