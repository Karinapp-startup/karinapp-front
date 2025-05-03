"use client";

import { Spinner } from "@/components/common/spinner";

export function TransitionLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    </div>
  );
} 