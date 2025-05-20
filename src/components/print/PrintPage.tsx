import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import useAuthStore from "@/store/authStore";
import useOrderStore from "@/store/orderStore";
import { OrderRequest } from "@/api/services/orderService";
const { Title, Paragraph, Text } = Typography;



const PrintPage = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [orderCreated, setOrderCreated] = useState(false);
    const [price, setPrice] = useState(0);
    const [filePages, setFilePages] = useState(1);
    const [form] = Form.useForm();
    const [deliveryForm] = Form.useForm();
    const [printOptions, setPrintOptions] = useState<any>({});
    const [deliveryInfo, setDeliveryInfo] = useState<any>({});
    const { user } = useAuthStore();
    const [uploadedFileInfo, setUploadedFileInfo] = useState<any>(null);
    const orderStore = useOrderStore();
    const [createdOrder, setCreatedOrder] = useState<any>(null);
    const [messageApi, contextHolder] = message.useMessage();
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
            title: 'Delivery Information',
            icon: <HomeOutlined />,
        },
        {
            title: 'Confirm Task',
            icon: <SaveOutlined />,
        },
        {
            title: 'Make Payment',
            icon: <CreditCardOutlined />,
        },
    ];

    const handleConfirmOrder = async () => {
        try {
            // 构建订单请求数据
            const orderData: OrderRequest = {
                file_name: uploadedFileInfo.filename,
                file_id: uploadedFileInfo.fileId,
                pages: uploadedFileInfo.pages,
                color_mode: printOptions.colorMode || 'bw',
                sides: printOptions.sides || 'single',
                paper_size: printOptions.paperSize || 'A4',
                orientation: printOptions.orientation || 'portrait',
                pages_per_side: printOptions.pagesPerSide || 1,
                copies: printOptions.copies || 1,
                amount: price,
                delivery_method: deliveryInfo.deliveryMethod,
                email: deliveryInfo.email,
                name: deliveryInfo.name,
                phone: deliveryInfo.phone,
                building: deliveryInfo.building,
                mailbox_number: deliveryInfo.mailboxNumber,
                notes: deliveryInfo.notes
            };

            // 使用订单store创建订单
            console.log('Sending order data:', orderData);
            const createdOrder = await orderStore.createOrder(orderData);
            setCreatedOrder(createdOrder);
            setOrderCreated(true);
            setCurrentStep(4);
        } catch (error) {
            console.error('Failed to create order:', error);


        }
    };

    // Next button handler
    const handleNext = () => {
        if (currentStep === 0) {
            if (fileList.length === 0) {
                messageApi.warning('Please upload a file');
                return;
            }
            setCurrentStep(1);
        } else if (currentStep === 1) {
            form.validateFields()
                .then(values => {
                    console.log('Print options get and set:', values);
                    setPrintOptions(values);
                    setCurrentStep(2);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        } else if (currentStep === 2) {
            deliveryForm.validateFields()
                .then(values => {
                    console.log('Delivery info:', values);
                    setDeliveryInfo(values);
                    setCurrentStep(3);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });


        } else if (currentStep === 3) {
            handleConfirmOrder();

        }
    };

    const handleOrderComplete = () => {
        console.log('Order complete');
    };

    // Previous button handler
    const handlePrevious = () => {
        if (orderCreated) {
            return;
        }
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
            {!user && (
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
                        setUploadedFileInfo={setUploadedFileInfo}
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

                    <DeliveryInfoStep
                        form={deliveryForm}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        isLoggedIn={user ? true : false}
                    />
                )}

                {currentStep === 3 && (
                    <ConfirmTaskStep
                        fileList={fileList}
                        printOptions={printOptions}
                        filePages={filePages}
                        deliveryInfo={deliveryInfo}
                        checkoutPrice={price}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />

                )}

                {currentStep === 4 && (
                    <PaymentStep
                        fileList={fileList}
                        printOptions={printOptions}
                        deliveryInfo={deliveryInfo}
                        checkoutPrice={price}
                        onPrevious={handlePrevious}
                        onComplete={handleOrderComplete}
                        orderCreated={orderCreated}
                        orderId={createdOrder?.order_search_id}
                    />
                )}
            </Card >
        </div >
    );
};

export default PrintPage;