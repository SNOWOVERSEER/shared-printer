'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  Typography,
  Descriptions,
  Tag,
  Space,
  Button,
  Spin,
  Alert,
  Divider,
  message,
  Timeline,
  Steps,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  FileTextOutlined,
  PrinterOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import useOrderStore from '@/store/orderStore';
import useAuthStore from '@/store/authStore';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';


const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [messageApi, ContextHolder] = message.useMessage();
  const { fetchOrderById, updateOrderStatus, isLoading, error } = useOrderStore();
  const [order, setOrder] = useState<any>(null);
  const { user } = useAuthStore();
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderData = await fetchOrderById(params.id as string);
        setOrder(orderData);
        messageApi.success('Order details loaded successfully');
      } catch (error) {
        messageApi.error('Failed to load order details');
        router.push('/orders');
      }
    };

    loadOrder();
  }, [params.id, fetchOrderById, router, messageApi]);

  const handleCancelOrder = async () => {
    try {
      await updateOrderStatus(order.id, 'cancelled');
      messageApi.success('Order cancelled successfully');
      const updatedOrder = await fetchOrderById(params.id as string);
      setOrder(updatedOrder);
    } catch (error) {
      messageApi.error('Failed to cancel order');
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
        <Alert
          message="Order Not Found"
          description="The order you are looking for does not exist or you don't have permission to view it."
          type="error"
          showIcon
        />
      </div>
    );
  }

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'completed':
        return 2;
      case 'processing':
        return 1;
      case 'pending':
        return 0;
      case 'cancelled':
        return -1;
      default:
        return 1;
    }
  };

  return (
    <>
      {ContextHolder}
      <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>Order Details</Title>
          <Paragraph type="secondary">
            View and manage your order details
          </Paragraph>
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>
                  Order Information
                </Title>
                <Space>
                  <Link href="/orders">
                    <Button>Back to Orders</Button>
                  </Link>
                  {order.status === 'pending' && user?.role === 'admin' && (
                    <Button danger onClick={handleCancelOrder}>
                      Cancel Order
                    </Button>
                  )}
                </Space>
              </div>
              <Divider style={{ margin: '12px 0' }} />

              <Steps
                current={getStatusStep(order.status)}
                status={order.status === 'cancelled' ? 'error' : 'process'}
              >
                <Step
                  title="Order Placed"
                  description={new Date(order.created_at).toLocaleString()}
                />
                <Step
                  title="Processing"
                  description={order.status === 'processing' ? "Your order is being processed" : "Waiting to process"}
                />
                <Step
                  title="Completed"
                  description={order.status === 'completed' ? "Order completed" : "Waiting to complete"}
                />
              </Steps>

              <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={8}>
                  <Statistic
                    title="Order Number"
                    value={order.order_search_id}
                    prefix={<FileTextOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Status"
                    value={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    valueStyle={{
                      color: order.status === 'completed' ? '#3f8600' :
                        order.status === 'processing' ? '#1890ff' :
                          order.status === 'cancelled' ? '#cf1322' : '#faad14'
                    }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Total Amount"
                    value={order.amount}
                    precision={2}
                    prefix={<DollarOutlined />}
                    suffix="AUD"
                  />
                </Col>
              </Row>
            </Space>
          </Card>

          <Row gutter={16}>
            <Col span={16}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title={<Space><FileTextOutlined /> Print Details</Space>}>
                  <Descriptions column={2}>
                    <Descriptions.Item label="File Name">
                      {order.file_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pages">
                      {order.pages} pages
                    </Descriptions.Item>
                    <Descriptions.Item label="Color Mode">
                      {order.color_mode === 'color' ? 'Color' : 'Black & White'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sides">
                      {order.sides === 'double' ? 'Double-sided' : 'Single-sided'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Paper Size">
                      {order.paper_size}
                    </Descriptions.Item>
                    <Descriptions.Item label="Copies">
                      {order.copies}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>

                <Card title={<Space><MailOutlined /> Delivery Information</Space>}>
                  <Descriptions column={2}>
                    <Descriptions.Item label="Delivery Method">
                      {order.delivery_method === 'pickup' ? 'Lobby Pickup' : 'Mailbox Delivery'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Name">
                      <Space><UserOutlined /> {order.name}</Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      <Space><PhoneOutlined /> {order.phone}</Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {order.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Building">
                      <Space><EnvironmentOutlined /> {order.building} South Wharf Drive</Space>
                    </Descriptions.Item>
                    {order.delivery_method === 'mailbox' && (
                      <Descriptions.Item label="Mailbox Number">
                        {order.mailbox_number}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Space>
            </Col>

            <Col span={8}>
              <Card title={<Space><ShoppingCartOutlined /> Order Summary</Space>}>
                <Timeline>
                  <Timeline.Item>
                    <Space>
                      <BankOutlined />
                      <Text>Order Created</Text>
                    </Space>
                    <div style={{ marginLeft: 24 }}>
                      <Text type="secondary">{new Date(order.created_at).toLocaleString()}</Text>
                    </div>
                  </Timeline.Item>
                  {order.status === 'processing' && (
                    <Timeline.Item>
                      <Space>
                        <LoadingOutlined />
                        <Text>Processing</Text>
                      </Space>
                      <div style={{ marginLeft: 24 }}>
                        <Text type="secondary">Your order is being processed</Text>
                      </div>
                    </Timeline.Item>
                  )}
                  {order.status === 'completed' && (
                    <Timeline.Item>
                      <Space>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        <Text>Completed</Text>
                      </Space>
                      <div style={{ marginLeft: 24 }}>
                        <Text type="secondary">{new Date(order.completed_at).toLocaleString()}</Text>
                      </div>
                    </Timeline.Item>
                  )}
                  {order.status === 'cancelled' && (
                    <Timeline.Item>
                      <Space>
                        <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                        <Text>Cancelled</Text>
                      </Space>
                    </Timeline.Item>
                  )}
                </Timeline>
              </Card>
            </Col>
          </Row>
        </Space>
      </div>
    </>
  );
};

export default function OrderDetail() {
  return (
    <MainLayout>
      <OrderDetailPage />
    </MainLayout>
  );
}