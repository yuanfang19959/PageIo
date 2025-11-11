"use client";

import styles from "./index.module.scss";
import Link from "next/link";

export default function BaseFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span className={styles.copyrightIcon}>©</span>
            {currentYear} yuanfang19959. All rights reserved.
          </p>
          <p className={styles.beian}>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
              浙ICP备2024133658
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}