import { useState } from "react";
import { EmployerFormData } from "@/interfaces/complaints/forms/employer";
import { EmployerFormState, initialEmployerFormState } from "../types/employer";

export const useEmployerFormValidation = (defaultValues: EmployerFormData) => {
  const [state, setState] = useState<EmployerFormState>({
    ...initialEmployerFormState,
    formData: defaultValues
  });

  const validateField = (field: keyof EmployerFormData, value: any): string => {
    if (!value) {
      return 'Este campo es requerido';
    }

    if (field === 'employer' && value === 'select') {
      return 'Selecciona un empleador';
    }

    return '';
  };

  const handleChange = (field: keyof EmployerFormData, value: any) => {
    const updatedData = {
      ...state.formData,
      [field]: value
    };

    const error = validateField(field, value);

    setState(prev => ({
      ...prev,
      formData: updatedData,
      errors: {
        ...prev.errors,
        [field]: error
      },
      isValid: !error && !!updatedData.employer && updatedData.employer !== 'select' && !!updatedData.date
    }));
  };

  const handleBlur = (field: keyof EmployerFormData) => {
    setState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [field]: true
      }
    }));
  };

  const validateForm = () => {
    const errors: EmployerFormState['errors'] = {};

    if (!state.formData.employer || state.formData.employer === 'select') {
      errors.employer = 'Debes seleccionar un empleador';
    }

    if (!state.formData.date) {
      errors.date = 'La fecha es requerida';
    }

    setState(prev => ({
      ...prev,
      errors,
      isValid: Object.keys(errors).length === 0
    }));

    return Object.keys(errors).length === 0;
  };

  return {
    formData: state.formData,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    validateForm
  };
};

export interface EmployerFormValidation {
  formData: EmployerFormData;
  errors: {
    employer?: string;
    date?: string;
  };
  touched: {
    employer: boolean;
    date: boolean;
  };
  isValid: boolean;
  handleChange: (field: keyof EmployerFormData, value: any) => void;
  handleBlur: (field: keyof EmployerFormData) => void;
  validateForm: () => boolean;
}