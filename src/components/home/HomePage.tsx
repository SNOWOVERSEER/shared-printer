"use client";

import { Typography, Row, Col, Button, Card, Space, Divider, theme } from "antd";
import {
  FileTextOutlined,
  PrinterOutlined,
  CreditCardOutlined,
  InboxOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import React from "react";
const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

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
  const { token } = useToken();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <FileTextOutlined style={{ fontSize: "32px" }} />,
      title: "Upload Files",
      description: "Support for PDF, Word, images and more",
    },
    {
      icon: <PrinterOutlined style={{ fontSize: "32px" }} />,
      title: "Select Options",
      description: "Customize size, color, and double-sided printing",
    },
    {
      icon: <CreditCardOutlined style={{ fontSize: "32px" }} />,
      title: "Pay Securely",
      description: "Secure payment processing with Stripe",
    },
    {
      icon: <InboxOutlined style={{ fontSize: "32px" }} />,
      title: "Pickup Prints",
      description: "Convenient delivery to your mailbox",
    },
  ];

  return (
    <div style={{
      maxWidth: 1400,
      margin: "0 auto",
      padding: "clamp(16px, 3vw, 40px) clamp(12px, 2vw, 24px)",
    }}>
      <style jsx global>{`
        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .slide-up {
          animation: slideUp 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .price-card {
          transition: all 0.3s ease;
        }
        
        .price-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4) !important;
          border-color: ${token.colorPrimary} !important;
        }
      `}</style>

      {/* Hero Section */}
      <Card
        className="fade-in"
        style={{
          marginBottom: 60,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <Title
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              marginBottom: 24
            }}
          >
            South Wharf Drive Community Printing System
          </Title>
          <Paragraph
            style={{
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              maxWidth: 800,
              margin: "0 auto 32px",
            }}
          >
            Upload documents, select print options, pay online, and pick up from
            your mailbox
          </Paragraph>
          <Space size="middle">
            <Link href="">
              <Button type="primary" size="large">
                Start Printing
              </Button>
            </Link>
            <Link href="">
              <Button size="large">Check Orders</Button>
            </Link>
          </Space>
        </div>
      </Card>

      {/* Features Section */}
      <div style={{ marginBottom: 60 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          How It Works
        </Title>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col key={index} xs={24} sm={12} lg={6}>
              <Card
                className="feature-card slide-up"
                style={{
                  height: "100%",
                  borderRadius: 12,
                  transition: "all 0.3s ease"
                }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: 24
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  backgroundColor: token.colorPrimaryBg,
                  marginBottom: 16
                }}>
                  {React.cloneElement(feature.icon, { style: { fontSize: "32px", color: token.colorPrimary } })}
                </div>
                <Title level={4} style={{ marginTop: 0, marginBottom: 12 }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ marginBottom: 0 }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Pricing Section */}
      <div style={{ marginBottom: 60 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          Pricing
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={8}>
            <Card
              className="price-card"
              hoverable
              title={<Title level={3}
                style={{
                  margin: 0
                }}
              >Black & White</Title>}
              style={{
                height: "100%",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
              }}
              styles={{ body: { padding: 24 }, header: { textAlign: "center" } }}

            >
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Text type="secondary">Standard A4</Text>
                <Title style={{ margin: "16px 0" }}>
                  <Text style={{ fontSize: "0.5em", verticalAlign: "top" }}>AUD </Text>
                  0.2
                  <Text type="secondary" style={{ fontSize: "0.4em" }}>/page</Text>
                </Title>
              </div>

              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                {["Single/Double-sided printing", "80g paper", "Fast processing"].map((item, i) => (
                  <li key={i} style={{
                    padding: "8px 0",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <CheckCircleOutlined style={{ color: token.colorPrimary, marginRight: 8 }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="">
                <Button type="primary" block size="large" style={{ borderRadius: 8 }}>
                  Select
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card
              className="price-card"
              hoverable
              title={<Title level={3}
                style={{
                  margin: 0
                }}
              >Color</Title>}
              style={{
                height: "100%",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                // borderColor: token.colorPrimary,
                transition: "all 0.3s ease",
              }}
              styles={{
                header: {
                  textAlign: "center",
                  // backgroundColor: token.colorPrimaryBg
                },
                body: {
                  padding: 24
                }
              }}

            >
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Text type="secondary">Standard A4</Text>
                <Title style={{ margin: "16px 0" }}>
                  <Text style={{ fontSize: "0.5em", verticalAlign: "top" }}>AUD </Text>
                  0.7
                  <Text type="secondary" style={{ fontSize: "0.4em" }}>/page</Text>
                </Title>
              </div>

              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                {["Single/Double-sided printing", "80g paper", "Vibrant colors"].map((item, i) => (
                  <li key={i} style={{
                    padding: "8px 0",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <CheckCircleOutlined style={{ color: token.colorPrimary, marginRight: 8 }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="">
                <Button type="primary" block size="large" style={{ borderRadius: 8 }}>
                  Select
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card
              className="price-card"
              hoverable
              title={<Title level={3}
                style={{
                  margin: 0
                }}
              >A3 & Photo</Title>}
              style={{
                height: "100%",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease"
              }}
              styles={{
                header: {
                  textAlign: "center",
                },
                body: {
                  padding: 24
                }
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Text type="secondary">Premium Paper</Text>
                <Title style={{ margin: "16px 0" }}>
                  <Text style={{ fontSize: "0.5em", verticalAlign: "top" }}>AUD </Text>
                  1.0
                  <Text type="secondary" style={{ fontSize: "0.4em" }}>/page</Text>
                </Title>
              </div>

              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                {["Single/Double-sided printing", "Premium A3 & photo paper", "Fast processing"].map((item, i) => (
                  <li key={i} style={{
                    padding: "8px 0",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <CheckCircleOutlined style={{ color: token.colorPrimary, marginRight: 8 }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Button block size="large" disabled style={{ borderRadius: 8 }}>
                Currently Unavailable
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Service Area Section */}
      <Divider style={{ margin: "60px 0 40px" }} />

      <div style={{ marginBottom: 60 }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          Service Area
        </Title>

        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={12} style={{ height: 450 }}>
            <Card
              className="fade-in"
              style={{
                height: "100%",
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}
              styles={{
                body: {
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: 24
                }
              }}
            >
              <Title level={4} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <EnvironmentOutlined style={{ color: token.colorPrimary }} />
                Available Locations
              </Title>

              <Paragraph style={{ fontSize: "1.1rem", marginTop: 16 }}>
                We currently provide printing services for residents at:
              </Paragraph>

              <div style={{ flex: 1, overflow: "auto" }}>
                {locations.map((location, index) => (
                  <Card
                    key={index}
                    size="small"
                    style={{
                      marginBottom: 12,
                      borderRadius: 8,
                      borderLeft: `3px solid ${token.colorPrimary}`
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <EnvironmentOutlined style={{ color: token.colorPrimary, marginRight: 8 }} />
                      {location.name}
                    </div>
                  </Card>
                ))}
              </div>

              <Card
                size="small"
                style={{
                  marginTop: 16,
                  borderRadius: 8,
                  backgroundColor: token.colorPrimaryBg,
                  borderColor: token.colorPrimaryBorder
                }}
              >
                <Paragraph style={{ margin: 0 }}>
                  More locations coming soon! Stay tuned for updates as we expand our service area.
                </Paragraph>
              </Card>
            </Card>
          </Col>

          <Col xs={24} lg={12} style={{ height: 450 }}>
            <Card
              className="fade-in"
              style={{
                height: "100%",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
              }}
              styles={{
                body: {
                  padding: 0
                }
              }}
            >
              <LoadScript googleMapsApiKey="AIzaSyCROtWKD0SaNpayGKl8OOD1PAEhI4PLmcQ">
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "450px",
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

      {/* Call to Action */}
      <Card
        className="slide-up"
        style={{
          marginBottom: 60,
          borderRadius: 12,
          backgroundColor: token.colorPrimaryBg,
          borderColor: token.colorPrimaryBorder,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}
      >
        <Row align="middle" justify="space-between" gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Title level={3} style={{ marginBottom: 8 }}>
              Ready to start printing?
            </Title>
            <Paragraph style={{ marginBottom: 0 }}>
              Join our community printing system today and enjoy convenient, affordable printing services.
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Link href="">
              <Button type="primary" size="large">
                Get Started
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HomePage;