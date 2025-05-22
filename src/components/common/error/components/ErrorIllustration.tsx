"use client";

import { ErrorCode } from "../types";
import { 
  Ban,
  FileQuestion,
  KeyRound,
  ShieldAlert,
  AlertTriangle,
  ServerCrash
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorIllustrationProps {
  code: ErrorCode;
  className?: string;
}

const ERROR_ICONS: Record<ErrorCode, React.ComponentType<any>> = {
  '400': AlertTriangle,
  '401': KeyRound,
  '403': Ban,
  '404': FileQuestion,
  '500': ServerCrash,
  '503': ShieldAlert
};

export function ErrorIllustration({ code, className }: ErrorIllustrationProps) {
  const IconComponent = ERROR_ICONS[code];

  return (
    <div className={cn(
      "relative rounded-full bg-gray-100 p-8",
      "before:content-[''] before:absolute before:inset-0",
      "before:bg-blue-500/10 before:rounded-full before:animate-pulse",
      className
    )}>
      <IconComponent 
        className="w-full h-full text-blue-600 animate-bounce-slow" 
      />
    </div>
  );
} 