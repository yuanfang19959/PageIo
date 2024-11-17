import React from "react";
import Link from "next/link";
import handleTimeBlog from "@/utils/parseTime";
import { BASEURL } from "@/constants";
import styles from "./index.module.scss";


export const metadata = {
  title: "博客列表-第1页-平头哥的小站",
  description: "平头哥的小站-博客列表",
  alternates: {
    canonical: 'http://yuanfang19959.tech',
  },
  openGraph: {
    title: '博客列表-第1页-平头哥的小站',
    description: "平头哥的小站-博客列表",
    image: "https://mdn.alipayobjects.com/huamei_22khvb/afts/img/A*RphFQIYS8h4AAAAAAAAAAAAADiGDAQ/original",
    type: "website",
  },
};

async function BlogList({ params }) {
  const res = await fetch(`${BASEURL}/api/bloglist`, {
    cache:'no-store'
  });
  const { data: list} = await res.json();

  return (
    <div className={styles.content}>
      <div className={styles.bread}>
        当前位置 - 博客
      </div>
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
                      {handleTimeBlog(v.date)}
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
