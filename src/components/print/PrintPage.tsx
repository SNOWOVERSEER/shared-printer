import { useEffect, useState } from "react";
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
import styles from "./PrintPage.module.css";
import GuestLoginPrompt from "./GuestLoginPrompt";
import FileUploadStep from "./FileUploadStep";
import PrintOptionsStep from "./PrintOptionsStep";
import ConfirmTaskStep from "./ConfirmTaskStep";
import DeliveryInfoStep from "./DeliveryInfoStep";
import PaymentStep from "./PaymentStep";
const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;
const { useToken } = theme;



const PrintPage = () => {
    const { token } = useToken();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [price, setPrice] = useState(0);
    const [filePages, setFilePages] = useState(1);
    const [form] = Form.useForm();
    const [deliveryForm] = Form.useForm();
    const [printOptions, setPrintOptions] = useState<any>({});

    const defaultPrintOptions = {
        copies: 1,
        colorMode: 'bw',
        sides: 'single',
        paperSize: 'A4',
        orientation: 'portrait',
        pagesPerSide: 1,
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
            setCurrentStep(1);
        } else if (currentStep === 1) {
            form.validateFields()
                .then(values => {
                    console.log('Print options:', values);
                    setPrintOptions(values);
                    setCurrentStep(2);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        } else if (currentStep === 2) {

            setCurrentStep(3);
        } else if (currentStep === 3) {
            deliveryForm.validateFields()
                .then(values => {
                    console.log('Delivery info:', values);
                    setCurrentStep(4);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        }
    };

    const handleOrderComplete = () => {
        console.log('Order complete');
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

            <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
                Create Print Task
            </Title>

            {/* Guest Login Card */}
            {!isLoggedIn && (
                <GuestLoginPrompt />
            )}

            {/* Print Steps */}
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
                    <FileUploadStep
                        fileList={fileList}
                        onFileListChange={setFileList}
                        onNext={handleNext}
                        isUploaded={isUploaded}
                        setIsUploaded={setIsUploaded}
                        setFilePages={setFilePages}
                    />
                )}

                {currentStep === 1 && (
                    <PrintOptionsStep
                        fileList={fileList}
                        initialValues={defaultPrintOptions}
                        form={form}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        filePages={filePages}
                        setCheckoutPrice={setPrice}
                        checkoutPrice={price}
                    />
                )}

                {currentStep === 2 && (
                    <ConfirmTaskStep
                        fileList={fileList}
                        printOptions={form.getFieldsValue()}
                        filePages={filePages}
                        checkoutPrice={price}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                )}

                {currentStep === 3 && (
                    <DeliveryInfoStep
                        form={deliveryForm}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        isLoggedIn={isLoggedIn}
                    />
                )}

                {currentStep === 4 && (
                    <PaymentStep
                        fileList={fileList}
                        printOptions={printOptions}
                        deliveryInfo={deliveryForm.getFieldsValue()}
                        checkoutPrice={price}
                        onPrevious={handlePrevious}
                        onComplete={handleOrderComplete}
                    />
                )}
            </Card >
        </div >

    );
};

export default PrintPage;