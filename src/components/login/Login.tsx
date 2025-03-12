"use client";

import React, { useState } from "react";
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Divider,
  Space,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinishLogin = async (values: any) => {
    setLoading(true);
    try {
      // TODO: Add login logic
      console.log("Login values:", values);
      message.success("Login successfully");
      router.push("/dashboard");
    } catch (error) {
      message.error("Login failed, please check your email and password");
    } finally {
      setLoading(false);
    }
  };

  const onFinishRegister = async (values: any) => {
    setLoading(true);
    try {
      // TODO: Add register logic
      console.log("Register values:", values);
      message.success("Register successfully, please login");
      setActiveTab("login");
    } catch (error) {
      message.error("Register failed, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        padding: "40px clamp(12px, 2vw, 24px)",
        background: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
        styles={{ body: { padding: "32" } }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Welcome to the printing service
          </Title>
          <Paragraph type="secondary">
            Login or register to start using our printing service
          </Paragraph>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          size="large"
        >
          <TabPane tab="Login" key="login">
            <Form
              name="login_form"
              initialValues={{ remember: true }}
              onFinish={onFinishLogin}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            {/* <Divider plain>
              <Text type="secondary">Or login with</Text>
            </Divider> */}

            {/* <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
              <Button
                block
                icon={<GoogleOutlined />}
                size="large"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Google
              </Button>
              <Button
                block
                icon={<FacebookOutlined />}
                size="large"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Facebook
              </Button>
            </div> */}
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form
              name="register_form"
              onFinish={onFinishRegister}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Name"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The passwords you entered do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm password"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                          new Error("Please read and agree to the terms")
                        ),
                  },
                ]}
              >
                <Checkbox>
                  I have read and agree to the{" "}
                  <Link href="/terms">terms of service</Link> and{" "}
                  <Link href="/privacy">privacy policy</Link>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;
