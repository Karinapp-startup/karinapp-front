"use client";

import { Textarea } from "@/components/ui/textarea";

interface ReportedFactsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function ReportedFactsForm({ formData, updateFormData }: ReportedFactsFormProps) {
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
            value={formData.reportedFacts || ''}
            onChange={(e) => updateFormData({ reportedFacts: e.target.value })}
            className="min-h-[160px] bg-white border-gray-200 resize-none focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
} 