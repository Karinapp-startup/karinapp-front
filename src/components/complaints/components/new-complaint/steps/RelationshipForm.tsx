"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  RelationshipFormData,
  RelationshipType,
  HierarchyLevel,
  relationshipOptions,
  RelationshipTypeValues
} from "@/interfaces/complaints/forms/relationship";
import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues?: RelationshipFormData;
  onNext: (data: RelationshipFormData) => void;
}

export const RelationshipForm = ({ onNext, onBack, defaultValues = {
  relationship: {
    type: RelationshipType.DIRECT,
    hierarchyLevel: HierarchyLevel.SUPERIOR,
    description: "",
    situations: {
      hasEvidence: false,
      hasPriorCases: false,
      wasPreviouslyReported: false
    }
  },
  startDate: new Date(),
  isCurrentEmployee: true,
  position: "",
  department: ""
} }: Props) => {

  const handleRelationshipChange = (value: typeof RelationshipType[keyof typeof RelationshipType]) => {
    const updatedValues: RelationshipFormData = {
      ...defaultValues,
      relationship: {
        ...defaultValues.relationship,
        type: value,
      },
      startDate: defaultValues.startDate || new Date(),
      isCurrentEmployee: defaultValues.isCurrentEmployee || true,
      position: defaultValues.position || "",
      department: defaultValues.department || ""
    };
    onNext(updatedValues);
  };

  const handleSituationChange = (key: string, checked: boolean) => {
    const updatedValues: RelationshipFormData = {
      ...defaultValues,
      relationship: {
        ...defaultValues.relationship,
        situations: {
          ...defaultValues.relationship.situations,
          [key]: checked
        }
      },
      startDate: defaultValues.startDate || new Date(),
      isCurrentEmployee: defaultValues.isCurrentEmployee || true,
      position: defaultValues.position || "",
      department: defaultValues.department || ""
    };
    onNext(updatedValues);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Sobre la relación entre víctima y denunciado/a
        </h2>

        <p className="text-sm text-gray-600">
          Seleccionar la alternativa correspondiente:
        </p>

        <RadioGroup
          value={defaultValues.relationship.type}
          onValueChange={handleRelationshipChange}
          className="space-y-3"
        >
          {relationshipOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-start space-x-3 p-4 rounded-lg ${defaultValues.relationship.type === option.value
                  ? "bg-blue-50 border border-blue-100"
                  : "bg-white border border-gray-200"
                }`}
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="mt-1"
              />
              <Label
                htmlFor={option.value}
                className="text-sm leading-relaxed text-gray-700 cursor-pointer"
              >
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
              checked={defaultValues.relationship.situations.hasEvidence}
              onCheckedChange={(checked) => handleSituationChange('hasEvidence', checked as boolean)}
              className="mt-1"
            />
            <Label
              htmlFor="hasEvidence"
              className="text-sm leading-relaxed text-gray-700 cursor-pointer"
            >
              Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)
            </Label>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200">
            <Checkbox
              id="hasPriorCases"
              checked={defaultValues.relationship.situations.hasPriorCases}
              onCheckedChange={(checked) => handleSituationChange('hasPriorCases', checked as boolean)}
              className="mt-1"
            />
            <Label
              htmlFor="hasPriorCases"
              className="text-sm leading-relaxed text-gray-700 cursor-pointer"
            >
              Existe conocimiento de otros antecedentes de índole similar.
            </Label>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200">
            <Checkbox
              id="wasPreviouslyReported"
              checked={defaultValues.relationship.situations.wasPreviouslyReported}
              onCheckedChange={(checked) => handleSituationChange('wasPreviouslyReported', checked as boolean)}
              className="mt-1"
            />
            <Label
              htmlFor="wasPreviouslyReported"
              className="text-sm leading-relaxed text-gray-700 cursor-pointer"
            >
              La situación denunciada fue informada previamente en otra instancia similar (jefatura, supervisor, mediación laboral, etc.)
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}; 