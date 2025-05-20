"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft } from "lucide-react";
import { SummaryFormData } from "@/interfaces/complaints/forms/summary";
import { StepProps } from "@/interfaces/complaints/forms/forms";
import { cn } from "@/lib/utils";
import { useSummaryFormValidation } from "../complements/hooks/useSummaryFormValidation";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: SummaryFormData;
  onNext: (data: SummaryFormData) => void;
  onBack: () => void;
  employerName: string;
}

export const SummaryForm = ({ defaultValues, onNext, onBack, employerName }: Props) => {
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm
  } = useSummaryFormValidation(defaultValues);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-lg font-semibold mb-4">Resumen, constancias y firma del acta</h2>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Resumen de 900 caracteres sobre la Denuncia:
            </p>
            <Textarea
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              onBlur={() => handleBlur('summary')}
              placeholder="Escribe acá el resumen..."
              className="min-h-[120px] w-full"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-3">
              Se ha informado al denunciante la opción relativa a que la investigación a que da origen la denuncia
              puede ser desarrollada por la Empresa o derivada a la Dirección del Trabajo, manifestando que ha
              decidido que la investigación sea llevada a cabo por:
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 bg-white rounded border">
                <input
                  type="radio"
                  id="employer"
                  name="investigationType"
                  value="employer"
                  checked={formData.investigationType === 'employer'}
                  onChange={(e) => handleChange('investigationType', e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="employer" className="flex-1 text-sm cursor-pointer">
                  {employerName || '[Empleador seleccionado en el paso 1]'}
                </label>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white rounded border">
                <input
                  type="radio"
                  id="labor_direction"
                  name="investigationType"
                  value="labor_direction"
                  checked={formData.investigationType === 'labor_direction'}
                  onChange={(e) => handleChange('investigationType', e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="labor_direction" className="flex-1 text-sm cursor-pointer">
                  Dirección del trabajo
                </label>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-4">
              En caso de que la opción marcada corresponda al Empleador, el denunciante acepta y autoriza que la
              investigación correlativa a la presente denuncia será llevada a cabo por <strong>[Nombre completo, correo y
                RUT de RLE]</strong>, representante laboral electrónico interno. Designación que además es aceptada por el/la
              denunciante sin formular reparos a su respecto.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">• Se ha informado al denunciante sobre el procedimiento de investigación y los plazos involucrados.</p>
            <p className="text-sm text-gray-600 mt-2 mb-3">• La presente Acta de Denuncia se levantó con fecha y hora:</p>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={formData.actDate ? formData.actDate.toISOString().split('T')[0] : ''}
                onChange={(e) => handleChange('actDate', new Date(e.target.value))}
                onBlur={() => handleBlur('actDate')}
                className="w-full px-3 py-2 border rounded"
                placeholder="Selecciona una fecha"
              />
              <Input
                type="time"
                value={formData.actTime}
                onChange={(e) => handleChange('actTime', e.target.value)}
                onBlur={() => handleBlur('actTime')}
                className="w-full px-3 py-2 border rounded"
                placeholder="Selecciona una hora"
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">
              • Se deja constancia que se ha entregado a la denunciante una copia de la presente Acta, suscrita y
              firmada por ésta y por quien la recepciona.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
        >
          Atrás
        </Button>

        <Button
          type="button"
          onClick={() => validateForm(formData) && onNext(formData)}
          disabled={!formData.summary || !formData.investigationType || !formData.actDate || !formData.actTime}
          className={cn(
            "px-4 py-2 rounded",
            formData.summary && formData.investigationType && formData.actDate && formData.actTime
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          )}
        >
          Revisar
        </Button>
      </div>
    </div>
  );
}; 