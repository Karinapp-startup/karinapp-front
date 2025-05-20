"use client";

import { useState, useEffect, useMemo } from 'react';
import { defaultVictimFormData } from "@/interfaces/complaints/forms/victim";

// Reutilizar las expresiones regulares
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const RUT_REGEX = /^(\d{1,2}(?:\.\d{3}){2}-[\dkK])$/;
const RUT_CLEAN_REGEX = /[^\dkK]/g;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const BLOCKED_CHARS_REGEX = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

interface PersonData {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  position: string;
  department: string;
}

interface VictimFormState {
  formData: VictimFormData;
  errors: {
    victim: Partial<Record<keyof PersonData, string>>;
    complainant?: Partial<Record<keyof PersonData, string>>;
  };
  touched: {
    victim: Record<keyof PersonData, boolean>;
    complainant?: Record<keyof PersonData, boolean>;
  };
  isValid: boolean;
}

interface InitialData {
  victim?: Partial<PersonData>;
  complainant?: Partial<PersonData>;
  isVictim?: boolean;
}

interface TouchedState {
  victim: Record<keyof PersonData, boolean>;
  complainant: Record<keyof PersonData, boolean>;
}

interface ErrorState {
  [key: string]: string;
}

interface VictimFormData {
  victim: PersonData;
  complainant?: PersonData;
  isComplainant: boolean;
  isValid: boolean;
  touched: {
    victim: Record<keyof PersonData, boolean>;
    complainant?: Record<keyof PersonData, boolean>;
  };
  errors: {
    victim: Partial<Record<keyof PersonData, string>>;
    complainant?: Partial<Record<keyof PersonData, string>>;
  };
}

const isFieldEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (value instanceof Date) return false;
  return false;
};

const validateName = (value: string): string => {
  if (!value.trim()) return 'Este campo es requerido';
  if (BLOCKED_CHARS_REGEX.test(value)) return 'No se permiten números ni caracteres especiales';
  if (value.length < 2) return 'Debe tener al menos 2 caracteres';
  return '';
};

const validateEmail = (value: string): string => {
  if (!value.trim()) return 'El correo es requerido';
  if (!EMAIL_REGEX.test(value)) return 'Correo electrónico inválido';
  return '';
};

const validatePosition = (value: string): string => {
  if (!value.trim()) return 'El cargo es requerido';
  if (value.length < 2) return 'Debe tener al menos 2 caracteres';
  return '';
};

const validateDepartment = (value: string): string => {
  if (!value.trim()) return 'El departamento es requerido';
  if (value.length < 2) return 'Debe tener al menos 2 caracteres';
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

export const useVictimFormValidation = (initialData: VictimFormData) => {
  const [state, setState] = useState<VictimFormState>({
    formData: {
      victim: initialData.victim,
      isComplainant: initialData.isComplainant,
      complainant: initialData.complainant,
      isValid: false,
      touched: {
        victim: {
          firstName: false,
          lastName: false,
          rut: false,
          email: false,
          position: false,
          department: false
        }
      },
      errors: {
        victim: {}
      }
    },
    errors: {
      victim: {}
    },
    touched: {
      victim: {
        firstName: false,
        lastName: false,
        rut: false,
        email: false,
        position: false,
        department: false
      }
    },
    isValid: false
  });

  // Memoizamos los valores que necesitamos monitorear
  const validationDeps = useMemo(() => ({
    victim: state.formData.victim,
    complainant: state.formData.complainant,
    isComplainant: state.formData.isComplainant,
    victimErrors: state.errors.victim,
    complainantErrors: state.errors.complainant
  }), [
    state.formData.victim,
    state.formData.complainant,
    state.formData.isComplainant,
    state.errors.victim,
    state.errors.complainant
  ]);

  const handleChange = (
    field: keyof PersonData,
    value: string,
    type: 'victim' | 'complainant' = 'victim'
  ) => {
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
        [type]: {
          ...prev.formData[type],
          [field]: processedValue
        }
      }
    }));

    validateField(type, field, processedValue);
  };

  const handleBlur = (
    field: keyof PersonData,
    type: 'victim' | 'complainant' = 'victim'
  ) => {
    setState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [type]: {
          ...prev.touched[type],
          [field]: true
        }
      }
    }));

    // Asegurarnos que state[type] existe
    const sectionData = state.formData[type];
    if (!sectionData) return;

    if (field === 'rut') {
      const formattedRut = formatRut(sectionData[field]);
      setState(prev => ({
        ...prev,
        formData: {
          ...prev.formData,
          [type]: {
            ...prev.formData[type],
            rut: formattedRut
          }
        }
      }));
      validateField(type, field, formattedRut);
    } else {
      validateField(type, field, sectionData[field]);
    }
  };

  const handleIsVictimChange = (checked: boolean) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        isComplainant: checked,
        complainant: checked ? undefined : {
          firstName: '',
          lastName: '',
          rut: '',
          email: '',
          position: '',
          department: ''
        },
        touched: {
          ...prev.formData.touched,
          complainant: checked ? undefined : {
            firstName: false,
            lastName: false,
            rut: false,
            email: false,
            position: false,
            department: false
          }
        },
        errors: {
          ...prev.formData.errors,
          complainant: checked ? undefined : {}
        }
      }
    }));
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

  const validateField = (
    type: 'victim' | 'complainant',
    field: keyof PersonData,
    value: string
  ) => {
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
        [type]: {
          ...prev.errors[type],
          [field]: error
        }
      }
    }));

    return error === '';
  };

  // Función para validar todo el formulario
  const validateForm = () => {
    // Validar sección de víctima solo si los campos han sido tocados
    const victimErrors: ErrorState = {};
    Object.keys(state.formData.victim).forEach(field => {
      const typedField = field as keyof PersonData;
      if (state.touched.victim[typedField]) {
        switch (typedField) {
          case 'rut':
            victimErrors[field] = validateRut(state.formData.victim[typedField]);
            break;
          case 'email':
            victimErrors[field] = validateEmail(state.formData.victim[typedField]);
            break;
          case 'position':
            victimErrors[field] = validatePosition(state.formData.victim[typedField]);
            break;
          case 'department':
            victimErrors[field] = validateDepartment(state.formData.victim[typedField]);
            break;
          default:
            victimErrors[field] = validateName(state.formData.victim[typedField]);
        }
      }
    });

    // Validar sección de denunciante
    let complainantErrors: ErrorState = {};
    if (!state.formData.isComplainant && state.formData.complainant) {
      Object.keys(state.formData.complainant).forEach(field => {
        const typedField = field as keyof PersonData;
        if (state.touched.complainant?.[typedField]) {
          const value = state.formData.complainant?.[typedField] || '';
          switch (typedField) {
            case 'rut':
              complainantErrors[field] = validateRut(value);
              break;
            case 'email':
              complainantErrors[field] = validateEmail(value);
              break;
            case 'position':
              complainantErrors[field] = validatePosition(value);
              break;
            case 'department':
              complainantErrors[field] = validateDepartment(value);
              break;
            default:
              complainantErrors[field] = validateName(value);
          }
        }
      });
    }

    setState(prev => ({
      ...prev,
      errors: {
        victim: victimErrors,
        complainant: complainantErrors
      }
    }));

    // Verificar si todos los campos requeridos están llenos
    const victimFieldsFilled = Object.values(state.formData.victim).every(value => !isFieldEmpty(value));
    const hasVictimErrors = Object.values(state.errors.victim).some(error => error !== '');

    // Si es la víctima, solo validar la sección de víctima
    if (state.formData.isComplainant) {
      const isFormValid = victimFieldsFilled && !hasVictimErrors;
      setState(prev => ({
        ...prev,
        isValid: isFormValid
      }));
      return isFormValid;
    }

    // Si no es la víctima, validar ambas secciones
    if (!state.formData.isComplainant && state.formData.complainant) {
      const complainantFieldsFilled = Object.values(state.formData.complainant)
        .every(value => !isFieldEmpty(value));

      // Asegurarnos de que errors.complainant existe
      const hasComplainantErrors = state.errors.complainant
        ? Object.values(state.errors.complainant || {}).some(error => error !== '')
        : false;

      const isFormValid = victimFieldsFilled && !hasVictimErrors &&
        complainantFieldsFilled && !hasComplainantErrors;

      setState(prev => ({
        ...prev,
        isValid: isFormValid
      }));
      return isFormValid;
    }

    setState(prev => ({
      ...prev,
      isValid: false
    }));
    return false;
  };

  useEffect(() => {
    const victimFieldsFilled = Object.values(validationDeps.victim)
      .every(value => !isFieldEmpty(value));

    const hasVictimErrors = Object.values(validationDeps.victimErrors)
      .some(error => error !== '');

    let isFormValid = victimFieldsFilled && !hasVictimErrors;

    if (!validationDeps.isComplainant && validationDeps.complainant) {
      const complainantFieldsFilled = Object.values(validationDeps.complainant)
        .every(value => !isFieldEmpty(value));

      // Asegurarnos de que complainantErrors existe antes de usar Object.values
      const hasComplainantErrors = validationDeps.complainantErrors
        ? Object.values(validationDeps.complainantErrors || {}).some(error => error !== '')
        : false;

      isFormValid = isFormValid && complainantFieldsFilled && !hasComplainantErrors;
    }

    if (state.isValid !== isFormValid) {
      setState(prev => ({
        ...prev,
        isValid: isFormValid
      }));
    }
  }, [validationDeps]);

  return {
    formData: state.formData,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    handleIsVictimChange,
    validateForm
  };
}; 