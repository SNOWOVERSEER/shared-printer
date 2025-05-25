import {
  Typography,
  Row,
  Col,
  Button,
  Card,
  Space,
  Divider,
  theme,
  Badge,
} from "antd";
import {
  FileTextOutlined,
  PrinterOutlined,
  CreditCardOutlined,
  InboxOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  RightCircleFilled,
  ThunderboltFilled,
  StarFilled,
  ExperimentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { PriceCard } from "./PriceCard";
import styles from "./HomePage.module.css";

const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

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

const pricing = [
  {
    title: "Black & White",
    subtitle: "Most economical",
    price: "0.2",
    type: "Standard A4",
    features: ["Single/Double-sided printing", "70g paper", "Fast processing"],
    isPopular: true,
    isDisabled: false,
  },
  {
    title: "Color Printing",
    subtitle: "Perfect for presentations",
    price: "0.7",
    type: "Standard A4",
    features: ["Single/Double-sided printing", "70g paper", "Vibrant colors"],
    isPopular: false,
    isDisabled: false,
  },
  {
    title: "A3 & Photo",
    subtitle: "Coming soon",
    price: "1.0",
    type: "Premium Paper",
    features: [
      "Single/Double-sided printing",
      "Premium A3 & photo paper",
      "Professional quality",
    ],
    isPopular: false,
    isDisabled: true,
  },
];

const HomePage = () => {
  const { token } = useToken();
  const [isLoaded, setIsLoaded] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const handleClickPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "clamp(16px, 3vw, 40px) clamp(12px, 2vw, 24px)",
      }}
    >
      {/* Hero Section */}
      <Card
        className={`${styles["hero-gradient-card"]} fade-in`}
        style={{
          marginBottom: 60,
          borderRadius: 16,
          overflow: "hidden",
          border: "none",
          background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, #ffffff 100%)`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <Title
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            Print Your Documents
            <br />
            <span style={{ color: token.colorPrimary }}>Quick & Easy</span>
          </Title>
          <Paragraph
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              maxWidth: 600,
              margin: "0 auto 32px",
              color: token.colorTextSecondary,
            }}
          >
            Upload • Print • Collect
            <br />
            Available at 81 & 103 South Wharf Drive
          </Paragraph>
          <Space size="middle" wrap style={{ justifyContent: "center" }}>
            <Link href="/print">
              <Button type="primary" size="large" icon={<ThunderboltFilled />}>
                Start Printing Now
              </Button>
            </Link>

            <Button size="large" onClick={handleClickPricing}>See Pricing</Button>

          </Space>
        </div>
      </Card>

      {/* Beta Testing Notice */}
      <Card
        className="slide-up"
        style={{
          marginBottom: 60,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${token.colorInfoBg} 0%, ${token.colorBgContainer} 100%)`,
          border: `1px solid ${token.colorInfoBorder}`,
          boxShadow: "0 4px 12px rgba(22, 119, 255, 0.1)",
        }}
        styles={{
          body: {
            padding: "24px 32px",
          },
        }}
      >
        <Row align="middle" gutter={[16, 16]}>
          <Col flex="none">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: token.colorInfo,
                color: "#fff",
              }}
            >
              <ExperimentOutlined style={{ fontSize: 24 }} />
            </div>
          </Col>
          <Col flex="auto">
            <div>
              <Title level={4} style={{ margin: 0, marginBottom: 8, color: token.colorInfoText }}>
                🧪 Beta Testing Phase
              </Title>
              <Paragraph style={{ margin: 0, color: token.colorTextSecondary, lineHeight: 1.6 }}>
                We're currently in beta testing! Feel free to explore and test our service.
                <strong> All Stripe payments are in sandbox mode - no real charges will occur.</strong>
                If you need actual printing, please mention it in the notes section.
                Questions? Feel free to reach out!
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Features Section */}
      <div style={{ marginBottom: 80 }}>
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 16,
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          }}
        >
          Four Simple Steps
        </Title>
        <Paragraph
          style={{
            textAlign: "center",
            marginBottom: 40,
            fontSize: "1.1rem",
            color: token.colorTextSecondary,
          }}
        >
          Get your documents printed in minutes
        </Paragraph>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col key={index} xs={24} sm={12} lg={6}>
              <Card
                className={`${styles["feature-card"]} slide-up`}
                style={{
                  height: "100%",
                  borderRadius: 16,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                styles={{
                  body: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: 32,
                  },
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    backgroundColor: token.colorPrimaryBg,
                    marginBottom: 20,
                  }}
                >
                  {React.cloneElement(feature.icon, {
                    style: { fontSize: "32px", color: token.colorPrimary },
                  })}
                  {index < features.length - 1 && (
                    <RightCircleFilled
                      style={{
                        position: "absolute",
                        right: -32,
                        color: token.colorPrimary,
                        fontSize: 16,
                      }}
                    />
                  )}
                </div>
                <Title level={4} style={{ marginTop: 0, marginBottom: 12 }}>
                  {feature.title}
                </Title>
                <Paragraph
                  style={{
                    marginBottom: 0,
                    color: token.colorTextSecondary,
                  }}
                >
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Pricing Section */}
      <div
        ref={pricingRef}
        style={{
          marginBottom: 80,
          padding: "60px 0",
          background: token.colorBgLayout,
          borderRadius: 24,
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 16,
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          }}
        >
          Simple Pricing
        </Title>
        <Paragraph
          style={{
            textAlign: "center",
            marginBottom: 40,
            fontSize: "1.1rem",
            color: token.colorTextSecondary,
          }}
        >
          No hidden fees, pay only for what you print
        </Paragraph>
        <Row gutter={[24, 24]} style={{ maxWidth: 1200, margin: "0 auto" }}>
          {pricing.map((plan, index) => (
            <Col key={index} xs={24} md={12} lg={8}>
              {plan.isPopular ? (
                <Badge.Ribbon text="MOST POPULAR" color={token.colorPrimary}>
                  <PriceCard plan={plan} token={token} />
                </Badge.Ribbon>
              ) : (
                <PriceCard plan={plan} token={token} />
              )}
            </Col>
          ))}
        </Row>
      </div>

      {/* Service Area Section */}
      <div style={{ marginBottom: 80 }}>
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 16,
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          }}
        >
          Available Locations
        </Title>
        <Paragraph
          style={{
            textAlign: "center",
            marginBottom: 40,
            fontSize: "1.1rem",
            color: token.colorTextSecondary,
          }}
        >
          Find the nearest printing point
        </Paragraph>

        <Row gutter={[32, 32]} align="stretch">
          <Col xs={24} lg={12}>
            <Card
              className="fade-in"
              style={{
                height: "100%",
                borderRadius: 16,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
              styles={{
                body: {
                  height: "100%",
                  padding: 32,
                },
              }}
            >
              <Title
                level={4}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
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
                      borderLeft: `3px solid ${token.colorPrimary}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <EnvironmentOutlined
                        style={{ color: token.colorPrimary, marginRight: 8 }}
                      />
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
                  borderColor: token.colorPrimaryBorder,
                }}
              >
                <Paragraph style={{ margin: 0 }}>
                  More locations coming soon! Stay tuned for updates as we
                  expand our service area.
                </Paragraph>
              </Card>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              className="fade-in"
              style={{
                height: "100%",
                borderRadius: 16,
                overflow: "hidden",
              }}
              styles={{
                body: {
                  padding: 0,
                  height: "450px",
                },
              }}
            >
              <LoadScript googleMapsApiKey={googleApiKey}>
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
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
          borderRadius: 16,
          background: token.colorPrimary,
          border: "none",
        }}
        styles={{
          body: {
            padding: 32,
          },
        }}
      >
        <Row
          align="middle"
          justify="space-between"
          gutter={[24, 24]}
          style={{ color: "#fff" }}
        >
          <Col xs={24} md={16}>
            <Title level={3} style={{ color: "#fff", marginBottom: 8 }}>
              Ready to start printing?
            </Title>
            <Paragraph
              style={{ color: "rgba(255,255,255,0.85)", marginBottom: 0 }}
            >
              Use our printing service today and enjoy convenient,
              affordable printing services.
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Link href="/print">
              <Button
                size="large"
                style={{
                  background: "#fff",
                  borderColor: "#fff",
                  color: token.colorPrimary,
                }}
              >
                Get Started Now
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HomePage;
