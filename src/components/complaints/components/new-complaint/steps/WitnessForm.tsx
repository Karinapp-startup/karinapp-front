"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  WitnessFormData,
  WitnessPerson,
  witnessFields,
  defaultWitnessFormData
} from "@/interfaces/complaints/forms/witness";
import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: WitnessFormData;
  onNext: (data: WitnessFormData) => void;
}

export const WitnessForm = ({ onNext, onBack, defaultValues }: Props) => {
  const handleAddWitness = () => {
    if (!defaultValues.currentWitness.fullName) return;
    
    const updatedValues: WitnessFormData = {
      ...defaultValues,
      witnesses: [...defaultValues.witnesses, defaultValues.currentWitness],
      currentWitness: defaultWitnessFormData.currentWitness
    };
    onNext(updatedValues);
  };

  const handleWitnessChange = (field: keyof WitnessPerson, value: string) => {
    const updatedValues: WitnessFormData = {
      ...defaultValues,
      currentWitness: {
        ...defaultValues.currentWitness,
        [field]: value
      }
    };
    onNext(updatedValues);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Testigos</h2>

      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Ingresa los datos de cada uno:
        </p>

        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {witnessFields.slice(0, 2).map((field) => (
              <div key={field.id} className="space-y-1">
                <Input 
                  placeholder={field.placeholder}
                  value={defaultValues.currentWitness[field.id]}
                  onChange={(e) => handleWitnessChange(field.id, e.target.value)}
                  className="bg-white border-gray-200"
                />
                <div className="text-sm text-gray-600">{field.label}</div>
              </div>
            ))}

            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-1">
                <Input 
                  placeholder={witnessFields[2].placeholder}
                  value={defaultValues.currentWitness.department}
                  onChange={(e) => handleWitnessChange('department', e.target.value)}
                  className="bg-white border-gray-200"
                />
                <div className="text-sm text-gray-600">{witnessFields[2].label}</div>
              </div>
              <Button
                onClick={handleAddWitness}
                variant="outline"
                size="sm"
                className="bg-white hover:bg-gray-50 border-gray-200 mt-0.5"
              >
                Añadir
              </Button>
            </div>
          </div>
        </div>

        {defaultValues.witnesses.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Testigos añadidos</h3>
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {witnessFields.map((field) => (
                      <th key={field.id} className="text-xs font-medium text-gray-500 uppercase py-2 px-4 text-left">
                        {field.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {defaultValues.witnesses.map((witness, index) => (
                    <tr key={index} className="border-b border-gray-200 last:border-0">
                      {witnessFields.map((field) => (
                        <td key={field.id} className="py-3 px-4 text-sm text-gray-500">
                          {witness[field.id]}
                        </td>
                      ))}
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