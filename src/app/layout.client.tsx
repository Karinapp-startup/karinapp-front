"use client";

import { Sidebar } from "@/components/common/sidebar";
import { Toaster } from 'sonner';
import { useAppSelector } from "@/store/hooks";

interface RootLayoutClientProps {
  children: React.ReactNode;
  inter: any;
}

export function RootLayoutClient({ children, inter }: RootLayoutClientProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  console.log('RootLayoutClient - isAuthenticated:', isAuthenticated); // Para debugging

  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      <div className="flex">
        {isAuthenticated && (
          <Sidebar className="flex-shrink-0 sticky top-0 h-screen" />
        )}
        <main className={`flex-1 min-h-screen ${!isAuthenticated ? 'w-full' : ''}`}>
          <div className="h-full mx-auto" style={{ maxWidth: '1400px', zoom: '0.8' }}>
            {children}
          </div>
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
} 