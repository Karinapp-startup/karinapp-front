"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { SafeguardMeasuresFormData } from "@/interfaces/complaints/forms/safeguard";
import { StepProps } from "@/interfaces/complaints/forms/forms";
import { cn } from "@/lib/utils";
import { useSafeguardMeasuresValidation } from "../complements/hooks/useSafeguardMeasuresValidation";
import { SAFEGUARD_MEASURE_OPTIONS } from "../complements/data/constants";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: SafeguardMeasuresFormData;
  onNext: (data: SafeguardMeasuresFormData) => void;
  onBack: () => void;
  validation: ReturnType<typeof useSafeguardMeasuresValidation>;
}

export const SafeguardMeasuresForm = ({ defaultValues, onNext, onBack, validation }: Props) => {
  const {
    formData,
    errors,
    touched,
    isValid,
    toggleMeasure,
    handleChange,
    handleBlur,
    addMeasure
  } = validation;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Definición de medidas de resguardo</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Selecciona una o varias medidas
            </p>
            <div className="space-y-2">
              {SAFEGUARD_MEASURE_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className="flex items-start gap-3"
                >
                  <input
                    type="checkbox"
                    id={`measure-${option.value}`}
                    checked={formData.selectedMeasures.includes(option.value)}
                    onChange={() => toggleMeasure(option.value)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={`measure-${option.value}`}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    {option.value === 'other' && formData.selectedMeasures.includes('other') && (
                      <Input
                        value={formData.otherMeasure}
                        onChange={(e) => handleChange('otherMeasure', e.target.value)}
                        onBlur={() => handleBlur('otherMeasure')}
                        placeholder="Indique cuál..."
                        className="mt-2"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">
              Ingresa el nombre de quien la(s) tomó y desde qué fecha
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nombre</Label>
                <Input
                  value={formData.safeguardResponsible}
                  onChange={(e) => handleChange('safeguardResponsible', e.target.value)}
                  onBlur={() => handleBlur('safeguardResponsible')}
                  placeholder="ej: Juan Pablo"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Medidas adoptas desde</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.safeguardDate ? formData.safeguardDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleChange('safeguardDate', new Date(e.target.value))}
                    onBlur={() => handleBlur('safeguardDate')}
                    className="mt-1 w-full"
                  />
                  {!formData.safeguardDate && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 mt-1">
                      Selecciona una fecha
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {formData.measures.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Medidas de resguardo adoptadas</h3>
              <div className="bg-white rounded-lg border">
                <div className="grid grid-cols-3 gap-4 p-3 border-b bg-gray-50 text-sm font-medium text-gray-600">
                  <div>Tipo de medida</div>
                  <div>Adoptada por</div>
                  <div>Desde</div>
                </div>
                <div className="divide-y">
                  {formData.measures.map((measure, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 p-3 text-sm">
                      <div>{SAFEGUARD_MEASURE_OPTIONS.find(opt => opt.value === measure.type)?.label}</div>
                      <div>{measure.responsible}</div>
                      <div>{measure.date.toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={addMeasure}
            disabled={formData.selectedMeasures.length === 0 || !formData.safeguardResponsible || !formData.safeguardDate}
            className="ml-auto block"
          >
            Añadir medida
          </Button>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="text-gray-700"
        >
          Atrás
        </Button>

        <Button
          onClick={() => onNext(formData)}
          disabled={formData.measures.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}; 