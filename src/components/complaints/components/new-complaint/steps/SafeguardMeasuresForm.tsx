"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  SafeguardMeasuresFormData,
  SafeguardMeasure,
  SafeguardMeasureType,
  SafeguardMeasureTypeValues
} from "@/interfaces/complaints/forms/safeguard";
import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: SafeguardMeasuresFormData;
  onNext: (data: SafeguardMeasuresFormData) => void;
}

export const SafeguardMeasuresForm = ({ onNext, onBack, defaultValues }: Props) => {
  const [currentMeasure, setCurrentMeasure] = useState<SafeguardMeasure>({
    type: SafeguardMeasureType.SEPARATION,
    description: "",
    responsible: "",
    date: new Date()
  });

  const handleCheckboxChange = (type: SafeguardMeasureTypeValues, checked: boolean) => {
    if (checked) {
      setCurrentMeasure(prev => ({
        ...prev,
        type
      }));
    }
  };

  const handleOtherChange = (description: string) => {
    setCurrentMeasure(prev => ({
      ...prev,
      description
    }));
  };

  const handleAddMeasure = () => {
    if (currentMeasure.type && currentMeasure.responsible && currentMeasure.date) {
      const updatedMeasures = [...defaultValues.measures, currentMeasure];
      onNext({
        ...defaultValues,
        measures: updatedMeasures
      });
      setCurrentMeasure({
        type: SafeguardMeasureType.SEPARATION,
        description: "",
        responsible: "",
        date: new Date()
      });
    }
  };

  const handleRemoveMeasure = (index: number) => {
    const updatedMeasures = defaultValues.measures.filter((_, i) => i !== index);
    onNext({
      ...defaultValues,
      measures: updatedMeasures
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentMeasure(prev => ({
        ...prev,
        date
      }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Definición de medidas de resguardo</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Selecciona una o varias medidas
        </p>

        <div className="space-y-3">
          <div className={`flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200`}>
            <Checkbox
              id="workspace_separation"
              checked={currentMeasure.type === SafeguardMeasureType.SEPARATION}
              onCheckedChange={(checked) => handleCheckboxChange(SafeguardMeasureType.SEPARATION, checked as boolean)}
            />
            <Label htmlFor="workspace_separation" className="text-sm text-gray-700">
              Separación de espacios de trabajo
            </Label>
          </div>

          <div className={`flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200`}>
            <Checkbox
              id="schedule_modification"
              checked={currentMeasure.type === SafeguardMeasureType.SCHEDULE_MODIFICATION}
              onCheckedChange={(checked) => handleCheckboxChange(SafeguardMeasureType.SCHEDULE_MODIFICATION, checked as boolean)}
            />
            <Label htmlFor="schedule_modification" className="text-sm text-gray-700">
              Modificación de jornadas
            </Label>
          </div>

          <div className={`flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200`}>
            <Checkbox
              id="psychological_support"
              checked={currentMeasure.type === SafeguardMeasureType.PSYCHOLOGICAL_SUPPORT}
              onCheckedChange={(checked) => handleCheckboxChange(SafeguardMeasureType.PSYCHOLOGICAL_SUPPORT, checked as boolean)}
            />
            <Label htmlFor="psychological_support" className="text-sm text-gray-700">
              Atención psicológica temprana del organismo administrador de la empresa (accidentes laborales)
            </Label>
          </div>

          <div className={`flex items-start space-x-3 p-4 rounded-lg bg-white border border-gray-200`}>
            <Checkbox
              id="other"
              checked={currentMeasure.type === SafeguardMeasureType.OTHER}
              onCheckedChange={(checked) => handleCheckboxChange(SafeguardMeasureType.OTHER, checked as boolean)}
            />
            <div className="flex-1 flex gap-4">
              <Label htmlFor="other" className="text-sm text-gray-700">Otra</Label>
              {currentMeasure.type === SafeguardMeasureType.OTHER && (
                <Input
                  placeholder="Indique cuál..."
                  value={currentMeasure.description}
                  onChange={(e) => handleOtherChange(e.target.value)}
                  className="flex-1"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Ingresa el nombre de quién la(s) tomó y desde qué fecha
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Nombre</Label>
            <Input
              placeholder="ej: Juan Pablo"
              value={currentMeasure.responsible}
              onChange={(e) => setCurrentMeasure(prev => ({
                ...prev,
                responsible: e.target.value
              }))}
              className="bg-white border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Medidas adoptas desde</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-gray-200",
                    !currentMeasure.date && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {currentMeasure.date && format(currentMeasure.date, "PPP", { locale: es })
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={currentMeasure.date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleAddMeasure}
            variant="outline"
            className="bg-white"
          >
            Añadir medida
          </Button>
        </div>
      </div>

      {defaultValues.measures.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Medidas de resguardo adoptadas</h3>
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">Tipo de medida</th>
                  <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">Adoptada por</th>
                  <th className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">Desde</th>
                  <th className="w-[50px]"></th>
                </tr>
              </thead>
              <tbody>
                {defaultValues.measures.map((measure, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-0">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {measure.type === SafeguardMeasureType.OTHER ? measure.description : measure.type}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{measure.responsible}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {measure.date && format(measure.date, "dd/MM/yy")}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMeasure(index)}
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
  );
}; 