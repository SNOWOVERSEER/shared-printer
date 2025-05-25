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
  Descriptions,
  Pagination,
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  PhoneOutlined,
  LoginOutlined,
  TeamOutlined,
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
  const { myOrders, fetchMyOrders, fetchOrderById, updateOrderStatus, searchOrdersByPhone, isLoading, error, fetchAllOrders, allOrders, totalOrders, currentPage, pageSize } = useOrderStore();
  const [searchType, setSearchType] = useState("orderNumber");
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const isAdmin = user?.role === "admin";
  const [activeTab, setActiveTab] = useState("myOrders");
  const [isMobile, setIsMobile] = useState(false);

  // Mobile pagination states
  const [myOrdersPage, setMyOrdersPage] = useState(1);
  const [allOrdersPage, setAllOrdersPage] = useState(1);
  const mobilePageSize = 5;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === "allOrders" && isAdmin) {
      if (isMobile) {
        fetchAllOrders(allOrdersPage, mobilePageSize);
      } else {
        fetchAllOrders();
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyOrders();
      if (isAdmin) {
        if (isMobile) {
          fetchAllOrders(allOrdersPage, mobilePageSize);
        } else {
          fetchAllOrders();
        }
      }
    }
  }, [isAuthenticated, fetchMyOrders, fetchAllOrders, isAdmin, isMobile]);

  // Search handlers
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

  // Order action handlers
  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, "cancelled");
      messageApi.success("Order cancelled successfully");
      fetchMyOrders();

      if (activeTab === "allOrders" && isAdmin) {
        if (isMobile) {
          fetchAllOrders(allOrdersPage, mobilePageSize);
        } else {
          fetchAllOrders();
        }
      }
    } catch (error) {
      messageApi.error("Failed to cancel order");
    }
  };

  const handleStartProcessing = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, "processing");
      messageApi.success("Order processing started successfully");
      fetchMyOrders();
      if (activeTab === "allOrders" && isAdmin) {
        if (isMobile) {
          fetchAllOrders(allOrdersPage, mobilePageSize);
        } else {
          fetchAllOrders();
        }
      }
    } catch (error) {
      messageApi.error("Failed to start processing");
    }
  };

  const handleMarkComplete = async (orderId: string) => {
    try {
      await updateOrderStatus(orderId, "completed");
      messageApi.success("Order marked as complete successfully");
      fetchMyOrders();
      if (activeTab === "allOrders" && isAdmin) {
        if (isMobile) {
          fetchAllOrders(allOrdersPage, mobilePageSize);
        } else {
          fetchAllOrders();
        }
      }
    } catch (error) {
      messageApi.error("Failed to mark as complete");
    }
  };

  // Pagination handlers
  const handleMyOrdersPageChange = (page: number) => {
    setMyOrdersPage(page);
  };

  const handleAllOrdersPageChange = (page: number) => {
    setAllOrdersPage(page);
    fetchAllOrders(page, mobilePageSize);
  };

  const getPaginatedMyOrders = () => {
    const startIndex = (myOrdersPage - 1) * mobilePageSize;
    const endIndex = startIndex + mobilePageSize;
    return myOrders.slice(startIndex, endIndex);
  };

  // Mobile card component
  const OrderCard = ({ order, isAdmin = false }: { order: any; isAdmin?: boolean }) => (
    <Card
      size="small"
      style={{ marginBottom: 12 }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href={`/orders/${order.order_search_id}`} style={{ fontWeight: 500 }}>
            {order.order_search_id}
          </Link>
          <OrderStatusTag status={order.status} />
        </div>
      }
    >
      <Descriptions size="small" column={1}>
        {isAdmin && (
          <Descriptions.Item label="Customer">
            <div>
              <div>{order.name || "Guest"}</div>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {order.phone}
              </Text>
            </div>
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Date">
          {new Date(order.created_at).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Content">
          {`${order.color_mode} x ${order.pages} pages`}
        </Descriptions.Item>
        <Descriptions.Item label="Total">
          AUD {order.amount.toFixed(2)}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link href={`/orders/${order.order_search_id}`}>
          <Button type="primary" size="small">
            View Details
          </Button>
        </Link>

        {isAdmin && (
          <>
            {order.status === "pending" && (
              <Button
                size="small"
                onClick={() => handleStartProcessing(order.order_search_id)}
              >
                Start Processing
              </Button>
            )}
            {order.status === "processing" && (
              <Button
                size="small"
                onClick={() => handleMarkComplete(order.order_search_id)}
              >
                Mark Complete
              </Button>
            )}
            {(order.status === "pending" || order.status === "processing") && (
              <Button
                size="small"
                danger
                onClick={() => handleCancelOrder(order.order_search_id)}
              >
                Cancel
              </Button>
            )}
          </>
        )}

        {!isAdmin && order.status === "pending" && isAdmin && (
          <Button
            size="small"
            danger
            onClick={() => handleCancelOrder(order.order_search_id)}
          >
            Cancel Order
          </Button>
        )}
      </div>
    </Card>
  );

  // Mobile list with pagination
  const MobileOrderList = ({
    orders,
    isAdmin = false,
    currentPage,
    total,
    pageSize,
    onPageChange
  }: {
    orders: any[],
    isAdmin?: boolean,
    currentPage: number,
    total: number,
    pageSize: number,
    onPageChange: (page: number) => void
  }) => (
    <div>
      {orders.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No order records"
        />
      ) : (
        <>
          {orders.map(order => (
            <OrderCard key={order.order_search_id} order={order} isAdmin={isAdmin} />
          ))}
          {total > pageSize && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Pagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                onChange={onPageChange}
                showSizeChanger={false}
                showQuickJumper={false}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} orders`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );

  // Desktop table columns
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
          {record.status === "pending" && isAdmin && (
            <Button
              type="link"
              size="small"
              danger
              onClick={() => handleCancelOrder(record.order_search_id)}
            >
              Cancel Order
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const adminColumns = [
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
      title: "Customer",
      key: "name",
      render: (_: unknown, record: any) => (
        <div>
          <div>{record.name || "Guest"}</div>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {record.phone}
          </Text>
        </div>
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
      title: "Admin Actions",
      key: "adminAction",
      render: (_: any, record: any) => (
        <Space size="small" direction="vertical">
          <Space size="small">
            <Link href={`/orders/${record.order_search_id}`}>
              <Button type="link" size="small">
                View Details
              </Button>
            </Link>
          </Space>
          <Space size="small">
            {record.status === "pending" && (
              <Button
                type="link"
                size="small"
                onClick={() => handleStartProcessing(record.order_search_id)}
              >
                Start Processing
              </Button>
            )}
            {record.status === "processing" && (
              <Button
                type="link"
                size="small"
                onClick={() => handleMarkComplete(record.order_search_id)}
              >
                Mark Complete
              </Button>
            )}
            {(record.status === "pending" || record.status === "processing") && (
              <Button
                type="link"
                size="small"
                danger
                onClick={() => handleCancelOrder(record.order_search_id)}
              >
                Cancel
              </Button>
            )}
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        <Title level={2} style={{ marginBottom: 24 }}>
          {isAdmin ? "Order Management" : "My Orders"}
        </Title>

        {/* Unauthenticated user section */}
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
          /* Authenticated user section */
          <Card
            style={{
              borderRadius: 16,
              marginBottom: 32,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Admin tabs */}
            {isAdmin ? (
              <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane
                  tab={
                    <span>
                      <UserOutlined />
                      My Orders
                    </span>
                  }
                  key="myOrders"
                >
                  <Alert
                    message="Your Personal Orders"
                    description="View and manage your own orders."
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />

                  {isMobile ? (
                    <MobileOrderList
                      orders={getPaginatedMyOrders()}
                      currentPage={myOrdersPage}
                      total={myOrders.length}
                      pageSize={mobilePageSize}
                      onPageChange={handleMyOrdersPageChange}
                    />
                  ) : (
                    <Table
                      columns={columns}
                      dataSource={myOrders}
                      rowKey="order_search_id"
                      loading={isLoading}
                      pagination={{ pageSize: 10 }}
                      scroll={{ x: 800 }}
                      locale={{
                        emptyText: (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No order records"
                          />
                        ),
                      }}
                    />
                  )}
                </TabPane>

                <TabPane
                  tab={
                    <span>
                      <TeamOutlined />
                      All Orders (Admin)
                    </span>
                  }
                  key="allOrders"
                >
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <Alert
                      message="Admin Panel - All Orders"
                      description="View and manage all customer orders. You can update order status and perform administrative actions."
                      type="warning"
                      showIcon
                      style={{ flex: 1, minWidth: 300 }}
                    />
                    <Button
                      onClick={() => {
                        if (isMobile) {
                          fetchAllOrders(allOrdersPage, mobilePageSize);
                        } else {
                          fetchAllOrders();
                        }
                      }}
                      loading={isLoading}
                    >
                      Refresh
                    </Button>
                  </div>

                  {isMobile ? (
                    <MobileOrderList
                      orders={allOrders || []}
                      isAdmin={true}
                      currentPage={allOrdersPage}
                      total={totalOrders || 0}
                      pageSize={mobilePageSize}
                      onPageChange={handleAllOrdersPageChange}
                    />
                  ) : (
                    <Table
                      columns={adminColumns}
                      dataSource={allOrders || []}
                      rowKey="order_search_id"
                      loading={isLoading}
                      pagination={{ pageSize: 15 }}
                      scroll={{ x: 1000 }}
                      locale={{
                        emptyText: (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                              <div>
                                <p>No orders found</p>
                                <p style={{ color: '#666', fontSize: '12px' }}>
                                  {allOrders === undefined ? 'Loading...' : 'Try refreshing the data'}
                                </p>
                              </div>
                            }
                          />
                        ),
                      }}
                    />
                  )}
                </TabPane>
              </Tabs>
            ) : (
              /* Regular user view */
              <>
                <Alert
                  message="Note"
                  description="You can view and manage all your orders. Click on the order number to view the details."
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />

                {isMobile ? (
                  <MobileOrderList
                    orders={getPaginatedMyOrders()}
                    currentPage={myOrdersPage}
                    total={myOrders.length}
                    pageSize={mobilePageSize}
                    onPageChange={handleMyOrdersPageChange}
                  />
                ) : (
                  <Table
                    columns={columns}
                    dataSource={myOrders}
                    rowKey="order_search_id"
                    loading={isLoading}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 800 }}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No order records"
                        />
                      ),
                    }}
                  />
                )}
              </>
            )}
          </Card>
        )}

        {/* Search results section */}
        {!isAuthenticated && myOrders.length > 0 && (
          <Card
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
            title="Search Results"
          >
            {isMobile ? (
              <div>
                {myOrders.map(order => (
                  <OrderCard key={order.order_search_id} order={order} />
                ))}
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={myOrders}
                rowKey="order_search_id"
                pagination={false}
                scroll={{ x: 600 }}
              />
            )}
          </Card>
        )}
      </div>
    </>
  );
};

export default OrdersPage;