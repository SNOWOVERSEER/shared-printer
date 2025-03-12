import Login from "@/components/login/Login";
import MainLayout from "@/components/layout/MainLayout";
import { Layout } from "antd";

const { Content } = Layout;

export default function LoginPage() {
  return (
    <MainLayout>
      <Login />
    </MainLayout>
  );
}
