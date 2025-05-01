import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus } from "lucide-react";

export const ComplaintsSearchBar = () => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm" className="gap-2">
        <Filter className="h-4 w-4" />
        Filtrar
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
        <Plus className="h-4 w-4" />
        Agregar denuncia
      </Button>
    </div>
  );
}; 