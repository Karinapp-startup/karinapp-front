"use client";

import { Dashboard } from "@/components/complaints/components/list-compliance/dashboard";
import { QuickFilters } from "@/components/complaints/components/list-compliance/quickFilters";
import { AdvancedSearch } from "@/components/complaints/components/list-compliance/advancedSearch";
import { ComplaintsTable } from "@/components/complaints/components/list-compliance/table";
import { ComplaintsPagination } from "@/components/complaints/components/list-compliance/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Download, Mail } from "lucide-react";
import { ComplaintType } from "@/components/complaints/components/list-compliance/complements/types";
import { Card } from '@/components/common/card';
import { PageHeader } from '@/components/common/pageHeader';
import { ComplaintsHeader } from "@/components/complaints/components/list-compliance/header";
import { complaintsMockData } from "@/components/complaints/components/list-compliance/complements/data/mockData";
import { exportToExcel } from "@/components/complaints/components/list-compliance/complements/utils/export";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { NewComplaint } from "@/components/complaints/components/new-complaint";

interface ComplaintsProps {
  complaints: ComplaintType[];
}

export function Complaints({ complaints }: ComplaintsProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // O el número que prefieras

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
    console.log('Search term:', term); // Para debug
    setSearchTerm(term);
  };

  const filteredComplaints = useMemo(() => {
    console.log('Filtering with term:', searchTerm); // Para debug
    if (!searchTerm) return complaints;

    const searchLower = searchTerm.toLowerCase();
    return complaints.filter(complaint => {
      const searchableFields = {
        id: complaint.id,
        victimName: complaint.victimName,
        employer: complaint.employer,
        status: complaint.status,
        entryDate: complaint.entryDate,
        dueDate: complaint.dueDate,
      };

      return Object.values(searchableFields).some(value => 
        value?.toString().toLowerCase().includes(searchLower)
      );
    });
  }, [complaints, searchTerm]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
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
      <div className="mt-4">
        <ComplaintsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <NewComplaint
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
      />
    </div>
  );
} 