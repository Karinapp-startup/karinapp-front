"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AccusedFormData, AccusedPerson, defaultAccusedFormData } from "@/interfaces/complaints/forms/accused";
import { StepProps } from "@/interfaces/complaints/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { accusedFormSchema } from "@/validators/schemas/accusedFormSchema";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AccusedData, useAccusedFormValidation } from "../complements/hooks/useAccusedFormValidation";

const MAX_ACCUSED = 10;

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: AccusedFormData;
  onNext: (data: AccusedFormData) => void;
  validation: ReturnType<typeof useAccusedFormValidation>;
}

export const AccusedForm = ({ defaultValues, onNext, validation }: Props) => {
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    resetForm,
  } = validation;

  const accusedList = defaultValues.accusedList || [];

  const handleAdd = () => {
    if (!isValid || accusedList.length >= MAX_ACCUSED) return;

    const newAccused: AccusedPerson = {
      fullName: `${formData.accused.firstName} ${formData.accused.lastName}`,
      rut: formData.accused.rut,
      email: formData.accused.email,
      position: formData.accused.position,
      department: formData.accused.department,
    };

    const updatedList = [...accusedList, newAccused];
    onNext({
      ...defaultValues,
      accusedList: updatedList,
    });

    resetForm();
  };

  const handleRemoveAccused = (index: number) => {
    const updatedList = accusedList.filter((_, i) => i !== index);
    onNext({
      ...defaultValues,
      accusedList: updatedList,
    });
  };

  const renderField = (
    name: keyof AccusedData,
    label: string,
    placeholder: string,
    type = "text"
  ) => (
    <div className="space-y-2">
      <Label className="text-sm text-gray-600">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </Label>
      <Input
        type={type}
        value={formData.accused[name] || ""}
        onChange={(e) => handleChange(name, e.target.value)}
        onBlur={() => handleBlur(name)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-white border-gray-200",
          touched.accused[name] && errors.accused[name] && "border-red-500"
        )}
      />
      {touched.accused[name] && errors.accused[name] && (
        <p className="text-sm text-red-500">{errors.accused[name]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Denunciados</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Ingresa los datos de cada uno:{" "}
          <span className="text-gray-400">(máximo 10 denunciados)</span>
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {renderField("firstName", "Nombres", "ej: Juan Pablo")}
          {renderField("lastName", "Apellidos", "ej: López González")}
          {renderField("rut", "RUT", "ej: 18.456.987-0")}
          {renderField("email", "Correo", "ej: jplopezg@email.com", "email")}
          {renderField("position", "Cargo", "Desarrollador")}
          {renderField("department", "Departamento/Área", "ej: Depto informática")}

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              variant="outline"
              className="bg-white hover:bg-gray-50 border-gray-200"
              disabled={!isValid || accusedList.length >= MAX_ACCUSED}
            >
              Añadir
            </Button>
          </div>
        </form>

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
                    <tr key={index} className="border-b border-gray-200 last:border-0">
                      <td className="py-3 px-4 text-sm text-gray-900">{accused.fullName}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{accused.rut}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{accused.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{accused.position}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{accused.department}</td>
                      <td className="py-3 px-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAccused(index)}
                          className="text-gray-500 hover:text-red-600"
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
    </div>
  );
};