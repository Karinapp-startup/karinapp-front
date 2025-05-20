"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AccusedFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function AccusedForm({ formData, updateFormData }: AccusedFormProps) {
  const handleAddAccused = () => {
    if (!formData.accusedFirstName || !formData.accusedLastName) return;
    
    const newAccused = {
      fullName: `${formData.accusedFirstName} ${formData.accusedLastName}`,
      rut: formData.accusedRut || '',
      email: formData.accusedEmail || '',
      position: formData.accusedPosition || '',
      department: formData.accusedDepartment || ''
    };

    const currentAccused = formData.accusedList || [];
    updateFormData({ 
      accusedList: [...currentAccused, newAccused],
      // Limpiar los campos después de añadir
      accusedFirstName: '',
      accusedLastName: '',
      accusedRut: '',
      accusedEmail: '',
      accusedPosition: '',
      accusedDepartment: ''
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Datos del denunciado</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Nombres</Label>
          <Input 
            placeholder="ej: Juan Pablo"
            value={formData.accusedFirstName || ''}
            onChange={(e) => updateFormData({ accusedFirstName: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Apellidos</Label>
          <Input 
            placeholder="ej: López González"
            value={formData.accusedLastName || ''}
            onChange={(e) => updateFormData({ accusedLastName: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">RUT</Label>
          <Input 
            placeholder="ej: 18.456.987-0"
            value={formData.accusedRut || ''}
            onChange={(e) => updateFormData({ accusedRut: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Correo</Label>
          <Input 
            type="email"
            placeholder="ej: jplopezg@email.com"
            value={formData.accusedEmail || ''}
            onChange={(e) => updateFormData({ accusedEmail: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Cargo</Label>
          <Input 
            placeholder="Desarrollador"
            value={formData.accusedPosition || ''}
            onChange={(e) => updateFormData({ accusedPosition: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Departamento/Área</Label>
          <Input 
            placeholder="ej: Depto informática"
            value={formData.accusedDepartment || ''}
            onChange={(e) => updateFormData({ accusedDepartment: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleAddAccused}
          variant="outline"
          className="bg-white hover:bg-gray-50 border-gray-200"
        >
          Añadir
        </Button>
      </div>

      {(formData.accusedList?.length > 0) && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Denunciados añadidos</h3>
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">
                    NOMBRE COMPLETO
                  </th>
                  <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">
                    RUT
                  </th>
                  <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">
                    CORREO
                  </th>
                  <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">
                    CARGO
                  </th>
                  <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">
                    DEPARTAMENTO/SERVICIO
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.accusedList.map((accused: any, index: number) => (
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
} 