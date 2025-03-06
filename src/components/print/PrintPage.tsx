import { useState } from "react";
import {
    Typography,
    Upload,
    Button,
    Card,
    Steps,
    theme,
    Row,
    Col,
    message,
    Space,
    Radio,
    Select,
    InputNumber,
    Form
} from "antd";
import {
    InboxOutlined,
    FileTextOutlined,
    SettingOutlined,
    SaveOutlined,
    HomeOutlined,
    CreditCardOutlined,
    UserOutlined,
    LoginOutlined
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;
const { useToken } = theme;



const PrintPage = () => {
    const { token } = useToken();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [form] = Form.useForm();

    const defaultPrintOptions = {
        copies: 1,
        colorMode: 'bw',
        sides: 'two-sided',
        paperSize: 'a4',
        orientation: 'portrait',
        pagesPerSheet: 1
    };




    // Handle file upload
    const handleUpload = (info: any) => {
        const { status } = info.file;

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed`);
        }

        // Only keep the latest file (single file upload)
        const latestFile = info.fileList.slice(-1);
        setFileList(latestFile);
    };

    // Upload component properties
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        fileList: fileList,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', // 模拟上传地址
        onChange: handleUpload,
        onDrop(e) {
            console.log('Dropped file', e.dataTransfer.files);
        },
        accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif',
        progress: {
            strokeColor: {
                '0%': token.colorPrimary,
                '100%': token.colorSuccess,
            },
            strokeWidth: 3,
        },
    };

    // Step configuration
    const steps = [
        {
            title: 'Upload File',
            icon: <FileTextOutlined />,
        },
        {
            title: 'Select Options',
            icon: <SettingOutlined />,
        },
        {
            title: 'Confirm Task',
            icon: <SaveOutlined />,
        },
        {
            title: 'Delivery Information',
            icon: <HomeOutlined />,
        },
        {
            title: 'Make Payment',
            icon: <CreditCardOutlined />,
        },
    ];

    // Next button handler
    const handleNext = () => {
        if (currentStep === 0) {
            if (fileList.length === 0) {
                message.warning('Please upload a file');
                return;
            }

            // Initialize form with default values
            form.setFieldsValue(defaultPrintOptions);
            setCurrentStep(1);
        } else if (currentStep === 1) {
            form.validateFields()
                .then(values => {
                    console.log('Print options:', values);
                    setCurrentStep(2);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        }
    };
    // Previous button handler
    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(0, prev - 1));
    };

    return (

        <div style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "40px 20px",
        }}>
            <style jsx global>{`
          .fade-in {
            opacity: 0;
            animation: fadeIn 0.8s ease-out forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .upload-list-item {
            transition: all 0.3s ease;
          }
          
          .upload-list-item:hover {
            background-color: ${token.colorBgTextHover};
          }
          
          .login-card {
            transition: all 0.3s ease;
          }
          
          .login-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          }
        `}</style>

            <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
                Create Print Task
            </Title>


            {/* Guest Login Card */}
            {!isLoggedIn && (
                <Card
                    className="login-card fade-in"
                    style={{
                        borderRadius: 16,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        marginBottom: 30,
                        borderLeft: `4px solid ${token.colorPrimary}`,
                        background: `linear-gradient(to right, ${token.colorPrimaryBg}, white)`
                    }}
                    styles={{ body: { padding: "20px 24px" } }}
                >
                    <Row align="middle" justify="space-between" gutter={[16, 16]}>
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
                            <Space>

                                <Link href="/login">
                                    <Button
                                        type="primary"
                                        icon={<LoginOutlined />}
                                        size="large"
                                    >
                                        Login/Register
                                    </Button>
                                </Link>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            )}



            <Card
                style={{
                    borderRadius: 16,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    marginBottom: 40
                }}
            >
                <Steps
                    current={currentStep}
                    items={steps}
                    style={{ marginBottom: 40 }}
                />

                {currentStep === 0 && (
                    <div className="fade-in">
                        <Title level={4} style={{ textAlign: "center", marginBottom: 20 }}>
                            Upload the file you want to print
                        </Title>

                        <Paragraph style={{ textAlign: "center", marginBottom: 30 }}>
                            Supports PDF, Word, Excel, PowerPoint, and common image formats
                        </Paragraph>

                        <Dragger {...uploadProps} style={{ marginBottom: 30 }}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined style={{ color: token.colorPrimary, fontSize: 60 }} />
                            </p>
                            <p className="ant-upload-text" style={{ fontSize: 16, fontWeight: 500 }}>
                                Click or drag file here to upload
                            </p>
                            <p className="ant-upload-hint">
                                Single file upload, maximum size 20MB
                            </p>
                        </Dragger>

                        <Row justify="center" style={{ marginTop: 40 }}>
                            <Col>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleNext}
                                    disabled={fileList.length === 0}
                                    style={{
                                        height: "50px",
                                        padding: "0 30px",
                                        fontSize: "16px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    Next: Select Print Options
                                </Button>
                            </Col>
                        </Row>
                    </div>
                )}

                {currentStep === 1 && (
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
                                bodyStyle={{ padding: 24 }}
                            >
                                <Row gutter={[16, 16]} align="middle">
                                    <Col xs={24} md={6}>
                                        <Space align="start">
                                            <FileTextOutlined style={{ fontSize: 24, color: token.colorPrimary }} />
                                            <div>
                                                <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 4 }}>
                                                    {fileList[0]?.name || 'Document'}
                                                </Text>
                                                <Text type="secondary">
                                                    {(fileList[0]?.size && (fileList[0].size / 1024 / 1024).toFixed(2)) || '?'} MB
                                                </Text>
                                            </div>
                                        </Space>
                                    </Col>
                                </Row>
                            </Card>
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={defaultPrintOptions}
                                style={{ marginBottom: 30 }}
                            >
                                <Row gutter={[24, 24]}>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="colorMode"
                                            label="Color Mode"
                                            rules={[{ required: true, message: 'Please select color mode' }]}
                                        >
                                            <Radio.Group>
                                                <Space direction="vertical">
                                                    <Radio value="bw">
                                                        <Space>
                                                            <Text>Black & White</Text>
                                                            <Text type="secondary">$0.10/page</Text>
                                                        </Space>
                                                    </Radio>
                                                    <Radio value="color">
                                                        <Space>
                                                            <Text>Color</Text>
                                                            <Text type="secondary">$0.50/page</Text>
                                                        </Space>
                                                    </Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="sides"
                                            label="Sides"
                                            rules={[{ required: true, message: 'Please select sides' }]}
                                        >
                                            <Radio.Group>
                                                <Space direction="vertical">
                                                    <Radio value="one-sided">One-sided</Radio>
                                                    <Radio value="two-sided">Two-sided (Duplex)</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="paperSize"
                                            label="Paper Size"
                                            rules={[{ required: true, message: 'Please select paper size' }]}
                                        >
                                            <Select>
                                                <Select.Option value="a4">A4 (210 × 297 mm)</Select.Option>
                                                <Select.Option value="a3">A3 (297 × 420 mm)</Select.Option>
                                                <Select.Option value="letter">Letter (8.5 × 11 in)</Select.Option>
                                                <Select.Option value="legal">Legal (8.5 × 14 in)</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="orientation"
                                            label="Orientation"
                                            rules={[{ required: true, message: 'Please select orientation' }]}
                                        >
                                            <Radio.Group>
                                                <Space>
                                                    <Radio value="portrait">Portrait</Radio>
                                                    <Radio value="landscape">Landscape</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="pagesPerSheet"
                                            label="Pages Per Sheet"
                                            rules={[{ required: true, message: 'Please select pages per sheet' }]}
                                        >
                                            <Select>
                                                <Select.Option value={1}>1 page per sheet</Select.Option>
                                                <Select.Option value={2}>2 pages per sheet</Select.Option>
                                                <Select.Option value={4}>4 pages per sheet</Select.Option>
                                                <Select.Option value={6}>6 pages per sheet</Select.Option>
                                                <Select.Option value={9}>9 pages per sheet</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="copies"
                                            label="Copies"
                                            rules={[{ required: true, message: 'Please enter number of copies' }]}
                                        >
                                            <InputNumber min={1} max={100} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <Row justify="space-between" style={{ marginTop: 40 }}>
                            <Col>
                                <Button
                                    size="large"
                                    onClick={handlePrevious}
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
                                    onClick={handleNext}
                                    style={{
                                        height: "50px",
                                        padding: "0 30px",
                                        fontSize: "16px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    Next: Confirm Task
                                </Button>
                            </Col>
                        </Row>
                    </div>
                )}
            </Card >
        </div >

    );
};

export default PrintPage;