import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry"; // 导入我们的Ant Design注册表组件

// 定义页面元数据，如标题和描述
export const metadata: Metadata = {
  title: "PrintHub - Community Printing Service",
  description: "Easy document printing service for our community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
