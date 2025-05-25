import { useState, useEffect } from "react";
import {
    Typography,
    Card,
    Row,
    Col,
    Form,
    Radio,
    Input,
    Button,
    Space,
    Divider,
    Alert,
    theme,
    Select
} from "antd";
import {
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
    CommentOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    InfoCircleOutlined,
    BuildOutlined
} from "@ant-design/icons";
import { FormInstance } from "antd/es/form";
import useUserStore from "@/store/userStore";
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { useToken } = theme;

interface DeliveryInfoStepProps {
    form: FormInstance;
    onPrevious: () => void;
    onNext: () => void;
    isLoggedIn: boolean;
}

const DeliveryInfoStep = ({
    form,
    onPrevious,
    onNext,
    isLoggedIn
}: DeliveryInfoStepProps) => {
    const { token } = useToken();
    const { userProfile, fetchUserProfile } = useUserStore();
    const [deliveryMethod, setDeliveryMethod] = useState('pickup');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserProfile();
        }
    }, [isLoggedIn, fetchUserProfile]);

    useEffect(() => {
        if (userProfile) {
            form.setFieldsValue({
                name: userProfile.full_name,
                phone: userProfile.phone,
                email: userProfile.email,
                building: userProfile.building,
                mailboxNumber: userProfile.mailbox_number,
                deliveryMethod: 'pickup'
            });
        }
    }, [userProfile, form]);

    // Handle delivery method change
    const handleDeliveryMethodChange = (e: any) => {
        setDeliveryMethod(e.target.value);

        // Reset form fields based on delivery method
        if (e.target.value === 'pickup') {
            form.setFieldsValue({
                address: undefined,
                email: form.getFieldValue('email') // Keep email if already entered
            });
        } else if (e.target.value === 'email') {
            form.setFieldsValue({
                address: undefined
            });
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                setTimeout(() => {
                    onNext();
                }, 1000);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <div className="fade-in">
            <Title level={4} style={{ textAlign: "center", marginBottom: 20 }}>
                Delivery Information
            </Title>

            <Paragraph style={{ textAlign: "center", marginBottom: 30 }}>
                Please provide your delivery details
            </Paragraph>

            <div style={{ maxWidth: 800, margin: "0 auto" }}>

                <Card
                    style={{
                        marginBottom: 24,
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ deliveryMethod: 'pickup', building: '81' }}
                    >
                        <Form.Item
                            name="deliveryMethod"
                            label="Delivery Method"
                            rules={[{ required: true, message: 'Please select a delivery method' }]}
                        >
                            <Radio.Group onChange={handleDeliveryMethodChange}>
                                <Space direction="horizontal" style={{ width: '100%' }}>

                                    <Radio value="pickup" style={{ padding: '12px', width: '100%', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                                        <Space>
                                            <EnvironmentOutlined style={{ color: token.colorPrimary }} />
                                            <div>
                                                <Text strong>Lobby Pickup</Text>
                                                <div>
                                                    <Text type="secondary">Meet at lobby when your order is ready</Text>
                                                </div>
                                            </div>
                                        </Space>
                                    </Radio>


                                    <Radio value="mailbox" style={{ padding: '12px', width: '100%', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                                        <Space>
                                            <HomeOutlined style={{ color: token.colorPrimary }} />
                                            <div>
                                                <Text strong>Mailbox Delivery</Text>
                                                <div>
                                                    <Text type="secondary">Deliver to your mailbox when your order is ready</Text>
                                                </div>
                                            </div>
                                        </Space>
                                    </Radio>

                                </Space>
                            </Radio.Group>
                        </Form.Item>


                        <Divider style={{ margin: '24px 0' }} />

                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <Form.Item
                                    name="building"
                                    label="Building"
                                    rules={[{ required: true, message: 'Please select your building' }]}
                                >
                                    <Select placeholder="Select your building">
                                        <Select.Option value="81">81 South Wharf Drive</Select.Option>
                                        <Select.Option value="103">103 South Wharf Drive</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        {deliveryMethod === 'mailbox' && (
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="mailboxNumber"
                                    label="Mailbox Number"
                                    rules={[{ required: deliveryMethod === 'mailbox', message: 'Please enter your mailbox number' }]}
                                >
                                    <Input
                                        prefix={<BuildOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter your mailbox number"
                                    />
                                </Form.Item>
                            </Col>
                        )}

                        <Divider style={{ margin: '16px 0' }} />

                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="name"
                                    label="Nickname"
                                    rules={[{ required: true, message: 'Please enter your nickname' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter your nickname"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                                >
                                    <Input
                                        prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter your phone number"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24}>
                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    rules={[
                                        { required: true, message: 'Please enter your email address' },
                                        { type: 'email', message: 'Please enter a valid email address' }
                                    ]}
                                >
                                    <Input
                                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Enter your email address"
                                    />
                                </Form.Item>
                            </Col>



                            <Col xs={24}>
                                <Form.Item
                                    name="notes"
                                    label="Special Instructions (Optional)"
                                >
                                    <TextArea

                                        placeholder="Any special instructions for delivery or pickup"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Alert
                            message={`Delivery Information (${deliveryMethod === 'pickup' ? 'Pickup' : 'Mailbox'})`}
                            description={
                                <Space direction="vertical">

                                    {deliveryMethod === 'pickup' && (
                                        <>
                                            <Text>Location: 103 & 81 South Wharf Drive, Main Lobby</Text>
                                            <Text>Hours: Monday-Friday, 9:00 AM - 6:00 PM</Text>
                                            <Text>You will receive a text message when your order is ready for pickup.</Text>
                                            <Text>Please provide your nickname for verification.</Text>
                                        </>
                                    )}

                                    {deliveryMethod === 'mailbox' && (
                                        <>
                                            <Text>Hours: 9:00 AM - 11:00 PM</Text>
                                            <Text>You will receive a text message when your order is delivered.</Text>
                                        </>
                                    )}
                                </Space>
                            }
                            type="info"
                            showIcon
                            icon={<ClockCircleOutlined />}
                            style={{ marginTop: 16, marginBottom: 16, borderRadius: 8 }}
                        />
                    </Form>
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
                            onClick={handleSubmit}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            style={{
                                height: "50px",
                                padding: "0 30px",
                                fontSize: "16px",
                                borderRadius: "8px",
                            }}
                        >
                            Next: Continue to Confirm Task
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DeliveryInfoStep;