"use client";

import { Sidebar } from "@/components/common/sidebar";
import { Toaster } from 'sonner';

interface RootLayoutClientProps {
  children: React.ReactNode;
  inter: any;
}

export function RootLayoutClient({ children, inter }: RootLayoutClientProps) {
  return (
    <div className={inter.className}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
} 