import { Typography, Upload, Button, Row, Col, message, theme } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import { PDFDocument } from 'pdf-lib'
const { Title, Paragraph } = Typography;
const { Dragger } = Upload;
const { useToken } = theme;

interface FileUploadStepProps {
    fileList: UploadFile[];
    onFileListChange: (fileList: UploadFile[]) => void;
    onNext: () => void;
    isUploaded: boolean;
    setIsUploaded: (isUploaded: boolean) => void;
    setFilePages: (filePages: number) => void;
}

const FileUploadStep = ({ fileList, onFileListChange, isUploaded, setIsUploaded, onNext, setFilePages }: FileUploadStepProps) => {
    const { token } = useToken();
    const [messageApi, contextHolder] = message.useMessage();

    // Get PDF page count
    const getPdfPageCount = async (file: File) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            return pdfDoc.getPages().length;
        } catch (error) {
            throw new Error(`PDF file is not valid ${error}`);

        }
    };

    // Handle file upload
    const handleUpload = (info: any) => {
        const { status } = info.file;

        if (status === 'done') {

            if (info.file.type === 'application/pdf') {
                try {
                    getPdfPageCount(info.file.originFileObj as File).then(pages => {
                        setFilePages(pages);
                    });
                    messageApi.success(`${info.file.name} file uploaded successfully`);
                    setIsUploaded(true);
                } catch (error) {
                    messageApi.error(`PDF file is not valid ${error}`);
                    setIsUploaded(false);
                }
            } else {
                setFilePages(1); //TODO: add support for other file types
            }
        } else if (status === 'error') {
            messageApi.error(`${info.file.name} file upload failed`);
            setIsUploaded(false);
        }


        // Only keep the latest file (single file upload)
        const latestFile = info.fileList.slice(-1);
        onFileListChange(latestFile);
    };

    // Upload component properties
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        fileList: fileList,
        action: '',
        onChange: handleUpload,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        accept: '.pdf,.doc,.docx',
        progress: {
            strokeColor: {
                '0%': token.colorPrimary,
                '100%': token.colorSuccess,
            },
            size: 3,
        },
    };

    return (
        <>
            {contextHolder}
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
                            onClick={onNext}
                            disabled={!isUploaded} //TODO: change to !isUploaded
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
        </>
    );
};

export default FileUploadStep;