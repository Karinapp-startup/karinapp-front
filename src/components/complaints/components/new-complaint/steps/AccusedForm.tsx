"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AccusedFormData, AccusedPerson, defaultAccusedFormData } from "@/interfaces/complaints/forms/accused";
import { StepProps } from "@/interfaces/complaints/forms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: AccusedFormData;
  onNext: (data: AccusedFormData) => void;
}

export const AccusedForm = ({ onNext, onBack, defaultValues }: Props) => {
  const [formData, setFormData] = useState<AccusedFormData>(
    defaultValues || defaultAccusedFormData
  );

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid = formData.employerId !== '' &&
      formData.employerId !== 'select' &&
      formData.accusedId !== '' &&
      formData.accusedId !== 'select';
    setIsValid(valid);
  }, [formData]);

  const handleEmployerChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      employerId: value,
      // Resetear el acusado cuando cambia el empleador
      accusedId: 'select'
    }));
  };

  const handleAccusedChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      accusedId: value
    }));
  };

  const handleNext = () => {
    if (isValid) {
      onNext(formData);
    }
  };

  const handleAddAccused = () => {
    if (!defaultValues.accusedFirstName || !defaultValues.accusedLastName) return;

    const newAccused: AccusedPerson = {
      fullName: `${defaultValues.accusedFirstName} ${defaultValues.accusedLastName}`,
      rut: defaultValues.accusedRut || '',
      email: defaultValues.accusedEmail || '',
      position: defaultValues.accusedPosition || '',
      department: defaultValues.accusedDepartment || ''
    };

    const currentAccused = defaultValues.accusedList || [];
    const updatedValues = {
      ...defaultValues,
      accusedList: [...currentAccused, newAccused],
      accusedFirstName: '',
      accusedLastName: '',
      accusedRut: '',
      accusedEmail: '',
      accusedPosition: '',
      accusedDepartment: ''
    };

    onNext(updatedValues);
  };

  const handleInputChange = (field: keyof AccusedFormData, value: string) => {
    onNext({
      ...defaultValues,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Selección de persona acusada</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Empleador</Label>
          <Select
            value={formData.employerId}
            onValueChange={handleEmployerChange}
          >
            <SelectTrigger className="bg-white border-gray-200">
              <SelectValue placeholder="Selecciona el empleador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select" disabled>
                Selecciona el empleador
              </SelectItem>
              <SelectItem value="1">Empleador 1</SelectItem>
              <SelectItem value="2">Empleador 2</SelectItem>
              <SelectItem value="3">Empleador 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-gray-600">Persona acusada</Label>
          <Select
            value={formData.accusedId}
            onValueChange={handleAccusedChange}
            disabled={!formData.employerId || formData.employerId === 'select'}
          >
            <SelectTrigger className="bg-white border-gray-200">
              <SelectValue placeholder="Selecciona la persona acusada" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select" disabled>
                Selecciona la persona acusada
              </SelectItem>
              <SelectItem value="1">Persona 1</SelectItem>
              <SelectItem value="2">Persona 2</SelectItem>
              <SelectItem value="3">Persona 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white"
        >
          Atrás
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          Siguiente
        </Button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Datos del denunciado</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Nombres</Label>
            <Input
              placeholder="ej: Juan Pablo"
              value={defaultValues.accusedFirstName}
              onChange={(e) => handleInputChange('accusedFirstName', e.target.value)}
              className="bg-white border-gray-200 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Apellidos</Label>
            <Input
              placeholder="ej: López González"
              value={defaultValues.accusedLastName}
              onChange={(e) => handleInputChange('accusedLastName', e.target.value)}
              className="bg-white border-gray-200 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">RUT</Label>
            <Input
              placeholder="ej: 18.456.987-0"
              value={defaultValues.accusedRut}
              onChange={(e) => handleInputChange('accusedRut', e.target.value)}
              className="bg-white border-gray-200 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Correo</Label>
            <Input
              type="email"
              placeholder="ej: jplopezg@email.com"
              value={defaultValues.accusedEmail}
              onChange={(e) => handleInputChange('accusedEmail', e.target.value)}
              className="bg-white border-gray-200 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Cargo</Label>
            <Input
              placeholder="Desarrollador"
              value={defaultValues.accusedPosition}
              onChange={(e) => handleInputChange('accusedPosition', e.target.value)}
              className="bg-white border-gray-200 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Departamento/Área</Label>
            <Input
              placeholder="ej: Depto informática"
              value={defaultValues.accusedDepartment}
              onChange={(e) => handleInputChange('accusedDepartment', e.target.value)}
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

        {defaultValues.accusedList && defaultValues.accusedList.length > 0 && (
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
                  {defaultValues.accusedList.map((accused: any, index: number) => (
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
    </div>
  );
}; 