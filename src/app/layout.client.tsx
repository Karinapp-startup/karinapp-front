"use client";

import { Sidebar } from "@/components/common/sidebar";
import { Toaster } from 'sonner';

interface RootLayoutClientProps {
  children: React.ReactNode;
  inter: any;
}

export function RootLayoutClient({ children, inter }: RootLayoutClientProps) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      <div className="flex">
        <Sidebar className="flex-shrink-0 sticky top-0 h-screen" />
        <main className="flex-1 min-h-screen">
          <div className="h-full mx-auto" style={{ maxWidth: '1400px', zoom: '0.8' }}>
            {children}
          </div>
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
} 