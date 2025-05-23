"use client";

import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

export function PasswordRecoveryHeader() {
  return (
    <CardHeader className="space-y-1 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Image
          src="/images/logo.png"
          alt="Karin App"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
        <span className="text-xl font-semibold text-blue-600">KarinApp</span>
      </div>
      <CardTitle className="text-2xl font-semibold">
        Recuperación de contraseña
      </CardTitle>
      <CardDescription className="text-gray-500">
        Ingresa tu correo electrónico para recuperar tu contraseña
      </CardDescription>
    </CardHeader>
  );
} 