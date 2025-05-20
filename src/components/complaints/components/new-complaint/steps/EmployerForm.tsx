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

interface EmployerFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function EmployerForm({ formData, updateFormData }: EmployerFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Selección de empleador</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm text-gray-600 font-medium">
            Selecciona un empleador
          </Label>
          <Select
            value={formData.employer}
            onValueChange={(value) => updateFormData({ employer: value })}
          >
            <SelectTrigger className="w-full bg-white border-gray-200 [&>*]:bg-white">
              <SelectValue placeholder="Selecciona un empleador de la lista" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="emp1" className="bg-white hover:bg-gray-100">Empleador 1</SelectItem>
              <SelectItem value="emp2" className="bg-white hover:bg-gray-100">Empleador 2</SelectItem>
              <SelectItem value="emp3" className="bg-white hover:bg-gray-100">Empleador 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600 font-medium">
            Fecha de ingreso de la denuncia
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-white border-gray-200",
                  !formData.date && "text-muted-foreground"
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
                onSelect={(date) => updateFormData({ date })}
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
} 