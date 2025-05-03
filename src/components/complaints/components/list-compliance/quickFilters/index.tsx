import { Badge } from "@/components/ui/badge";

export const QuickFilters = () => (
  <div className="flex gap-2 mb-4">
    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
      Vencen hoy (3)
    </Badge>
    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
      Urgentes (5)
    </Badge>
    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
      Sin asignar (2)
    </Badge>
    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
      Vencidas (8)
    </Badge>
  </div>
); 