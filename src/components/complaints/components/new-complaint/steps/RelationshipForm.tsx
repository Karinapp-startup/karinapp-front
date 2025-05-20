"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  RelationshipFormData,
  relationshipOptions,
  RelationshipType
} from "@/interfaces/complaints/forms/relationship";
import { StepProps } from "@/interfaces/complaints/forms";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: RelationshipFormData;
  onNext: (data: RelationshipFormData) => void;
  onBack: () => void;
}

export const RelationshipForm = ({ defaultValues, onNext, onBack }: Props) => {
  const [formData, setFormData] = useState<RelationshipFormData>(defaultValues);

  const handleTypeChange = (value: RelationshipType) => {
    const updatedData: RelationshipFormData = {
      ...formData,
      relationship: {
        ...formData.relationship,
        type: value
      }
    };
    setFormData(updatedData);
  };

  const handleSituationChange = (field: keyof RelationshipFormData['relationship']['situations'], checked: boolean) => {
    const updatedData = {
      ...formData,
      relationship: {
        ...formData.relationship,
        situations: {
          ...formData.relationship.situations,
          [field]: checked
        }
      }
    };
    setFormData(updatedData);
  };

  const handleNext = () => {
    onNext(formData);
  };

  const canAdvanceToNextStep = () => {
    // Verificar si se seleccionó un tipo de relación
    const hasRelationshipType = !!formData.relationship.type;

    // Verificar si al menos un checkbox está marcado
    const hasAtLeastOneSituation = Object.values(formData.relationship.situations).some(value => value);

    return hasRelationshipType && hasAtLeastOneSituation;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Sobre la relación entre víctima y denunciado/a
        </h2>

        <p className="text-sm text-gray-600">
          Seleccionar la alternativa correspondiente:
        </p>

        <RadioGroup
          value={formData.relationship.type}
          onValueChange={(value) => handleTypeChange(value as RelationshipType)}
          className="space-y-3"
        >
          {relationshipOptions.map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200">
              <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
              <Label htmlFor={option.value} className="text-sm leading-relaxed">
                {option.description}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Sobre las presuntas situaciones denunciadas
        </h2>

        <p className="text-sm text-gray-600">
          Seleccionar la o las alternativa correspondiente:
        </p>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200">
            <Checkbox
              id="hasEvidence"
              checked={formData.relationship.situations.hasEvidence}
              onCheckedChange={(checked) => handleSituationChange('hasEvidence', checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="hasEvidence" className="text-sm leading-relaxed">
              Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)
            </Label>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200">
            <Checkbox
              id="hasPriorKnowledge"
              checked={formData.relationship.situations.hasPriorKnowledge}
              onCheckedChange={(checked) => handleSituationChange('hasPriorKnowledge', checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="hasPriorKnowledge" className="text-sm leading-relaxed">
              Existe conocimiento de otros antecedentes de índole similar.
            </Label>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200">
            <Checkbox
              id="wasPreviouslyReported"
              checked={formData.relationship.situations.wasPreviouslyReported}
              onCheckedChange={(checked) => handleSituationChange('wasPreviouslyReported', checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="wasPreviouslyReported" className="text-sm leading-relaxed">
              La situación denunciada fue informada previamente en otra instancia similar (jefatura, supervisor, mediación laboral, etc.)
            </Label>
          </div>
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
          onClick={handleNext}
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