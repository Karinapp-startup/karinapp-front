"use client";

import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  FileTextIcon,
  UsersIcon,
  Settings2Icon,
  LogOutIcon,
  ChevronDownIcon,
  Shield,
  LogOut,
  Settings,
  User
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Spinner } from "../spinner";

const menuItems = [
  { icon: FileTextIcon, label: "Denuncias", href: "/" },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileClick = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Esperamos 2 segundos
    try {
      await router.push('/profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <Spinner size="xl" />
            <p className="mt-4 text-sm text-gray-500">Cargando...</p>
          </div>
        </div>
      )}
      <div className={cn("w-64 min-h-screen bg-white border-r flex flex-col", className)}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold text-lg">Karin App</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>

        <div className="px-3 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 p-2 w-full rounded-lg hover:bg-gray-100 transition-colors outline-none">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-medium">
                JG
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">Juan Pablo González</span>
                <span className="text-xs text-gray-500">jp@example.com</span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-gray-900">Juan Pablo González</p>
                <p className="text-xs text-gray-500 truncate">jp@example.com</p>
              </div>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50"
                onClick={handleProfileClick}
              >
                <User size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Mi Perfil</span>
              </DropdownMenuItem>

              <Link href="/settings">
                <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
                  <Settings size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">Configuración</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700"
                onClick={() => {
                  // Aquí va la lógica de cerrar sesión
                  console.log("Cerrar sesión");
                }}
              >
                <LogOut size={16} />
                <span className="text-sm font-medium">Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}; 