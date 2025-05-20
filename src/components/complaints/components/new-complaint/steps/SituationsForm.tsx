"use client";

import { StepProps } from "@/interfaces/complaints/forms";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: any; // Ajustar según necesidades
  onNext: (data: any) => void;
}

export const SituationsForm = ({ onNext, onBack, defaultValues }: Props) => {
  return (
    <div>
      {/* Implementar formulario de situaciones */}
    </div>
  );
}; 