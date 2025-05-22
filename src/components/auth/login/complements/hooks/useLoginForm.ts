"use client";

import { useState, useCallback } from 'react';
import { LoginFormData, LoginFormState } from '@/interfaces/auth/login';
import { VALIDATION_RULES } from '../data/constants';

const initialFormData: LoginFormData = {
  email: '',
  password: '',
  remember: false
};

const initialState: LoginFormState = {
  formData: initialFormData,
  errors: {},
  touched: {
    email: false,
    password: false,
    remember: false
  },
  isValid: false
};

export const useLoginForm = () => {
  const [state, setState] = useState<LoginFormState>(initialState);

  const validateField = useCallback((name: keyof LoginFormData, value: string | boolean): string => {
    console.log('Validando campo:', name, 'valor:', value);
    
    if (name === 'remember') return '';

    if (typeof value === 'string' && !value.trim()) {
      console.log('Campo vacío');
      return 'Este campo es requerido';
    }

    switch (name) {
      case 'email':
        const isValidEmail = VALIDATION_RULES.EMAIL.PATTERN.test(value as string);
        console.log('Email válido:', isValidEmail);
        if (!isValidEmail) {
          return 'Correo electrónico inválido';
        }
        break;
      case 'password':
        const isValidPassword = (value as string).length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH;
        console.log('Password válida:', isValidPassword, 'longitud:', (value as string).length);
        if (!isValidPassword) {
          return `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} caracteres`;
        }
        break;
    }
    return '';
  }, []);

  const validateForm = useCallback((data: LoginFormData): boolean => {
    const isValid = (
      data.email.trim() !== '' &&
      data.password.trim() !== '' &&
      VALIDATION_RULES.EMAIL.PATTERN.test(data.email) &&
      data.password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH
    );
    
    console.log('Validación del formulario:', {
      emailNotEmpty: data.email.trim() !== '',
      passwordNotEmpty: data.password.trim() !== '',
      validEmailFormat: VALIDATION_RULES.EMAIL.PATTERN.test(data.email),
      validPasswordLength: data.password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH,
      isFormValid: isValid
    });

    return isValid;
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    console.log('Cambio en campo:', name, 'nuevo valor:', newValue);

    setState(prev => {
      const newFormData = {
        ...prev.formData,
        [name]: newValue
      };

      const error = validateField(name as keyof LoginFormData, newValue);
      const newErrors = { ...prev.errors };
      
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      const isValid = validateForm(newFormData);

      console.log('Estado actualizado:', {
        formData: newFormData,
        errors: newErrors,
        isValid
      });

      return {
        ...prev,
        formData: newFormData,
        errors: newErrors,
        isValid,
        touched: {
          ...prev.touched,
          [name]: true
        }
      };
    });
  }, [validateField, validateForm]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('Campo perdió foco:', name, 'valor:', value);
    
    setState(prev => {
      const error = validateField(name as keyof LoginFormData, value);
      const newErrors = { ...prev.errors };
      
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      return {
        ...prev,
        errors: newErrors,
        touched: {
          ...prev.touched,
          [name]: true
        }
      };
    });
  }, [validateField]);

  console.log('Estado actual del formulario:', {
    formData: state.formData,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid
  });

  return {
    formData: state.formData,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    handleChange,
    handleBlur
  };
}; 