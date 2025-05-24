"use client";
import {
    Typography,
    Row,
    Col,
    Card,
    Space,
    Button,
    Avatar,
    Timeline,
    Tag,
    Divider,
    theme,
} from "antd";
import {
    PrinterOutlined,
    HeartOutlined,
    CoffeeOutlined,
    LinkedinOutlined,
    MailOutlined,
    GithubOutlined,
    GlobalOutlined,
    RocketOutlined,
    SmileOutlined,
    ThunderboltOutlined,
    TeamOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";
import React from "react";

const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

const AboutPage = () => {
    const { token } = useToken();

    const timelineItems = [
        {
            dot: <SmileOutlined style={{ fontSize: 16, color: token.colorSuccess }} />,
            children: (
                <div>
                    <Text strong>Friend gave me a printer</Text>
                    <Paragraph style={{ margin: 0, color: token.colorTextSecondary }}>
                        Way too fancy for what I actually need...
                    </Paragraph>
                </div>
            ),
        },
        {
            dot: <PrinterOutlined style={{ fontSize: 16, color: token.colorPrimary }} />,
            children: (
                <div>
                    <Text strong>Felt like a waste</Text>
                    <Paragraph style={{ margin: 0, color: token.colorTextSecondary }}>
                        I just print documents occasionally, this thing is overkill
                    </Paragraph>
                </div>
            ),
        },
        {
            dot: <ThunderboltOutlined style={{ fontSize: 16, color: token.colorWarning }} />,
            children: (
                <div>
                    <Text strong>Had an idea</Text>
                    <Paragraph style={{ margin: 0, color: token.colorTextSecondary }}>
                        Why not share it with neighbors? Make some ink money too
                    </Paragraph>
                </div>
            ),
        },
        {
            dot: <RocketOutlined style={{ fontSize: 16, color: token.colorError }} />,
            children: (
                <div>
                    <Text strong>Built this website</Text>
                    <Paragraph style={{ margin: 0, color: token.colorTextSecondary }}>
                        Now everyone can print conveniently
                    </Paragraph>
                </div>
            ),
        },
    ];

    const contactMethods = [
        {
            icon: <MailOutlined style={{ color: token.colorPrimary }} />,
            label: "Email",
            value: "yuxuan.zeng.98@gmail.com",
            link: "mailto:yuxuan.zeng.98@gmail.com",
            description: "Best way to reach me if you have questions",
        },
        {
            icon: <LinkedinOutlined style={{ color: "#0077B5" }} />,
            label: "LinkedIn",
            value: "Professional Profile",
            link: "https://www.linkedin.com/in/yuxuan-zeng/",
            description: "My work background and experience",
        },
        {
            icon: <GithubOutlined style={{ color: token.colorTextBase }} />,
            label: "GitHub",
            value: "My Projects",
            link: "https://github.com/SNOWOVERSEER",
            description: "Check out other stuff I've built",
        },
    ];

    const funFacts = [
        { icon: "🖨️", text: "Supports tons of paper sizes" },
        { icon: "☕", text: "Runs on coffee and good vibes" },
        { icon: "🏠", text: "Serving South Wharf Drive" },
        { icon: "💡", text: "Making good use of resources" },
    ];

    return (
        <div
            style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "clamp(16px, 3vw, 40px) clamp(12px, 2vw, 24px)",
            }}
        >
            {/* Hero Section */}
            <Card
                style={{
                    marginBottom: 60,
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "none",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                    background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, #ffffff 100%)`,
                }}
                styles={{
                    body: {
                        padding: 60,
                        textAlign: "center",
                    },
                }}
            >
                <div style={{ marginBottom: 20 }}>
                    <PrinterOutlined style={{ fontSize: 80, color: token.colorPrimary }} />
                </div>
                <Title
                    style={{
                        fontSize: "clamp(2rem, 5vw, 3rem)",
                        marginBottom: 20,
                        background: `linear-gradient(135deg, ${token.colorPrimary}, ${token.colorPrimaryActive})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    About SharePrinter
                </Title>
                <Paragraph
                    style={{
                        fontSize: "1.2rem",
                        maxWidth: 600,
                        margin: "0 auto",
                        color: token.colorTextSecondary,
                        lineHeight: 1.6,
                    }}
                >
                    One overpowered printer + one sharing-minded developer = this website
                </Paragraph>
            </Card>

            <Row gutter={[32, 32]}>
                {/* Story Section */}
                <Col xs={24} lg={14}>
                    <Card
                        style={{
                            height: "100%",
                            borderRadius: 16,
                            border: `1px solid ${token.colorBorderSecondary}`,
                        }}
                        styles={{
                            body: {
                                padding: 40,
                            },
                        }}
                    >
                        <Title level={2} style={{ marginBottom: 24 }}>
                            <HeartOutlined style={{ color: token.colorError, marginRight: 8 }} />
                            The Story
                        </Title>

                        <Paragraph style={{ fontSize: "1.1rem", marginBottom: 32 }}>
                            So my friend gave me this really nice printer. It does everything - color, black and white,
                            double-sided, weird paper sizes, you name it. Problem is, I mostly just print documents
                            and the occasional boarding pass.
                        </Paragraph>

                        <Paragraph style={{ fontSize: "1.1rem", marginBottom: 32 }}>
                            Felt wasteful having such a capable machine just sitting there. Plus I noticed my neighbors
                            often need to print stuff but don't want to buy a whole printer just for that.
                        </Paragraph>

                        <Paragraph style={{ fontSize: "1.1rem", marginBottom: 32 }}>
                            So I thought, why not make a website where people can upload files, I print them out,
                            and drop them in the mailbox downstairs? Win-win - the printer gets used, neighbors
                            get their documents, and I make a bit of ink money.
                        </Paragraph>

                        <Title level={4} style={{ marginBottom: 20 }}>
                            How it happened
                        </Title>

                        <Timeline items={timelineItems} />

                        <Divider />

                        <div style={{ textAlign: "center" }}>
                            <Title level={4} style={{ marginBottom: 16 }}>
                                Fun Facts
                            </Title>
                            <Row gutter={[16, 16]}>
                                {funFacts.map((fact, index) => (
                                    <Col xs={24} sm={12} key={index}>
                                        <Card
                                            size="small"
                                            style={{
                                                borderRadius: 12,
                                                background: token.colorBgLayout,
                                                border: "none",
                                            }}
                                        >
                                            <Text>
                                                <span style={{ fontSize: "1.2rem", marginRight: 8 }}>
                                                    {fact.icon}
                                                </span>
                                                {fact.text}
                                            </Text>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Card>
                </Col>

                {/* Contact Section */}
                <Col xs={24} lg={10}>
                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        {/* Profile Card */}
                        <Card
                            style={{
                                borderRadius: 16,
                                textAlign: "center",
                                border: `1px solid ${token.colorBorderSecondary}`,
                                background: `linear-gradient(135deg, rgba(22, 119, 255, 0.02) 0%, rgba(255, 255, 255, 1) 100%)`,
                            }}
                            styles={{
                                body: {
                                    padding: 32,
                                },
                            }}
                        >
                            <Avatar
                                size={100}
                                style={{
                                    backgroundColor: token.colorPrimary,
                                    marginBottom: 16,
                                    fontSize: 40,
                                }}
                            >
                                K
                            </Avatar>
                            <Title level={3} style={{ marginBottom: 8 }}>
                                Ken (Yuxuan Zeng)
                            </Title>
                            <Text style={{ color: token.colorTextSecondary, fontSize: "1.1rem" }}>
                                Developer & Print Service Provider
                            </Text>
                            <Divider />
                            <Space wrap>
                                <Tag color="blue" icon={<TeamOutlined />}>
                                    Software Dev
                                </Tag>
                                <Tag color="green" icon={<CoffeeOutlined />}>
                                    Coffee Lover
                                </Tag>
                                <Tag color="purple" icon={<RocketOutlined />}>
                                    Maker
                                </Tag>
                            </Space>
                        </Card>

                        {/* Contact Methods */}
                        <Card
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${token.colorBorderSecondary}`,
                            }}
                            styles={{
                                body: {
                                    padding: 32,
                                },
                            }}
                        >
                            <Title level={3} style={{ marginBottom: 24 }}>
                                <GlobalOutlined style={{ marginRight: 8, color: token.colorPrimary }} />
                                Get in Touch
                            </Title>

                            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                                {contactMethods.map((method, index) => (
                                    <Card
                                        key={index}
                                        size="small"
                                        hoverable
                                        style={{
                                            borderRadius: 12,
                                            transition: "all 0.3s ease",
                                        }}
                                        styles={{
                                            body: {
                                                padding: 16,
                                            },
                                        }}
                                        onClick={() => window.open(method.link, "_blank")}
                                    >
                                        <Space>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 8,
                                                    backgroundColor: token.colorBgLayout,
                                                }}
                                            >
                                                {method.icon}
                                            </div>
                                            <div>
                                                <Text strong>{method.label}</Text>
                                                <br />
                                                <Text style={{ color: token.colorTextSecondary, fontSize: "0.9rem" }}>
                                                    {method.description}
                                                </Text>
                                            </div>
                                        </Space>
                                    </Card>
                                ))}
                            </Space>
                        </Card>

                        {/* Location Card */}
                        <Card
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${token.colorBorderSecondary}`,
                                background: `linear-gradient(135deg, rgba(82, 196, 26, 0.02) 0%, rgba(255, 255, 255, 1) 100%)`,
                            }}
                            styles={{
                                body: {
                                    padding: 32,
                                },
                            }}
                        >
                            <Title level={4} style={{ marginBottom: 16 }}>
                                <EnvironmentOutlined style={{ marginRight: 8, color: token.colorSuccess }} />
                                Service Area
                            </Title>
                            <Paragraph style={{ marginBottom: 16 }}>
                                Currently serving residents at South Wharf Drive, Melbourne.
                                Printed documents go straight to your mailbox downstairs.
                            </Paragraph>
                            <Text style={{ color: token.colorTextSecondary }}>
                                Might expand to other locations if this goes well 😊
                            </Text>
                        </Card>
                    </Space>
                </Col>
            </Row>

            {/* Call to Action */}
            <Card
                style={{
                    marginTop: 60,
                    borderRadius: 20,
                    textAlign: "center",
                    background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorBgContainer} 100%)`,
                    border: `1px solid ${token.colorPrimaryBorder}`,
                }}
                styles={{
                    body: {
                        padding: 48,
                    },
                }}
            >
                <Title level={2} style={{ color: token.colorPrimary, marginBottom: 16 }}>
                    Need something printed?
                </Title>
                <Paragraph style={{ fontSize: "1.1rem", marginBottom: 24, maxWidth: 600, margin: "0 auto 24px" }}>
                    Feel free to reach out if you have questions, or just start printing if you need something!
                </Paragraph>
                <Space size="middle">
                    <Button type="primary" size="large" href="/print" icon={<PrinterOutlined />}>
                        Start Printing
                    </Button>
                    <Button size="large" href="mailto:yuxuan.zeng.98@gmail.com" icon={<MailOutlined />}>
                        Contact Me
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default AboutPage;