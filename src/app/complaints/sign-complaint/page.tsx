"use client";

import { SignatureForm } from "@/components/complaints/components/sign-complaint/SignatureForm";

export default function SignComplaintPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6 bg-gray-50">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="rounded-2xl border border-[#EAECF0] bg-white p-8">
            <SignatureForm />
          </div>
        </div>
      </div>
    </div>
  );
} 