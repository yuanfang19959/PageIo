/* eslint-disable */
"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

const Editor = (props: any) => {
  const editorRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      const engine = (window as any).Doc?.createOpenViewer(editorRef.current, {});
      // 设置内容，编辑器获取的内容放到这里
      engine?.setDocument("text/html", props.info || "");
    }
  }, [isScriptLoaded, props.info]);

  return (
    <>
      <div className={styles.content}>
        <div
          id="yuqueditor"
          ref={editorRef}
          className={
            "ne-doc-major-viewer ne-viewer lakex-yuque-theme-light ne-typography-classic ne-paragraph-spacing-relax ne-viewer-layout-mode-fixed"
          }
        ></div>
      </div>
    </>
  );
};

export default Editor;