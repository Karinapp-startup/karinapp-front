"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface SituationsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function SituationsForm({ formData, updateFormData }: SituationsFormProps) {
  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    updateFormData({
      situations: {
        ...(formData.situations || {}),
        [key]: checked
      }
    });
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
          <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.situations?.hasEvidence ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
            <Checkbox
              id="hasEvidence"
              checked={formData.situations?.hasEvidence || false}
              onCheckedChange={handleCheckboxChange('hasEvidence')}
              className="mt-1"
            />
            <div className="text-sm text-gray-700">
              Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)
            </div>
          </div>

          <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.situations?.hasPriorCases ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
            <Checkbox
              id="hasPriorCases"
              checked={formData.situations?.hasPriorCases || false}
              onCheckedChange={handleCheckboxChange('hasPriorCases')}
              className="mt-1"
            />
            <div className="text-sm text-gray-700">
              Existe conocimiento de otros antecedentes de índole similar.
            </div>
          </div>

          <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.situations?.wasPreviouslyReported ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
            <Checkbox
              id="wasPreviouslyReported"
              checked={formData.situations?.wasPreviouslyReported || false}
              onCheckedChange={handleCheckboxChange('wasPreviouslyReported')}
              className="mt-1"
            />
            <div className="text-sm text-gray-700">
              La situación denunciada fue informada previamente en otra instancia similar (jefatura, supervisor, mediación laboral, etc.)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 