"use client";

import { Dashboard } from "./dashboard";
import { ComplaintsTable } from "./table";
import { ComplaintsHeader } from "./header";
import { NewComplaint } from "@/components/complaints/components/new-complaint";
import { ComplaintType } from "./complements/types";
import { exportToExcel } from "./complements/utils/export";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ComplaintsPagination } from "./pagination";
import { DateRange } from "react-day-picker";
import { format, parseISO, startOfDay, endOfDay, isAfter, isBefore, isWithinInterval } from "date-fns";

interface ComplaintsProps {
  complaints: ComplaintType[];
}

export function Complaints({ complaints = [] }: ComplaintsProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [advancedFilters, setAdvancedFilters] = useState<{
    employer?: string;
    complainant?: string;
    status?: string;
    dateRange?: DateRange;
  }>({});

  const itemsPerPage = 10;

  const handleExport = () => {
    if (selectedRows.length === 0) {
      toast.error('No hay denuncias seleccionadas');
      return;
    }

    try {
      const selectedComplaints = complaints.filter(c => selectedRows.includes(c.id));
      exportToExcel(selectedComplaints);
      toast.success('Exportación exitosa', {
        description: `Se han exportado ${selectedComplaints.length} denuncias`
      });
    } catch (error) {
      console.error('Error al exportar:', error);
      toast.error('Error al exportar');
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (key: keyof typeof advancedFilters) => {
    const newFilters = { ...advancedFilters };
    console.log('newFilters>>', newFilters);
    if (key === "dateRange") {
      delete newFilters.dateRange;
    } else {
      newFilters[key] = undefined;
    }
    setAdvancedFilters(newFilters);

    const filtersLeft = Object.values(newFilters).filter(Boolean).length;
    console.log('filtersLeft>>', filtersLeft);
    if (filtersLeft === 0) {
      setSearchTerm(""); // ← Limpia el estado de búsqueda
    }
  };

  const handleApplyFilters = (filters: {
    employer?: string;
    complainant?: string;
    status?: string;
    dateRange?: DateRange;
  }) => {
    setAdvancedFilters(filters);
    setCurrentPage(1); // Resetear a la primera página cuando se aplican filtros
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter(complaint => {
      let passes = true;

      // Filtro por término de búsqueda
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        passes = passes && (
          complaint.id.toLowerCase().includes(searchTermLower) ||
          complaint.companyName.toLowerCase().includes(searchTermLower) ||
          complaint.victimName.toLowerCase().includes(searchTermLower)
        );
      }

      // Filtro por empleador
      if (advancedFilters.employer) {
        passes = passes && complaint.companyName === advancedFilters.employer;
      }

      // Filtro por denunciante
      if (advancedFilters.complainant) {
        passes = passes && complaint.victimName === advancedFilters.complainant;
      }

      // Filtro por estado
      if (advancedFilters.status) {
        passes = passes && complaint.status.toLowerCase() === advancedFilters.status.toLowerCase();
      }

      // Filtro por rango de fechas de vencimiento
      if (advancedFilters.dateRange?.from && advancedFilters.dateRange?.to) {
        try {
          // Convertir la fecha de la denuncia (DD/MM/YY) a objeto Date
          const [day, month, year] = complaint.dueDate.split('/').map(Number);
          const complaintDate = new Date(2000 + year, month - 1, day);

          // Convertir las fechas del filtro
          const fromDate = startOfDay(advancedFilters.dateRange.from);
          const toDate = endOfDay(advancedFilters.dateRange.to);

          // Verificar si la fecha está dentro del rango
          passes = passes && complaintDate >= fromDate && complaintDate <= toDate;

          // Debug
          console.log({
            complaintDate,
            fromDate,
            toDate,
            passes,
            complaint: complaint.dueDate
          });
        } catch (error) {
          console.error('Error al procesar fecha:', error);
          passes = false;
        }
      }

      return passes;
    });
  }, [complaints, searchTerm, advancedFilters]);

  // Calcular la paginación después del filtrado
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredComplaints.slice(start, end);
  }, [filteredComplaints, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(filteredComplaints.length / itemsPerPage)) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-gray-600">
          <ChevronLeft className="h-4 w-4" />
          <span>Denuncias</span>
        </Button>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Índice de denuncias</h1>
        <Dashboard complaints={paginatedComplaints} />
      </div>

      <ComplaintsHeader
        selectedCount={selectedRows.length}
        onExport={handleExport}
        onSearch={handleSearch}
        onApplyFilters={handleApplyFilters}
        complaints={complaints}
      />

      {Object.values(advancedFilters).some(Boolean) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {advancedFilters.employer && (
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              🏢 {advancedFilters.employer}
              <button
                onClick={() => handleRemoveFilter("employer")}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          )}
          {advancedFilters.complainant && (
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              👤 {advancedFilters.complainant}
              <button
                onClick={() => handleRemoveFilter("complainant")}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          )}
          {advancedFilters.status && (
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              🟦 Estado: {advancedFilters.status}
              <button
                onClick={() => handleRemoveFilter("status")}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          )}
          {advancedFilters.dateRange?.from && advancedFilters.dateRange?.to && (
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              📅 Vencimiento: {format(advancedFilters.dateRange.from, "dd/MM/yy")} - {format(advancedFilters.dateRange.to, "dd/MM/yy")}
              <button
                onClick={() => handleRemoveFilter("dateRange")}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}

      <ComplaintsTable
        complaints={paginatedComplaints}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
      />

      <ComplaintsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredComplaints.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />

      <NewComplaint
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
      />
    </div>
  );
} 