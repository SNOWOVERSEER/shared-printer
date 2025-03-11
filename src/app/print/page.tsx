"use client";
import PrintPage from "@/components/print/PrintPage";
import MainLayout from "@/components/layout/MainLayout";
import { Layout } from "antd";

const { Content } = Layout;

export default function Print() {
    return (
        <MainLayout>
            <Content>
                <PrintPage />
            </Content>
        </MainLayout>
    );
}
