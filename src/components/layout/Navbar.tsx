"use client";
import { useState } from "react";
import { Layout, Menu, Button, theme, Space, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  PrinterOutlined,
  FileOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { ItemType } from "antd/es/menu/interface";

const { Header } = Layout;



const Navbar = () => {
  const pathname = usePathname();
  const { token } = theme.useToken();
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const userMenu = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => router.push("/profile"),
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
      onClick: () => router.push("/orders"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];


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
      label: "About&Contact",
      key: "/about",
      icon: <InfoCircleOutlined />,
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: token.colorBgContainer,
        padding: "0 clamp(4px, 2vw, 24px)",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.03)",
      }}
    >

      <div className="logo" style={{ marginRight: "24px", flex: 1 }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <PrinterOutlined style={{ fontSize: "24px" }} />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>SharedPrinter</span>

        </Link>
      </div>

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
          label: <Link href={item.key}>{item.label}</Link>,
        }))}
      />

      <div style={{ display: "flex", gap: "10px", flex: 1 }}>
        {isAuthenticated ? (
          <Dropdown
            menu={{ items: userMenu as ItemType[] }}
            placement="bottomRight"
            arrow
          >
            <Space className="user-dropdown-link" style={{ cursor: "pointer" }}>
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff" }}
                size="small"
              />
              <span>{user?.username || "User"}</span>
              <DownOutlined style={{ fontSize: "12px" }} />
            </Space>
          </Dropdown>
        ) : (
          <Link href="/login">
            <Button type="primary" icon={<UserOutlined />}>
              Login/Register
            </Button>
          </Link>
        )}
        <Link href="/print">
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
