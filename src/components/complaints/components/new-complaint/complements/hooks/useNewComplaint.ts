"use client";

import { useState } from "react";

interface FormData {
  employer?: string;
  date?: Date;
  victimFirstName?: string;
  victimLastName?: string;
  victimRut?: string;
  victimEmail?: string;
  victimPosition?: string;
  victimDepartment?: string;
  isVictim?: boolean;
  complainantFirstName?: string;
  complainantLastName?: string;
  complainantRut?: string;
  complainantEmail?: string;
  complainantPosition?: string;
  complainantDepartment?: string;
  accusedFirstName?: string;
  accusedLastName?: string;
  accusedRut?: string;
  accusedEmail?: string;
  accusedPosition?: string;
  accusedDepartment?: string;
  accusedList?: Array<{
    fullName: string;
    rut: string;
    email: string;
    position: string;
    department: string;
  }>;
  relationship?: 
    | "asymmetric_victim_dependent"
    | "asymmetric_accused_dependent"
    | "symmetric_same_area"
    | "symmetric_different_area";
  situations?: {
    hasEvidence?: boolean;
    hasPriorCases?: boolean;
    wasPreviouslyReported?: boolean;
  };
  currentWitness?: {
    fullName: string;
    position: string;
    department: string;
  };
  witnesses?: Array<{
    fullName: string;
    position: string;
    department: string;
  }>;
  reportedFacts?: string;
  situationType?: 
    | "workplace_harassment"
    | "sexual_harassment"
    | "workplace_violence";
  safeguardMeasure?: 
    | "workspace_separation"
    | "schedule_modification"
    | "psychological_care"
    | "other";
  otherMeasure?: string;
  safeguardResponsible?: string;
  safeguardDate?: Date;
  summary?: string;
  investigationBy?: "employer" | "labor_direction";
  actDate?: Date;
  actHour?: string;
  actMinute?: string;
  isReviewing?: boolean;
  confirmed?: boolean;
}

export function useNewComplaint() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (currentStep < 10) {
        setCurrentStep(prev => prev + 1);
      }
      setIsLoading(false);
    }, 100);
  };

  const previousStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (formData.isReviewing) {
        updateFormData({ isReviewing: false });
      } else if (currentStep > 1) {
        setCurrentStep(prev => prev - 1);
      }
      setIsLoading(false);
    }, 100);
  };

  return {
    formData,
    currentStep,
    isLoading,
    updateFormData,
    nextStep,
    previousStep
  };
} 