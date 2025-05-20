"use client";

import { Logo } from "@/components/ui/logo";

export function LoginHeader() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Inicio de Sesión
      </h2>
      <p className="text-sm text-gray-600 mb-8">
        Inicia sesión para gestionar tus denuncias.
      </p>
    </div>
  );
} 