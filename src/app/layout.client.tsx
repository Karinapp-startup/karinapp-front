"use client";

import { Toaster } from "sonner";
import { Sidebar } from "@/components/common/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export function RootLayoutClient({
  children,
  inter,
}: {
  children: React.ReactNode;
  inter: any;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex h-screen">
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
        <Toaster 
          theme="light"
          richColors
          position="top-right"
          expand={true}
          closeButton={true}
        />
      </body>
    </html>
  );
} 