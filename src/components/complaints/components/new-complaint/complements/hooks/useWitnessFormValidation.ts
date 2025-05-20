"use client";
import { useState, useEffect } from 'react';
import { WitnessFormData, WitnessData, defaultWitnessFormData } from "@/interfaces/complaints/forms/witness";
import { WitnessFormState } from "../types/witness";
import { MAX_WITNESSES } from "../data/constants";

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const BLOCKED_CHARS_REGEX = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const initialState: WitnessFormState = {
  formData: defaultWitnessFormData,
  errors: {
    witness: {}
  },
  touched: {
    witness: {
      fullName: false,
      position: false,
      department: false
    }
  },
  isValid: false
};

export const useWitnessFormValidation = (defaultValues: WitnessFormData) => {
  const [state, setState] = useState<WitnessFormState>({
    ...initialState,
    formData: defaultValues || defaultWitnessFormData
  });

  const validateField = (field: keyof WitnessData, value: string): string => {
    if (!value.trim()) {
      return 'Este campo es requerido';
    }
    if (value.length < 3) {
      return 'Debe tener al menos 3 caracteres';
    }
    return '';
  };

  const handleChange = (field: keyof WitnessData, value: string) => {
    const updatedWitness = {
      ...state.formData.witness,
      [field]: value
    };

    const error = validateField(field, value);

    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        witness: updatedWitness
      },
      errors: {
        witness: {
          ...prev.errors.witness,
          [field]: error
        }
      },
      touched: {
        witness: {
          ...prev.touched.witness,
          [field]: true
        }
      }
    }));
  };

  const validateForm = () => {
    const hasErrors = Object.values(state.errors.witness).some(error => error !== '');
    const allFieldsFilled = Object.values(state.formData.witness).every(value => value.trim() !== '');
    return !hasErrors && allFieldsFilled;
  };

  return {
    formData: state.formData,
    errors: state.errors.witness,
    touched: state.touched.witness,
    isValid: state.isValid,
    handleChange,
    validateForm
  };
};