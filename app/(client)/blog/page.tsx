import React from "react";
import Link from "next/link";
import handleTimeBlog from "@/utils/parseTime";
import { BASEURL } from "@/constants";
import styles from "./index.module.scss";

async function BlogList({ params }) {
  const res = await fetch(`${BASEURL}/api/bloglist`);
  const { data: list} = await res.json();

  return (
    <div className={styles.content}>
      <div className={styles.centerbox}>
        <div className={styles.bloglist}>
          <ul className={styles.blogcontent}>
            {list.map((v: any) => {
              return (
                <li className={styles.blogitem} key={v.id}>
                  <Link href={`/blog/${v.id}`} className={styles.customLink}>
                    <h3 className={styles.blogtitle}>{v.title}</h3>
                  </Link>

                  <div className={styles.bloginfo}>
                    <span>
                      <img
                        src="https://gw.alipayobjects.com/mdn/ob_asset/afts/img/A*CtHtSJ2gtBEAAAAAAAAAAAAAARQnAQ"
                        alt="tag"
                      />
                      {v.category}
                    </span>
                    <span>
                      <img
                        src="https://gw.alipayobjects.com/mdn/ob_asset/afts/img/A*hYDGQKcmUoYAAAAAAAAAAAAAARQnAQ"
                        alt=""
                      />
                      {handleTimeBlog(v.data)}
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
