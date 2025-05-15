"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AccusedFormData, AccusedPerson, defaultAccusedFormData } from "@/interfaces/complaints/forms/accused";
import { StepProps } from "@/interfaces/complaints/forms";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { accusedFormSchema } from "@/validators/schemas/accusedFormSchema";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

type FormSchema = z.infer<typeof accusedFormSchema>;

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: AccusedFormData;
  onNext: (data: AccusedFormData) => void;
}

export const AccusedForm = ({ defaultValues, onNext }: Props) => {
  const accusedList = defaultValues.accusedList || [];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      accused: {
        firstName: "",
        lastName: "",
        rut: "",
        email: "",
        position: "",
        department: "",
      },
    },
    resolver: zodResolver(accusedFormSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: FormSchema) => {
    const newAccused: AccusedPerson = {
      fullName: `${data.accused.firstName} ${data.accused.lastName}`,
      rut: data.accused.rut,
      email: data.accused.email,
      position: data.accused.position,
      department: data.accused.department,
    };

    onNext({
      ...defaultValues,
      accusedList: [...accusedList, newAccused],
    });

    reset();
  };

  const renderField = (field: keyof FormSchema["accused"], label: string, placeholder: string, type = "text") => (
    <div className="space-y-2">
      <Label className="text-sm text-gray-600">{label} <span className="text-red-500">*</span></Label>
      <Controller
        name={`accused.${field}`}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={cn(
              "w-full h-10 bg-white border-gray-200 focus:ring-blue-500",
              errors.accused?.[field] && "border-red-500 focus:ring-red-500"
            )}
          />
        )}
      />
      {errors.accused?.[field] && (
        <p className="text-sm text-red-500">{errors.accused[field]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Datos del denunciado</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderField("firstName", "Nombres", "ej: Juan Pablo")}
        {renderField("lastName", "Apellidos", "ej: López González")}
        {renderField("rut", "RUT", "ej: 18.456.987-0")}
        {renderField("email", "Correo", "ej: jplopezg@email.com", "email")}
        {renderField("position", "Cargo", "Desarrollador")}
        {renderField("department", "Departamento/Área", "ej: Depto informática")}

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" variant="outline" className="bg-white hover:bg-gray-50 border-gray-200">
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
                  {["NOMBRE COMPLETO", "RUT", "CORREO", "CARGO", "DEPARTAMENTO/SERVICIO"].map((title) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};