"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronLeft } from "lucide-react";
import { AccusedFormData, AccusedPerson, PersonField, personFields } from "@/interfaces/complaints/forms/accused";
import { StepProps } from "@/interfaces/complaints/forms/forms";
import { cn } from "@/lib/utils";
import { AccusedData, useAccusedFormValidation } from "../complements/hooks/useAccusedFormValidation";
import { MAX_ACCUSED } from '../complements/data/constants';
import { validateAccusedForm } from '../complements/utils/validations';
import { useState } from "react";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: AccusedFormData;
  onNext: (data: AccusedFormData) => void;
  onBack: () => void;
  validation: ReturnType<typeof useAccusedFormValidation>;
}

export const AccusedForm = ({ defaultValues, onNext, onBack, validation }: Props) => {
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm
  } = validation;

  const [accusedList, setAccusedList] = useState<AccusedPerson[]>(defaultValues.accusedList || []);

  const handleAddAccused = () => {
    if (!validateForm()) return;

    const newAccused: AccusedPerson = {
      firstName: formData.accused.firstName,
      lastName: formData.accused.lastName,
      rut: formData.accused.rut,
      email: formData.accused.email,
      position: formData.accused.position,
      department: formData.accused.department
    };

    setAccusedList(prev => [...prev, newAccused]);
  };

  const handleRemoveAccused = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setAccusedList(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({
      ...defaultValues,
      accusedList: accusedList,
    });
  };

  const renderField = (field: PersonField) => (
    <div key={field.name} className="space-y-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Input
        id={field.name}
        type={field.type || "text"}
        value={formData.accused[field.name] || ""}
        onChange={(e) => handleChange(field.name, e.target.value)}
        onBlur={() => handleBlur(field.name)}
        placeholder={field.placeholder}
        className={cn(
          "w-full bg-white border-gray-200",
          touched.accused[field.name] && errors.accused[field.name] && "border-red-500"
        )}
      />
      {touched.accused[field.name] && errors.accused[field.name] && (
        <p className="text-sm text-red-500">{errors.accused[field.name]}</p>
      )}
    </div>
  );

  const canAdvanceToNextStep = () => {
    return accusedList.length > 0;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Denunciados</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Ingresa los datos de cada uno:{" "}
          <span className="text-gray-400">(máximo {MAX_ACCUSED} denunciados)</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personFields.map(field => renderField(field))}

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="button"
              onClick={handleAddAccused}
              variant="outline"
              className="bg-white hover:bg-gray-50 border-gray-200"
              disabled={!isValid || accusedList.length >= MAX_ACCUSED}
            >
              Añadir
            </Button>
          </div>
        </div>

        {accusedList.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Denunciados añadidos</h3>
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {["NOMBRE COMPLETO", "RUT", "CORREO", "CARGO", "DEPARTAMENTO/SERVICIO", ""].map((title) => (
                      <th key={title} className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accusedList.map((accused, index) => (
                    <tr key={`${accused.rut}-${index}`} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {`${accused.firstName} ${accused.lastName}`}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{accused.rut}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{accused.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{accused.position}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{accused.department}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleRemoveAccused(index, e)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
          disabled={accusedList.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};