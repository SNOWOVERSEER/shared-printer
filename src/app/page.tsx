"use client";
import { Layout } from "antd";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/components/home/HomePage";
const { Content } = Layout;
export default function Home() {
  return (
    <MainLayout>
      <Content>
        <HomePage />
      </Content>
    </MainLayout>
  );
}
