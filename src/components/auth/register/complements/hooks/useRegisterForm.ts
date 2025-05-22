import { useState, useCallback } from 'react';
import { RegisterFormState, RegisterFormData } from '../types/register';
import { validateField, validateRegisterForm } from '../utils/validations';

export interface FormData {
  nombres: string;
  apellidos: string;
  rut: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface FormState {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  touched: Record<keyof FormData, boolean>;
  isValid: boolean;
}

const initialFormData: RegisterFormData = {
  nombres: '',
  apellidos: '',
  rut: '',
  email: '',
  password: '',
  terms: false
};

export const useRegisterForm = () => {
  const [state, setState] = useState<RegisterFormState>({
    formData: initialFormData,
    errors: {},
    touched: {
      nombres: false,
      apellidos: false,
      rut: false,
      email: false,
      password: false,
      terms: false
    },
    isValid: false
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setState(prev => {
      const newFormData = {
        ...prev.formData,
        [name]: newValue
      };

      const error = validateField(name as keyof RegisterFormData, newValue);
      const newErrors = { ...prev.errors };
      
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      return {
        ...prev,
        formData: newFormData,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0
      };
    });
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true }
    }));
  }, []);

  return {
    formData: state.formData,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    handleChange,
    handleBlur
  };
}; 