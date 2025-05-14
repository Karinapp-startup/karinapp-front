"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatRut } from "@/validators/rut";
import { victimFormSchema } from "@/validators/victimFormSchema";
import { cn } from "@/lib/utils";
import {
  VictimFormData,
  PersonData,
  defaultVictimFormData
} from "@/interfaces/complaints/forms/victim";
import { StepProps } from "@/interfaces/complaints/forms";

interface ValidationErrors {
  victimSection: {
    firstName?: string;
    lastName?: string;
    rut?: string;
    email?: string;
    position?: string;
    department?: string;
  };
  complainantSection?: {
    firstName?: string;
    lastName?: string;
    rut?: string;
    email?: string;
    position?: string;
    department?: string;
  };
}

interface Props {
  defaultValues?: VictimFormData;
  onNext: (data: VictimFormData) => void;
  onBack: () => void;
}

export function VictimForm({ defaultValues = defaultVictimFormData, onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues
  } = useForm<VictimFormData>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(victimFormSchema)
  });

  const isVictim = watch("isVictim");

  const onSubmit = (data: VictimFormData) => {
    onNext(data);
  };

  const handleIsVictimChange = (checked: boolean) => {
    setValue("isVictim", checked);
    if (checked) {
      setValue("complainant", undefined);
    } else {
      setValue("complainant", {
        firstName: '',
        lastName: '',
        rut: '',
        email: '',
        position: '',
        department: ''
      });
    }
    const currentData = getValues();
    onNext(currentData);
  };

  const renderField = (
    section: "victim" | "complainant",
    field: keyof PersonData,
    label: string,
    placeholder: string,
    type: string = "text"
  ) => {
    const fieldPath = `${section}.${field}` as const;
    const error = errors[section]?.[field];

    return (
      <div className="space-y-2">
        <Label className="text-sm text-gray-600">
          {label}<span className="text-red-500 ml-1">*</span>
        </Label>
        <Controller
          name={fieldPath}
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              type={type}
              placeholder={placeholder}
              value={value || ''}
              onChange={(e) => {
                let newValue = e.target.value;
                if (field === 'rut') {
                  newValue = formatRut(newValue);
                }
                onChange(newValue);
                trigger(fieldPath);
                const currentData = getValues();
                onNext(currentData);
              }}
              onBlur={() => {
                onBlur();
                trigger(fieldPath);
              }}
              className={cn(
                "w-full h-10 bg-white border-gray-200 focus:ring-blue-500",
                error && "border-red-500 focus:ring-red-500"
              )}
            />
          )}
        />
        {error?.message && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <Controller
            name="isVictim"
            control={control}
            render={({ field: { value } }) => (
              <Checkbox
                checked={value}
                onCheckedChange={handleIsVictimChange}
                className="mt-1 border-gray-300"
              />
            )}
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

        {!isVictim && (
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