"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ReportedSituationsFormData,
  SituationType,
  situationOptions 
} from "@/interfaces/complaints/forms/reported-situations";
import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: ReportedSituationsFormData;
  onNext: (data: ReportedSituationsFormData) => void;
}

export const ReportedSituationsForm = ({ onNext, onBack, defaultValues }: Props) => {
  const handleSituationChange = (value: SituationType) => {
    const updatedValues: ReportedSituationsFormData = {
      ...defaultValues,
      situationType: value
    };
    onNext(updatedValues);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Situaciones que se denuncian</h2>

      <RadioGroup
        value={defaultValues.situationType}
        onValueChange={handleSituationChange}
        className="space-y-2"
      >
        {situationOptions.map((option) => (
          <div
            key={option.value}
            className={`flex items-start gap-2 p-4 rounded-lg ${
              defaultValues.situationType === option.value 
                ? "bg-blue-50 border border-blue-100" 
                : "bg-white border border-gray-200"
            }`}
          >
            <RadioGroupItem 
              value={option.value} 
              id={option.value}
              className="mt-1"
            />
            <div className="space-y-1">
              <label 
                htmlFor={option.value} 
                className="text-sm font-medium text-gray-900"
              >
                {option.label}
              </label>
              <p className="text-sm text-gray-600">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}; 