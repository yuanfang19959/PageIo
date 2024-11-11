/* eslint-disable */
"use client";
import { useEffect } from "react";
import styles from "./index.module.scss";

const Editor = (props: any) => {
  useEffect(() => {
       // 创建script元素
       const script = document.createElement('script');
       // 设置src属性为JavaScript文件的URL
       script.src = 'https://gw.alipayobjects.com/render/p/yuyan_npm/@alipay_lakex-doc/1.48.0/umd/doc.umd.js';
       // 将script元素添加到document中，通常添加到body元素的末尾
       document.body.appendChild(script);

       // 可以添加一个事件监听器，在脚本加载完成后执行一些操作（可选）
       script.onload = function () {
        const { createOpenViewer } = window.Doc;
        const domNode = window.document.getElementById("yuqueditor");
        const engine = createOpenViewer(domNode, {});
        // 设置内容，编辑器获取的内容放到这里
        engine.setDocument("text/html", props.info || "");
       };

  }, []);

  return (
    <>
      <div className={styles.content}>
        <div
          id="yuqueditor"
          className={
            "ne-doc-major-viewer ne-viewer lakex-yuque-theme-light ne-typography-classic ne-paragraph-spacing-relax ne-viewer-layout-mode-fixed"
          }
        ></div>
      </div>
    </>
  );
};

export default Editor;
