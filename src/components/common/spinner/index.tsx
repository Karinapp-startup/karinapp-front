"use client";

import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  message?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24"
};

export function Spinner({ size = "md", className, message }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className={cn("relative", className)}>
        {/* Anillo exterior */}
        <div className={cn(
          "absolute border-4 border-blue-100 rounded-full",
          sizeClasses[size]
        )} />
        
        {/* Anillo giratorio */}
        <div className={cn(
          "absolute border-4 border-blue-600 rounded-full border-t-transparent",
          styles.spinnerRing,
          sizeClasses[size]
        )} />

        {/* Círculo central pulsante */}
        <div className={cn(
          "absolute rounded-full bg-blue-600/20",
          styles.pulsingCircle,
          sizeClasses[size]
        )} />

        {/* Logo o ícono central */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          "text-blue-600",
          sizeClasses[size]
        )}>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className={cn("w-1/2 h-1/2", styles.floatingIcon)}
          >
            <path 
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            <path 
              d="M12 6V12L16 14" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      
      {message && (
        <p className="mt-4 text-sm text-gray-600 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
} 