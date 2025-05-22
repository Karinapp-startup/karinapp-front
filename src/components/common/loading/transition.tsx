"use client";

import { Spinner } from "../spinner";
import { cn } from "@/lib/utils";

interface TransitionLoadingProps {
  show: boolean;
  message?: string;
}

export function TransitionLoading({ show, message }: TransitionLoadingProps) {
  if (!show) return null;

  return (
    <div className={cn(
      "fixed inset-0 bg-white/80 backdrop-blur-sm z-50",
      "flex items-center justify-center",
      "transition-opacity duration-300",
      show ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="transform transition-transform duration-300">
        <Spinner size="lg" message={message} />
      </div>
    </div>
  );
} 