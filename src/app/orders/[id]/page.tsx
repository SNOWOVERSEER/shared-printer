"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Descriptions,
  Button,
  Steps,
  Divider,
  Space,
  Tag,
  Spin,
  Result,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PrinterOutlined,
  InboxOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
const { Title, Paragraph } = Typography;

// 模拟订单数据
const mockOrderDetails = {
  id: "ORD-2023-0001",
  date: "2023-11-15 14:30",
  status: "completed",
  items: [
    {
      name: "黑白打印",
      quantity: 5,
      price: "¥0.20",
      total: "¥1.00",
    },
  ],
  total: "¥1.00",
  customer: {
    name: "张三",
    phone: "138****1234",
    email: "zhang***@example.com",
  },
  timeline: [
    {
      time: "2023-11-15 14:30",
      status: "订单创建",
    },
    {
      time: "2023-11-15 14:35",
      status: "支付完成",
    },
    {
      time: "2023-11-15 15:00",
      status: "开始打印",
    },
    {
      time: "2023-11-15 15:10",
      status: "打印完成",
    },
    {
      time: "2023-11-15 15:30",
      status: "订单完成",
    },
  ],
};

const OrderDetailPage = () => {
  const params = useParams();
  const orderId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 模拟API请求
    setLoading(true);
    setTimeout(() => {
      if (orderId === "ORD-2023-0001") {
        setOrderDetails(mockOrderDetails);
        setError(null);
      } else {
        setOrderDetails(null);
        setError("未找到订单信息");
      }
      setLoading(false);
    }, 1000);
  }, [orderId]);

  // 获取当前订单状态对应的步骤
  const getCurrentStep = () => {
    if (!orderDetails) return 0;

    switch (orderDetails.status) {
      case "pending":
        return 0;
      case "processing":
        return 2;
      case "completed":
        return 4;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Spin size="large" tip="加载订单信息..." />
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
        <Result
          status="404"
          title="订单未找到"
          subTitle={error || "无法找到该订单信息，请检查订单号是否正确"}
          extra={
            <Link href="/orders">
              <Button type="primary">返回订单列表</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
      <Link href="/orders">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          style={{ marginBottom: 16, paddingLeft: 0 }}
        >
          返回订单列表
        </Button>
      </Link>

      <Card
        style={{
          borderRadius: 16,
          marginBottom: 24,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div>
            <Title level={3} style={{ marginBottom: 8 }}>
              订单 #{orderDetails.id}
            </Title>
            <Paragraph type="secondary">
              下单时间: {orderDetails.date}
            </Paragraph>
          </div>
          <Tag
            color={
              orderDetails.status === "completed"
                ? "success"
                : orderDetails.status === "processing"
                ? "processing"
                : orderDetails.status === "pending"
                ? "warning"
                : "default"
            }
            style={{ fontSize: 14, padding: "4px 8px", marginTop: 8 }}
          >
            {orderDetails.status === "completed"
              ? "已完成"
              : orderDetails.status === "processing"
              ? "处理中"
              : orderDetails.status === "pending"
              ? "待处理"
              : orderDetails.status}
          </Tag>
        </div>

        <Divider />

        <Steps
          current={getCurrentStep()}
          items={[
            {
              title: "订单创建",
              icon: <ClockCircleOutlined />,
            },
            {
              title: "支付完成",
              icon: <CheckCircleOutlined />,
            },
            {
              title: "开始打印",
              icon: <PrinterOutlined />,
            },
            {
              title: "打印完成",
              icon: <CheckCircleOutlined />,
            },
            {
              title: "订单完成",
              icon: <InboxOutlined />,
            },
          ]}
          style={{ marginBottom: 40 }}
        />

        <Divider orientation="left">订单详情</Divider>

        <Descriptions bordered column={{ xs: 1, sm: 2 }}>
          <Descriptions.Item label="订单号">
            {orderDetails.id}
          </Descriptions.Item>
          <Descriptions.Item label="订单状态">
            <Tag
              color={
                orderDetails.status === "completed"
                  ? "success"
                  : orderDetails.status === "processing"
                  ? "processing"
                  : orderDetails.status === "pending"
                  ? "warning"
                  : "default"
              }
            >
              {orderDetails.status === "completed"
                ? "已完成"
                : orderDetails.status === "processing"
                ? "处理中"
                : orderDetails.status === "pending"
                ? "待处理"
                : orderDetails.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="下单时间">
            {orderDetails.date}
          </Descriptions.Item>
          <Descriptions.Item label="总金额">
            {orderDetails.total}
          </Descriptions.Item>
          <Descriptions.Item label="联系人">
            {orderDetails.customer.name}
          </Descriptions.Item>
          <Descriptions.Item label="联系电话">
            {orderDetails.customer.phone}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱" span={2}>
            {orderDetails.customer.email}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">打印项目</Divider>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
              <th style={{ padding: "12px 8px", textAlign: "left" }}>项目</th>
              <th style={{ padding: "12px 8px", textAlign: "center" }}>数量</th>
              <th style={{ padding: "12px 8px", textAlign: "right" }}>单价</th>
              <th style={{ padding: "12px 8px", textAlign: "right" }}>小计</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item: any, index: number) => (
              <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "12px 8px" }}>{item.name}</td>
                <td style={{ padding: "12px 8px", textAlign: "center" }}>
                  {item.quantity}
                </td>
                <td style={{ padding: "12px 8px", textAlign: "right" }}>
                  {item.price}
                </td>
                <td style={{ padding: "12px 8px", textAlign: "right" }}>
                  {item.total}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={3}
                style={{
                  padding: "12px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                总计
              </td>
              <td
                style={{
                  padding: "12px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {orderDetails.total}
              </td>
            </tr>
          </tbody>
        </table>

        <Divider orientation="left">订单时间线</Divider>

        <Steps
          direction="vertical"
          current={orderDetails.timeline.length - 1}
          items={orderDetails.timeline.map((item: any) => ({
            title: item.status,
            description: item.time,
          }))}
        />
      </Card>

      <Space
        style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
      >
        <Link href="/print">
          <Button type="primary">再次打印</Button>
        </Link>
        <Button>下载收据</Button>
        <Button>联系客服</Button>
      </Space>
    </div>
  );
};

export default function OrderDetail() {
  return (
    <MainLayout>
      <OrderDetailPage />
    </MainLayout>
  );
}
