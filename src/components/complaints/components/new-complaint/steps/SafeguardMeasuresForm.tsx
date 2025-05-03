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

interface SafeguardMeasuresFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function SafeguardMeasuresForm({ formData, updateFormData }: SafeguardMeasuresFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Definición de medidas de resguardo</h2>

      <RadioGroup
        value={formData.safeguardMeasure || ""}
        onValueChange={(value) => updateFormData({ safeguardMeasure: value })}
        className="space-y-2"
      >
        <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.safeguardMeasure === "workspace_separation" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
          <RadioGroupItem 
            value="workspace_separation" 
            id="workspace_separation"
            className="mt-1"
          />
          <label 
            htmlFor="workspace_separation" 
            className="text-sm text-gray-900"
          >
            Separación de espacios de trabajo
          </label>
        </div>

        <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.safeguardMeasure === "schedule_modification" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
          <RadioGroupItem 
            value="schedule_modification" 
            id="schedule_modification"
            className="mt-1"
          />
          <label 
            htmlFor="schedule_modification" 
            className="text-sm text-gray-900"
          >
            Modificación de jornadas
          </label>
        </div>

        <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.safeguardMeasure === "psychological_care" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
          <RadioGroupItem 
            value="psychological_care" 
            id="psychological_care"
            className="mt-1"
          />
          <label 
            htmlFor="psychological_care" 
            className="text-sm text-gray-900"
          >
            Atención psicológica
          </label>
        </div>

        <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.safeguardMeasure === "other" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
          <RadioGroupItem 
            value="other" 
            id="other"
            className="mt-1"
          />
          <div className="flex-1 flex gap-4">
            <label 
              htmlFor="other" 
              className="text-sm text-gray-900"
            >
              Otro
            </label>
            {formData.safeguardMeasure === "other" && (
              <Input
                placeholder="Indique cuál..."
                value={formData.otherMeasure || ''}
                onChange={(e) => updateFormData({ otherMeasure: e.target.value })}
                className="flex-1 bg-white border-gray-200"
              />
            )}
          </div>
        </div>
      </RadioGroup>

      <div className="pt-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Medidas de resguardo adoptadas por:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Nombre</label>
            <Input 
              placeholder="ej: Juan Pablo"
              value={formData.safeguardResponsible || ''}
              onChange={(e) => updateFormData({ safeguardResponsible: e.target.value })}
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
                    !formData.safeguardDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.safeguardDate ? (
                    format(formData.safeguardDate, "PPP", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={formData.safeguardDate}
                  onSelect={(date) => updateFormData({ safeguardDate: date })}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
} 