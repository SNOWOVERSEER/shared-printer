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
  Modal,
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
import useAuthStore from "@/store/authStore";
import API from "@/api";
import { RegisterRequest } from "@/api/services/authService";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;


const AuthPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();
  const [showForgotModal, setShowForgotModal] = useState(false);


  const showForgotPasswordModal = () => {
    setShowForgotModal(true);
    // Modal.info({
    //   title: 'Password Reset - Beta Version',
    //   width: 500,
    //   icon: <MailOutlined style={{ color: '#1890ff' }} />,
    //   content: (
    //     <div style={{ marginTop: 16 }}>
    //       <Paragraph>
    //         Our automated email system is still under development during the beta phase.
    //       </Paragraph>
    //       <Paragraph>
    //         To reset your password, please send an email from your registered email address to:
    //       </Paragraph>
    //       <div style={{
    //         background: '#f5f5f5',
    //         padding: '12px 16px',
    //         borderRadius: 6,
    //         margin: '16px 0',
    //         textAlign: 'center'
    //       }}>
    //         <Text strong style={{ fontSize: '16px' }}>
    //           yuxuan.zeng.98@gmail.com
    //         </Text>
    //       </div>
    //       <Paragraph>
    //         Please include "Password Reset Request" in the subject line and mention your username in the email.
    //       </Paragraph>
    //       <Paragraph type="secondary">
    //         We'll manually process your request and get back to you as soon as possible.
    //       </Paragraph>
    //     </div>
    //   ),
    //   okText: 'Got it',
    // });
  };

  const onFinishLogin = async (values: any) => {
    setLoading(true);
    try {
      await login(values);
      console.log("Login values:", values);
      messageApi.success("Login successfully");
      router.push("/");
    } catch (error) {
      messageApi.error("Login failed, please check your username and password");
    } finally {
      setLoading(false);
    }
  };

  const onFinishRegister = async (values: any) => {
    setLoading(true);
    try {
      const registerData: RegisterRequest = {
        username: values.username,
        email: values.email,
        password: values.password,
      };

      await API.auth.register(registerData);

      console.log("Register values:", values);
      messageApi.success("Register successfully, please login");
      setActiveTab("login");
    } catch (error) {
      messageApi.error("Register failed, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
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
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your username",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Username"
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
                    <Button
                      type="link"
                      onClick={showForgotPasswordModal}
                      style={{ padding: 0 }}
                    >
                      Forgot password?
                    </Button>
                    {/* <Link href="/forgot-password">Forgot password?</Link> */}
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
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your username",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
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

      {/* Temporary forgot password modal */}
      <Modal
        title="Password Reset - Beta Version"
        open={showForgotModal}
        onOk={() => setShowForgotModal(false)}
        onCancel={() => setShowForgotModal(false)}
        okText="Got it"
        cancelButtonProps={{ style: { display: 'none' } }}
        width={500}
      >
        <div style={{ marginTop: 16 }}>
          <Paragraph>
            Our automated email system is still under development during the beta phase.
          </Paragraph>
          <Paragraph>
            To reset your password, please send an email from your registered email address to:
          </Paragraph>
          <div style={{
            background: '#f5f5f5',
            padding: '12px 16px',
            borderRadius: 6,
            margin: '16px 0',
            textAlign: 'center'
          }}>
            <Text strong style={{ fontSize: '16px' }}>
              yuxuan.zeng.98@gmail.com
            </Text>
          </div>
          <Paragraph>
            Please include "Password Reset Request" in the subject line and mention your username in the email.
          </Paragraph>
          <Paragraph type="secondary">
            We'll manually process your request and get back to you as soon as possible.
          </Paragraph>
        </div>
      </Modal>
    </>

  );
};

export default AuthPage;
