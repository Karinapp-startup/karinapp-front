"use client";

import { useState } from 'react';
import { RelationshipFormData } from '@/interfaces/complaints/forms/relationship';

interface RelationshipFormState {
  formData: RelationshipFormData;
  errors: {
    relationship?: {
      type?: string;
      description?: string;
      situations?: {
        hasEvidence?: string;
        hasPriorCases?: string;
        wasPreviouslyReported?: string;
      };
    };
  };
  touched: {
    relationship: {
      type: boolean;
      description: boolean;
      situations: {
        hasEvidence: boolean;
        hasPriorCases: boolean;
        wasPreviouslyReported: boolean;
      };
    };
  };
  isValid: boolean;
}

const initialState: RelationshipFormState = {
  formData: {
    relationship: {
      type: '',
      description: '',
      situations: {
        hasEvidence: false,
        hasPriorCases: false,
        wasPreviouslyReported: false
      }
    }
  },
  errors: {},
  touched: {
    relationship: {
      type: false,
      description: false,
      situations: {
        hasEvidence: false,
        hasPriorCases: false,
        wasPreviouslyReported: false
      }
    }
  },
  isValid: false
};

function useRelationshipFormValidation(defaultValues: RelationshipFormData) {
  const [state, setState] = useState<RelationshipFormState>({
    ...initialState,
    formData: defaultValues || initialState.formData
  });

  const validateField = (field: string, value: any): string => {
    if (field === 'type' && !value) {
      return 'Debe seleccionar un tipo de relación';
    }

    if (field === 'description' && (!value || value.trim().length < 10)) {
      return 'La descripción debe tener al menos 10 caracteres';
    }

    return '';
  };

  const handleChange = (field: string, value: any) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        relationship: {
          ...prev.formData.relationship,
          [field]: value
        }
      },
      touched: {
        ...prev.touched,
        relationship: {
          ...prev.touched.relationship,
          [field]: true
        }
      }
    }));

    const error = validateField(field, value);
    if (error) {
      setState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          relationship: {
            ...prev.errors.relationship,
            [field]: error
          }
        }
      }));
    }
  };

  const handleBlur = (field: string) => {
    setState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        relationship: {
          ...prev.touched.relationship,
          [field]: true
        }
      }
    }));

    const value = state.formData.relationship[field];
    const error = validateField(field, value);
    
    setState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        relationship: {
          ...prev.errors.relationship,
          [field]: error
        }
      }
    }));
  };

  const validateForm = () => {
    const errors = {
      type: validateField('type', state.formData.relationship.type),
      description: validateField('description', state.formData.relationship.description)
    };

    const hasErrors = Object.values(errors).some(error => error !== '');
    const allFieldsFilled = state.formData.relationship.type && 
                          state.formData.relationship.description;

    setState(prev => ({
      ...prev,
      errors: {
        relationship: errors
      },
      isValid: !hasErrors && allFieldsFilled
    }));

    return !hasErrors && allFieldsFilled;
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
}

export { useRelationshipFormValidation }; 