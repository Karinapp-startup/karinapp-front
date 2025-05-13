"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  SituationsFormData,
  situationOptions
} from "@/interfaces/complaints/forms/situations";
import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: SituationsFormData;
  onNext: (data: SituationsFormData) => void;
}

export const SituationsForm = ({ onNext, onBack, defaultValues }: Props) => {
  const handleCheckboxChange = (key: keyof SituationsFormData['situations']) => (checked: boolean) => {
    const updatedValues: SituationsFormData = {
      ...defaultValues,
      situations: {
        ...defaultValues.situations,
        [key]: checked
      }
    };
    onNext(updatedValues);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Sobre las presuntas situaciones denunciadas
      </h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Seleccionar la o las alternativa correspondiente:
        </p>

        <div className="space-y-2">
          {situationOptions.map((option) => (
            <div
              key={option.id}
              className={`flex items-start gap-2 p-4 rounded-lg ${defaultValues.situations[option.id]
                  ? "bg-blue-50 border border-blue-100"
                  : "bg-white border border-gray-200"
                }`}
            >
              <Checkbox
                id={option.id}
                checked={defaultValues.situations[option.id]}
                onCheckedChange={handleCheckboxChange(option.id)}
                className="mt-1"
              />
              <div className="text-sm text-gray-700">
                {option.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 