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
        display: "flex", // 使用flex布局
        alignItems: "center", // 垂直居中对齐
        background: token.colorBgContainer, // 使用主题中的背景色
        padding: "0 24px", // 左右内边距
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)", // 添加轻微阴影
      }}
    >
      {/* Logo部分 */}
      <div className="logo" style={{ marginRight: "24px" }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <PrinterOutlined style={{ fontSize: "24px" }} /> {/* 打印机图标 */}
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            PrintHub
          </span>{" "}
          {/* 网站名称 */}
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[pathname]}
        items={navItems}
      />

    </Header>
  );
};

export default Navbar;
