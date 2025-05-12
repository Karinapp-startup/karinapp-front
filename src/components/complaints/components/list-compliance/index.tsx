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
import { useSearchParams, useRouter } from "next/navigation";

interface ComplaintsProps {
  complaints: ComplaintType[];
}

export function Complaints({ complaints }: ComplaintsProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
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

  const filteredComplaints = useMemo(() => {
    if (!searchTerm) return complaints;

    const searchLower = searchTerm.toLowerCase();
    return complaints.filter(complaint => {
      const searchableFields = {
        id: complaint.id,
        employer: complaint.companyName,
        status: complaint.status
      };

      return Object.values(searchableFields).some(value =>
        value?.toString().toLowerCase().includes(searchLower)
      );
    });
  }, [complaints, searchTerm]);

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
      />

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