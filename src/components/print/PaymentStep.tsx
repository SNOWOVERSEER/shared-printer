import { useState } from "react";
import {
    Typography,
    Card,
    Row,
    Col,
    Radio,
    Button,
    Space,
    Divider,
    Alert,
    Result,
    theme
} from "antd";
import {
    CreditCardOutlined,
    WalletOutlined,
    LockOutlined,
    CheckCircleOutlined,
    DollarOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import Link from "next/link";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../payment/StripePaymentForm';
import styles from './PrintPage.module.css';

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key');

const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

interface PaymentStepProps {
    fileList: UploadFile[];
    printOptions: any;
    deliveryInfo: any;
    checkoutPrice: number;
    onPrevious: () => void;
    onComplete: () => void;
}

const PaymentStep = ({
    fileList,
    printOptions,
    deliveryInfo,
    checkoutPrice,
    onPrevious,
    onComplete
}: PaymentStepProps) => {
    const { token } = useToken();
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [paymentError, setPaymentError] = useState<string | null>(null);

    // Handle payment method change
    const handlePaymentMethodChange = (e: any) => {
        setPaymentMethod(e.target.value);
        setPaymentError(null);
    };

    // Handle WeChat/Alipay payment
    const handleQRPayment = () => {
        setIsProcessing(true);
        setPaymentError(null);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsCompleted(true);
            setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
        }, 2000);
    };

    // Handle successful Stripe payment
    const handleStripeSuccess = (paymentId: string) => {
        console.log('Payment successful:', paymentId);
        setIsCompleted(true);
        setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    };

    // Handle Stripe payment error
    const handleStripeError = (error: string) => {
        console.error('Payment error:', error);
        setPaymentError(error);
    };

    // Generate QR code for WeChat/Alipay payment
    const renderQRCode = () => {
        return (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                    style={{
                        width: 200,
                        height: 200,
                        background: '#f0f0f0',
                        margin: '0 auto 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #d9d9d9',
                        borderRadius: 4
                    }}
                >
                    {isProcessing ? (
                        <div className={styles["loading-spinner"]} />
                    ) : (
                        <Text type="secondary">QR Code Placeholder</Text>
                    )}
                </div>
                <Paragraph>
                    Please scan the QR code with {paymentMethod === 'wechat' ? 'WeChat' : 'Alipay'} to complete payment
                </Paragraph>
                <Button
                    type="primary"
                    onClick={handleQRPayment}
                    loading={isProcessing}
                    disabled={isProcessing}
                    style={{ marginTop: 16 }}
                >
                    Simulate Successful Payment
                </Button>
            </div>
        );
    };

    // Render order summary
    const renderOrderSummary = () => {
        return (
            <Card
                title={
                    <Space>
                        <ShoppingCartOutlined style={{ color: token.colorPrimary }} />
                        <span>Order Summary</span>
                    </Space>
                }
                style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                }}
            >
                <div style={{ marginBottom: 16 }}>
                    <Text strong style={{ fontSize: 16 }}>Document</Text>
                    <div style={{ marginTop: 8 }}>
                        <Space align="start">
                            <div style={{
                                width: 40,
                                height: 40,
                                background: token.colorPrimaryBg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4
                            }}>
                                <Text style={{ color: token.colorPrimary }}>PDF</Text>
                            </div>
                            <div>
                                <Text style={{ display: 'block' }}>{fileList[0]?.name || 'Document'}</Text>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {printOptions.colorMode === 'bw' ? 'Black & White' : 'Color'},
                                    {printOptions.sides === 'single' ? ' Single-sided' : ' Double-sided'},
                                    {printOptions.copies} {printOptions.copies > 1 ? 'copies' : 'copy'}
                                </Text>
                            </div>
                        </Space>
                    </div>
                </div>

                <Divider style={{ margin: '12px 0' }} />

                <div style={{ marginBottom: 16 }}>
                    <Text strong style={{ fontSize: 16 }}>Delivery Method</Text>
                    <div style={{ marginTop: 8 }}>
                        <Text>
                            {deliveryInfo.deliveryMethod === 'pickup' ? 'Lobby Pickup' : 'Mailbox Delivery'}
                        </Text>
                        <div style={{ marginTop: 4 }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Building: {deliveryInfo.building} South Wharf Drive
                                {deliveryInfo.deliveryMethod === 'mailbox' && `, Mailbox: ${deliveryInfo.mailboxNumber}`}
                            </Text>
                        </div>
                    </div>
                </div>

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
                <Row justify="space-between" align="middle">
                    <Col>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            GST included (10%)
                        </Text>
                    </Col>
                    <Col>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            ${(checkoutPrice * 0.1).toFixed(2)}
                        </Text>
                    </Col>
                </Row>
            </Card>
        );
    };

    // Render payment methods
    const renderPaymentMethods = () => {
        return (
            <Card
                title={
                    <Space>
                        <WalletOutlined style={{ color: token.colorPrimary }} />
                        <span>Payment Method</span>
                    </Space>
                }
                style={{
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                }}
            >
                <Radio.Group
                    onChange={handlePaymentMethodChange}
                    value={paymentMethod}
                    style={{ width: '100%' }}
                    disabled={isProcessing}
                >
                    <Space direction="vertical" style={{ width: '100%' }}>
                        {/* <Radio value="wechat" style={{ padding: '12px', width: '100%', border: '1px solid #f0f0f0', borderRadius: '8px', marginRight: 0 }}>
                            <Space>
                                <img src="/icons/wechat-pay.svg" alt="WeChat Pay" style={{ width: 24, height: 24 }} />
                                <Text strong>WeChat Pay</Text>
                            </Space>
                        </Radio>

                        <Radio value="alipay" style={{ padding: '12px', width: '100%', border: '1px solid #f0f0f0', borderRadius: '8px', marginRight: 0 }}>
                            <Space>
                                <img src="/icons/alipay.svg" alt="Alipay" style={{ width: 24, height: 24 }} />
                                <Text strong>Alipay</Text>
                            </Space>
                        </Radio> */}

                        <Radio value="credit" style={{ padding: '12px', width: '100%', border: '1px solid #f0f0f0', borderRadius: '8px', marginRight: 0 }}>
                            <Space>
                                <CreditCardOutlined style={{ color: token.colorPrimary, fontSize: 18 }} />
                                <Text strong>Credit/Debit Card</Text>
                            </Space>
                        </Radio>
                    </Space>
                </Radio.Group>

                <div style={{ marginTop: 24 }}>
                    {paymentMethod === 'wechat' || paymentMethod === 'alipay' ? (
                        renderQRCode()
                    ) : (
                        <Elements stripe={stripePromise}>
                            <StripePaymentForm
                                amount={checkoutPrice}
                                onSuccess={handleStripeSuccess}
                                onError={handleStripeError}
                                disabled={isProcessing}
                            />
                        </Elements>
                    )}
                </div>

                {paymentError && (
                    <Alert
                        message="Payment Error"
                        description={paymentError}
                        type="error"
                        showIcon
                        style={{ marginTop: 16 }}
                    />
                )}
            </Card>
        );
    };

    // Render order complete result
    const renderOrderComplete = () => {
        return (
            <Result
                status="success"
                title="Payment Successful!"
                subTitle={`Order number: ${orderId}. We'll notify you when your print job is ready.`}
                extra={[
                    <Button type="primary" key="dashboard" size="large" onClick={onComplete}>
                        View My Orders
                    </Button>,
                    <Link href="/" key="home">
                        <Button size="large">Back to Home</Button>
                    </Link>,
                ]}
            />
        );
    };

    return (
        <div className="fade-in">
            {!isCompleted ? (
                <>
                    <Title level={4} style={{ textAlign: "center", marginBottom: 20 }}>
                        Payment
                    </Title>

                    <Paragraph style={{ textAlign: "center", marginBottom: 30 }}>
                        Please select your preferred payment method
                    </Paragraph>

                    <div style={{ maxWidth: 800, margin: "0 auto" }}>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                {renderOrderSummary()}
                            </Col>

                            <Col xs={24} md={12}>
                                {renderPaymentMethods()}
                            </Col>
                        </Row>

                        <Alert
                            message="Secure Payment"
                            description="All payment information is encrypted and secure. We do not store your payment details."
                            type="info"
                            showIcon
                            icon={<LockOutlined />}
                            style={{ marginTop: 16, marginBottom: 24, borderRadius: 8 }}
                        />

                        {(paymentMethod === 'wechat' || paymentMethod === 'alipay') && (
                            <Row justify="space-between" style={{ marginTop: 40 }}>
                                <Col>
                                    <Button
                                        size="large"
                                        onClick={onPrevious}
                                        disabled={isProcessing}
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
                            </Row>
                        )}
                    </div>
                </>
            ) : (
                renderOrderComplete()
            )}
        </div>
    );
};

export default PaymentStep;