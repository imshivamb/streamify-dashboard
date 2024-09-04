import LoginForm from "@/components/auth/login-form";
import HeaderLogo from "@/components/header-logo";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center  flex-col justify-center min-h-screen bg-background">
      <HeaderLogo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
