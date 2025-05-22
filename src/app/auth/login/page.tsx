"use client";

import { LoginForm } from "@/components/auth/login/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm">
        <LoginForm />
      </div>
    </div>
  );
} 