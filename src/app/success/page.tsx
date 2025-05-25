"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Result, Button, Spin, Typography, Space } from "antd";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { message } from "antd";
import paymentService from "@/api/services/paymentService";
const { Title, Paragraph } = Typography;

const PaymentContent = () => {
    const [messageApi, ContextHolder] = message.useMessage();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    useEffect(() => {
        const verifyPayment = async () => {
            try {
                console.log('verifyPayment');
                const sessionId = searchParams.get('session_id');
                const order_id = searchParams.get('order_id');
                if (!sessionId) {
                    throw new Error('No session ID found');
                }
                if (!order_id) {
                    throw new Error('No order ID found');
                }

                const response = await paymentService.verifyPayment(sessionId, order_id);
                setOrderId(response.order_id);
                messageApi.success('Payment verified successfully!');
            } catch (error) {
                console.error('Payment verification failed:', error);
                messageApi.error('Failed to verify payment');
                router.push('/orders');
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [searchParams, router, messageApi]);

    // if (loading) {
    //     return (
    //         <div style={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             minHeight: '60vh',
    //             padding: '20px'
    //         }}>
    //             <Spin size="large" />
    //             <Paragraph style={{ marginTop: 24 }}>
    //                 Verifying your payment...
    //             </Paragraph>
    //         </div>
    //     );
    // }

    if (error) {
        return (
            <>
                {ContextHolder}
                <Result
                    status="error"
                    title="Payment Verification Failed"
                    subTitle={error}
                    extra={[
                        <Link href="/print" key="retry">
                            <Button type="primary">Try Again</Button>
                        </Link>,
                        <Link href="/" key="home">
                            <Button>Back to Home</Button>
                        </Link>,
                    ]}
                />
            </>
        );
    }

    return (
        <>
            {ContextHolder}
            <Result
                status="success"
                title="Payment Successful!"
                subTitle={`Order number: ${orderId || 'Unknown'}. We'll notify you when your print job is ready.`}
                extra={[
                    <Link href="/orders" key="orders">
                        <Button type="primary" size="large">
                            View My Orders
                        </Button>
                    </Link>,
                    <Link href="/" key="home">
                        <Button size="large">Back to Home</Button>
                    </Link>,
                ]}
            />
        </>
    );
};

const PaymentSuccessPage = () => {
    const LoadingFallback = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: '20px'
        }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: 24 }}>
                Verifying your payment...
            </Paragraph>
        </div>
    );
    return (
        <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
                <PaymentContent />
            </Suspense>
        </MainLayout>
    );
};

export default PaymentSuccessPage;