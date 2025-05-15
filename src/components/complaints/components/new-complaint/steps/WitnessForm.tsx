"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import {
  WitnessFormData,
  Witness,
  witnessFields,
  defaultWitnessFormData
} from "@/interfaces/complaints/forms/witness";
import { StepProps } from "@/interfaces/complaints/forms";
import { useState } from "react";
import { useWitnessFormValidation } from "../complements/hooks/useWitnessFormValidation";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues?: WitnessFormData;
  onNext: (data: WitnessFormData) => void;
  validation: ReturnType<typeof useWitnessFormValidation>;
}

const MAX_WITNESSES = 10;

export function WitnessForm({ defaultValues = defaultWitnessFormData, onNext, validation }: Props) {
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = validation;

  const [witnesses, setWitnesses] = useState<Witness[]>(
    defaultValues?.witnesses || []
  );

  const handleAddWitness = () => {
    const valid = validateForm();
    if (!valid || witnesses.length >= MAX_WITNESSES) return;

    const newWitnesses = [...witnesses, formData.witness];
    setWitnesses(newWitnesses);
    resetForm();
    onNext({ witnesses: newWitnesses });
  };

  const handleRemoveWitness = (index: number) => {
    const updated = witnesses.filter((_, i) => i !== index);
    setWitnesses(updated);
    onNext({ witnesses: updated });
  };

  // return (
  //   <div className="space-y-6">
  //     <h2 className="text-xl font-semibold text-gray-900">Testigos</h2>

  //     <div className="space-y-4">
  //       <p className="text-sm text-gray-600">
  //         Ingresa los datos de cada uno: <span className="text-gray-400">(máximo 10 testigos)</span>
  //       </p>

  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //         {witnessFields.slice(0, 2).map((field) => (
  //           <div key={field.id} className="space-y-2">
  //             <Label className="text-sm text-gray-600">{field.label}</Label>
  //             <Input
  //               placeholder={field.placeholder}
  //               value={formData.witness[field.id]}
  //               onChange={(e) => handleChange(field.id, e.target.value)}
  //               onBlur={() => handleBlur(field.id)}
  //               className="bg-white border-gray-200"
  //             />
  //           </div>
  //         ))}

  //         <div className="flex items-end gap-4">
  //           <div className="flex-1 space-y-2">
  //             <Label className="text-sm text-gray-600">{witnessFields[2].label}</Label>
  //             <Input
  //               placeholder={witnessFields[2].placeholder}
  //               value={formData.witness.department}
  //               onChange={(e) => handleChange('department', e.target.value)}
  //               onBlur={() => handleBlur('department')}
  //               className="bg-white border-gray-200"
  //             />
  //           </div>
  //           <Button
  //             type="button"
  //             onClick={handleAddWitness}
  //             disabled={witnesses.length >= MAX_WITNESSES}
  //             variant="outline"
  //             className="h-10 px-4 bg-white"
  //           >
  //             Añadir
  //           </Button>
  //         </div>
  //       </div>
  //     </div>

  //     {witnesses.length > 0 && (
  //       <div className="space-y-4">
  //         <h3 className="text-sm font-medium text-gray-900">Testigos añadidos</h3>
  //         <div className="bg-white rounded-lg overflow-hidden">
  //           <table className="min-w-full">
  //             <thead>
  //               <tr className="border-b border-gray-200">
  //                 {witnessFields.map((field) => (
  //                   <th key={field.id} className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">
  //                     {field.label}
  //                   </th>
  //                 ))}
  //                 <th className="w-[50px]"></th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {witnesses.map((witness, index) => (
  //                 <tr key={index} className="border-b border-gray-200 last:border-0">
  //                   <td className="py-3 px-4 text-sm text-gray-900">{witness.fullName}</td>
  //                   <td className="py-3 px-4 text-sm text-gray-900">{witness.position}</td>
  //                   <td className="py-3 px-4 text-sm text-gray-900">{witness.department}</td>
  //                   <td className="py-3 px-4">
  //                     <Button
  //                       type="button"
  //                       variant="ghost"
  //                       size="sm"
  //                       onClick={() => handleRemoveWitness(index)}
  //                       className="text-gray-500 hover:text-red-600"
  //                     >
  //                       <Trash2 className="h-4 w-4" />
  //                     </Button>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Testigos</h2>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Ingresa los datos de cada uno: <span className="text-gray-400">(máximo 10 testigos)</span>
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddWitness();
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {witnessFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label className="text-sm text-gray-600">{field.label}</Label>
              <Input
                placeholder={field.placeholder}
                value={formData.witness[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                onBlur={() => handleBlur(field.id)}
                className="bg-white border-gray-200"
              />
              {touched.witness[field.id] && errors.witness[field.id] && (
                <p className="text-sm text-red-500">{errors.witness[field.id]}</p>
              )}
            </div>
          ))}

          <div className="md:col-span-3 flex justify-end">
            <Button
              type="submit"
              disabled={!isValid || witnesses.length >= MAX_WITNESSES}
              variant="outline"
              className="h-10 px-4 bg-white"
            >
              Añadir
            </Button>
          </div>
        </form>
      </div>

      {witnesses.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Testigos añadidos</h3>
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {witnessFields.map((field) => (
                    <th key={field.id} className="text-xs font-medium text-gray-500 uppercase py-3 px-4 text-left">
                      {field.label}
                    </th>
                  ))}
                  <th className="w-[50px]"></th>
                </tr>
              </thead>
              <tbody>
                {witnesses.map((witness, index) => (
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
  );
} 