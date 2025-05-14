import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./layout.client";
import { Toaster } from "@/components/ui/toaster";

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
  return <RootLayoutClient inter={inter}>{children}</RootLayoutClient>;
}
