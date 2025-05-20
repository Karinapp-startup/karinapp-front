import { useState, useCallback } from 'react';
import { LoginFormState, LoginFormData } from '../types/login';
import { validateLoginForm } from '../utils/validations';

const initialFormData: LoginFormData = {
  email: '',
  password: '',
  remember: false
};

export const useLoginForm = () => {
  const [state, setState] = useState<LoginFormState>({
    formData: initialFormData,
    errors: {},
    touched: {
      email: false,
      password: false,
      remember: false
    },
    isValid: false
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setState(prev => {
      const newFormData = { ...prev.formData, [name]: newValue };
      const errors = validateLoginForm(newFormData);
      const isValid = Object.keys(errors).length === 0;

      return {
        ...prev,
        formData: newFormData,
        errors,
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