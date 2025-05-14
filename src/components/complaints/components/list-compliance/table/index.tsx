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
  Pencil,
  InfoIcon,
} from "lucide-react";
import {
  ComplaintType,
  StatusType,
  SortDirection,
  SortConfig,
  statusAliases,
  getStatusDescription
} from "@/components/complaints/components/list-compliance/complements/types";
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
import { format, isToday, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { statusConfig } from "@/components/complaints/components/list-compliance/complements/utils/statusConfig";
import { getDueStatus } from "@/components/complaints/components/list-compliance/complements/utils/dateUtils";
import { Timeline } from "../timeline";
import { exportToExcel } from "../complements/utils/export";
import { useState, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DetailModal } from "../detailModal";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/common/spinner";

interface ComplaintsTableProps {
  complaints: ComplaintType[];
  selectedRows: string[];
  onSelectedRowsChange: (rows: string[]) => void;
}

const statusColors: Record<StatusType, { bg: string, text: string, hover: string }> = {
  'recibida': { bg: 'bg-violet-100', text: 'text-violet-800', hover: 'hover:bg-violet-200' },
  'finalizada': { bg: 'bg-emerald-100', text: 'text-emerald-800', hover: 'hover:bg-emerald-200' },
  'en_proceso': { bg: 'bg-sky-100', text: 'text-sky-800', hover: 'hover:bg-sky-200' },
  'derivada_dt': { bg: 'bg-amber-100', text: 'text-amber-800', hover: 'hover:bg-amber-200' },
  'esperando_dt': { bg: 'bg-orange-100', text: 'text-orange-800', hover: 'hover:bg-orange-200' },
  'observaciones_dt': { bg: 'bg-rose-100', text: 'text-rose-800', hover: 'hover:bg-rose-200' },
  'adopcion_sanciones': { bg: 'bg-red-100', text: 'text-red-800', hover: 'hover:bg-red-200' },
  'aviso_inicio_investigacion': { bg: 'bg-blue-100', text: 'text-blue-800', hover: 'hover:bg-blue-200' }
};

export function ComplaintsTable({
  complaints: initialComplaints,
  selectedRows,
  onSelectedRowsChange
}: ComplaintsTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: 'entryDate',
    direction: 'desc'
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintType | null>(null);

  // Función para convertir fecha de formato "DD/MM/YY" a Date
  const parseCustomDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(2000 + year, month - 1, day);
  };

  // Función para ordenar los datos
  const sortedComplaints = useMemo(() => {
    const sorted = [...initialComplaints].sort((a, b) => {
      if (!sortConfig.column) return 0;

      const aValue = a[sortConfig.column];
      const bValue = b[sortConfig.column];

      // Manejo especial para el campo step (formato "X/9")
      if (sortConfig.column === 'step') {
        const stepA = parseInt((aValue as string).split('/')[0]);
        const stepB = parseInt((bValue as string).split('/')[0]);
        return sortConfig.direction === 'asc' ? stepA - stepB : stepB - stepA;
      }

      // Manejo especial para fechas en formato DD/MM/YY
      if (sortConfig.column === 'dueDate' || sortConfig.column === 'entryDate') {
        const dateA = parseCustomDate(aValue as string);
        const dateB = parseCustomDate(bValue as string);
        return sortConfig.direction === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Manejo para createdAt que podría tener otro formato
      if (sortConfig.column === 'createdAt') {
        const dateA = new Date(aValue as string).getTime();
        const dateB = new Date(bValue as string).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      // Manejo para strings y otros tipos
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [initialComplaints, sortConfig]);

  const handleSort = (column: keyof ComplaintType) => {
    setSortConfig(prev => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
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
        const selectedComplaints = sortedComplaints.filter(c => selectedRows.includes(c.id));

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

  const SortIcon = ({ column, sortConfig }: { column: keyof ComplaintType, sortConfig: SortConfig }) => {
    if (sortConfig.column !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />;
    }
    return sortConfig.direction === 'asc'
      ? <ArrowUp className="h-4 w-4 ml-1 text-blue-600" />
      : <ArrowDown className="h-4 w-4 ml-1 text-blue-600" />;
  };

  // Función para formatear fechas
  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'dd/MM/yy');
    } catch (error) {
      return dateStr;
    }
  };

  // Función para verificar si una actualización es de hoy
  const isUpdateFromToday = (update: { date: string; time: string }) => {
    try {
      const updateDate = parseISO(`${update.date} ${update.time}`);
      return isToday(updateDate);
    } catch {
      return false;
    }
  };

  const handleEditComplaint = (complaint: ComplaintType) => {
    setIsLoading(true);
    setIsDetailModalOpen(false);
    setTimeout(() => {
      router.push(`/denuncia/${complaint.id}?step=${complaint.step.split('/')[0]}`);
    }, 2000);
  };

  return (
    <>
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
                  checked={selectedRows.length === sortedComplaints.length}
                  onCheckedChange={(checked) => {
                    onSelectedRowsChange(checked
                      ? sortedComplaints.map(c => c.id)
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
                  <SortIcon column="id" sortConfig={sortConfig} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('companyName')}
                  className="h-8 text-left font-medium flex items-center"
                >
                  Empleador
                  <SortIcon column="companyName" sortConfig={sortConfig} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('victimName')}
                  className="h-8 text-left font-medium flex items-center"
                >
                  Denunciante
                  <SortIcon column="victimName" sortConfig={sortConfig} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('status')}
                  className="h-8 text-left font-medium flex items-center"
                >
                  Estado
                  <SortIcon column="status" sortConfig={sortConfig} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('entryDate')}
                  className="h-8 text-left font-medium flex items-center"
                >
                  Fecha de ingreso
                  <SortIcon column="entryDate" sortConfig={sortConfig} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('dueDate')}
                  className="h-8 text-left font-medium flex items-center"
                >
                  Plazo a vencer
                  <SortIcon column="dueDate" sortConfig={sortConfig} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('step')}
                  className="h-8 text-left font-medium flex items-center"
                >
                  Completitud
                  <SortIcon column="step" sortConfig={sortConfig} />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedComplaints.map((complaint) => (
              <TableRow
                key={complaint.id}
                className={cn(
                  "transition-colors",
                  isUpdateFromToday(complaint.lastUpdate) && "bg-blue-50/50"
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
                      <div className="flex items-center gap-1 group cursor-pointer">
                        <Button
                          variant="ghost"
                          className="font-medium relative"
                        >
                          {complaint.id}
                          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 
                            group-hover:w-full" />
                        </Button>
                        <Eye className="h-4 w-4 text-gray-400 transition-all duration-200 
                          group-hover:text-blue-500" />
                      </div>
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
                                {complaint.lastActivity.description}
                                <span className="text-gray-500 ml-2 text-xs">
                                  {`(${complaint.lastActivity.date} ${complaint.lastActivity.time})`}
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
                <TableCell className="text-left px-6">{complaint.companyName}</TableCell>
                <TableCell className="text-left px-6">{complaint.victimName}</TableCell>
                <TableCell className="text-left px-6">
                  <div className="flex items-center gap-2 group">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[complaint.status as StatusType]?.bg || 'bg-gray-100'
                        } ${statusColors[complaint.status as StatusType]?.text || 'text-gray-800'
                        } ${statusColors[complaint.status as StatusType]?.hover || 'hover:bg-gray-200'
                        }`}
                    >
                      {statusAliases[complaint.status as StatusType] || complaint.status}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-help">
                            <InfoIcon className="h-4 w-4 text-gray-400 transition-all duration-200 
                              group-hover:text-gray-600 group-hover:scale-110
                              animate-pulse-subtle" />
                            <div className="h-[2px] w-0 bg-gray-400 transition-all duration-200 
                              group-hover:w-full group-hover:bg-gray-600" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-white p-3 shadow-lg border rounded-lg max-w-xs"
                          sideOffset={5}
                        >
                          <div className="space-y-2">
                            <p className="font-medium text-sm">
                              {statusAliases[complaint.status as StatusType]}
                            </p>
                            <p className="text-xs text-gray-600">
                              {getStatusDescription(complaint.status as StatusType)}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell className="text-left px-6">
                  {formatDate(complaint.entryDate)}
                </TableCell>
                <TableCell className="text-left px-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getDueStatus(complaint.dueDate) === 'onTime' ? 'bg-green-500' :
                      getDueStatus(complaint.dueDate) === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                    {formatDate(complaint.dueDate)}
                  </div>
                </TableCell>
                <TableCell className="text-center px-6">
                  <span className="text-sm font-medium">{complaint.step}</span>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="default"
                          size="icon"
                          className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsDetailModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent
                        className="bg-white p-2 shadow-lg border rounded-lg"
                        sideOffset={5}
                      >
                        <p className="text-sm">Ver Detalle Denuncia</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Renderizar el modal */}
      {selectedComplaint && (
        <DetailModal
          complaint={selectedComplaint}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onEdit={handleEditComplaint}
          isLoading={isLoading}
        />
      )}

      {isLoading && <Spinner />}
    </>
  );
} 