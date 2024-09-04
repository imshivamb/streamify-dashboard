import RegisterForm from "@/components/auth/register-form";
import HeaderLogo from "@/components/header-logo";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-background">
      <HeaderLogo />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
