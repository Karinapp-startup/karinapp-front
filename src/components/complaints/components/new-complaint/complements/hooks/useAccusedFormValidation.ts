"use client";

import { useState, useEffect } from 'react';

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
  accused: AccusedData;
}

interface InitialData {
  accused?: AccusedData;
}

interface TouchedState {
  accused: Record<keyof AccusedData, boolean>;
}

interface ErrorState {
  [key: string]: string;
}

export const useAccusedFormValidation = (initialData: InitialData = {}) => {
  const [formData, setFormData] = useState<AccusedFormState>({
    accused: {
      firstName: initialData.accused?.firstName || '',
      lastName: initialData.accused?.lastName || '',
      rut: initialData.accused?.rut || '',
      email: initialData.accused?.email || '',
      position: initialData.accused?.position || '',
      department: initialData.accused?.department || ''
    }
  });

  const [touched, setTouched] = useState<TouchedState>({
    accused: {
      firstName: false,
      lastName: false,
      rut: false,
      email: false,
      position: false,
      department: false
    }
  });

  const [errors, setErrors] = useState<{
    accused: Partial<Record<keyof AccusedData, string>>;
  }>({
    accused: {},
  });

  const [isValid, setIsValid] = useState(false);

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
    // Limpiar el RUT de cualquier formato
    const cleaned = value.replace(/\./g, '').replace(/-/g, '').toUpperCase();

    if (!cleaned) return '';

    // Si tiene menos de 2 caracteres, retornar tal cual
    if (cleaned.length <= 2) return cleaned;

    // Separar cuerpo y dígito verificador
    const body = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1);

    // Formatear el cuerpo con puntos
    let formatted = '';
    for (let i = body.length - 1, j = 0; i >= 0; i--, j++) {
      if (j === 3 || j === 6) formatted = '.' + formatted;
      formatted = body[i] + formatted;
    }

    // Agregar el guión y el dígito verificador
    return formatted + '-' + dv;
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
        if (/[^0-9kK.-]/.test(value)) {
          return;
        }

        processedValue = value;
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

    setFormData(prev => ({
      ...prev,
      accused: {
        ...prev.accused,
        [field]: processedValue
      }
    }));

    if (touched.accused[field]) handleBlur(field);
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

    setErrors(prev => ({
      ...prev,
      accused: {
        ...prev.accused,
        [field]: error
      }
    }));
  };

  const handleBlur = (field: keyof AccusedData) => {
    setTouched(prev => ({
      ...prev,
      accused: {
        ...prev.accused,
        [field]: true
      }
    }));

    const value = formData.accused[field];

    if (field === 'rut') {
      const formattedRut = formatRut(value);
      setFormData(prev => ({
        accused: {
          ...prev.accused,
          rut: formattedRut
        }
      }));
      validateField(field, formattedRut);
    } else {
      validateField(field, value);
    }
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
    const accusedErrors: ErrorState = {};

    Object.keys(formData.accused).forEach(field => {
      const typedField = field as keyof AccusedData;

      if (touched.accused[typedField]) {
        switch (typedField) {
          case 'rut':
            accusedErrors[field] = validateRut(formData.accused[typedField]);
            break;
          case 'email':
            accusedErrors[field] = validateEmail(formData.accused[typedField]);
            break;
          case 'position':
            accusedErrors[field] = validatePosition(formData.accused[typedField]);
            break;
          case 'department':
            accusedErrors[field] = validateDepartment(formData.accused[typedField]);
            break;
          default:
            accusedErrors[field] = validateName(formData.accused[typedField]);
        }
      }
    });

    setErrors({ accused: accusedErrors });

    const allFieldsFilled = Object.values(formData.accused).every(value => value.trim() !== '');
    const hasErrors = Object.values(accusedErrors).some(error => error !== '');

    const isFormValid = allFieldsFilled && !hasErrors;
    setIsValid(isFormValid);
    return isFormValid;
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(formData.accused).every(value => value.trim() !== '');
    const hasErrors = Object.values(errors.accused).some(error => error !== '');

    setIsValid(allFieldsFilled && !hasErrors);
  }, [formData, errors]);

  return {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm,
    setFormData,
    resetForm: () => {
      setFormData({
        accused: {
          firstName: '',
          lastName: '',
          rut: '',
          email: '',
          position: '',
          department: '',
          ...(initialData.accused || {})
        }
      });
      setErrors({ accused: {} });
      setTouched({
        accused: {
          firstName: false,
          lastName: false,
          rut: false,
          email: false,
          position: false,
          department: false
        }
      });
    }
  };
};
