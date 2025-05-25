import { Typography, Upload, Button, Row, Col, message, theme } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";
import { PDFDocument } from 'pdf-lib'
import useFileStore from "@/store/fileStore";
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
    setUploadedFileInfo: (fileInfo: any) => void;
}

const FileUploadStep = ({ fileList, onFileListChange, isUploaded, setIsUploaded, onNext, setFilePages, setUploadedFileInfo }: FileUploadStepProps) => {
    const { token } = useToken();
    const [messageApi, contextHolder] = message.useMessage();
    const { uploadFile, isUploading, error } = useFileStore();
    const [uploading, setUploading] = useState(false);


    // Handle file upload
    const handleUpload = async (info: any) => {
        const { status, originFileObj } = info.file;


        const latestFile = info.fileList.slice(-1);
        onFileListChange(latestFile);

        if (status === 'uploading') {
            return;
        }

        if (status === 'done' || status === 'error') {

            try {
                setUploading(true);


                const fileResponse = await uploadFile(originFileObj);

                setUploadedFileInfo({
                    fileId: fileResponse.fileId,
                    filename: fileResponse.filename,
                    originalName: fileResponse.originalName,
                    contentType: fileResponse.contentType,
                    pages: fileResponse.pages
                });

                setFilePages(fileResponse.pages);

                messageApi.success(`${info.file.name} File uploaded successfully`);
                setIsUploaded(true);

            } catch (error: any) {
                messageApi.error(`File upload failed: ${error.message}`);
                setIsUploaded(false);
            } finally {
                setUploading(false);
            }
        }
    };

    // Upload component properties
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        fileList: fileList,

        customRequest: ({ file, onSuccess }) => {
            setTimeout(() => {
                onSuccess && onSuccess("ok");
            }, 0);
        },
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
                    Currently, only PDF files are supported. Will support more file types in the future.
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
                            disabled={!isUploaded || uploading}
                            style={{
                                height: "50px",
                                padding: "0 30px",
                                fontSize: "16px",
                                borderRadius: "8px",
                            }}
                        >
                            {uploading ? "Uploading..." : "Next: Select Print Options"}
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default FileUploadStep;