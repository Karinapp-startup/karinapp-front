"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ErrorIllustration } from "./components/ErrorIllustration";
import { ERROR_MESSAGES, type ErrorPageProps } from "./types";
import { cn } from "@/lib/utils";

export function ErrorPage({ 
  code, 
  message, 
  description 
}: ErrorPageProps) {
  const router = useRouter();
  const errorInfo = ERROR_MESSAGES[code];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <ErrorIllustration code={code} className="w-64 h-64 mx-auto" />
        
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            {message || errorInfo.title}
          </h1>
          
          <p className="text-lg text-gray-600">
            {description || errorInfo.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Volver atrás
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  );
} 