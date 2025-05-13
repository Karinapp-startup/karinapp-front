"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  RelationshipFormData,
  RelationshipType,
  relationshipOptions
} from "@/interfaces/complaints/forms/relationship";
import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: RelationshipFormData;
  onNext: (data: RelationshipFormData) => void;
}

export const RelationshipForm = ({ onNext, onBack, defaultValues }: Props) => {
  const handleRelationshipChange = (value: RelationshipType) => {
    const updatedValues: RelationshipFormData = {
      ...defaultValues,
      relationship: value
    };
    onNext(updatedValues);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Sobre la relación entre víctima y denunciado/a
      </h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Seleccionar la alternativa correspondiente:
        </p>

        <RadioGroup
          value={defaultValues.relationship}
          onValueChange={handleRelationshipChange}
          className="space-y-2"
        >
          {relationshipOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-start gap-2 p-4 rounded-lg ${defaultValues.relationship === option.value
                  ? "bg-blue-50 border border-blue-100"
                  : "bg-white border border-gray-200"
                }`}
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="mt-1"
              />
              <div className="text-sm text-gray-700">
                {option.description}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}; 