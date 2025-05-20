"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WitnessData, witnessFields, WitnessField } from "@/interfaces/complaints/forms/witness";
import { StepProps } from "@/interfaces/complaints/forms";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: WitnessData[];
  onNext: (data: WitnessData[]) => void;
  onBack: () => void;
}

const MAX_WITNESSES = 10;

export const WitnessForm = ({ defaultValues, onNext, onBack }: Props) => {
  const [formState, setFormState] = useState({
    witnesses: Array.isArray(defaultValues) ? defaultValues : [],
    currentWitness: {
      fullName: '',
      position: '',
      department: ''
    },
    errors: {} as Record<string, string>,
    touched: {} as Record<string, boolean>
  });

  const handleChange = useCallback((field: keyof WitnessData, value: string) => {
    setFormState(prev => ({
      ...prev,
      currentWitness: {
        ...prev.currentWitness,
        [field]: value
      }
    }));
    validateField(field, value);
  }, []);

  const validateField = useCallback((field: keyof WitnessData, value: string) => {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: true
      },
      errors: {
        ...prev.errors,
        [field]: !value.trim() ? 'Este campo es requerido' : ''
      }
    }));
  }, []);

  const isValid = useCallback(() => {
    return Object.values(formState.currentWitness).every(value => value.trim() !== '');
  }, [formState.currentWitness]);

  const handleAddWitness = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid() || formState.witnesses.length >= MAX_WITNESSES) return;

    setFormState(prev => ({
      ...prev,
      witnesses: [...prev.witnesses, { ...prev.currentWitness }],
      currentWitness: {
        fullName: '',
        position: '',
        department: ''
      },
      errors: {},
      touched: {}
    }));
  }, [isValid]);

  const handleRemoveWitness = useCallback((index: number) => {
    setFormState(prev => ({
      ...prev,
      witnesses: prev.witnesses.filter((_, i) => i !== index)
    }));
  }, []);

  const handleNext = useCallback(() => {
    onNext(formState.witnesses);
  }, [formState.witnesses, onNext]);

  const canAdvanceToNextStep = useCallback(() => {
    return formState.witnesses.length > 0;
  }, [formState.witnesses]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Testigos</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Ingresa los datos de cada uno: <span className="text-gray-400">(máximo {MAX_WITNESSES} testigos)</span>
        </p>

        <form onSubmit={handleAddWitness} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {witnessFields.map((field: WitnessField) => (
            <div key={field.id} className="space-y-2">
              <Label className="text-sm text-gray-600">{field.label}</Label>
              <Input
                type={field.type}
                value={formState.currentWitness[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={cn(
                  "w-full bg-white border-gray-200",
                  formState.touched[field.id] && formState.errors[field.id] && "border-red-500"
                )}
              />
              {formState.touched[field.id] && formState.errors[field.id] && (
                <p className="text-sm text-red-500">{formState.errors[field.id]}</p>
              )}
            </div>
          ))}

          <div className="sm:col-span-3 flex justify-end">
            <Button
              type="submit"
              disabled={!isValid() || formState.witnesses.length >= MAX_WITNESSES}
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              Añadir
            </Button>
          </div>
        </form>

        {formState.witnesses.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Testigos añadidos</h3>
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">Nombre completo</th>
                    <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">Cargo</th>
                    <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">Departamento</th>
                    <th className="w-[50px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {formState.witnesses.map((witness, index) => (
                    <tr key={index} className="border-b border-gray-200 last:border-0">
                      <td className="py-3 px-4 text-sm text-gray-900">{witness.fullName}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{witness.position}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{witness.department}</td>
                      <td className="py-3 px-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveWitness(index)}
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
          disabled={!canAdvanceToNextStep()}
          className={cn(
            "px-6",
            canAdvanceToNextStep()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}; 