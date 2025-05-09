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
import { ChevronLeft, CloudCog } from "lucide-react";

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
    console.log({termino: term})
    setSearchTerm(term);
    setCurrentPage(1);
  };

  //Logica de filtrado
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

  console.log('filteredComplaints', filteredComplaints)
  console.log('complaints', complaints)
  console.log('searchTerm', searchTerm)
  

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <Dashboard complaints={complaints} />
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

      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}

      <NewComplaint
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
      />
    </div>
  );
} 