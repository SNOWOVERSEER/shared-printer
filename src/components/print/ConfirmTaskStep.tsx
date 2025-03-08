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
    Descriptions
} from "antd";
import {
    FileTextOutlined,
    CheckCircleOutlined,
    EditOutlined,
    PrinterOutlined
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

interface ConfirmTaskStepProps {
    fileList: UploadFile[];
    printOptions: any;
    filePages: number;
    checkoutPrice: number;
    onPrevious: () => void;
    onNext: () => void;
}

const ConfirmTaskStep = ({
    fileList,
    printOptions,
    filePages,
    checkoutPrice,
    onPrevious,
    onNext
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

        // Simulate API call to create print task
        setTimeout(() => {
            setIsConfirming(false);
            onNext();
        }, 1000);
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

                {/* Action Buttons */}
                <Row justify="space-between" style={{ marginTop: 40 }}>
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
                            Confirm and Continue
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ConfirmTaskStep;