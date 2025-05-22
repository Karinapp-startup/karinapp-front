import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./layout.client";
import { Toaster } from 'sonner';
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Karin App",
  description: "Sistema de gestión de denuncias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <RootLayoutClient inter={inter}>{children}</RootLayoutClient>
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
