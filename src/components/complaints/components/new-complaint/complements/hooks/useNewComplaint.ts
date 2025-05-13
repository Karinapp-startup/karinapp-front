"use client";

import { useState } from "react";
import { ComplaintFormState } from "@/interfaces/complaints/form-state";
import { defaultEmployerFormData } from "@/interfaces/complaints/forms/employer";
import { defaultVictimFormData } from "@/interfaces/complaints/forms/victim";
import { defaultAccusedFormData } from "@/interfaces/complaints/forms/accused";
import { defaultRelationshipFormData } from "@/interfaces/complaints/forms/relationship";
import { defaultReportedSituationsFormData } from "@/interfaces/complaints/forms/reported-situations";
import { defaultWitnessFormData } from "@/interfaces/complaints/forms/witness";
import { defaultReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { defaultSafeguardMeasuresFormData } from "@/interfaces/complaints/forms/safeguard";
import { defaultSummaryFormData } from "@/interfaces/complaints/forms/summary";
import { defaultReviewFormData } from "@/interfaces/complaints/forms/review";

const initialFormState: ComplaintFormState = {
  employer: defaultEmployerFormData,
  victim: defaultVictimFormData,
  accused: defaultAccusedFormData,
  relationship: defaultRelationshipFormData,
  reportedSituations: defaultReportedSituationsFormData,
  witness: defaultWitnessFormData,
  reportedFacts: defaultReportedFactsFormData,
  safeguardMeasures: defaultSafeguardMeasuresFormData,
  review: defaultReviewFormData,
  currentStep: 1,
  isReviewing: false
};

interface UseNewComplaintReturn {
  formData: ComplaintFormState;
  currentStep: number;
  isLoading: boolean;
  updateFormData: (newData: Partial<ComplaintFormState>) => void;
  nextStep: () => void;
  previousStep: () => void;
}

export const useNewComplaint = (): UseNewComplaintReturn => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ComplaintFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (newData: Partial<ComplaintFormState>) => {
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
}; 