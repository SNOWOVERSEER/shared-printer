import { Card, Space, Typography, Button, theme } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./HomePage.module.css";

const { Title, Text, Paragraph } = Typography;

interface PriceCardProps {
  plan: {
    title: string;
    subtitle: string;
    price: string;
    type: string;
    features: string[];
    isPopular: boolean;
    isDisabled: boolean;
  };
  token: any;
}

export const PriceCard = ({ plan, token }: PriceCardProps) => {
  return (
    <Card
      className={`${styles["price-card"]} ${plan.title === "Color Printing" ? styles["rainbow-border"] : ""
        }`}
      hoverable
      title={
        <Space direction="vertical" size={4} style={{ width: "100%" }}>
          <Title
            level={3}
            style={{
              margin: 0,
            }}
          >
            {plan.title}
          </Title>
          <Text type="secondary">{plan.subtitle}</Text>
        </Space>
      }
      style={{
        height: "100%",
        borderRadius: 16,
        background: "white",
        position: "relative",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
      }}
      styles={{
        body: { padding: 32 },
        header: {
          textAlign: "center",
          borderBottom: "none",
          padding: "24px 32px 0",
        },
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Text type="secondary">{plan.type}</Text>
        <Title style={{ margin: "16px 0" }}>
          <Text style={{ fontSize: "0.25em" }}>From </Text>
          <Text style={{ fontSize: "0.5em", verticalAlign: "top" }}>AUD </Text>
          {plan.price}
          <Text type="secondary" style={{ fontSize: "0.4em" }}>
            /page
          </Text>
        </Title>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
        {plan.features.map((feature, i) => (
          <li
            key={i}
            style={{
              padding: "8px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlined
              style={{ color: token.colorPrimary, marginRight: 8 }}
            />
            {feature}
          </li>
        ))}
      </ul>

      {plan.isDisabled ? (
        <Button block size="large" disabled style={{ borderRadius: 8 }}>
          Currently Unavailable
        </Button>
      ) : (
        <Link href="/print">
          <Button type="primary" block size="large" style={{ borderRadius: 8 }}>
            Select
          </Button>
        </Link>
      )}
    </Card>
  );
};
