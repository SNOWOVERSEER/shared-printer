"use client";

import React, { useEffect, useState } from "react";
import { Card, Typography, Avatar, Button, message, Form, Modal, Space, Row, Col, Divider, Input, Skeleton, Tabs, Select } from "antd";
import { UserOutlined, EditOutlined, LockOutlined, SaveOutlined, MailOutlined, PhoneOutlined, HomeOutlined, EnvironmentOutlined, InfoCircleOutlined } from "@ant-design/icons";
import MainLayout from "@/components/layout/MainLayout";
import useAuthStore from "@/store/authStore";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import { UpdateUserRequest } from "@/api/services/userService";


const { Title, Paragraph } = Typography;

const ProfilePage = () => {
    const { isAuthenticated, user: authUser } = useAuthStore();
    const {
        userProfile,
        isLoading,
        error,
        fetchUserProfile,
        updateUserProfile,
        clearError
    } = useUserStore();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [form] = Form.useForm();
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [passwordForm] = Form.useForm();

    useEffect(() => {
        if (error) {
            messageApi.error(error);
            clearError();
        }
    }, [error, messageApi, clearError]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (!isAuthenticated) {
            messageApi.warning("Please login first");
        }
    }, [isAuthenticated, messageApi]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserProfile().catch(() => {
            });
        }
    }, [isAuthenticated, fetchUserProfile]);


    useEffect(() => {
        if (userProfile) {
            form.setFieldsValue({
                fullName: userProfile.full_name || '',
                phone: userProfile.phone || '',
                building: userProfile.building || '',
                mailboxNumber: userProfile.mailbox_number || '',
            });
        }
    }, [userProfile, form]);

    const handleUpdateProfile = async (values: any) => {
        try {
            const updateData: UpdateUserRequest = {
                full_name: values.fullName,
                phone: values.phone,
                building: values.building,
                mailbox_number: values.mailboxNumber,
            };

            await updateUserProfile(updateData);
            messageApi.success("Profile updated successfully");
            setEditMode(false);
        } catch (error) {
        }
    };



    //TODO: Reset password
    const handleChangePassword = async (values: any) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            messageApi.success("Password reset successfully");
            setPasswordModalVisible(false);
            passwordForm.resetFields();
        } catch (error: any) {
            messageApi.error("Password reset failed: " + error.message);
        }
    };

    if (!isAuthenticated || !userProfile) {
        return null;
    }

    return (
        <>
            {contextHolder}
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 20px" }}>
                <Row gutter={[24, 24]}>
                    {/* 左侧用户信息卡片 */}
                    <Col xs={24} md={8}>
                        <Card
                            style={{
                                borderRadius: 12,
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                height: "100%",
                            }}
                        >
                            {isLoading ? (
                                <div style={{ textAlign: "center", padding: "20px 0" }}>
                                    <Skeleton.Avatar active size={80} style={{ marginBottom: 16 }} />
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </div>
                            ) : (
                                <div style={{ textAlign: "center" }}>
                                    <Avatar
                                        size={100}
                                        icon={<UserOutlined />}
                                        style={{
                                            backgroundColor: "#1890ff",
                                            fontSize: 48,
                                            marginBottom: 16
                                        }}
                                    />
                                    <Title level={3} style={{ marginBottom: 4 }}>
                                        {userProfile?.username || authUser?.username}
                                    </Title>
                                    <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                                        {userProfile?.email || authUser?.email}
                                    </Paragraph>

                                    <Divider style={{ margin: "16px 0" }} />

                                    <Space direction="vertical" style={{ width: "100%", textAlign: "left" }}>
                                        <div>
                                            <Typography.Text type="secondary"><MailOutlined /> Email: </Typography.Text>
                                            <Typography.Text>{userProfile?.email}</Typography.Text>
                                        </div>
                                        {userProfile?.phone && (
                                            <div>
                                                <Typography.Text type="secondary"><PhoneOutlined /> Phone: </Typography.Text>
                                                <Typography.Text>{userProfile.phone}</Typography.Text>
                                            </div>
                                        )}
                                        {userProfile?.building && (
                                            <div>
                                                <Typography.Text type="secondary"><HomeOutlined /> Building: </Typography.Text>
                                                <Typography.Text>
                                                    {userProfile.building === "81" ? "81 South Wharf Drive" : userProfile.building === "103" ? "103 South Wharf Drive" : "Other"}
                                                    {userProfile.mailbox_number && ` (${userProfile.mailbox_number})`}
                                                </Typography.Text>
                                            </div>
                                        )}
                                        {userProfile?.mailbox_number && (
                                            <div>
                                                <Typography.Text type="secondary"><EnvironmentOutlined /> Mailbox Number: </Typography.Text>
                                                <Typography.Text>{userProfile.mailbox_number}</Typography.Text>
                                            </div>
                                        )}
                                        <div>
                                            <Typography.Text type="secondary">Registration Time: </Typography.Text>
                                            <Typography.Text>{new Date(userProfile?.created_at || '').toLocaleDateString()}</Typography.Text>
                                        </div>
                                    </Space>

                                    <Divider style={{ margin: "16px 0" }} />

                                    <Button
                                        type="primary"
                                        icon={<LockOutlined />}
                                        onClick={() => setPasswordModalVisible(true)}
                                        block
                                    >
                                        Change Password
                                    </Button>
                                </div>
                            )}
                        </Card>
                    </Col>

                    {/* 右侧内容区域 */}
                    <Col xs={24} md={16}>
                        <Card
                            style={{
                                borderRadius: 12,
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            }}
                        >
                            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                                <Tabs.TabPane
                                    tab={
                                        <span>
                                            <UserOutlined />
                                            Personal Information
                                        </span>
                                    }
                                    key="profile"
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                                        <Title level={4}>Personal Information</Title>
                                        {!editMode ? (
                                            <Button
                                                type="primary"
                                                icon={<EditOutlined />}
                                                onClick={() => setEditMode(true)}
                                            >
                                                Edit Information
                                            </Button>
                                        ) : (
                                            <Space>
                                                <Button
                                                    onClick={() => {
                                                        setEditMode(false);
                                                        // 重置表单
                                                        if (userProfile) {
                                                            form.setFieldsValue({
                                                                fullName: userProfile.full_name || '',
                                                                phone: userProfile.phone || '',
                                                                building: userProfile.building || '',
                                                                mailboxNumber: userProfile.mailbox_number || '',
                                                            });
                                                        }
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    icon={<SaveOutlined />}
                                                    onClick={() => form.submit()}
                                                    loading={isLoading}
                                                >
                                                    Save
                                                </Button>
                                            </Space>
                                        )}
                                    </div>

                                    {isLoading && !userProfile ? (
                                        <Skeleton active paragraph={{ rows: 6 }} />
                                    ) : (
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={handleUpdateProfile}
                                            disabled={!editMode}
                                        >
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="fullName"
                                                        label="Name"
                                                        rules={[{ max: 50, message: 'Name cannot exceed 50 characters' }]}
                                                    >
                                                        <Input prefix={<UserOutlined />} placeholder="Please enter your name" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="phone"
                                                        label="Phone"
                                                        rules={[
                                                            {
                                                                pattern: /^04\d{8}$/,
                                                                message: 'Please enter a valid Australian phone number (04XXXXXXXX)',
                                                            }
                                                        ]}
                                                    >
                                                        <Input prefix={<PhoneOutlined />} placeholder="Please enter your phone number" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="building"
                                                        label="Building"
                                                    >
                                                        <Select
                                                            placeholder="Select your building"
                                                            prefix={<HomeOutlined />}
                                                            onChange={(value) => {
                                                                if (value === 'other') {
                                                                    messageApi.open({
                                                                        type: 'info',
                                                                        content: "If you are not from buildings 81 or 103, you will need to pick up your prints at building 81.",
                                                                        duration: 5,
                                                                        key: "building-info",
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <Select.Option value="81">81 South Wharf Drive</Select.Option>
                                                            <Select.Option value="103">103 South Wharf Drive</Select.Option>
                                                            <Select.Option value="other">Other (Self-pickup only)</Select.Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="mailboxNumber"
                                                        label="Mailbox Number"
                                                        tooltip="Required for mailbox delivery. Leave empty if you prefer self-pickup."
                                                    >
                                                        <Input
                                                            prefix={<EnvironmentOutlined />}
                                                            placeholder="Please enter your mailbox number"
                                                            disabled={form.getFieldValue('building') === 'other'}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            {form.getFieldValue('building') === 'other' && (
                                                <div style={{
                                                    background: '#fffbe6',
                                                    padding: '12px 16px',
                                                    borderRadius: '4px',
                                                    marginBottom: '16px',
                                                    border: '1px solid #ffe58f'
                                                }}>
                                                    <Space>
                                                        <InfoCircleOutlined style={{ color: '#faad14' }} />
                                                        <span>
                                                            Since you are not from buildings 81 or 103, you will need to pick up your prints at the lobby of building 81.
                                                        </span>
                                                    </Space>
                                                </div>
                                            )}

                                            <Form.Item>
                                                <Paragraph type="secondary">
                                                    This information will be used for order delivery, please ensure the information is accurate.
                                                </Paragraph>
                                            </Form.Item>
                                        </Form>
                                    )}
                                </Tabs.TabPane>

                                <Tabs.TabPane
                                    tab={
                                        <span>
                                            <HomeOutlined />
                                            Delivery Address
                                        </span>
                                    }
                                    key="address"
                                >
                                    <Title level={4}>Delivery Address</Title>
                                    <Paragraph>
                                        You can manage your delivery address here, which will be used for order delivery.
                                    </Paragraph>

                                    <Card style={{ marginTop: 16, borderRadius: 8 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div>
                                                <Typography.Text strong>{userProfile?.building === "81" ? "81 South Wharf Drive" : userProfile?.building === "103" ? "103 South Wharf Drive" : "Other"} {userProfile?.mailbox_number || ''}</Typography.Text>
                                                <br />
                                                <Typography.Text type="secondary">{userProfile?.full_name || 'Not set'} {userProfile?.phone || ''}</Typography.Text>
                                            </div>
                                            <Button type="link" onClick={() => {
                                                setEditMode(true);
                                                setActiveTab("profile");

                                            }}>Edit</Button>
                                        </div>
                                    </Card>

                                    <Paragraph type="secondary" style={{ marginTop: 16 }}>
                                        Note: You can edit your delivery address information in the "Personal Information" tab.
                                    </Paragraph>
                                </Tabs.TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* 修改密码弹窗 */}
            <Modal
                title="Change Password"
                open={passwordModalVisible}
                onCancel={() => {
                    setPasswordModalVisible(false);
                    passwordForm.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handleChangePassword}
                >
                    <Form.Item
                        name="oldPassword"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please enter your current password' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Please enter your current password" />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            { required: true, message: 'Please enter your new password' },
                            { min: 6, message: 'Password length cannot be less than 6 characters' }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Please enter your new password" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm New Password"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your new password' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords you entered do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Please confirm your new password" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button
                                onClick={() => {
                                    setPasswordModalVisible(false);
                                    passwordForm.resetFields();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Confirm Change
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default function Profile() {
    return (
        <MainLayout>
            <ProfilePage />
        </MainLayout>
    );
}