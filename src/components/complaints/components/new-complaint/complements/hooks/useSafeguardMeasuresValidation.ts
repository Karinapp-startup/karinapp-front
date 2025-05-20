"use client";

import { useState, useCallback } from 'react';
import { SafeguardMeasuresFormData, SafeguardMeasureTypeValues } from '@/interfaces/complaints/forms/safeguard';
import { MAX_SAFEGUARD_MEASURES } from '../data/constants';

interface SafeguardMeasuresFormState {
  formData: SafeguardMeasuresFormData;
  errors: {
    selectedMeasures?: string;
    safeguardResponsible?: string;
    safeguardDate?: string;
    otherMeasure?: string;
  };
  touched: {
    selectedMeasures: boolean;
    safeguardResponsible: boolean;
    safeguardDate: boolean;
    otherMeasure: boolean;
  };
  isValid: boolean;
}

const initialState: SafeguardMeasuresFormState = {
  formData: {
    selectedMeasures: [],
    safeguardMeasure: 'workspace_separation',
    safeguardResponsible: '',
    safeguardDate: new Date(),
    otherMeasure: '',
    description: '',
    measures: []
  },
  errors: {},
  touched: {
    selectedMeasures: false,
    safeguardResponsible: false,
    safeguardDate: false,
    otherMeasure: false
  },
  isValid: false
};

export const useSafeguardMeasuresValidation = (defaultValues?: SafeguardMeasuresFormData) => {
  const [formState, setFormState] = useState<SafeguardMeasuresFormState>({
    ...initialState,
    formData: {
      ...initialState.formData,
      ...defaultValues
    }
  });

  const toggleMeasure = useCallback((measure: SafeguardMeasureTypeValues) => {
    setFormState(prev => {
      const selectedMeasures = prev.formData.selectedMeasures.includes(measure)
        ? prev.formData.selectedMeasures.filter(m => m !== measure)
        : [...prev.formData.selectedMeasures, measure];

      return {
        ...prev,
        touched: {
          ...prev.touched,
          selectedMeasures: true
        },
        formData: {
          ...prev.formData,
          selectedMeasures
        }
      };
    });
  }, []);

  const handleChange = useCallback((field: keyof SafeguardMeasuresFormData, value: any) => {
    setFormState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      }
    }));
  }, []);

  const handleBlur = useCallback((field: keyof SafeguardMeasuresFormData) => {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: true
      }
    }));
  }, []);

  const validateForm = useCallback((data: SafeguardMeasuresFormData) => {
    const errors: SafeguardMeasuresFormState['errors'] = {};
    let isValid = true;

    if (data.selectedMeasures.length === 0) {
      errors.selectedMeasures = 'Debe seleccionar al menos una medida';
      isValid = false;
    }

    if (!data.safeguardResponsible?.trim()) {
      errors.safeguardResponsible = 'El nombre es requerido';
      isValid = false;
    }

    if (!data.safeguardDate) {
      errors.safeguardDate = 'La fecha es requerida';
      isValid = false;
    }

    if (data.selectedMeasures.includes('other') && !data.otherMeasure?.trim()) {
      errors.otherMeasure = 'Debe especificar la otra medida';
      isValid = false;
    }

    setFormState(prev => ({
      ...prev,
      errors,
      isValid
    }));

    return isValid;
  }, []);

  const addMeasure = useCallback(() => {
    if (!validateForm(formState.formData)) return false;
    if (formState.formData.measures.length >= MAX_SAFEGUARD_MEASURES) return false;

    const newMeasures = formState.formData.selectedMeasures.map(type => ({
      type,
      responsible: formState.formData.safeguardResponsible,
      date: formState.formData.safeguardDate,
      status: 'pending' as const
    }));

    setFormState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        measures: [...prev.formData.measures, ...newMeasures],
        selectedMeasures: [],
        safeguardResponsible: '',
        otherMeasure: ''
      }
    }));

    return true;
  }, [formState.formData, validateForm]);

  return {
    formData: formState.formData,
    errors: formState.errors,
    touched: formState.touched,
    isValid: formState.isValid,
    toggleMeasure,
    handleChange,
    handleBlur,
    validateForm,
    addMeasure
  };
}; 