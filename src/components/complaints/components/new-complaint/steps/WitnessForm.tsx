"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WitnessFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function WitnessForm({ formData, updateFormData }: WitnessFormProps) {
  const handleAddWitness = () => {
    if (!formData.currentWitness?.fullName) return;
    
    const newWitness = {
      fullName: formData.currentWitness.fullName,
      position: formData.currentWitness.position || '',
      department: formData.currentWitness.department || ''
    };

    const currentWitnesses = formData.witnesses || [];
    updateFormData({ 
      witnesses: [...currentWitnesses, newWitness],
      currentWitness: { fullName: '', position: '', department: '' }
    });
  };

  const updateCurrentWitness = (field: string, value: string) => {
    updateFormData({
      currentWitness: {
        ...(formData.currentWitness || {}),
        [field]: value
      }
    });
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
            <div className="space-y-1">
              <Input 
                placeholder="ej: Juan Pablo"
                value={formData.currentWitness?.fullName || ''}
                onChange={(e) => updateCurrentWitness('fullName', e.target.value)}
                className="bg-white border-gray-200"
              />
              <div className="text-sm text-gray-600">Nombre completo</div>
            </div>

            <div className="space-y-1">
              <Input 
                placeholder="ej: López González"
                value={formData.currentWitness?.position || ''}
                onChange={(e) => updateCurrentWitness('position', e.target.value)}
                className="bg-white border-gray-200"
              />
              <div className="text-sm text-gray-600">Cargo</div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-1">
                <Input 
                  placeholder="ej: López González"
                  value={formData.currentWitness?.department || ''}
                  onChange={(e) => updateCurrentWitness('department', e.target.value)}
                  className="bg-white border-gray-200"
                />
                <div className="text-sm text-gray-600">Departamento/Servicio</div>
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

        {formData.witnesses?.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Testigos añadidos</h3>
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-xs font-medium text-gray-500 uppercase py-2 px-4 text-left">
                      Nombre completo
                    </th>
                    <th className="text-xs font-medium text-gray-500 uppercase py-2 px-4 text-left">
                      Cargo
                    </th>
                    <th className="text-xs font-medium text-gray-500 uppercase py-2 px-4 text-left">
                      Departamento/Servicio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.witnesses.map((witness: any, index: number) => (
                    <tr key={index} className="border-b border-gray-200 last:border-0">
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {witness.fullName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {witness.position}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {witness.department}
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
} 