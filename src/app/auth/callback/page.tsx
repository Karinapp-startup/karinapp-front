"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "react-oidc-context";
import { LoadingScreen } from "@/components/common/loading";

export default function CallbackPage() {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.isAuthenticated) {
            router.push("/");
        }
    }, [auth.isAuthenticated, router]);

    return <LoadingScreen />;
} 