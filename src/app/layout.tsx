import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./layout.client";
import { Toaster } from 'sonner';

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
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutClient inter={inter}>{children}</RootLayoutClient>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
