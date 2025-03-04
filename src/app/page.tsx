"use client";
import { Layout, Button, Card, Row, Col } from "antd";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
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
