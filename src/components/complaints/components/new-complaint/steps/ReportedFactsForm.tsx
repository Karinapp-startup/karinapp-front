"use client";

import { Textarea } from "@/components/ui/textarea";
import { ReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: ReportedFactsFormData;
  onNext: (data: ReportedFactsFormData) => void;
}

export const ReportedFactsForm = ({ onNext, onBack, defaultValues }: Props) => {
  const handleFactsChange = (value: string) => {
    const updatedValues: ReportedFactsFormData = {
      ...defaultValues,
      reportedFacts: value
    };
    onNext(updatedValues);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Hechos denunciados</h2>

      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Entrevista de la víctima
        </p>

        <div>
          <Textarea
            placeholder="Desarrolla lo más detalladamente los hechos que deben ser investigados:"
            value={defaultValues.reportedFacts}
            onChange={(e) => handleFactsChange(e.target.value)}
            className="min-h-[160px] bg-white border-gray-200 resize-none focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}; 