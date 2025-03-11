import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Alert, Form, Input, Space, Spin, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import styles from './StripePaymentForm.module.css';
const { Text } = Typography;

interface StripePaymentFormProps {
    amount: number;
    onSuccess: (paymentId: string) => void;
    onError: (error: string) => void;
    disabled: boolean;
}

const StripePaymentForm = ({ amount, onSuccess, onError, disabled }: StripePaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState('');
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // Create payment method
            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                throw new Error('Card element not found');
            }

            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: values.name,
                    email: values.email,
                },
            });

            if (paymentMethodError) {
                throw new Error(paymentMethodError.message);
            }

            // Here you would typically call your backend to create a payment intent
            // For this example, we'll simulate a successful payment

            // Simulate API call
            setTimeout(() => {
                setProcessing(false);
                onSuccess(paymentMethod.id);
            }, 2000);

            // In a real implementation, you would do something like:
            /*
            const response = await fetch('/api/create-payment-intent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: amount * 100, // Stripe uses cents
                payment_method_id: paymentMethod.id,
              }),
            });
      
            const data = await response.json();
            
            if (data.error) {
              throw new Error(data.error);
            }
            
            // Handle the result
            if (data.requires_action) {
              // Use stripe.confirmCardPayment for 3D Secure
              const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);
              
              if (confirmError) {
                throw new Error(confirmError.message);
              }
            }
            
            setProcessing(false);
            onSuccess(data.payment_id);
            */

        } catch (err: any) {
            setProcessing(false);
            setError(err.message || 'An error occurred during payment processing');
            onError(err.message || 'Payment failed');
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                name="name"
                label="Cardholder Name"
                rules={[{ required: true, message: 'Please enter the cardholder name' }]}
            >
                <Input
                    placeholder="John Doe"
                    disabled={processing || disabled}
                />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                ]}
            >
                <Input
                    placeholder="email@example.com"
                    disabled={processing || disabled}
                />
            </Form.Item>

            <Form.Item
                label="Card Details"
                required
            >
                <div
                    style={{
                        padding: '10px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '2px',
                        background: disabled ? '#f5f5f5' : 'white'
                    }}
                >
                    <CardElement options={cardElementOptions} />
                </div>
            </Form.Item>

            {error && (
                <Alert
                    message="Payment Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}

            <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={processing}
                    disabled={!stripe || processing || disabled}
                    size="large"
                    style={{ width: '100%', height: 50 }}
                >
                    {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
                </Button>

                <Space align="center" style={{ marginTop: 16 }}>
                    <LockOutlined style={{ color: '#52c41a' }} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        Payments are secure and encrypted
                    </Text>
                </Space>
            </div>
        </Form>
    );
};

export default StripePaymentForm;