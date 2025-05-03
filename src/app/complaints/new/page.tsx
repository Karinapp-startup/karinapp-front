"use client";

import { ComplaintForm } from "@/components/complaints/components/new-complaint/components/ComplaintForm";
import { useRouter } from "next/navigation";

export default function NewComplaintPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white">
            <ComplaintForm />
        </div>
    );
}
