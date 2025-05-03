"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface VictimFormProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function VictimForm({ formData, updateFormData }: VictimFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Datos de la víctima</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Nombres</Label>
          <Input 
            placeholder="ej: Juan Pablo"
            value={formData.victimFirstName || ''}
            onChange={(e) => updateFormData({ victimFirstName: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Apellidos</Label>
          <Input 
            placeholder="ej: López González"
            value={formData.victimLastName || ''}
            onChange={(e) => updateFormData({ victimLastName: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">RUT</Label>
          <Input 
            placeholder="ej: 18.456.987-0"
            value={formData.victimRut || ''}
            onChange={(e) => updateFormData({ victimRut: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Correo</Label>
          <Input 
            type="email"
            placeholder="ej: jplopezg@email.com"
            value={formData.victimEmail || ''}
            onChange={(e) => updateFormData({ victimEmail: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Cargo</Label>
          <Input 
            placeholder="Desarrollador"
            value={formData.victimPosition || ''}
            onChange={(e) => updateFormData({ victimPosition: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Departamento/Área</Label>
          <Input 
            placeholder="ej: Depto informática"
            value={formData.victimDepartment || ''}
            onChange={(e) => updateFormData({ victimDepartment: e.target.value })}
            className="bg-white border-gray-200 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="isVictim"
            checked={formData.isVictim}
            onCheckedChange={(checked) => updateFormData({ isVictim: checked })}
            className="mt-1 border-gray-300"
          />
          <div className="space-y-1">
            <Label 
              htmlFor="isVictim" 
              className="text-sm text-gray-700"
            >
              La persona que realiza la denuncia es la presunta víctima de lo denunciado.
            </Label>
            <p className="text-sm text-gray-500">
              En caso de no ser así, registra al denunciante a continuación
            </p>
          </div>
        </div>

        {!formData.isVictim && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Nombres del denunciante</Label>
              <Input 
                placeholder="ej: Juan Pablo" 
                className="bg-white border-gray-200 focus:ring-blue-500"
                value={formData.complainantFirstName || ''}
                onChange={(e) => updateFormData({ complainantFirstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Apellidos del denunciante</Label>
              <Input 
                placeholder="ej: López González" 
                className="bg-white border-gray-200 focus:ring-blue-500"
                value={formData.complainantLastName || ''}
                onChange={(e) => updateFormData({ complainantLastName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">RUT del denunciante</Label>
              <Input 
                placeholder="ej: 18.456.987-0" 
                className="bg-white border-gray-200 focus:ring-blue-500"
                value={formData.complainantRut || ''}
                onChange={(e) => updateFormData({ complainantRut: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Correo del denunciante</Label>
              <Input 
                type="email" 
                placeholder="ej: jplopezg@email.com" 
                className="bg-white border-gray-200 focus:ring-blue-500"
                value={formData.complainantEmail || ''}
                onChange={(e) => updateFormData({ complainantEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Cargo del denunciante</Label>
              <Input 
                placeholder="Desarrollador" 
                className="bg-white border-gray-200 focus:ring-blue-500"
                value={formData.complainantPosition || ''}
                onChange={(e) => updateFormData({ complainantPosition: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Departamento/Área del denunciante</Label>
              <Input 
                placeholder="ej: Depto informática" 
                className="bg-white border-gray-200 focus:ring-blue-500"
                value={formData.complainantDepartment || ''}
                onChange={(e) => updateFormData({ complainantDepartment: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 