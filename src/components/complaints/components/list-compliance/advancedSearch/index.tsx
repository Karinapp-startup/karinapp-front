"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ComplaintType, statusAliases, StatusType } from "../complements/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import { Label } from "@/components/ui/label";

interface AdvancedSearchProps {
  onApplyFilters: (filters: {
    employer?: string;
    complainant?: string;
    status?: string;
    dateRange?: DateRange;
  }) => void;
  complaints: ComplaintType[];
}

const statusColors: Record<StatusType, string> = {
  'recibida': 'text-purple-600 bg-purple-50',
  'finalizada': 'text-green-600 bg-green-50',
  'en_proceso': 'text-blue-600 bg-blue-50',
  'derivada_dt': 'text-orange-600 bg-orange-50',
  'adopcion_sanciones': 'text-red-600 bg-red-50',
  'esperando_dt': 'text-yellow-600 bg-yellow-50',
  'observaciones_dt': 'text-gray-600 bg-gray-50',
  'aviso_inicio_investigacion': 'text-indigo-600 bg-indigo-50'
};

const getStatusColor = (status: string): string => {
  const normalizedStatus = status.toLowerCase().replace(' ', '_') as StatusType;
  return statusColors[normalizedStatus] || 'bg-white hover:bg-gray-50';
};

export function AdvancedSearch({ onApplyFilters, complaints = [] }: AdvancedSearchProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    employer: "",
    complainant: "",
    status: "",
    dateRange: undefined as DateRange | undefined,
  });
  const [date, setDate] = useState<DateRange | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const uniqueEmployers = useMemo(() =>
    Array.from(new Set((complaints || []).map(c => c.companyName))).sort()
    , [complaints]);

  const uniqueComplainants = useMemo(() =>
    Array.from(new Set((complaints || []).map(c => c.victimName))).sort()
    , [complaints]);

  const uniqueStatuses = useMemo(() =>
    Array.from(new Set((complaints || []).map(c => c.status))).sort()
    , [complaints]);

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Filtros avanzados</Button>
      </DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Filtros avanzados</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Empleador</label>
            <Select
              value={filters.employer}
              onValueChange={(value) =>
                setFilters({ ...filters, employer: value })
              }
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Selecciona un empleador de la lista" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {uniqueEmployers.map(employer => (
                  <SelectItem key={employer} value={employer} className="bg-white hover:bg-gray-50">
                    {employer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Denunciante</label>
            <Select
              value={filters.complainant}
              onValueChange={(value) =>
                setFilters({ ...filters, complainant: value })
              }
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Selecciona un denunciante de la lista" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {uniqueComplainants.map(complainant => (
                  <SelectItem key={complainant} value={complainant} className="bg-white hover:bg-gray-50">
                    {complainant}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Estado</label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {uniqueStatuses.map(status => (
                  <SelectItem
                    key={status}
                    value={status.toLowerCase()}
                    className={`${getStatusColor(status)} rounded-md px-2 py-1 my-1`}
                  >
                    {statusAliases[status as StatusType] || status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Plazo de vencimiento</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border-gray-200",
                        !filters.dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
                      <span className="truncate">
                        {filters.dateRange?.from ? (
                          format(filters.dateRange.from, "PPP", { locale: es })
                        ) : (
                          "Selecciona fecha desde"
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white border border-gray-200 shadow-lg"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={filters.dateRange?.from}
                      onSelect={(date) => {
                        setFilters({
                          ...filters,
                          dateRange: {
                            ...filters.dateRange,
                            from: date || new Date(),
                          } as DateRange,
                        });
                        // Cerrar el popover después de seleccionar
                        const popover = document.activeElement as HTMLElement;
                        popover?.blur();
                      }}
                      initialFocus
                      className="bg-white rounded-lg"
                      locale={es}
                      classNames={{
                        day_selected: "bg-blue-600 text-white",
                        day_today: "bg-gray-100 text-gray-900",
                      }}
                      formatters={{
                        formatCaption: (date, options) => {
                          return format(date, "LLLL yyyy", { locale: es }).replace(/^\w/, c => c.toUpperCase());
                        },
                        formatWeekdayName: (date) => {
                          return format(date, "EEEEEE", { locale: es }).toUpperCase();
                        },
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-full sm:w-1/2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border-gray-200",
                        !filters.dateRange?.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
                      <span className="truncate">
                        {filters.dateRange?.to ? (
                          format(filters.dateRange.to, "PPP", { locale: es })
                        ) : (
                          "Selecciona fecha hasta"
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white border border-gray-200 shadow-lg"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={filters.dateRange?.to}
                      onSelect={(date) => {
                        setFilters({
                          ...filters,
                          dateRange: {
                            ...filters.dateRange,
                            to: date || addDays(new Date(), 7),
                          } as DateRange,
                        });
                        // Cerrar el popover después de seleccionar
                        const popover = document.activeElement as HTMLElement;
                        popover?.blur();
                      }}
                      initialFocus
                      className="bg-white rounded-lg"
                      locale={es}
                      classNames={{
                        day_selected: "bg-blue-600 text-white",
                        day_today: "bg-gray-100 text-gray-900",
                      }}
                      formatters={{
                        formatCaption: (date, options) => {
                          return format(date, "LLLL yyyy", { locale: es }).replace(/^\w/, c => c.toUpperCase());
                        },
                        formatWeekdayName: (date) => {
                          return format(date, "EEEEEE", { locale: es }).toUpperCase();
                        },
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setFilters({
                employer: "",
                complainant: "",
                status: "",
                dateRange: undefined,
              });
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setFilters({
                employer: "",
                complainant: "",
                status: "",
                dateRange: undefined,
              });
              onApplyFilters({
                employer: "",
                complainant: "",
                status: "",
                dateRange: undefined,
              });
            }}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Limpiar filtros
          </Button>
          <Button onClick={handleApplyFilters} className="bg-blue-600 text-white">
            Guardar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 