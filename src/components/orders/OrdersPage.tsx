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

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// 模拟订单数据
const mockOrders = [
  {
    id: "ORD-2023-0001",
    date: "2023-11-15",
    status: "completed",
    items: "B&W x 5",
    total: "AUD 1.00",
  },
  {
    id: "ORD-2023-0002",
    date: "2023-11-20",
    status: "processing",
    items: "Color x 3",
    total: "AUD 2.10",
  },
  {
    id: "ORD-2023-0003",
    date: "2023-11-25",
    status: "pending",
    items: "B&W x 10",
    total: "AUD 2.00",
  },
];

// 订单状态标签
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [searchType, setSearchType] = useState("orderNumber");
  const router = useRouter();

  // 模拟检查登录状态
  useEffect(() => {
    // 这里应该是实际检查用户是否登录的逻辑
    // 例如从 localStorage 或 cookie 中获取 token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // 如果已登录，获取用户订单
    if (!!token) {
      fetchUserOrders();
    }
  }, []);

  // 模拟获取用户订单
  const fetchUserOrders = () => {
    setLoading(true);
    // 这里应该是实际从 API 获取订单的逻辑
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  };

  // 处理订单搜索
  const handleSearch = (values: any) => {
    setLoading(true);
    console.log("Search values:", values, "Type:", searchType);

    // 模拟搜索结果
    setTimeout(() => {
      if (searchType === "orderNumber" && values.searchValue) {
        const filtered = mockOrders.filter((order) =>
          order.id.toLowerCase().includes(values.searchValue.toLowerCase())
        );
        setOrders(filtered);
      } else if (searchType === "phone" && values.searchValue) {
        // 模拟通过手机号查询
        // 实际应用中，这应该是一个 API 调用
        setOrders(mockOrders.slice(0, 1));
      }
      setLoading(false);
    }, 1000);
  };

  // 订单表格列定义
  const columns = [
    {
      title: "订单号",
      dataIndex: "id",
      key: "id",
      render: (text: string) => (
        <Link href={`/orders/${text}`} style={{ fontWeight: 500 }}>
          {text}
        </Link>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <OrderStatusTag status={status} />,
    },
    {
      title: "Content",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Link href={`/orders/${record.id}`}>
            <Button type="link" size="small">
              View Details
            </Button>
          </Link>
          {record.status === "pending" && (
            <Button type="link" size="small" danger>
              Cancel Order
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        My Orders
      </Title>

      {!isLoggedIn ? (
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
                    placeholder="Please enter the order number, e.g. ORD-2023-0001"
                    size="large"
                    allowClear
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    loading={loading}
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
                      pattern: /^1[3-9]\d{9}$/,
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
                    loading={loading}
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
            dataSource={orders}
            rowKey="id"
            loading={loading}
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

      {!isLoggedIn && orders.length > 0 && (
        <Card
          style={{
            borderRadius: 16,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          }}
          title="Search Results"
        >
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            pagination={false}
          />
        </Card>
      )}
    </div>
  );
};

export default OrdersPage;
