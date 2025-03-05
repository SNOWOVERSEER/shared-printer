"use client";

import { Layout } from "antd";
import Navbar from "./Navbar";

const { Content, Footer } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content
        style={{
          padding: "0 clamp(12px, 2vw, 24px)",
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderStyle: "solid none solid none",
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} South Wharf Drive Community Printing System
      </Footer>
    </Layout>
  );
};

export default MainLayout;
