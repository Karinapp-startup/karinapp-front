"use client";

import { RegisterForm } from "./components/RegisterForm";
import { RegisterHeader } from "./components/RegisterHeader";
import { RegisterFooter } from "./components/RegisterFooter";

export function Register() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-3xl border border-gray-100 sm:px-10">
          <RegisterHeader />
          <RegisterForm />
          <RegisterFooter />
        </div>
      </div>
    </div>
  );
} 