"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export const AdvancedSearch = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string>();
  const [dateRange, setDateRange] = React.useState<DateRange>();

  const handleApplyFilters = () => {
    console.log('Filtros aplicados:', {
      status: selectedStatus,
      dateRange: {
        from: dateRange?.from ? format(dateRange.from, 'dd/MM/yyyy') : null,
        to: dateRange?.to ? format(dateRange.to, 'dd/MM/yyyy') : null,
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros avanzados
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-lg border-0" ref={ref}>
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Filtros avanzados</DialogTitle>
            <DialogClose className="text-gray-400 hover:text-gray-500">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Estado</Label>
              <Select onValueChange={setSelectedStatus}>
                <SelectTrigger className="mt-1.5 w-full bg-white border-gray-200">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="ingresada" className="hover:bg-gray-50">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-orange-200" />
                      <span className="font-medium text-gray-700">Ingresada</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="finalizada" className="hover:bg-gray-50">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-green-200" />
                      <span className="font-medium text-gray-700">Finalizada</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="derivada" className="hover:bg-gray-50">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-blue-200" />
                      <span className="font-medium text-gray-700">Derivada</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="incompleta" className="hover:bg-gray-50">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-purple-500 ring-2 ring-purple-200" />
                      <span className="font-medium text-gray-700">Incompleta</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="revisada" className="hover:bg-gray-50">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 ring-2 ring-yellow-200" />
                      <span className="font-medium text-gray-700">Revisada</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Rango de fechas</Label>
              <div className="mt-1.5">
                <DatePickerWithRange onChange={setDateRange} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleApplyFilters}
          >
            Aplicar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

AdvancedSearch.displayName = "AdvancedSearch"; 