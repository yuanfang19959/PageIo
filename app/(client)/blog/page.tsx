import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

const BlogList = () => {
  return (
    <div className={styles.content}>
      <div className={styles.centerbox}>
        <div className={styles.bloglist}>
          <ul className={styles.blogcontent}>
            {[1, 2, 3, 4, 5].map((v) => {
              return (
                <li className={styles.blogitem} key={v}>
                  <Link href="/blog/1" className={styles.customLink}>
                    <h3 className={styles.blogtitle}>下班了吗</h3>
                  </Link>

                  <div className={styles.bloginfo}>
                    <span>
                      <img
                        src="https://gw.alipayobjects.com/mdn/ob_asset/afts/img/A*CtHtSJ2gtBEAAAAAAAAAAAAAARQnAQ"
                        alt="tag"
                      />
                      杂七杂八
                    </span>
                    <span>
                      <img
                        src="https://gw.alipayobjects.com/mdn/ob_asset/afts/img/A*hYDGQKcmUoYAAAAAAAAAAAAAARQnAQ"
                        alt=""
                      />
                      5天前
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.authorbox}>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default BlogList;
