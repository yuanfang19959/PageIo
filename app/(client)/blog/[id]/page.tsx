// "use client";
// import { createOpenViewer } from "@alipay/lakex-doc";
// import { useEffect, useState } from "react";
// import styles from "./index.module.scss";
// import { getBlog } from "@/api/in";

// const Editor = (props) => {
//   const [info, setContent] = useState({});
//   useEffect(() => {
//     getBlog({
//       id: props.params.id,
//     }).then((res) => {
//         setContent(res.data);
//         const domNode = window.document.getElementById("yuqueditor");
//         const engine = createOpenViewer(domNode, {});
//         // 设置内容，编辑器获取的内容放到这里
//         engine.setDocument("text/lake", res.data.content || "");
//     });

//   }, []);

//   return (
//     <>
//       <div className={styles.content}>
//         <h1>{info?.title}</h1>
//         <span>{info?.category}</span>
//         <div id="yuqueditor" className={"ne-doc-major-viewer ne-viewer lakex-yuque-theme-light ne-typography-classic ne-paragraph-spacing-relax ne-viewer-layout-mode-fixed"}></div>
//       </div>
//     </>
//   );
// };

// export default Editor;

import { notFound } from "next/navigation";
import BlogContent from "./components/BlogContent/index";
import { BASEURL } from "@/constants";
import TopInfo from "./components/TopInfo/index";
import Head from "next/head";

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
  const res = await fetch(`${BASEURL}/api/blog/${params.id}`, {
    cache:'no-store'
  });
  const { data: info } = await res.json();
  return {
    title: info?.title + "-技术博客",
    description: info?.title + "博客内容",
    keywords: "blog",
    alternates: {
      canonical: 'http://yuanfang19959.tech:3000/blog' + params.id,
    },
    openGraph: {
      title: info?.title + "-技术博客",
      description: info?.title + "博客内容",
      keywords: "blog",
      image: "https://mdn.alipayobjects.com/huamei_22khvb/afts/img/A*RphFQIYS8h4AAAAAAAAAAAAADiGDAQ/original",
      type: "website",
    },
  }
}
 

async function Viewer({ params }: Props) {
  const res = await fetch(`${BASEURL}/api/blog/${params.id}`, {
    cache:'no-store'
  });
  const { data: info } = await res.json();
  if (!info?.content) return notFound();
  return (
    <>
      <div className={styles.content}>
        <div className={styles.bread}>
           <Link href="/blog">博客</Link> / {info.title}

        </div>
        <div className={styles.header}>
          <h1>{info?.title}</h1>
          <TopInfo info={info} />
        </div>

        <BlogContent info={info.content} />
        {/* // 这里seo用，上面的语雀渲染不支持ssr */}
        <div dangerouslySetInnerHTML={{__html: info?.content}} style={{display:'none'}}></div>
      </div>
    </>
  );
}

export default Viewer;
