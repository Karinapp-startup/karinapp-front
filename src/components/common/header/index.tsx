import { Button } from "@/components/ui/button";
import { BellIcon, UserCircle } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold">Bienvenido, Admin</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}; 