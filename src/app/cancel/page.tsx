import MainLayout from "@/components/layout/MainLayout";
import { Result } from "antd";

import { Button } from "antd"
import Link from "next/link"

const CancelPage = () => {



    return (
        <MainLayout>
            <Result
                status="error"
                title="Payment Canceled"
                subTitle="Please try again or contact support if the problem persists."
                extra={[
                    <Link href="/print" key="retry" >
                        <Button type="primary" size="large">Try Again</Button>
                    </Link>,
                    <Link href="/" key="home">
                        <Button size="large">Back to Home</Button>
                    </Link>,
                ]}
            />
        </MainLayout>
    );
};

export default CancelPage;
