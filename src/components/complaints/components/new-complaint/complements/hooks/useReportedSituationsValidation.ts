"use client";

import { useState, useCallback } from 'react';
import { ReportedSituationsFormData, SituationType } from '@/interfaces/complaints/forms/reported-situations';
import { SITUATION_TYPES } from "../data/constants";

interface ReportedSituationsFormState {
  formData: ReportedSituationsFormData;
  errors: {
    situationType?: string;
  };
  touched: {
    situationType: boolean;
  };
  isValid: boolean;
}

const initialFormData: ReportedSituationsFormData = {
  situationType: SITUATION_TYPES.HARASSMENT,
  evidence: false,
  priorCases: false,
  previousReports: false
};

const initialState: ReportedSituationsFormState = {
  formData: initialFormData,
  errors: {},
  touched: {
    situationType: false
  },
  isValid: false
};

export function useReportedSituationsValidation(defaultValues: ReportedSituationsFormData) {
  const [formState, setFormState] = useState<ReportedSituationsFormState>({
    ...initialState,
    formData: defaultValues || initialFormData
  });

  const validateForm = useCallback((data: ReportedSituationsFormData) => {
    const errors: ReportedSituationsFormState['errors'] = {};
    let isValid = true;

    const situationTypes = Object.values(SITUATION_TYPES) as SituationType[];
    if (!data.situationType || !situationTypes.includes(data.situationType)) {
      errors.situationType = 'Debe seleccionar un tipo de situación';
      isValid = false;
    }

    setFormState(prev => ({
      ...prev,
      errors,
      isValid
    }));

    return isValid;
  }, []);

  const handleChange = useCallback((field: keyof ReportedSituationsFormData, value: any) => {
    setFormState(prev => {
      const newData = {
        ...prev.formData,
        [field]: value
      };

      return {
        ...prev,
        formData: newData,
        isValid: !!value // Válido si se selecciona un tipo
      };
    });
  }, []);

  return {
    formData: formState.formData,
    errors: formState.errors,
    touched: formState.touched,
    isValid: formState.isValid,
    handleChange,
    validateForm
  };
} 