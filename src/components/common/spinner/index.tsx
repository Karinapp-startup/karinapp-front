"use client";

import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-24 h-24"  // Tamaño extra grande para el spinner de transición
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Círculo exterior pulsante */}
        <div className={cn(
          "absolute inset-0 rounded-full border-4 border-blue-600/30 animate-ping",
          sizeClasses[size],
          className
        )} />

        {/* Círculo interior giratorio */}
        <div className={cn(
          "absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin",
          sizeClasses[size],
          className
        )} />

        {/* Escudo central */}
        <Shield className={cn(
          "text-blue-600 animate-pulse",
          sizeClasses[size],
          className
        )} />
      </div>
    </div>
  );
} 