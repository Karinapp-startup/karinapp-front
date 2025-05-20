import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  FileTextIcon,
  UsersIcon,
  Settings2Icon,
  LogOutIcon,
  ChevronDownIcon,
  Shield
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { icon: FileTextIcon, label: "Denuncias", href: "/" },
];

export const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r flex flex-col">
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

      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">JG</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Juan Pablo González</p>
                  <p className="text-xs text-gray-500">jp@example.com</p>
                </div>
              </div>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings2Icon className="h-4 w-4 mr-2" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <LogOutIcon className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}; 