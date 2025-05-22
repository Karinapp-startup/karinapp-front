import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { Providers } from "@/providers";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { RootLayoutClient } from "./layout.client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KarinApp",
  description: "Sistema de gestión de denuncias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('RootLayout - Rendering');

  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <RootLayoutClient inter={inter}>
            <PrivateRoute>
              {children}
            </PrivateRoute>
          </RootLayoutClient>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
