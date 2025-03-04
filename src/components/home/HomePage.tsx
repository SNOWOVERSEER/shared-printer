"use client";

import { Typography, Row, Col, Button, Card, Space, Divider } from "antd";
import {
  FileTextOutlined,
  PrinterOutlined,
  CreditCardOutlined,
  InboxOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const { Title, Paragraph } = Typography;

const center = {
  lat: -37.8222,
  lng: 144.9343,
};

const locations = [
  {
    name: "81 South Wharf Dr",
    position: { lat: -37.8222642, lng: 144.9335153 },
  },
  {
    name: "103 South Wharf Dr",
    position: { lat: -37.8219201, lng: 144.9347633 },
  },
];

const HomePage = () => {
  const features = [
    {
      icon: <FileTextOutlined style={{ fontSize: "48px", color: "#1677ff" }} />,
      title: "Upload Files",
      description: "Support for PDF, Word, images and more",
    },
    {
      icon: <PrinterOutlined style={{ fontSize: "48px", color: "#1677ff" }} />,
      title: "Select Options",
      description: "Customize size, color, and double-sided printing",
    },
    {
      icon: (
        <CreditCardOutlined style={{ fontSize: "48px", color: "#1677ff" }} />
      ),
      title: "Pay Securely",
      description: "Secure payment processing with Stripe",
    },
    {
      icon: <InboxOutlined style={{ fontSize: "48px", color: "#1677ff" }} />,
      title: "Pickup Prints",
      description: "Convenient delivery to your mailbox",
    },
  ];
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 24px" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Title style={{ fontSize: "2.5rem", marginBottom: 24 }}>
          South Wharf Drive Community Printing System
        </Title>
        <Paragraph
          style={{ fontSize: "1.2rem", maxWidth: 800, margin: "0 auto 32px" }}
        >
          Upload documents, select print options, pay online, and pick up from
          your mailbox
        </Paragraph>
        <Space size="middle">
          <Link href="">  {/* TODO: Add link to create order */}
            <Button type="primary" size="large">
              Start Printing
            </Button>
          </Link>
          <Link href="">  {/* TODO: Add link to check orders */}
            <Button size="large">Check Orders</Button>
          </Link>
        </Space>
      </div>

      {/* Features Section */}
      <Row gutter={[32, 32]}>
        {features.map((feature, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{
                height: "100%",
                textAlign: "center",
                border: "1px solid #e0e0e0",
              }}
            >
              {feature.icon}
              <Title level={4} style={{ marginTop: 16 }}>
                {feature.title}
              </Title>
              <Paragraph>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>


      {/* Pricing Section */}
      <Divider style={{ margin: "60px 0 40px" }} />

      <div style={{ marginBottom: 60 }}>
        <Title level={2} style={{ textAlign: "center", margin: 40 }}>
          Pricing
        </Title>

        <Row gutter={[32, 32]}>
          {/* Black and White Pricing */}
          <Col xs={24} md={12} lg={8}>
            <Card
              hoverable
              style={{
                height: "100%",
                textAlign: "center",
                border: "1px solid #e0e0e0",
              }}
              styles={{
                body: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "32px 24px",
                },
              }}
            >
              <Title level={3}>Black & White</Title>
              <Paragraph style={{ color: "#666" }}>Standard A4</Paragraph>
              <div style={{ margin: "16px 0" }}>
                <Title style={{ fontSize: "48px", margin: 0 }}>
                  <small style={{ fontSize: "12px" }}>From </small>
                  <small style={{ fontSize: "24px" }}>AUD </small>
                  0.2
                  <small style={{ fontSize: "16px", color: "#666" }}>
                    /page
                  </small>
                </Title>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 20%",
                  textAlign: "left",
                }}
              >
                <li style={{ padding: "8px 0" }}>✓ Single/Double-sided printing</li>
                <li style={{ padding: "8px 0" }}>✓ 80g paper</li>
                <li style={{ padding: "8px 0" }}>✓ Fast processing</li>
              </ul>

              <Link href="" style={{ marginTop: "auto" }}>  {/* TODO: Add link to create order */}
                <Button type="primary" size="large" block>
                  Select
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card
              hoverable
              style={{
                height: "100%",
                textAlign: "center",
                border: "1px solid #e0e0e0",
              }}
              styles={{
                body: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "32px 24px",
                },
              }}
            >
              <Title level={3}>Color</Title>
              <Paragraph style={{ color: "#666" }}>Standard A4</Paragraph>
              <div style={{ margin: "16px 0" }}>
                <Title style={{ fontSize: "48px", margin: 0 }}>
                  <small style={{ fontSize: "12px" }}>From </small>
                  <small style={{ fontSize: "24px" }}>AUD </small>
                  0.7
                  <small style={{ fontSize: "16px", color: "#666" }}>
                    /page
                  </small>
                </Title>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 20%",
                  textAlign: "left",
                }}
              >
                <li style={{ padding: "8px 0" }}>✓ Single/Double-sided printing</li>
                <li style={{ padding: "8px 0" }}>✓ 80g paper</li>
                <li style={{ padding: "8px 0" }}>✓ Fast processing</li>
              </ul>

              <Link href="" style={{ marginTop: "auto" }}>  {/* TODO: Add link to create order */}
                <Button type="primary" size="large" block>
                  Select
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card
              hoverable
              style={{
                height: "100%",
                textAlign: "center",
                border: "1px solid #e0e0e0",
                backgroundColor: "#f0f0f0",
              }}
              styles={{
                body: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "32px 24px",
                },
              }}
            >
              <Title level={3}>A3 & Photo</Title>
              <Paragraph style={{ color: "#666" }}>Standard A3/Premium Photo Paper</Paragraph>
              <div style={{ margin: "16px 0" }}>
                <Title style={{ fontSize: "48px", margin: 0 }}>
                  <small style={{ fontSize: "12px" }}>From </small>
                  <small style={{ fontSize: "24px" }}>AUD </small>
                  1.0
                  <small style={{ fontSize: "16px", color: "#666" }}>
                    /page
                  </small>
                </Title>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 20%",
                  textAlign: "left",
                }}
              >
                <li style={{ padding: "8px 0" }}>✓ Single/Double-sided printing</li>
                <li style={{ padding: "8px 0" }}>✓ Premium A3 & photo paper</li>
                <li style={{ padding: "8px 0" }}>✓ Fast processing</li>
              </ul>

              <Link href="" style={{ marginTop: "auto" }}>  {/* TODO: Add link to create order */}
                <Button type="primary" size="large" block disabled>
                  Currently Unavailable
                </Button>
              </Link>
            </Card>
          </Col>


        </Row>
      </div>

      {/* Service Area Section */}
      <Divider style={{ margin: "60px 0 40px" }} />

      <div style={{ marginBottom: 20 }}>
        <Title level={2} style={{ textAlign: "center", margin: 40 }}>
          Service Area
        </Title>

        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={12} style={{ height: 450 }}>
            <Card
              style={{ height: "100%" }}
              styles={{
                body: {
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                },
              }}
            >
              <Title level={4}>
                <EnvironmentOutlined /> Available Locations
              </Title>
              <Paragraph style={{ fontSize: "1.1rem", marginTop: 16 }}>
                We currently provide printing services for residents at:
              </Paragraph>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  marginTop: 16,
                }}
              >
                {locations.map((location, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "12px 0",
                      borderBottom:
                        index < locations.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                      fontSize: "1.1rem",
                    }}
                  >
                    <EnvironmentOutlined
                      style={{ marginRight: 8, color: "#1677ff" }}
                    />
                    {location.name}
                  </li>
                ))}
              </ul>
              <Paragraph style={{ marginTop: 16 }}>
                More locations coming soon! Stay tuned for updates as we expand
                our service area.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} lg={12} style={{ height: 450 }}>
            <Card style={{ height: "100%" }}>
              <LoadScript googleMapsApiKey="AIzaSyCROtWKD0SaNpayGKl8OOD1PAEhI4PLmcQ">
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "8px",
                  }}
                  center={center}
                  zoom={15}
                >
                  {locations.map((location, index) => (
                    <Marker
                      key={index}
                      position={location.position}
                      title={location.name}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            </Card>
          </Col>
        </Row>
      </div>


    </div>
  );
};

export default HomePage;
