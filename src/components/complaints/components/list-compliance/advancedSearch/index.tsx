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
import { CalendarIcon, Filter, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { complaintsMockData } from "@/components/complaints/components/list-compliance/complements/data/mockData";
import { Calendar } from "@/components/ui/calendar";

interface AdvancedSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  onApplyFilters: (filters: {
    employer?: string;
    complainant?: string;
    status?: string;
    dateRange?: DateRange;
  }) => void;
}

export const AdvancedSearch = React.forwardRef<HTMLDivElement, AdvancedSearchProps>(
  ({ onApplyFilters, ...props }, ref) => {
    const [selectedStatus, setSelectedStatus] = React.useState<string>();
    const [selectedEmployer, setSelectedEmployer] = React.useState<string>();
    const [selectedComplainant, setSelectedComplainant] = React.useState<string>();
    const [dateFrom, setDateFrom] = useState<Date>();
    const [dateTo, setDateTo] = useState<Date>();

    const uniqueEmployers = Array.from(new Set(complaintsMockData.map(c => c.companyName)));
    const uniqueComplainants = Array.from(new Set(complaintsMockData.map(c => c.victimName)));
    const uniqueStatuses = Array.from(new Set(complaintsMockData.map(c => c.status.toLowerCase())));

    const handleApplyFilters = () => {
      console.log('Filtros aplicados:', {
        status: selectedStatus,
        employer: selectedEmployer,
        complainant: selectedComplainant,
        dateRange: dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined,
      });
      onApplyFilters({
        status: selectedStatus,
        employer: selectedEmployer,
        complainant: selectedComplainant,
        dateRange: dateFrom && dateTo ? { from: dateFrom, to: dateTo } : undefined,
      });
    };

    const renderDatePicker = (
      label: string,
      date: Date | undefined,
      setDate: (date: Date | undefined) => void,
      placeholder: string
    ) => (
      <div>
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal mt-1.5 bg-white border-gray-200"
            >
              {date ? format(date, "dd/MM/yy") : <span className="text-gray-500">{placeholder}</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white border border-gray-200">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );

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
            </div>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="space-y-4">
              {/* Empleador */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Empleador</Label>
                <Select onValueChange={setSelectedEmployer}>
                  <SelectTrigger className="mt-1.5 w-full bg-white border-gray-200">
                    <SelectValue placeholder="Selecciona un empleador de la lista" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    {uniqueEmployers.map(employer => (
                      <SelectItem key={employer} value={employer}>
                        {employer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Empleador */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Denunciante</Label>
                <Select onValueChange={setSelectedComplainant}>
                  <SelectTrigger className="mt-1.5 w-full bg-white border-gray-200">
                    <SelectValue placeholder="Selecciona un denunciante de la lista" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    {uniqueComplainants.map(name => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Estado */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Estado</Label>
                <Select onValueChange={setSelectedStatus}>
                  <SelectTrigger className="mt-1.5 w-full bg-white border-gray-200">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    {uniqueStatuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Rango de fechas */}
              <div className="grid grid-cols-2 gap-4">
                {renderDatePicker("Fecha desde", dateFrom, setDateFrom, "Ej. 12/12/12")}
                {renderDatePicker("Fecha hasta", dateTo, setDateTo, "Ej. 12/01/13")}
              </div>
            </div>
          </div>
          {/* Botones */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleApplyFilters}
            >
              Guardar filtros
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
});

AdvancedSearch.displayName = "AdvancedSearch"; 