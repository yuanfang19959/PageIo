"use client";
import { loginFn, regFn } from "@/api/in";
import { Button, Form, Input, message, Radio } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import encryptString from "@/utils/p"

const Forms = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values: any) => {
    setLoading(true);
    
    const fn = (res) => {
      setLoading(false);
      if (res.success) {
        sessionStorage.setItem("token", res.data.token);
        message.success('登录成功');
        router.push("/write");
      } else {
        message.error(res.message || '登录失败');
      }
    };
    
    try {
      // 使用 SHA-256 加密密码
      values.password = await encryptString(values.password);
      
      if (values.type == "login") {
        loginFn(values).then(fn).catch(err => {
          setLoading(false);
          message.error('请求失败');
        });
      } else {
        regFn(values).then(fn).catch(err => {
          setLoading(false);
          message.error('请求失败');
        });
      }
    } catch (error) {
      setLoading(false);
      message.error('加密失败');
    }
  };

  return (
    <Form onFinish={onFinish} labelAlign="right" layout="vertical">
      <Form.Item
        label="账号"
        name={"username"}
        rules={[{ required: true, message: "请输入" }]}
      >
        <Input style={{ width: "100%" }} minLength={11} maxLength={11} showCount />
      </Form.Item>

      <Form.Item
        label="密码"
        name={"password"}
        rules={[{ required: true, message: "请输入" }]}
      >
        <Input type="password" minLength={6} />
      </Form.Item>
      <p
        onClick={() => {
          setCount((count) => ++count)
        }}>~_~</p>
      {
        count > 10 && <>
          <Form.Item label="类型" name={"type"} rules={[{ required: true }]} initialValue={"login"}>
            <Radio.Group>
              <Radio value="login">登录</Radio>
              {/* <Radio value="register">注册</Radio> */}
            </Radio.Group>
          </Form.Item>
          <Button 
            htmlType="submit" 
            style={{ width: "100%" }} 
            type="primary"
            loading={loading}
          >
            登录
          </Button>
        </>
      }

    </Form>
  );
};

export default Forms;
