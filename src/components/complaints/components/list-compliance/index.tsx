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
import { format } from "date-fns";

interface ComplaintsProps {
  complaints: ComplaintType[];
}

export function Complaints({ complaints }: ComplaintsProps) {
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

  const filteredComplaints = useMemo(() => {
    let result = complaints;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((complaint) => {
        const searchableFields = {
          id: complaint.id,
          employer: complaint.companyName,
          status: complaint.status,
        };

        return Object.values(searchableFields).some((value) =>
          value?.toString().toLowerCase().includes(searchLower)
        );
      });
    }

    // Filtros avanzados
    if (advancedFilters.employer) {
      result = result.filter((c) => c.companyName === advancedFilters.employer);
    }
    if (advancedFilters.complainant) {
      result = result.filter((c) => c.victimName === advancedFilters.complainant);
    }
    if (advancedFilters.status) {
      result = result.filter((c) => c.status.toLowerCase() === advancedFilters.status);
    }
    if (advancedFilters.dateRange?.from && advancedFilters.dateRange?.to) {
      result = result.filter((c) => {
        const entry = new Date(c.entryDate);
        return entry >= advancedFilters.dateRange!.from! && entry <= advancedFilters.dateRange!.to!;
      });
    }

    return result;
  }, [complaints, searchTerm, advancedFilters]);

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
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
        onApplyFilters={(filters) => {
          setSearchTerm("");
          setAdvancedFilters(filters);
        }}
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
              📅 {format(advancedFilters.dateRange.from, "dd/MM/yy")} - {format(advancedFilters.dateRange.to, "dd/MM/yy")}
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
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <NewComplaint
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
      />
    </div>
  );
} 