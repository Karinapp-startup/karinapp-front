"use client";

import { useState, useEffect } from 'react';
import { AccusedFormData, AccusedPerson, InitialData, defaultAccusedFormData } from "@/interfaces/complaints/forms/accused";

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const RUT_REGEX = /^(\d{1,2}(?:\.\d{3}){2}-[\dkK])$/;
const RUT_CLEAN_REGEX = /[^\dkK]/g;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const BLOCKED_CHARS_REGEX = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

export interface AccusedData {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  position: string;
  department: string;
}

interface AccusedFormState {
  formData: InitialData;
  errors: {
    accusedList?: string;
    accused: {
      firstName?: string;
      lastName?: string;
      position?: string;
      department?: string;
      rut?: string;
      email?: string;
    };
  };
  touched: {
    accusedList: boolean;
    accused: {
      firstName: boolean;
      lastName: boolean;
      position: boolean;
      department: boolean;
      rut: boolean;
      email: boolean;
    };
  };
  isValid: boolean;
}

const initialState: AccusedFormState = {
  formData: defaultAccusedFormData,
  errors: {
    accused: {}
  },
  touched: {
    accusedList: false,
    accused: {
      firstName: false,
      lastName: false,
      position: false,
      department: false,
      rut: false,
      email: false
    }
  },
  isValid: false
};

export const useAccusedFormValidation = (initialData: InitialData) => {
  const [state, setState] = useState<AccusedFormState>({
    ...initialState,
    formData: initialData
  });

  const validateName = (name: string): string => {
    if (!name) return 'Este campo es requerido';
    if (BLOCKED_CHARS_REGEX.test(name)) return 'No se permiten números ni caracteres especiales';
    if (!NAME_REGEX.test(name)) return 'Solo se permiten letras y espacios';
    if (name.trim().length < 3) return 'Debe tener al menos 3 caracteres';
    if (name.length > 50) return 'No debe exceder los 50 caracteres';
    if (/\s{2,}/.test(name)) return 'No se permiten espacios múltiples';
    if (/^\s|\s$/.test(name)) return 'No puede comenzar o terminar con espacios';
    return '';
  };

  const formatRut = (value: string): string => {
    // Limpiar el RUT de cualquier formato previo
    const cleaned = value.replace(/[^\dkK]/g, '');

    if (cleaned.length <= 1) return cleaned;

    // Separar cuerpo y dígito verificador
    const body = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1).toUpperCase();

    // Formatear el cuerpo con puntos
    let formatted = '';
    for (let i = body.length - 1, j = 0; i >= 0; i--, j++) {
      if (j > 0 && j % 3 === 0) {
        formatted = '.' + formatted;
      }
      formatted = body[i] + formatted;
    }

    return `${formatted}-${dv}`;
  };

  const validateEmail = (email: string): string => {
    if (!email) return 'El correo es requerido';
    if (!EMAIL_REGEX.test(email)) return 'Correo electrónico inválido';
    return '';
  };

  const validatePosition = (position: string): string => {
    if (!position) return 'Este campo es requerido';
    if (BLOCKED_CHARS_REGEX.test(position)) return 'No se permiten números ni caracteres especiales';
    if (!NAME_REGEX.test(position)) return 'Solo se permiten letras y espacios';
    if (position.trim().length < 3) return 'Debe tener al menos 3 caracteres';
    if (position.length > 50) return 'No debe exceder los 50 caracteres';
    return '';
  };

  const validateDepartment = (department: string): string => {
    if (!department) return 'Este campo es requerido';
    if (BLOCKED_CHARS_REGEX.test(department)) return 'No se permiten números ni caracteres especiales';
    if (!NAME_REGEX.test(department)) return 'Solo se permiten letras y espacios';
    if (department.trim().length < 3) return 'Debe tener al menos 3 caracteres';
    if (department.length > 50) return 'No debe exceder los 50 caracteres';
    return '';
  };

  const handleChange = (field: keyof AccusedData, value: string) => {
    let processedValue = value;

    switch (field) {
      case 'firstName':
      case 'lastName':
        if (BLOCKED_CHARS_REGEX.test(value)) {
          return;
        }
        break;

      case 'rut':
        // Permitir solo números, puntos y guión
        if (/[^0-9.-]/.test(value)) {
          return;
        }
        // Limpiar y formatear el RUT mientras se escribe
        const cleaned = value.replace(/[^0-9]/g, '');
        if (cleaned.length > 0) {
          processedValue = formatRut(cleaned);
        } else {
          processedValue = value;
        }
        break;

      case 'position':
      case 'department':
        if (BLOCKED_CHARS_REGEX.test(value)) {
          return;
        }
        break;

      case 'email':
        processedValue = value.toLowerCase().trim();
        break;
    }

    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        accused: {
          ...prev.formData.accused,
          [field]: processedValue
        }
      }
    }));

    validateField(field, processedValue);
  };

  const validateField = (field: keyof AccusedData, value: string) => {
    let error = '';

    switch (field) {
      case 'firstName':
      case 'lastName':
        error = validateName(value);
        break;
      case 'rut':
        error = validateRut(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'position':
        error = validatePosition(value);
        break;
      case 'department':
        error = validateDepartment(value);
        break;
    }

    setState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        accused: {
          ...prev.errors.accused,
          [field]: error
        }
      }
    }));

    return error === '';
  };

  const handleBlur = (field: keyof AccusedData) => {
    setState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        accused: {
          ...prev.touched.accused,
          [field]: true
        }
      }
    }));

    const value = state.formData.accused[field];
    validateField(field, value);
  };

  const validateRut = (rut: string): string => {
    if (!rut) return 'El RUT es requerido';

    // Si está escribiendo, no mostrar error
    const cleaned = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (cleaned.length < 7) return '';

    // Validar formato básico
    if (!/^\d{1,2}(?:\.\d{3}){2}-[\dkK]$/.test(rut)) {
      return 'Formato inválido. Ejemplo: 12.345.678-9';
    }

    // Separar cuerpo y dígito verificador
    const body = cleaned.slice(0, -1);
    const verifierDigit = cleaned.slice(-1);

    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = sum % 11;
    const expectedDV = 11 - remainder;

    let calculatedDV = '';
    if (expectedDV === 11) {
      calculatedDV = '0';
    } else if (expectedDV === 10) {
      calculatedDV = 'K';
    } else {
      calculatedDV = expectedDV.toString();
    }

    // Validar que el dígito verificador sea correcto
    if (verifierDigit !== calculatedDV) {
      return 'RUT inválido';
    }

    return '';
  };

  const validateForm = () => {
    const accusedErrors = {
      accused: {
        firstName: validateName(state.formData.accused.firstName),
        lastName: validateName(state.formData.accused.lastName),
        rut: validateRut(state.formData.accused.rut),
        email: validateEmail(state.formData.accused.email),
        position: validatePosition(state.formData.accused.position),
        department: validateDepartment(state.formData.accused.department)
      }
    };

    setState(prev => ({
      ...prev,
      errors: accusedErrors
    }));

    const allFieldsFilled = Object.values(state.formData.accused).every(value => value.trim() !== '');
    const hasErrors = Object.values(accusedErrors.accused).some(error => error !== '');

    const isFormValid = allFieldsFilled && !hasErrors;
    setState(prev => ({
      ...prev,
      isValid: isFormValid
    }));
    return isFormValid;
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(state.formData.accused).every(value => value.trim() !== '');
    const hasErrors = Object.values(state.errors.accused || {}).some(error => error !== '');

    setState(prev => ({
      ...prev,
      isValid: allFieldsFilled && !hasErrors
    }));
  }, [state.formData, state.errors]);

  const resetForm = () => {
    setState({
      formData: {
        ...defaultAccusedFormData,
        accused: {
          firstName: '',
          lastName: '',
          position: '',
          department: '',
          rut: '',
          email: ''
        }
      },
      errors: {
        accused: {}
      },
      touched: {
        accusedList: false,
        accused: {
          firstName: false,
          lastName: false,
          position: false,
          department: false,
          rut: false,
          email: false
        }
      },
      isValid: false
    });
  };

  return {
    formData: state.formData,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    validateForm,
    setFormData: setState,
    resetForm
  };
};
