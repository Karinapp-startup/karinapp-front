"use client";

import { LoginForm } from "./components/LoginForm";
import { LoginHeader } from "./components/LoginHeader";
import { LoginFooter } from "./components/LoginFooter";

export function Login() {
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg rounded-3xl border border-gray-100 sm:px-10">
                    <LoginHeader />
                    <LoginForm />
                    <LoginFooter />
                </div>
            </div>
        </div>
    );
} 