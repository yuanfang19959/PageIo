/* eslint-disable */
"use client";
import React from "react";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { postBlog } from "@/api/in";
import { useRouter } from "next/navigation";

const Editor = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    const domNode = window.document.getElementById("yuqueditor");
    const doc = (window as any).Doc;
    if (doc) {
      const engine = (window as any).Doc?.createOpenEditor(domNode, {
        image: {
          uploadFileURL: "/api/upload", // 图片上传路径，post file请求
          crawlURL: "/api/upload", // 图片url 转换成url post data：{url}
        },
        file: {
          uploadFileURL: "/api/upload", // 文件上传路径
        },
      });
      // 设置内容，如果是新建则设置成空，非新建则设置成上一次的内容
      engine.setDocument("text/lake", "");
      // 文档变动事件
      engine.on("contentchange", () => {
        // 获取最新的编辑器lake内容
        const lake = engine.getDocument("text/lake");
        setContent(lake);
      });
    }
  }, []);

  const onFinish = (values: any) => {
    postBlog({
      ...values,
      content,
    }).then((res) => {
      if (res.success) {
        router.push(`/blog/${res.data.id}`);
      }
    });
  };

  return (
    <>
      <script
        src="https://unpkg.com/react@18/umd/react.production.min.js"
      ></script>
      <script
        src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
      ></script>
      <div className={styles.content}>
        <div className={styles.form}>
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item label="标题" name={"title"} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="类别"
              name={"category"}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="标签" name={"tags"} rules={[{ required: false }]}>
              <Input />
            </Form.Item>
          </Form>
        </div>
        <div
          id="yuqueditor"
          className={`ne-doc-major-editor ne-viewer lakex-yuque-theme-light ne-typography-classic ne-paragraph-spacing-relax ne-viewer-layout-mode-fixed ${styles.yuqueditor}`}
        ></div>
        <Button
          htmlType="submit"
          type="primary"
          className={styles.submitbtn}
          onClick={() => form.submit()}
        >
          保存
        </Button>
      </div>
    </>
  );
};

export default Editor;
