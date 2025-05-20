"use client";

import { useState, useCallback } from 'react';
import { SummaryFormData } from '@/interfaces/complaints/forms/summary';

interface SummaryFormState {
  formData: SummaryFormData;
  errors: {
    summary?: string;
    investigationType?: string;
    actDate?: string;
    actTime?: string;
  };
  touched: {
    summary: boolean;
    investigationType: boolean;
    actDate: boolean;
    actTime: boolean;
  };
  isValid: boolean;
}

const initialState: SummaryFormState = {
  formData: {
    summary: '',
    investigationType: 'employer',
    actDate: null,
    actTime: ''
  },
  errors: {},
  touched: {
    summary: false,
    investigationType: false,
    actDate: false,
    actTime: false
  },
  isValid: false
};

export const useSummaryFormValidation = (defaultValues?: SummaryFormData) => {
  const [formState, setFormState] = useState<SummaryFormState>({
    ...initialState,
    formData: {
      ...initialState.formData,
      ...defaultValues
    }
  });

  const handleChange = useCallback((field: keyof SummaryFormData, value: any) => {
    setFormState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      }
    }));
  }, []);

  const handleBlur = useCallback((field: keyof SummaryFormData) => {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: true
      }
    }));
  }, []);

  const validateForm = useCallback((data: SummaryFormData) => {
    const errors: SummaryFormState['errors'] = {};
    let isValid = true;

    // Validar resumen (mínimo 50 caracteres, máximo 900)
    if (!data.summary.trim()) {
      errors.summary = 'El resumen es requerido';
      isValid = false;
    } else if (data.summary.length < 50) {
      errors.summary = 'El resumen debe tener al menos 50 caracteres';
      isValid = false;
    } else if (data.summary.length > 900) {
      errors.summary = 'El resumen no puede exceder los 900 caracteres';
      isValid = false;
    }

    // Validar tipo de investigación
    if (!data.investigationType) {
      errors.investigationType = 'Debe seleccionar quién realizará la investigación';
      isValid = false;
    }

    // Validar fecha y hora
    if (!data.actDate) {
      errors.actDate = 'La fecha es requerida';
      isValid = false;
    }

    if (!data.actTime) {
      errors.actTime = 'La hora es requerida';
      isValid = false;
    }

    setFormState(prev => ({
      ...prev,
      errors,
      isValid
    }));

    return isValid;
  }, []);

  return {
    formData: formState.formData,
    errors: formState.errors,
    touched: formState.touched,
    isValid: formState.isValid,
    handleChange,
    handleBlur,
    validateForm
  };
}; 