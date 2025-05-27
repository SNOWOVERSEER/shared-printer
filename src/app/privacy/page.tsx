"use client";
import React from 'react';
import { Typography, Card, Space } from 'antd';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Paragraph, Text } = Typography;

export default function Privacy() {
    return (
        <MainLayout>
            <div style={{
                maxWidth: 800,
                margin: '0 auto',
                padding: '40px 20px'
            }}>
                <Card>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Title level={1}>Privacy Policy</Title>
                        <Text type="secondary">Last updated: {new Date().toLocaleDateString()}</Text>

                        <div>
                            <Title level={3}>1. Information We Collect</Title>
                            <Paragraph>
                                We collect the following information when you use our service:
                                <br />
                                • Contact information (name, email, phone number)
                                <br />
                                • Delivery information (building number, mailbox number)
                                <br />
                                • Documents you upload for printing
                                <br />
                                • Order preferences and notes
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>2. How We Use Your Information</Title>
                            <Paragraph>
                                Your information is used solely for:
                                <br />
                                • Processing and fulfilling your printing orders
                                <br />
                                • Communicating with you about your orders
                                <br />
                                • Improving our service quality
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>3. Document Handling</Title>
                            <Paragraph>
                                • Uploaded documents are stored securely and temporarily
                                <br />
                                • Documents are automatically deleted after order completion
                                <br />
                                • We do not read, copy, or share your document contents
                                <br />
                                • Documents are only accessed for printing purposes
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>4. Data Sharing</Title>
                            <Paragraph>
                                We do not sell, trade, or share your personal information with third parties,
                                except as necessary to process payments through Stripe (currently in sandbox mode).
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>5. Data Security</Title>
                            <Paragraph>
                                We implement appropriate security measures to protect your information:
                                <br />
                                • Secure file upload and storage
                                <br />
                                • Encrypted data transmission
                                <br />
                                • Limited access to personal information
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>6. Data Retention</Title>
                            <Paragraph>
                                • Documents: Deleted immediately after printing completion
                                <br />
                                • Order information: Retained for service improvement and support
                                <br />
                                • Contact information: Retained while you use the service
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>7. Your Rights</Title>
                            <Paragraph>
                                You have the right to:
                                <br />
                                • Request deletion of your personal information
                                <br />
                                • Access information we have about you
                                <br />
                                • Correct any inaccurate information
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>8. Beta Testing Notice</Title>
                            <Paragraph>
                                During beta testing, no real payment processing occurs. All transactions
                                are simulated through Stripe's sandbox environment.
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>9. Contact Us</Title>
                            <Paragraph>
                                For privacy-related questions or requests, please contact us through
                                the About & Contact page.
                            </Paragraph>
                        </div>
                    </Space>
                </Card>
            </div>
        </MainLayout>
    );
}