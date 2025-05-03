"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ReportedSituationsFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function ReportedSituationsForm({ formData, updateFormData }: ReportedSituationsFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Situaciones que se denuncian</h2>

      <RadioGroup
        value={formData.situationType || ""}
        onValueChange={(value) => updateFormData({ situationType: value })}
        className="space-y-2"
      >
        <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.situationType === "workplace_harassment" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
          <RadioGroupItem 
            value="workplace_harassment" 
            id="workplace_harassment"
            className="mt-1"
          />
          <div className="space-y-1">
            <label 
              htmlFor="workplace_harassment" 
              className="text-sm font-medium text-gray-900"
            >
              Acoso Laboral
            </label>
            <p className="text-sm text-gray-600">
              Agresión u hostigamiento, sea puntual o reiterado, que causa maltrato, humillación o perjudica la situación laboral de la persona.
            </p>
          </div>
        </div>

        <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.situationType === "sexual_harassment" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
          <RadioGroupItem 
            value="sexual_harassment" 
            id="sexual_harassment"
            className="mt-1"
          />
          <div className="space-y-1">
            <label 
              htmlFor="sexual_harassment" 
              className="text-sm font-medium text-gray-900"
            >
              Acoso Sexual
            </label>
            <p className="text-sm text-gray-600">
              Requerimientos sexuales indebidos y no consentidos que afectan la situación o condiciones laborales de quien los recibe.
            </p>
          </div>
        </div>

        <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.situationType === "workplace_violence" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
          <RadioGroupItem 
            value="workplace_violence" 
            id="workplace_violence"
            className="mt-1"
          />
          <div className="space-y-1">
            <label 
              htmlFor="workplace_violence" 
              className="text-sm font-medium text-gray-900"
            >
              Violencia en el Trabajo
            </label>
            <p className="text-sm text-gray-600">
              Conductas ejercidas por terceros ajenos a la relación laboral que afectan al trabajador durante la prestación de servicios.
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
} 