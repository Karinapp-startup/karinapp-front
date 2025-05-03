"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown, Mail, Plus, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loading } from "@/components/common/loading";
import { AdvancedSearch } from "@/components/complaints/components/list-compliance/advancedSearch";
import { TransitionLoading } from "@/components/complaints/components/new-complaint/components/TransitionLoading";
import { useDebounce } from "@/hooks/use-debounce";

interface HeaderProps {
  selectedCount: number;
  onExport: () => void;
  onSearch: (searchTerm: string) => void;
}

export function ComplaintsHeader({ selectedCount, onExport, onSearch }: HeaderProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Input value:', value); // Para debug
    setSearchTerm(value);
    onSearch(value); // Llamamos directamente a onSearch sin debounce por ahora
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
        {/* Título y navegación */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-gray-600">Denuncias</span>
        </div>

        <h1 className="text-2xl font-semibold">Índice de denuncias</h1>

        {/* Barra de acciones */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Busca por denuncia, nombre, empresa o cualquier dato"
              className="w-96"
              value={searchTerm}
              onChange={handleSearch}
            />
            <AdvancedSearch />
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
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Enviar recordatorio
            </Button>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleNewComplaint}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar denuncia
            </Button>
          </div>
        </div>
      </div>
    </>
  );
} 