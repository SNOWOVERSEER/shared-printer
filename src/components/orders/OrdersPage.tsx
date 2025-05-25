"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Table,
  Button,
  Input,
  Space,
  Tabs,
  Form,
  Empty,
  Alert,
  Tag,
  Divider,
  message,
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  PhoneOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import useOrderStore from "@/store/orderStore";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;


const OrderStatusTag = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { color: string; text: string }> = {
    completed: { color: "success", text: "Completed" },
    processing: { color: "processing", text: "Processing" },
    pending: { color: "warning", text: "Pending" },
    cancelled: { color: "error", text: "Cancelled" },
  };

  const config = statusConfig[status] || { color: "default", text: status };

  return <Tag color={config.color}>{config.text}</Tag>;
};

const OrdersPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { myOrders, fetchMyOrders, fetchOrderById, updateOrderStatus, searchOrdersByPhone, isLoading, error } = useOrderStore();
  const [searchType, setSearchType] = useState("orderNumber");
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyOrders();
    }
  }, [isAuthenticated, fetchMyOrders]);



  const handleSearch = async (values: any) => {
    try {
      if (searchType === "orderNumber" && values.searchValue) {
        const order = await fetchOrderById(values.searchValue);
        if (order) {
          router.push(`/orders/${order.order_search_id}`);
        }
      } else if (searchType === "phone" && values.searchValue) {
        const orders = await searchOrdersByPhone(values.searchValue);

      }
    } catch (error) {
      messageApi.error("Failed to find order");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, "cancelled");
      messageApi.success("Order cancelled successfully");
      fetchMyOrders();
    } catch (error) {
      messageApi.error("Failed to cancel order");
    }
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "order_search_id",
      key: "order_search_id",
      render: (text: string) => (
        <Link href={`/orders/${text}`} style={{ fontWeight: 500 }}>
          {text}
        </Link>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <OrderStatusTag status={status} />,
    },
    {
      title: "Content",
      key: "content",
      render: (_: unknown, record: any) => (
        `${record.color_mode} x ${record.pages} pages`
      ),
    },
    {
      title: "Total",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `AUD ${amount.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Link href={`/orders/${record.order_search_id}`}>
            <Button type="link" size="small">
              View Details
            </Button>
          </Link>
          {record.status === "pending" && user?.role === "admin" && (
            <Button
              type="link"
              size="small"
              danger
              onClick={() => handleCancelOrder(record.id)}
            >
              Cancel Order
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <Title level={2} style={{ marginBottom: 24 }}>
          My Orders
        </Title>

        {!isAuthenticated ? (
          <Card
            style={{
              borderRadius: 16,
              marginBottom: 32,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <FileTextOutlined
                style={{ fontSize: 48, color: "#1890ff", marginBottom: 16 }}
              />
              <Title level={4}>Login to view your order history</Title>
              <Paragraph style={{ maxWidth: 500, margin: "0 auto 24px" }}>
                Login to easily view and manage all your order history, track
                order status, and reprint previous documents.
              </Paragraph>
              <Space>
                <Link href="/auth">
                  <Button type="primary" icon={<LoginOutlined />} size="large">
                    Login Account
                  </Button>
                </Link>
                <Link href="/print">
                  <Button size="large">Create New Order</Button>
                </Link>
              </Space>
            </div>

            <Divider>Or use Order Number/Phone Number to search</Divider>

            <Tabs
              defaultActiveKey="orderNumber"
              onChange={setSearchType}
              centered
            >
              <TabPane
                tab={
                  <span>
                    <FileTextOutlined />
                    Order Number
                  </span>
                }
                key="orderNumber"
              >
                <Form onFinish={handleSearch} layout="vertical">
                  <Form.Item
                    name="searchValue"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the order number",
                      },
                    ]}
                  >
                    <Input
                      prefix={<SearchOutlined />}
                      placeholder="Please enter the order number"
                      size="large"
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SearchOutlined />}
                      loading={isLoading}
                      block
                    >
                      Search Order
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <PhoneOutlined />
                    Phone Number
                  </span>
                }
                key="phone"
              >
                <Form onFinish={handleSearch} layout="vertical">
                  <Form.Item
                    name="searchValue"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the phone number",
                      },
                      {
                        pattern: /^(\+61|0)[2-4789]\d{8}$/,
                        message: "Please enter a valid phone number",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Please enter the phone number you used when placing the order"
                      size="large"
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SearchOutlined />}
                      loading={isLoading}
                      block
                    >
                      Search Order
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        ) : (
          <Card
            style={{
              borderRadius: 16,
              marginBottom: 32,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Order History</span>
                <Link href="/print">
                  <Button type="primary">Create New Order</Button>
                </Link>
              </div>
            }
          >
            <Alert
              message="Note"
              description="You can view and manage all your orders. Click on the order number to view the details."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Table
              columns={columns}
              dataSource={myOrders}
              rowKey="id"
              loading={isLoading}
              pagination={{ pageSize: 10 }}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No order records"
                  />
                ),
              }}
            />
          </Card>
        )}

        {!isAuthenticated && myOrders.length > 0 && (
          <Card
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
            title="Search Results"
          >
            <Table
              columns={columns}
              dataSource={myOrders}
              rowKey="id"
              pagination={false}
            />
          </Card>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
