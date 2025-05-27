"use client";
import React from 'react';
import { Typography, Card, Space } from 'antd';
import MainLayout from '@/components/layout/MainLayout';

const { Title, Paragraph, Text } = Typography;

export default function Terms() {
    return (
        <MainLayout>
            <div style={{
                maxWidth: 800,
                margin: '0 auto',
                padding: '40px 20px'
            }}>
                <Card>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Title level={1}>Terms of Service</Title>
                        <Text type="secondary">Last updated: {new Date().toLocaleDateString()}</Text>

                        <div>
                            <Title level={3}>1. Service Description</Title>
                            <Paragraph>
                                This printing service allows residents of South Wharf Drive to submit documents
                                for printing. The service is currently in beta testing mode.
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>2. Beta Testing</Title>
                            <Paragraph>
                                This service is currently in beta mode. All payments are processed through
                                Stripe's sandbox environment and no actual charges will be made. If you need
                                actual printing services, please specify this in the order notes.
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>3. User Responsibilities</Title>
                            <Paragraph>
                                • You are responsible for the content of documents you submit for printing
                                <br />
                                • Documents must not contain illegal, offensive, or copyrighted material
                                <br />
                                • You must provide accurate contact information for order fulfillment
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>4. Service Availability</Title>
                            <Paragraph>
                                The service is provided on a best-effort basis. We reserve the right to
                                refuse service or cancel orders at our discretion.
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>5. Privacy</Title>
                            <Paragraph>
                                Your uploaded documents and personal information are handled according to
                                our Privacy Policy. Documents are automatically deleted after completion
                                of the printing service.
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>6. Limitation of Liability</Title>
                            <Paragraph>
                                This service is provided "as is" without warranties. We are not liable for
                                any damages arising from the use of this service.
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={3}>7. Contact</Title>
                            <Paragraph>
                                For questions about these terms, please contact us through the About & Contact page.
                            </Paragraph>
                        </div>
                    </Space>
                </Card>
            </div>
        </MainLayout>
    );
}