"use client";

import { Spinner } from "@/components/common/spinner";

export function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-gray-500">Cargando...</p>
      </div>
    </div>
  );
} 