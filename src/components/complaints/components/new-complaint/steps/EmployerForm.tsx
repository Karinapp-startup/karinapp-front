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

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: EmployerFormData;
  onNext: (data: EmployerFormData) => void;
}

export const EmployerForm = ({ onNext, onBack, defaultValues }: Props) => {
  const [formData, setFormData] = useState<EmployerFormData>({
    ...defaultEmployerFormData,
    employer: defaultValues?.employer || 'select',
    date: defaultValues?.date || new Date()
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(formData.employer !== 'select');
  }, [formData.employer]);

  const handleEmployerChange = (value: string) => {
    const updatedData = {
      ...formData,
      employer: value
    };
    setFormData(updatedData);
    onNext(updatedData);
  };

  const getEmployerLabel = (value: string) => {
    switch (value) {
      case '1':
        return 'Empleador 1';
      case '2':
        return 'Empleador 2';
      case '3':
        return 'Empleador 3';
      default:
        return 'Selecciona un empleador de la lista';
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const updatedData = {
        ...formData,
        date
      };
      setFormData(updatedData);
      onNext(updatedData);
    }
  };

  const handleNext = () => {
    if (isValid) {
      onNext(formData);
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
              <SelectTrigger className="w-full h-10 bg-white border-gray-200">
                <SelectValue>
                  {getEmployerLabel(formData.employer)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent
                className="bg-white w-full"
                position="popper"
                sideOffset={4}
              >
                <SelectItem
                  value="select"
                  disabled
                  className="text-gray-500 bg-white hover:bg-white cursor-default"
                >
                  Selecciona un empleador de la lista
                </SelectItem>
                <SelectItem
                  value="1"
                  className="bg-white hover:bg-gray-50"
                >
                  Empleador 1
                </SelectItem>
                <SelectItem
                  value="2"
                  className="bg-white hover:bg-gray-50"
                >
                  Empleador 2
                </SelectItem>
                <SelectItem
                  value="3"
                  className="bg-white hover:bg-gray-50"
                >
                  Empleador 3
                </SelectItem>
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
                  "w-full h-10 justify-start text-left font-normal bg-white border-gray-200",
                  !formData.date && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? (
                  format(formData.date, "PPP", { locale: es })
                ) : (
                  <span>Selecciona una fecha</span>
                )}
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
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>


    </div>
  );
}; 