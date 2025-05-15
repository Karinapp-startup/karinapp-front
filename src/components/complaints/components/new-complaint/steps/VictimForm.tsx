"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useVictimFormValidation } from "../complements/hooks/useVictimFormValidation";
import { cn } from "@/lib/utils";
import { VictimFormData } from "@/interfaces/complaints/forms/victim";

interface Props {
  defaultValues?: VictimFormData;
  onNext: (data: VictimFormData) => void;
  onBack: () => void;
  validation: ReturnType<typeof useVictimFormValidation>;
}

export function VictimForm({ defaultValues, onNext, onBack, validation }: Props) {
  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFormData,
    handleIsVictimChange
  } = validation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      victim: formData.victim,
      complainant: formData.complainant,
      isVictim: formData.isVictim
    });
  };

  const renderField = (
    section: "victim" | "complainant",
    field: keyof typeof formData.victim,
    label: string,
    placeholder: string,
    type = "text"
  ) => (
    <div className="space-y-2">
      <Label className="text-sm text-gray-600">
        {label}<span className="text-red-500 ml-1">*</span>
      </Label>
      <Input
        type={type}
        value={formData[section]?.[field] || ''}
        onChange={(e) => handleChange(section, field, e.target.value)}
        onBlur={() => handleBlur(section, field)}
        placeholder={placeholder}
        className={cn(
          "w-full h-10 bg-white border-gray-200 focus:ring-blue-500",
          (touched[section][field] || errors[section][field]) &&
          errors[section][field] && "border-red-500 focus:ring-red-500"
        )}
      />
      {(touched[section][field] || errors[section][field]) &&
        errors[section][field] && (
          <p className="text-sm text-red-500">{errors[section][field]}</p>
        )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Datos de la víctima</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          {renderField("victim", "firstName", "Nombres", "ej: Juan Pablo")}
          {renderField("victim", "lastName", "Apellidos", "ej: López González")}
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderField("victim", "rut", "RUT", "ej: 18.456.987-0")}
          {renderField("victim", "email", "Correo", "ej: jplopezg@email.com", "email")}
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderField("victim", "position", "Cargo", "Desarrollador")}
          {renderField("victim", "department", "Departamento/Área", "ej: Depto informática")}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={formData.isVictim}
            onCheckedChange={handleIsVictimChange}
            className="mt-1 border-gray-300"
          />
          <div className="space-y-1">
            <Label className="text-sm text-gray-700">
              La persona que realiza la denuncia es la presunta víctima de lo denunciado.
            </Label>
            <p className="text-sm text-gray-500">
              En caso de no ser así, registra al denunciante a continuación
            </p>
          </div>
        </div>

        {!formData.isVictim && (
          <div className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {renderField("complainant", "firstName", "Nombres", "ej: Juan Pablo")}
                {renderField("complainant", "lastName", "Apellidos", "ej: López González")}
              </div>
              <div className="grid grid-cols-2 gap-6">
                {renderField("complainant", "rut", "RUT", "ej: 18.456.987-0")}
                {renderField("complainant", "email", "Correo", "ej: jplopezg@email.com", "email")}
              </div>
              <div className="grid grid-cols-2 gap-6">
                {renderField("complainant", "position", "Cargo", "Desarrollador")}
                {renderField("complainant", "department", "Departamento/Área", "ej: Depto informática")}
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
} 