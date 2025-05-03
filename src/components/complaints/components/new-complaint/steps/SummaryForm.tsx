"use client";

import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SummaryFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function SummaryForm({ formData, updateFormData }: SummaryFormProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Resumen, constancias y firma del acta</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Resumen de 900 carácteres sobre la Denuncia:
        </p>
        <Textarea
          placeholder="Escribe acá el resumen..."
          value={formData.summary || ''}
          onChange={(e) => updateFormData({ summary: e.target.value })}
          className="min-h-[160px] bg-white border-gray-200 resize-none"
        />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Se ha informado al denunciante la opción relativa a que la investigación a que da origen la denuncia puede ser desarrollada por la Empresa o derivada a la Dirección del Trabajo, manifestando que ha decidido que la investigación sea llevada a cabo por:
        </p>

        <RadioGroup
          value={formData.investigationBy || ""}
          onValueChange={(value) => updateFormData({ investigationBy: value })}
          className="space-y-2"
        >
          <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.investigationBy === "employer" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
            <RadioGroupItem 
              value="employer" 
              id="employer"
              className="mt-1"
            />
            <label htmlFor="employer" className="text-sm text-gray-900">
              {formData.employer || '[Empleador seleccionado en el paso 1]'}
            </label>
          </div>

          <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.investigationBy === "labor_direction" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
            <RadioGroupItem 
              value="labor_direction" 
              id="labor_direction"
              className="mt-1"
            />
            <label htmlFor="labor_direction" className="text-sm text-gray-900">
              Dirección del trabajo
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4 text-sm text-gray-600">
        <p>
          En caso de que la opción marcada corresponda al Empleador, el denunciante acepta y autoriza que la investigación correlativa a la presente denuncia será llevada a cabo por [Nombre completo, correo y RUT de RLE], representante laboral electrónico interno. Designación que además es aceptada por el/la denunciante sin formular reparos a su respecto.
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Se ha informado al denunciante sobre el procedimiento de investigación y los plazos involucrados.</li>
          
          <li>
            <div>La presente Acta de Denuncia se levantó con fecha y hora:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white border-gray-200 [&>*]:bg-white",
                      !formData.actDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.actDate ? (
                      format(formData.actDate, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.actDate}
                    onSelect={(date) => updateFormData({ actDate: date })}
                    initialFocus
                    locale={es}
                    className="bg-white rounded-md border-0"
                  />
                </PopoverContent>
              </Popover>

              <div className="flex gap-2 items-center">
                <Select
                  value={formData.actHour}
                  onValueChange={(value) => updateFormData({ actHour: value })}
                >
                  <SelectTrigger className="w-full bg-white border-gray-200 [&>*]:bg-white">
                    <SelectValue placeholder="Hora" />
                  </SelectTrigger>
                  <SelectContent side="bottom" align="center" className="bg-white">
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour} className="bg-white hover:bg-gray-100">
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>:</span>
                <Select
                  value={formData.actMinute}
                  onValueChange={(value) => updateFormData({ actMinute: value })}
                >
                  <SelectTrigger className="w-full bg-white border-gray-200 [&>*]:bg-white">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent side="bottom" align="center" className="bg-white">
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute} className="bg-white hover:bg-gray-100">
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </li>

          <li>Se deja constancia que se ha entregado a la denunciante una copia de la presente Acta, suscrita y firmada por ésta y por quien la recepciona.</li>
        </ul>
      </div>
    </div>
  );
} 