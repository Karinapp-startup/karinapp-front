"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { VictimFormData } from "@/interfaces/complaints/forms/victim";
import { StepProps } from "@/interfaces/complaints/forms/forms";
import { cn } from "@/lib/utils";
import { useVictimFormValidation } from "../complements/hooks/useVictimFormValidation";
import { personFields } from "@/interfaces/complaints/forms/victim";
import { VictimFormValidation } from "../complements/types/victim";
import { PersonField } from "@/interfaces/complaints/forms/victim";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: VictimFormData;
  onNext: (data: VictimFormData) => void;
  onBack: () => void;
  validation: VictimFormValidation;
}

export const VictimForm = ({ defaultValues, onNext, onBack, validation }: Props) => {
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleIsVictimChange
  } = validation;

  const handleNext = () => {
    console.log('🔵 VictimForm - handleNext called');
    console.log('🔵 VictimForm - Current formData:', formData);

    if (!isValid) {
      console.log('🔴 VictimForm - Form is invalid');
      return;
    }

    console.log('✅ VictimForm - Calling onNext with formData');
    onNext(formData);
  };

  const handleCheckboxChange = (checked: boolean) => {
    console.log('🔵 VictimForm - Checkbox changed:', checked);
    handleIsVictimChange(checked); // Solo actualiza el estado, no avanza al siguiente paso
  };

  const renderFields = (type: 'victim' | 'complainant' = 'victim') => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {personFields.map((field: PersonField) => (
          <div key={`${type}-${field.id}`} className="space-y-2">
            <Label className="text-sm text-gray-600">
              {field.label}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type={field.type}
              value={type === 'victim' ? formData.victim[field.id] : formData.complainant?.[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value, type)}
              onBlur={() => handleBlur(field.id, type)}
              placeholder={field.placeholder}
              className={cn(
                "w-full bg-white border-gray-200",
                touched[type]?.[field.id] && errors[type]?.[field.id] && "border-red-500"
              )}
            />
            {touched[type]?.[field.id] && errors[type]?.[field.id] && (
              <p className="text-sm text-red-500">{errors[type][field.id]}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Datos de la Víctima</h2>

      <div className="space-y-6">
        {renderFields('victim')}

        <div className="mt-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isVictim"
              checked={formData.isComplainant}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="isVictim" className="text-sm text-gray-700">
              La persona que realiza la denuncia es la presunta víctima de lo denunciado.
            </Label>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            En caso de no ser así, registra al denunciante a continuación
          </p>
        </div>

        {!formData.isComplainant && (
          <div className="mt-6">
            {renderFields('complainant')}
          </div>
        )}
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
          className={cn(
            "px-6",
            isValid
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