"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ReportedSituationsFormData } from "@/interfaces/complaints/forms/reported-situations";
import { StepProps } from "@/interfaces/complaints/forms/forms";
import { cn } from "@/lib/utils";
import { useReportedSituationsValidation } from "../complements/hooks/useReportedSituationsValidation";
import { SITUATION_TYPES, SITUATION_LABELS, SITUATION_DESCRIPTIONS } from "../complements/data/constants";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: ReportedSituationsFormData;
  onNext: (data: ReportedSituationsFormData) => void;
  onBack: () => void;
  validation: ReturnType<typeof useReportedSituationsValidation>;
}

export const ReportedSituationsForm = ({ defaultValues, onNext, onBack, validation }: Props) => {
  const {
    formData,
    errors,
    isValid,
    handleChange
  } = validation;

  const canAdvanceToNextStep = () => {
    return Object.values(SITUATION_TYPES).includes(formData.situationType);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Situaciones que se denuncian</h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {Object.entries(SITUATION_TYPES).map(([key, value]) => (
            <div
              key={key}
              className={cn(
                "p-4 rounded-lg border cursor-pointer",
                formData.situationType === value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
              onClick={() => handleChange('situationType', value)}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1",
                  formData.situationType === value
                    ? "border-blue-600"
                    : "border-gray-300"
                )}>
                  {formData.situationType === value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {SITUATION_LABELS[value as keyof typeof SITUATION_LABELS]}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {SITUATION_DESCRIPTIONS[value as keyof typeof SITUATION_DESCRIPTIONS]}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
          onClick={() => onNext(formData)}
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