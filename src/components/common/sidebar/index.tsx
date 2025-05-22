"use client";

import { Button } from "@/components/ui/button";
import { useAuthService } from "@/hooks/useAuthService";
import { useAppSelector } from "@/store/hooks";
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
  User,
  ChevronLeft,
  ChevronRight
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
import styles from './sidebar.module.css';

const menuItems = [
  { icon: FileTextIcon, label: "Denuncias", href: "/" },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuthService();
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleProfileClick = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Esperamos 2 segundos
    try {
      await router.push('/profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    if (!user?.email) return 'U';
    return user.email
      .split('@')[0]
      .slice(0, 2)
      .toUpperCase();
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
      <div className={cn(
        "flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]",
        className
      )}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-6 h-8 w-8 rounded-full border bg-white shadow-md"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <div className={cn("p-4 border-b", isCollapsed && "flex justify-center")}>
          <div className="flex items-center gap-2">
            <div className={styles.logoContainer}>
              <Shield className={cn("h-6 w-6 text-white", styles.logo)} />
            </div>
            {!isCollapsed && <span className={styles.appName}>KarinApp</span>}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!isCollapsed && item.label}
                </Button>
              </Link>
            ))}
          </div>
        </nav>

        <div className="px-3 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "flex items-center gap-2 p-2 w-full rounded-lg hover:bg-gray-100 transition-colors outline-none",
              isCollapsed && "justify-center"
            )}>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-medium">
                {getInitials()}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">{user?.email?.split('@')[0] || 'Usuario'}</span>
                  <span className="text-xs text-gray-500">{user?.email || ''}</span>
                </div>
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={cn(
                "w-56 bg-white",
                isCollapsed && "ml-2"
              )}
              align={isCollapsed ? "center" : "end"}
              sideOffset={isCollapsed ? 8 : 0}
            >
              {isCollapsed && (
                <div className="px-2 py-1.5 bg-white">
                  <p className="text-sm font-medium text-gray-900">{user?.email?.split('@')[0] || 'Usuario'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                </div>
              )}
              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50 bg-white"
                onClick={handleProfileClick}
              >
                <User size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">Mi Perfil</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-100" />

              <DropdownMenuItem
                className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 bg-white"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  <LogOut size={16} />
                )}
                <span className="text-sm font-medium">
                  {isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}; 