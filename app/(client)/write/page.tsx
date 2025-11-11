/* eslint-disable */
"use client";
import React from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { postBlog } from "@/api/in";
import { useRouter } from "next/navigation";

const { Option } = Select;

const Editor = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // 检查登录状态
    const token = sessionStorage.getItem('token');
    if (!token) {
      message.error('请先登录');
      router.push('/login');
      return;
    }
    
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
  }, [router]);

  const onFinish = async (values: any) => {
    if (!content || content.trim() === '') {
      message.error('请输入博客内容');
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await postBlog({
        ...values,
        content,
        description: values.description || values.title,
      });
      
      if (res.success) {
        message.success('发布成功！');
        router.push(`/blog/${res.data.id}`);
      } else {
        message.error(res.message || '发布失败');
      }
    } catch (error) {
      message.error('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.form}>
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item 
              label="标题" 
              name="title" 
              rules={[
                { required: true, message: '请输入标题' },
                { max: 200, message: '标题最多200字' }
              ]}
            >
              <Input placeholder="请输入博客标题" />
            </Form.Item>
            
            <Form.Item
              label="类别"
              name="category"
              rules={[{ required: true, message: '请选择类别' }]}
            >
              <Select placeholder="请选择博客类别">
                <Option value="前端开发">前端开发</Option>
                <Option value="后端开发">后端开发</Option>
                <Option value="编程语言">编程语言</Option>
                <Option value="技术分享">技术分享</Option>
                <Option value="其他">其他</Option>
              </Select>
            </Form.Item>
            
            <Form.Item 
              label="描述" 
              name="description"
              rules={[{ max: 500, message: '描述最多500字' }]}
            >
              <Input.TextArea 
                rows={3} 
                placeholder="请输入博客简介（可选，默认使用标题）" 
              />
            </Form.Item>
            
            <Form.Item 
              label="标签" 
              name="tags"
            >
              <Input placeholder="请输入标签，多个标签用逗号分隔（如：React,TypeScript）" />
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
          loading={loading}
        >
          {loading ? '发布中...' : '发布博客'}
        </Button>
      </div>
    </>
  );
};

export default Editor;
