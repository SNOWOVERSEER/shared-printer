import { Card, Row, Col, Space, Typography, Button, theme } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./PrintPage.module.css";
const { Text, Paragraph } = Typography;
const { useToken } = theme;


const GuestLoginPrompt = () => {
    const { token } = useToken();

    return (
        <Card
            className={styles["login-card"] + " fade-in"}
            style={{
                borderRadius: 16,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                marginBottom: 30,
                borderLeft: `4px solid ${token.colorPrimary}`,
                background: `linear-gradient(to right, ${token.colorPrimaryBg}, white)`
            }}
            styles={{
                body: {
                    padding: "20px 24px"
                }
            }}
        >
            <Row align="middle" gutter={[16, 16]}>
                <Col xs={24} md={16}>
                    <Space direction="vertical" size={8}>
                        <Text strong style={{ fontSize: 16 }}>
                            <UserOutlined style={{ marginRight: 8, color: token.colorPrimary }} />
                            You are currently operating as a guest
                        </Text>
                        <Paragraph style={{ margin: 0 }}>
                            Login to save your delivery information, view order history, and enjoy a more convenient order tracking experience.
                        </Paragraph>
                    </Space>
                </Col>
                <Col xs={24} md={8} style={{ textAlign: "right" }}>
                    <Link href="/login">
                        <Button
                            type="primary"
                            icon={<LoginOutlined />}
                            size="large"
                        >
                            Login/Register
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Card>
    );
};

export default GuestLoginPrompt;