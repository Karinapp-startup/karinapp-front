import { useState, useCallback } from 'react';
import { RegisterFormState, RegisterFormData } from '../types/register';
import { validateField } from '../utils/validations';

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
      const error = validateField(name as keyof RegisterFormData, newValue);
      const newErrors = { ...prev.errors, [name]: error };
      const isValid = !Object.values(newErrors).some(Boolean);

      return {
        ...prev,
        formData: { ...prev.formData, [name]: newValue },
        errors: newErrors,
        isValid
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