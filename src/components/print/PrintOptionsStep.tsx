import { Typography, Card, Row, Col, Space, Form, Radio, Select, InputNumber, Button, theme, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { FormInstance } from "antd/es/form";
import { useState, useEffect } from "react";
const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

interface PrintOptionsStepProps {
    fileList: UploadFile[];
    initialValues: PrintOptions;
    form: FormInstance;
    onPrevious: () => void;
    onNext: () => void;
    filePages: number;
    setCheckoutPrice: (price: number) => void;
    checkoutPrice: number;
}

interface PrintOptions {
    colorMode: string;
    sides: string;
    paperSize: string;
    orientation: string;
    pagesPerSide: number;
    copies: number;
}

const PrintOptionsStep = ({ fileList, form, onPrevious, onNext, filePages, initialValues, setCheckoutPrice, checkoutPrice }: PrintOptionsStepProps) => {
    const { token } = useToken();
    const [bwPrice, setBwPrice] = useState(0.2);
    const [colorPrice, setColorPrice] = useState(0.7);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(priceCalculator(initialValues.colorMode, initialValues.sides, initialValues.paperSize, initialValues.copies, filePages).totalPrice);
    }, [initialValues]);

    const priceCalculator = (colorMode: string, sides: string, paperSize: string, pages: number, copies: number): { pagePrice: number, totalPrice: number, bwPagePrice: number, colorPagePrice: number } => {
        const prices: Record<string, Record<string, Record<string, number>>> = {
            A4: {
                bw: { single: 0.2, double: 0.12 },
                color: { single: 0.7, double: 0.4 }
            },
            A3: {
                bw: { single: 1.0, double: 0.6 },
                color: { single: 2.0, double: 1.0 }
            }
        };

        if (!prices[paperSize] || !prices[paperSize][colorMode] || !prices[paperSize][colorMode][sides]) {
            throw new Error("Invalid parameters");
        }

        return {
            pagePrice: prices[paperSize][colorMode][sides],
            bwPagePrice: prices[paperSize]['bw'][sides],
            colorPagePrice: prices[paperSize]['color'][sides],
            totalPrice: Math.round(pages * copies * prices[paperSize][colorMode][sides] * 100) / 100
        };
    };

    const handleFormChange = (changedValues: any, allValues: any) => {
        try {
            const { pagePrice, totalPrice, bwPagePrice, colorPagePrice } = priceCalculator(allValues.colorMode, allValues.sides, allValues.paperSize, filePages, allValues.copies);
            setBwPrice(bwPagePrice);
            setColorPrice(colorPagePrice);
            setTotalPrice(totalPrice);
        } catch (error) {
            message.error(`Invalid parameters: ${error}`);
        }
    };


    return (
        <div className="fade-in">
            <Title level={4} style={{ textAlign: "center", marginBottom: 20 }}>
                Select Print Options
            </Title>

            <Paragraph style={{ textAlign: "center", marginBottom: 30 }}>
                Customize how your document will be printed
            </Paragraph>

            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <Card
                    style={{
                        marginBottom: 30,
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                    }}
                    styles={{ body: { padding: 24 } }}
                >
                    <Row gutter={[16, 16]} align="middle">
                        <Col span={12}>
                            <Space align="start">
                                <FileTextOutlined style={{ fontSize: 24, color: token.colorPrimary }} />
                                <div>
                                    <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 4 }}>
                                        {fileList[0]?.name || 'Document'}
                                    </Text>
                                    <Paragraph>
                                        pages: {filePages}
                                    </Paragraph>
                                    <Text type="secondary">
                                        {(fileList[0]?.size && (fileList[0].size / 1024 / 1024).toFixed(2)) || '?'} MB
                                    </Text>
                                </div>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space style={{ float: 'right' }}>
                                <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 4 }}>
                                    Total Price: ${totalPrice}
                                </Text>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                <Form form={form} layout="vertical" onValuesChange={handleFormChange} initialValues={initialValues}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="colorMode" label="Color Mode" rules={[{ required: true, message: 'Please select a color mode' }]}>
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value="bw">
                                            <Space>
                                                <Text>Black & White</Text>
                                                <Text type="secondary">${bwPrice}</Text>
                                            </Space>
                                        </Radio>
                                        <Radio value="color">
                                            <Space>
                                                <Text>Color</Text>
                                                <Text type="secondary">${colorPrice}</Text>
                                            </Space>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="sides" label="Sides" rules={[{ required: true, message: 'Please select sides' }]}>
                                <Radio.Group>
                                    <Radio value="single">Single</Radio>
                                    <Radio value="double">Double</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="paperSize" label="Paper Size" rules={[{ required: true, message: 'Please select a paper size' }]}>
                                <Select>
                                    <Select.Option value="A4">A4 (210 x 297 mm)</Select.Option>
                                    <Select.Option value="A3" disabled>A3 (297 x 420 mm)</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="orientation" label="Orientation" rules={[{ required: true, message: 'Please select an orientation' }]}>
                                <Radio.Group>
                                    <Radio value="portrait">Portrait</Radio>
                                    <Radio value="landscape">Landscape</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="pagesPerSide" label="Pages Per Side" rules={[{ required: true, message: 'Please select pages per sheet' }]}>
                                <Select>
                                    <Select.Option value={1}>1 Page per Side</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="copies" label="Number of Copies" rules={[{ required: true, message: 'Please enter the number of copies' }]}>
                                <InputNumber min={1} max={10} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Row justify="space-between">
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
                <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                        setCheckoutPrice(totalPrice);
                        onNext();
                    }}
                    style={{
                        height: "50px",
                        padding: "0 30px",
                        fontSize: "16px",
                        borderRadius: "8px",
                    }}
                >
                    Next: Confirm Task
                </Button>
            </Row>
        </div >


    );
};

export default PrintOptionsStep;

