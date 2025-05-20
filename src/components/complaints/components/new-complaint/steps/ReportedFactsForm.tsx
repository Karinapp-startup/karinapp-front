"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { StepProps } from "@/interfaces/complaints/forms/forms";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useReportedFactsValidation } from "../complements/hooks/useReportedFactsValidation";
import { validateReportedFactsForm } from "../complements/utils/validations";
import { ChevronLeft } from "lucide-react";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: ReportedFactsFormData;
  onNext: (data: ReportedFactsFormData) => void;
  onBack: () => void;
  validation: ReturnType<typeof useReportedFactsValidation>;
}

export const ReportedFactsForm = ({ defaultValues, onNext, onBack, validation }: Props) => {
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur
  } = validation;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      handleChange('date', date);
    }
  };

  const handleInputChange = (field: keyof ReportedFactsFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(field, e.target.value);
  };

  const canAdvanceToNextStep = () => {
    return isValid;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Hechos denunciados</h2>

      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Entrevista de la víctima y detalles de los sucesos
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Fecha de los hechos</Label>
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
            {touched.date && errors.date && (
              <span className="text-sm text-red-500">{errors.date}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Lugar de los hechos</Label>
            <Input
              placeholder="ej: Oficina central"
              value={formData.location}
              onChange={handleInputChange('location')}
              onBlur={() => handleBlur('location')}
              className="bg-white border-gray-200"
            />
            {touched.location && errors.location && (
              <span className="text-sm text-red-500">{errors.location}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Comuna</Label>
            <Input
              placeholder="ej: Santiago"
              value={formData.commune}
              onChange={handleInputChange('commune')}
              onBlur={() => handleBlur('commune')}
              className="bg-white border-gray-200"
            />
            {touched.commune && errors.commune && (
              <span className="text-sm text-red-500">{errors.commune}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Calle</Label>
            <Input
              placeholder="ej: Avenida Central"
              value={formData.street}
              onChange={handleInputChange('street')}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Número</Label>
            <Input
              placeholder="ej: 1212"
              value={formData.number}
              onChange={handleInputChange('number')}
              className="bg-white border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Referencias de la dirección</Label>
          <Input
            placeholder="ej: Oficina central"
            value={formData.addressReference}
            onChange={handleInputChange('addressReference')}
            className="bg-white border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Desarrollo de los hechos</Label>
          <Textarea
            placeholder="Desarrolla lo más detalladamente los hechos que deben ser investigados:"
            value={formData.description}
            onChange={handleInputChange('description')}
            onBlur={() => handleBlur('description')}
            className="min-h-[160px] bg-white border-gray-200 resize-none"
          />
          {touched.description && errors.description && (
            <span className="text-sm text-red-500">{errors.description}</span>
          )}
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
          onClick={() => onNext(formData)}
          disabled={!canAdvanceToNextStep()}
          className={cn(
            "px-6",
            canAdvanceToNextStep()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}; 