"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { EmployerFormData, defaultEmployerFormData } from "@/interfaces/complaints/forms/employer";
import { StepProps } from "@/interfaces/complaints/forms";
import { useState, useEffect } from "react";
import { employers } from "../complements/data/mockData";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: EmployerFormData;
  onNext: (data: EmployerFormData) => void;
}

export const EmployerForm = ({ onNext, defaultValues }: Props) => {
  const [formData, setFormData] = useState<EmployerFormData>({
    ...defaultEmployerFormData,
    employer: '',
    date: defaultValues?.date || new Date()
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(formData.employer !== '');
  }, [formData.employer]);

  const handleEmployerChange = (value: string) => {
    const updatedData = {
      ...formData,
      employer: value
    };
    setFormData(updatedData);
    onNext(updatedData);
  };

  const handleDateChange = (date: Date | undefined) => {
    const today = new Date();

    if (date && date <= today) {
      const updatedData = {
        ...formData,
        date
      };
      setFormData(updatedData);
      onNext(updatedData);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Selección de empleador</h2>

      <div className="space-y-4 w-full">
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Selecciona un empleador</Label>
          <div className="relative">
            <Select
              value={formData.employer}
              onValueChange={handleEmployerChange}
            >
              <SelectTrigger className="w-full h-10 bg-white border border-gray-200 rounded-md text-sm">
                <SelectValue placeholder="Selecciona un empleador de la lista" />
              </SelectTrigger>
              <SelectContent
                className="bg-white w-full"
                position="popper"
                sideOffset={4}
              >
                {employers.map((employer) => (
                  <SelectItem
                    key={employer.id}
                    value={employer.id}
                    className="text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {employer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">
            Fecha de ingreso de la denuncia
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-10 justify-between text-left font-normal bg-white border border-gray-200 text-gray-500 hover:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
                  !formData.date && "text-gray-500"
                )}
              >
                {formData.date ? (
                  <span className="text-gray-900">
                    {format(formData.date, "dd/MM/yyyy", { locale: es })}
                  </span>
                ) : (
                  <span className="text-gray-500">Selecciona una fecha</span>
                )}
                <CalendarIcon className="h-4 w-4 text-gray-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={handleDateChange}
                initialFocus
                locale={es}
                className="bg-white rounded-md border-0"
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}; 