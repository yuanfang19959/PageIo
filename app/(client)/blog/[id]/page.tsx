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

import styles from "./index.module.scss";
import TopInfo from "./components/TopInfo/index";

interface Props {
  params: {
    id: string;
  };
}

async function Editor({ params }: Props) {
  const res = await fetch(`${BASEURL}/api/blog/${params.id}`);
  const { data: info } = await res.json();
  if (!info?.content) return notFound();
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>{info?.title}</h1>

        <TopInfo info={info}/>
      </div>

      <BlogContent info={info.content} />
    </div>
  );
}

export default Editor;
