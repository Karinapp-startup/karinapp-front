import { useState } from 'react';
import { ComplaintFormData } from '@/interfaces/complaints/forms/complaint';
import { defaultEmployerFormData } from '@/interfaces/complaints/forms/employer';
import { defaultVictimFormData } from '@/interfaces/complaints/forms/victim';
import { defaultAccusedFormData } from '@/interfaces/complaints/forms/accused';
import { defaultRelationshipFormData } from '@/interfaces/complaints/forms/relationship';
import { defaultReportedFactsFormData } from '@/interfaces/complaints/forms/reported-facts';
import { defaultReportedSituationsFormData } from '@/interfaces/complaints/forms/reported-situations';
import { defaultSafeguardMeasuresFormData } from '@/interfaces/complaints/forms/safeguard';
import { defaultReviewFormData } from '@/interfaces/complaints/forms/review';

const initialFormData: ComplaintFormData = {
  employer: defaultEmployerFormData,
  victim: defaultVictimFormData,
  accused: defaultAccusedFormData,
  relationship: defaultRelationshipFormData,
  witness: {
    witness: {
      fullName: '',
      position: '',
      department: ''
    },
    witnesses: []
  },
  reportedFacts: defaultReportedFactsFormData,
  reportedSituations: defaultReportedSituationsFormData,
  safeguardMeasures: defaultSafeguardMeasuresFormData,
  review: defaultReviewFormData,
  isReviewing: false
};

export const useNewComplaint = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ComplaintFormData>(initialFormData);

  const updateFormData = (data: Partial<ComplaintFormData>) => {
    console.log('Updating form data:', data);
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const nextStep = () => {
    console.log('Moving to next step from:', currentStep);
    setCurrentStep(currentStep + 1);  // Cambiamos esto para asegurar la actualización
  };

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  console.log('Current step in hook:', currentStep); // Debug

  return {
    formData,
    currentStep,
    isLoading: false,
    updateFormData,
    nextStep,
    previousStep
  };
}; 