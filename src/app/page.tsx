"use client";
import { Layout, Button, Card, Row, Col } from 'antd';
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";

const { Content } = Layout;
export default function Home() {
  return (
    <Layout>
      <Navbar />
      <Content>
        <div>
          <h1>Hello World</h1>
        </div>
      </Content>
    </Layout>
  );
}
