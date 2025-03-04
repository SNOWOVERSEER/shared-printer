"use client";
import { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  UserOutlined,
  PrinterOutlined,
  FileOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header } = Layout;

const Navbar = () => {
  const pathname = usePathname();
  const { token } = theme.useToken();
  const navItems = [
    {
      label: "Home",
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Print",
      key: "/print",
      icon: <PrinterOutlined />,
    },
    {
      label: "Orders",
      key: "/orders",
      icon: <FileOutlined />,
    },
    {
      label: "Help",
      key: "/help",
      icon: <QuestionCircleOutlined />,
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: token.colorBgContainer,
        padding: "0 24px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
      }}
    >
      {/* Logo部分 */}
      <div className="logo" style={{ marginRight: "24px", flex: 1 }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <PrinterOutlined style={{ fontSize: "24px" }} />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>PrintHub</span>
          {/* 网站名称 */}
        </Link>
      </div>
      {/* 导航菜单部分 */}
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[pathname]}
        style={{
          flex: 5,
          minWidth: 0,
          border: "none",
          display: "flex",
          justifyContent: "center",
          fontSize: "16px",
        }}
        items={navItems.map((item) => ({
          ...item,
          key: item.key,
          label: <Link href="/">{item.label}</Link>, // TODO: Add link to each item
        }))}
      />
      {/* 右侧按钮部分 */}
      <div style={{ display: "flex", gap: "10px", flex: 1 }}>
        <Link href="/">  {/* TODO: Add link to login */}
          <Button
            type="text"
            icon={<UserOutlined />}
            style={{ fontSize: "16px" }}
          >
            Login
          </Button>
        </Link>
        <Link href="/">  {/* TODO: Add link to create order */}
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            style={{ fontSize: "16px" }}
          >
            Start Printing
          </Button>
        </Link>
      </div>
    </Header>
  );
};

export default Navbar;
