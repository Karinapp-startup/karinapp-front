"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EmployerFormData } from "@/interfaces/complaints/forms/employer";
import { StepProps } from "@/interfaces/complaints/forms/forms";
import { cn } from "@/lib/utils";
import { useEmployerFormValidation } from "../complements/hooks/useEmployerFormValidation";
import { validateEmployerForm } from "../complements/utils/validations";
import { employers } from "../complements/data/mockData";
import { EmployerFormValidation } from "../complements/hooks/useEmployerFormValidation";

interface Props {
  defaultValues: EmployerFormData;
  onNext: (data: EmployerFormData) => void;
  onBack?: () => void;
  validation: EmployerFormValidation;
}

interface Employer {
  id: string;
  name: string;
}

export const EmployerForm = ({ defaultValues, onNext, onBack, validation }: Props) => {
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm
  } = validation;

  const handleSelectChange = (value: string) => {
    handleChange('employer', value);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      handleChange('date', date);
    }
  };

  const handleNext = () => {
    console.log('EmployerForm - handleNext called');
    console.log('Form data:', formData);
    console.log('Is valid:', isValid);

    if (validateForm()) {
      console.log('Form is valid, calling onNext');
      onNext(formData);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Datos del Empleador</h2>

      <div className="space-y-4 w-full">
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">
            Selecciona un empleador
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Select
              value={formData.employer}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full h-10 bg-white border border-gray-200 rounded-md text-sm">
                <SelectValue placeholder="Selecciona un empleador" />
              </SelectTrigger>
              <SelectContent
                className="bg-white w-full"
                position="popper"
                sideOffset={4}
              >
                <SelectItem value="select" disabled>
                  Selecciona un empleador
                </SelectItem>
                {employers.map((employer: Employer) => (
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
            <span className="text-red-500 ml-1">*</span>
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
                onSelect={handleDateSelect}
                initialFocus
                locale={es}
                className="bg-white rounded-md border-0"
                disabled={(date: Date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="text-gray-700 border border-gray-300 flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Atrás
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}; 