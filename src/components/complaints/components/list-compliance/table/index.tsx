"use client";

import * as React from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Clock,
  Eye,
  MoreVertical,
  AlertTriangle,
} from "lucide-react";
import { ComplaintType, StatusType, SortDirection, SortConfig } from "@/components/complaints/components/list-compliance/complements/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { statusConfig } from "@/components/complaints/components/list-compliance/complements/utils/statusConfig";
import { getDueStatus } from "@/components/complaints/components/list-compliance/complements/utils/dateUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Timeline } from "../timeline";
import { exportToExcel } from "../complements/utils/export";

interface ComplaintsTableProps {
  complaints: ComplaintType[];
  selectedRows: string[];
  onSelectedRowsChange: (rows: string[]) => void;
}

export function ComplaintsTable({
  complaints: initialComplaints,
  selectedRows,
  onSelectedRowsChange
}: ComplaintsTableProps) {
  const [complaints, setComplaints] = React.useState(initialComplaints);
  const [sort, setSort] = React.useState<SortConfig>({
    column: undefined,
    direction: undefined,
  });

  const handleSort = (column: keyof ComplaintType) => {
    const newDirection: SortDirection =
      sort.column === column
        ? sort.direction === 'asc'
          ? 'desc'
          : sort.direction === 'desc'
            ? undefined
            : 'asc'
        : 'asc';

    setSort({ column, direction: newDirection });

    if (!newDirection) {
      setComplaints(initialComplaints);
      return;
    }

    const sortedComplaints = [...complaints].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (!aValue || !bValue) return 0;

      if (newDirection === 'asc') {
        return String(aValue).localeCompare(String(bValue));
      } else {
        return String(bValue).localeCompare(String(aValue));
      }
    });

    setComplaints(sortedComplaints);
  };

  const handleRowSelect = (id: string) => {
    onSelectedRowsChange(
      selectedRows.includes(id)
        ? selectedRows.filter(rowId => rowId !== id)
        : [...selectedRows, id]
    );
  };

  const handleBulkAction = (action: string) => {
    if (action === "Exportar") {
      if (selectedRows.length === 0) {
        toast.error('No hay denuncias seleccionadas', {
          description: 'Por favor, seleccione al menos una denuncia para exportar.',
        });
        return;
      }

      try {
        const selectedComplaints = complaints.filter(c => selectedRows.includes(c.id));

        if (selectedComplaints.length === 0) {
          toast.error('Error al exportar', {
            description: 'No se encontraron las denuncias seleccionadas.',
          });
          return;
        }

        exportToExcel(selectedComplaints);

        toast.success(`Exportación exitosa`, {
          description: `Se han exportado ${selectedComplaints.length} denuncias`,
        });
      } catch (error) {
        console.error('Error al exportar:', error);
        toast.error('Error al exportar', {
          description: 'No se pudo completar la exportación. Intente nuevamente.',
        });
      }
    } else {
      toast.success(`Acción masiva ejecutada`, {
        description: `${action} aplicada a ${selectedRows.length} denuncias`,
        action: {
          label: 'Deshacer',
          onClick: () => console.log('Deshaciendo acción...')
        },
      });
    }
  };

  const SortIcon = ({ column }: { column: keyof ComplaintType }) => {
    if (sort.column !== column) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    if (sort.direction === 'asc') return <ArrowUp className="h-4 w-4 ml-1" />;
    if (sort.direction === 'desc') return <ArrowDown className="h-4 w-4 ml-1" />;
    return <ArrowUpDown className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-4">
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg flex items-center">
          <span>{selectedRows.length} denuncias seleccionadas</span>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === complaints.length}
                onCheckedChange={(checked) => {
                  onSelectedRowsChange(checked
                    ? complaints.map(c => c.id)
                    : []
                  );
                }}
              />
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('id')}
                className="h-8 text-left font-medium flex items-center"
              >
                Denuncia
                <SortIcon column="id" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('victimName')}
                className="h-8 text-left font-medium flex items-center"
              >
                Nombre de la víctima
                <SortIcon column="victimName" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('companyName')}
                className="h-8 text-left font-medium flex items-center"
              >
                Empresa
                <SortIcon column="companyName" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('status')}
                className="h-8 text-left font-medium flex items-center"
              >
                Status
                <SortIcon column="status" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('entryDate')}
                className="h-8 text-left font-medium flex items-center"
              >
                Fecha de ingreso
                <SortIcon column="entryDate" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort('dueDate')}
                className="h-8 text-left font-medium flex items-center"
              >
                Próximo a vencer
                <SortIcon column="dueDate" />
              </Button>
            </TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow
              key={complaint.id}
              className={cn(
                "transition-colors",
                isToday(complaint.lastUpdate) && "bg-blue-50/50"
              )}
            >
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(complaint.id)}
                  onCheckedChange={() => handleRowSelect(complaint.id)}
                />
              </TableCell>
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className="font-medium"
                    >
                      {complaint.id}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className="w-96 bg-white border shadow-lg backdrop-blur-lg"
                    sideOffset={5}
                    align="start"
                  >
                    <div className="space-y-4">
                      <div className="pb-4 border-b">
                        <h4 className="font-semibold text-sm text-gray-900 mb-3">
                          Detalles de la denuncia
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Última actividad</span>
                            <div className="text-sm font-medium">
                              {complaint.lastActivity.text}
                              <span className="text-gray-500 ml-2 text-xs">
                                {complaint.lastActivity.date instanceof Date ? (
                                  `(${format(complaint.lastActivity.date, 'dd/MM/yyyy HH:mm', { locale: es })})`
                                ) : (
                                  '(Fecha no disponible)'
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Asignado a</span>
                            <span className="text-sm font-medium">{complaint.assignedTo}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Prioridad</span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "font-medium",
                                complaint.priority === 'high' && "bg-red-50 text-red-700 border-red-300",
                                complaint.priority === 'medium' && "bg-yellow-50 text-yellow-700 border-yellow-300",
                                complaint.priority === 'low' && "bg-green-50 text-green-700 border-green-300",
                              )}
                            >
                              {complaint.priority === 'high' && (
                                <AlertCircle className="w-3 h-3 mr-1" />
                              )}
                              {complaint.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-3">
                          Historial de actividades
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <Timeline activities={complaint.activities} />
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell className="text-left px-6">{complaint.victimName}</TableCell>
              <TableCell className="text-left px-6">{complaint.companyName}</TableCell>
              <TableCell className="text-left px-6">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[complaint.status as StatusType].color}`}>
                  {complaint.status}
                </span>
              </TableCell>
              <TableCell className="text-left px-6">{complaint.entryDate}</TableCell>
              <TableCell className="text-left px-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getDueStatus(complaint.dueDate) === 'onTime' ? 'bg-green-500' :
                    getDueStatus(complaint.dueDate) === 'warning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                  {complaint.dueDate}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Clock className="w-4 h-4 mr-2" />
                      Extender plazo
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Marcar urgente
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 