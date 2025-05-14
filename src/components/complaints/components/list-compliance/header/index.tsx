"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown, Mail, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AdvancedSearch } from "@/components/complaints/components/list-compliance/advancedSearch";
import { TransitionLoading } from "@/components/complaints/components/new-complaint/components/TransitionLoading";
import { useDebounce } from "@/hooks/use-debounce";
import { DateRange } from "react-day-picker";
import { ComplaintType } from "../complements/types";

interface HeaderProps {
  selectedCount: number;
  onExport: () => void;
  onSearch: (searchTerm: string) => void;
  onApplyFilters: (filters: {
    employer?: string;
    complainant?: string;
    status?: string;
    dateRange?: DateRange;
  }) => void;
  complaints: ComplaintType[];
}

export function ComplaintsHeader({ 
  selectedCount, 
  onExport, 
  onSearch, 
  onApplyFilters, 
  complaints = []
}: HeaderProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 300);
  const hasRunEmptySearch = useRef(false);

  useEffect(() => {
    if (debouncedSearch === "") {
      if (!hasRunEmptySearch.current) {
        hasRunEmptySearch.current = true;
        onSearch("");
      }
      return;
    }
  
    hasRunEmptySearch.current = false; 
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNewComplaint = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/complaints/new');
    }, 2000);
  };

  return (
    <>
      {isLoading && <TransitionLoading />}
      <div className="space-y-6">
        {/* Barra de acciones */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Busca por ID de denuncia o empleador"
              className="w-96"
              onChange={(e) => onSearch(e.target.value)}
            />
            <AdvancedSearch 
              onApplyFilters={onApplyFilters}
              complaints={complaints}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              disabled={selectedCount === 0}
              className="flex items-center gap-2"
            >
              <FileDown className="h-4 w-4" />
              Exportar {selectedCount > 0 && `(${selectedCount})`}
            </Button>
            <Button variant="outline" size="sm" className="hidden">
              <Mail className="h-4 w-4 mr-2" />
              Enviar recordatorio
            </Button>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleNewComplaint}
            >
              Agregar denuncia
            </Button>
          </div>
        </div>
      </div>
    </>
  );
} 