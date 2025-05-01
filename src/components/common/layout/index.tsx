import { ReactNode } from "react";
import { Sidebar } from "../sidebar";
import { Header } from "../header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};