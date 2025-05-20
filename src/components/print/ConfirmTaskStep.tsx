import { useState, useEffect } from "react";
import {
    Typography,
    Card,
    Row,
    Col,
    Space,
    Button,
    Divider,
    List,
    Tag,
    theme,
    Descriptions,
    Alert
} from "antd";
import {
    FileTextOutlined,
    CheckCircleOutlined,
    EditOutlined,
    PrinterOutlined,
    HomeOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

interface ConfirmTaskStepProps {
    fileList: UploadFile[];
    printOptions: any;
    deliveryInfo: any;
    filePages: number;
    checkoutPrice: number;
    onPrevious: () => void;
    onNext: () => void;
}

const ConfirmTaskStep = ({
    fileList,
    printOptions,
    deliveryInfo,
    filePages,
    checkoutPrice,
    onPrevious,
    onNext,
}: ConfirmTaskStepProps) => {
    const { token } = useToken();
    const [isConfirming, setIsConfirming] = useState(false);

    // Format options for display
    const getColorModeDisplay = () => {
        return printOptions.colorMode === 'bw' ? 'Black & White' : 'Color';
    };

    const getSidesDisplay = () => {
        return printOptions.sides === 'single' ? 'Single-sided' : 'Double-sided';
    };

    const getPaperSizeDisplay = () => {
        const sizes: { [key: string]: string } = {
            'A4': 'A4 (210 x 297 mm)',
            'A3': 'A3 (297 x 420 mm)'
        };
        return sizes[printOptions.paperSize] || printOptions.paperSize;
    };

    const getOrientationDisplay = () => {
        return printOptions.orientation === 'portrait' ? 'Portrait' : 'Landscape';
    };


    // Handle confirm button click
    const handleConfirm = () => {
        setIsConfirming(true);
        onNext();
        setIsConfirming(false);
    };

    return (
        <div className="fade-in">
            <Title level={4} style={{ textAlign: "center", marginBottom: 20 }}>
                Confirm Your Print Task
            </Title>

            <Paragraph style={{ textAlign: "center", marginBottom: 30 }}>
                Please review your print task details before proceeding
            </Paragraph>

            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                {/* Document Summary Card */}
                <Card
                    title={
                        <Space>
                            <FileTextOutlined style={{ color: token.colorPrimary }} />
                            <span>Document Details</span>
                        </Space>
                    }
                    style={{
                        marginBottom: 24,
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                    }}
                    extra={
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={onPrevious}
                        >
                            Edit
                        </Button>
                    }
                >
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Space align="start" style={{ marginBottom: 16 }}>
                                <FileTextOutlined style={{ fontSize: 24, color: token.colorPrimary }} />
                                <div>
                                    <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 4 }}>
                                        {fileList[0]?.name || 'Document'}
                                    </Text>
                                    <Text type="secondary">
                                        {(fileList[0]?.size && (fileList[0].size / 1024 / 1024).toFixed(2)) || '?'} MB • {filePages} pages
                                    </Text>
                                </div>
                            </Space>
                        </Col>

                        <Divider style={{ margin: '12px 0' }} />

                        <Col span={24}>
                            <Descriptions title="Print Options" column={{ xs: 1, sm: 2 }} layout="vertical">
                                <Descriptions.Item label="Color Mode">
                                    <Tag color={printOptions.colorMode === 'bw' ? 'default' : 'blue'}>
                                        {getColorModeDisplay()}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Sides">
                                    <Tag color="default">{getSidesDisplay()}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Paper Size">
                                    <Tag color="default">{getPaperSizeDisplay()}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Orientation">
                                    <Tag color="default">{getOrientationDisplay()}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Pages Per Side">
                                    <Tag color="default">{printOptions.pagesPerSide} page(s)</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Copies">
                                    <Tag color="default">{printOptions.copies} copy/copies</Tag>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>

                    <Divider style={{ margin: '24px 0' }} />

                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Descriptions
                                title="Delivery Information"
                                column={1}
                                bordered
                                size="small"
                            >
                                <Descriptions.Item label="Name">
                                    <Space>
                                        <UserOutlined />
                                        <Text>{deliveryInfo.name}</Text>
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Email">
                                    <Space>
                                        <MailOutlined />
                                        <Text>{deliveryInfo.email}</Text>
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Phone">
                                    <Space>
                                        <PhoneOutlined />
                                        <Text>{deliveryInfo.phone}</Text>
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Delivery Method">
                                    <Tag color={deliveryInfo.deliveryMethod === 'mailbox' ? 'green' : 'orange'}>
                                        {deliveryInfo.deliveryMethod}
                                    </Tag>
                                </Descriptions.Item>

                                <Descriptions.Item label="Building">
                                    <Space>
                                        <HomeOutlined />
                                        <Text>{deliveryInfo.building} South Wharf Dr</Text>
                                    </Space>
                                </Descriptions.Item>
                                {deliveryInfo.mailboxNumber && (
                                    <Descriptions.Item label="Mailbox Number">
                                        <Text>{deliveryInfo.mailboxNumber}</Text>
                                    </Descriptions.Item>
                                )}
                                {deliveryInfo.notes && (
                                    <Descriptions.Item label="Notes">
                                        <Text>{deliveryInfo.notes}</Text>
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                        </Col>




                    </Row>
                </Card>

                {/* Price Summary Card */}
                <Card
                    title={
                        <Space>
                            <PrinterOutlined style={{ color: token.colorPrimary }} />
                            <span>Price Summary</span>
                        </Space>
                    }
                    style={{
                        marginBottom: 24,
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                    }}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={[
                            {
                                title: 'Document',
                                description: `${fileList[0]?.name || 'Document'} (${filePages} pages)`,
                                price: checkoutPrice
                            }
                        ]}
                        renderItem={item => (
                            <List.Item
                                extra={
                                    <Text strong>${item.price.toFixed(2)}</Text>
                                }
                            >
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />

                    <Divider style={{ margin: '12px 0' }} />

                    <Row justify="space-between" align="middle">
                        <Col>
                            <Text strong style={{ fontSize: 16 }}>Total</Text>
                        </Col>
                        <Col>
                            <Text strong style={{ fontSize: 20, color: token.colorPrimary }}>
                                ${checkoutPrice.toFixed(2)}
                            </Text>
                        </Col>
                    </Row>
                </Card>

                <Row>
                    <Col span={24}>
                        <Alert
                            message="Please review your print task details before proceeding, you can not go back to the previous step once you place the order"
                            type="info"
                            showIcon
                            icon={<InfoCircleOutlined />}
                            style={{ marginBottom: 16, borderRadius: 8 }}
                        />
                    </Col>
                </Row>



                {/* Action Buttons */}
                <Row justify="space-between" style={{ marginTop: 16 }}>
                    <Col>
                        <Button
                            size="large"
                            onClick={onPrevious}
                            style={{
                                height: "50px",
                                padding: "0 30px",
                                fontSize: "16px",
                                borderRadius: "8px",
                            }}
                        >
                            Previous
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleConfirm}
                            loading={isConfirming}
                            icon={<CheckCircleOutlined />}
                            style={{
                                height: "50px",
                                padding: "0 30px",
                                fontSize: "16px",
                                borderRadius: "8px",
                            }}
                        >
                            Place Order and Make Payment
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ConfirmTaskStep;