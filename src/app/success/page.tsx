"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Result, Button, Spin, Typography, Space } from "antd";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

const { Title, Paragraph } = Typography;

const PaymentSuccessPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            setError("Invalid session ID");
            setLoading(false);
            return;
        }

        // verify payment session
        const verifyPayment = async () => {
            try {
                const response = await fetch(`/api/verify-payment?session_id=${sessionId}`, {
                    method: "GET",
                });

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error.message);
                }

                setOrderId(data.orderId);
                setLoading(false);
            } catch (err: any) {
                console.error("Error verifying payment:", err);
                setError(err.message || "Failed to verify payment");
                setLoading(false);
            }
        };

        verifyPayment();
    }, [searchParams]);

    if (loading) {
        return (
            <MainLayout>
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
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
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
            </MainLayout>
        );
    }

    return (
        <MainLayout>
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
        </MainLayout>
    );
};

export default PaymentSuccessPage;