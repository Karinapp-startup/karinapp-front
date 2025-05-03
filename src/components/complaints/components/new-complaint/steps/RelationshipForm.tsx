"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RelationshipFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function RelationshipForm({ formData, updateFormData }: RelationshipFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Sobre la relación entre víctima y denunciado/a</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Seleccionar la alternativa correspondiente:
        </p>

        <RadioGroup
          value={formData.relationship || ""}
          onValueChange={(value) => updateFormData({ relationship: value })}
          className="space-y-2"
        >
          <div className={`flex items-start gap-2 p-4 rounded-lg ${formData.relationship === "asymmetric_victim_dependent" ? "bg-blue-50 border border-blue-100" : "bg-white border border-gray-200"}`}>
            <RadioGroupItem 
              value="asymmetric_victim_dependent" 
              id="asymmetric_victim_dependent"
              className="mt-1"
            />
            <div className="text-sm text-gray-700">
              Existe una relación <span className="font-medium">asimétrica</span> en que la víctima tiene <span className="font-medium">dependencia directa o indirecta</span> de el/la denunciado/a.
            </div>
          </div>

          <div className={`flex items-start gap-2 p-4 rounded-lg bg-white border border-gray-200`}>
            <RadioGroupItem 
              value="asymmetric_accused_dependent" 
              id="asymmetric_accused_dependent"
              className="mt-1"
            />
            <div className="text-sm text-gray-700">
              Existe una relación <span className="font-medium">asimétrica</span> en que el/la denunciado/a tiene <span className="font-medium">dependencia directa o indirecta</span> de la víctima.
            </div>
          </div>

          <div className={`flex items-start gap-2 p-4 rounded-lg bg-white border border-gray-200`}>
            <RadioGroupItem 
              value="symmetric_same_area" 
              id="symmetric_same_area"
              className="mt-1"
            />
            <div className="text-sm text-gray-700">
              Existe una relación <span className="font-medium">simétrica</span> en que el/la denunciado/a y la víctima <span className="font-medium">no tienen una dependencia directa ni indirecta, pero se desempeñan en la misma área/unidad/servicio</span>.
            </div>
          </div>

          <div className={`flex items-start gap-2 p-4 rounded-lg bg-white border border-gray-200`}>
            <RadioGroupItem 
              value="symmetric_different_area" 
              id="symmetric_different_area"
              className="mt-1"
            />
            <div className="text-sm text-gray-700">
              Existe una relación <span className="font-medium">simétrica</span> en que el/la denunciado/a y la víctima <span className="font-medium">no tienen una dependencia directa ni indirecta, y no se desempeñan en la misma área/unidad/servicio</span>.
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
} 