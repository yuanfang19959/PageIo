"use client";
import { loginFn, regFn } from "@/api/in";
import { Button, Form, Input, message, Radio } from "antd";
import { useRouter } from "next/navigation";

const Forms = () => {
  const router = useRouter();
  const onFinish = (values: any) => {
    const fn = (res) => {
      if (res.success) {
        sessionStorage.setItem("token", res.data.token);
        router.push("/write");
      } else {
        message.error(res.message)
      }
    };
    if (values.type == "login") {
      loginFn(values).then(fn);
    } else {
      regFn(values).then(fn);
    }
  };

  return (
    <Form onFinish={onFinish} labelAlign="right"  layout="vertical">
      <Form.Item
        label="账号"
        name={"username"}
        rules={[{ required: true, message: "请输入" }]}
      >
        <Input style={{ width: "100%" }} minLength={11} maxLength={11} showCount/>
      </Form.Item>

      <Form.Item
        label="密码"
        name={"password"}
        rules={[{ required: true, message: "请输入" }]}
      >
        <Input type="password" minLength={6}/>
      </Form.Item>

      <Form.Item label="类型" name={"type"} rules={[{ required: true }]} initialValue={"login"}>
        <Radio.Group>
          <Radio value="login">登录</Radio>
          <Radio value="register">注册</Radio>
        </Radio.Group>
      </Form.Item>
      <Button htmlType="submit" style={{ width: "100%" }} type="primary">
        登录
      </Button>
    </Form>
  );
};

export default Forms;
