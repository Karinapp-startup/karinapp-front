import { useState, useCallback } from 'react';
import { PasswordRecoveryFormState, PasswordRecoveryFormData } from '@/interfaces/auth/password-recovery';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../data/constants';

const initialFormData: PasswordRecoveryFormData = {
  email: ''
};

const initialState: PasswordRecoveryFormState = {
  formData: initialFormData,
  errors: {},
  touched: {
    email: false
  },
  isValid: false
};

export const usePasswordRecoveryForm = () => {
  const [state, setState] = useState<PasswordRecoveryFormState>(initialState);

  const validateField = useCallback((name: string, value: string): string => {
    if (!value) {
      return ERROR_MESSAGES.REQUIRED;
    }

    if (name === 'email' && !VALIDATION_RULES.EMAIL.PATTERN.test(value)) {
      return ERROR_MESSAGES.INVALID_EMAIL;
    }

    return '';
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
      errors: { ...prev.errors, [name]: error },
      touched: { ...prev.touched, [name]: true },
      isValid: !error
    }));
  }, [validateField]);

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