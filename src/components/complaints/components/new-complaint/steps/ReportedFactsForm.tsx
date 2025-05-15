"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { StepProps } from "@/interfaces/complaints/forms";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: ReportedFactsFormData;
  onNext: (data: ReportedFactsFormData) => void;
}

export const ReportedFactsForm = ({ onNext, onBack, defaultValues }: Props) => {
  const handleInputChange = (field: keyof ReportedFactsFormData, value: any) => {
    const updatedValues: ReportedFactsFormData = {
      ...defaultValues,
      [field]: value
    };
    onNext(updatedValues);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Hechos denunciados</h2>

      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Entrevista de la víctima y detalles de los sucesos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Fecha de los hechos</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-gray-200",
                    !defaultValues.date && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {defaultValues.date ? (
                    format(defaultValues.date, "PPP", { locale: es })
                  ) : (
                    "Selecciona una fecha"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={defaultValues.date}
                  onSelect={(date) => handleInputChange('date', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Lugar de los hechos</Label>
            <Input
              placeholder="ej: Oficina central"
              value={defaultValues.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="bg-white border-gray-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Comuna</Label>
            <Input
              placeholder="ej: Santiago"
              value={defaultValues.commune}
              onChange={(e) => handleInputChange('commune', e.target.value)}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Calle</Label>
            <Input
              placeholder="ej: Avenida Central"
              value={defaultValues.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Número</Label>
            <Input
              placeholder="ej: 1212"
              value={defaultValues.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              className="bg-white border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Referencias de la dirección</Label>
          <Input
            placeholder="ej: Oficina central"
            value={defaultValues.addressReference}
            onChange={(e) => handleInputChange('addressReference', e.target.value)}
            className="bg-white border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Desarrollo de los hechos</Label>
          <Textarea
            placeholder="Desarrolla lo más detalladamente los hechos que deben ser investigados:"
            value={defaultValues.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="min-h-[160px] bg-white border-gray-200 resize-none"
          />
        </div>
      </div>
    </div>
  );
}; 