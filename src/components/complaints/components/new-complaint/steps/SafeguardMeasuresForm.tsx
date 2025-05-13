"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  SafeguardMeasuresFormData,
  SafeguardMeasureType,
  safeguardMeasureOptions
} from "@/interfaces/complaints/forms/safeguard";
import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: SafeguardMeasuresFormData;
  onNext: (data: SafeguardMeasuresFormData) => void;
}

export const SafeguardMeasuresForm = ({ onNext, onBack, defaultValues }: Props) => {
  const handleMeasureChange = (value: SafeguardMeasureType) => {
    const updatedValues: SafeguardMeasuresFormData = {
      ...defaultValues,
      safeguardMeasure: value,
      otherMeasure: value !== 'other' ? undefined : defaultValues.otherMeasure
    };
    onNext(updatedValues);
  };

  const handleOtherMeasureChange = (value: string) => {
    const updatedValues: SafeguardMeasuresFormData = {
      ...defaultValues,
      otherMeasure: value
    };
    onNext(updatedValues);
  };

  const handleResponsibleChange = (value: string) => {
    const updatedValues: SafeguardMeasuresFormData = {
      ...defaultValues,
      safeguardResponsible: value
    };
    onNext(updatedValues);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const updatedValues: SafeguardMeasuresFormData = {
        ...defaultValues,
        safeguardDate: date
      };
      onNext(updatedValues);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Definición de medidas de resguardo</h2>

      <RadioGroup
        value={defaultValues.safeguardMeasure}
        onValueChange={handleMeasureChange}
        className="space-y-2"
      >
        {safeguardMeasureOptions.map((option) => (
          <div
            key={option.value}
            className={`flex items-start gap-2 p-4 rounded-lg ${defaultValues.safeguardMeasure === option.value
              ? "bg-blue-50 border border-blue-100"
              : "bg-white border border-gray-200"
              }`}
          >
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="mt-1"
            />
            <div className="flex-1 flex gap-4">
              <label
                htmlFor={option.value}
                className="text-sm text-gray-900"
              >
                {option.label}
              </label>
              {option.value === "other" && defaultValues.safeguardMeasure === "other" && (
                <Input
                  placeholder="Indique cuál..."
                  value={defaultValues.otherMeasure || ''}
                  onChange={(e) => handleOtherMeasureChange(e.target.value)}
                  className="flex-1 bg-white border-gray-200"
                />
              )}
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="pt-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Medidas de resguardo adoptadas por:</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Nombre</label>
            <Input
              placeholder="ej: Juan Pablo"
              value={defaultValues.safeguardResponsible}
              onChange={(e) => handleResponsibleChange(e.target.value)}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Medidas adoptas desde</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-gray-200",
                    !defaultValues.safeguardDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {defaultValues.safeguardDate ? (
                    format(defaultValues.safeguardDate, "PPP", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={defaultValues.safeguardDate}
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
    </div>
  );
}; 