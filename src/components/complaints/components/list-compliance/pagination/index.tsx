import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const ComplaintsPagination = () => {
  return (
    <div className="flex items-center justify-between mt-4 text-sm">
      <Button variant="outline" size="sm">
        <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
      </Button>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">1</Button>
        <Button variant="ghost" size="sm">2</Button>
        <Button variant="ghost" size="sm">3</Button>
        <span>...</span>
        <Button variant="ghost" size="sm">8</Button>
        <Button variant="ghost" size="sm">9</Button>
        <Button variant="ghost" size="sm">10</Button>
      </div>
      <Button variant="outline" size="sm">
        Siguiente <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}; 