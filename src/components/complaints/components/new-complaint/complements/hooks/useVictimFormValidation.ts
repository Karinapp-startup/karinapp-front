"use client";

import { useState, useEffect } from 'react';

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
  victim: PersonData;
  complainant?: PersonData;
  isVictim: boolean;
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

export const useVictimFormValidation = (initialData: InitialData = {}) => {
  const [formData, setFormData] = useState<VictimFormState>({
    victim: {
      firstName: initialData.victim?.firstName || '',
      lastName: initialData.victim?.lastName || '',
      rut: initialData.victim?.rut || '',
      email: initialData.victim?.email || '',
      position: initialData.victim?.position || '',
      department: initialData.victim?.department || ''
    },
    complainant: initialData.complainant ? {
      firstName: initialData.complainant.firstName || '',
      lastName: initialData.complainant.lastName || '',
      rut: initialData.complainant.rut || '',
      email: initialData.complainant.email || '',
      position: initialData.complainant.position || '',
      department: initialData.complainant.department || ''
    } : undefined,
    isVictim: initialData.isVictim ?? true
  });

  const [touched, setTouched] = useState<TouchedState>({
    victim: {
      firstName: false,
      lastName: false,
      rut: false,
      email: false,
      position: false,
      department: false
    },
    complainant: {
      firstName: false,
      lastName: false,
      rut: false,
      email: false,
      position: false,
      department: false
    }
  });

  const [errors, setErrors] = useState<{
    victim: Partial<Record<keyof PersonData, string>>;
    complainant: Partial<Record<keyof PersonData, string>>;
  }>({
    victim: {},
    complainant: {}
  });

  const [isValid, setIsValid] = useState(false);

  // Validaciones
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

  const handleChange = (section: 'victim' | 'complainant', field: keyof PersonData, value: string) => {
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

    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: processedValue
      }
    }));

    validateField(section, field, processedValue);
  };

  const validateField = (section: 'victim' | 'complainant', field: keyof PersonData, value: string) => {
    let error = '';

    // Solo validar si el campo ha sido tocado
    if (touched[section][field]) {
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
    }

    setErrors(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: error
      }
    }));
  };

  const handleBlur = (section: 'victim' | 'complainant', field: keyof PersonData) => {
    setTouched(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: true
      }
    }));

    // Asegurarnos que formData[section] existe
    const sectionData = formData[section];
    if (!sectionData) return;

    if (field === 'rut') {
      const formattedRut = formatRut(sectionData[field]);
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          rut: formattedRut
        }
      }));
      validateField(section, field, formattedRut);
    } else {
      validateField(section, field, sectionData[field]);
    }
  };

  const handleIsVictimChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isVictim: checked,
      complainant: checked ? undefined : {
        firstName: '',
        lastName: '',
        rut: '',
        email: '',
        position: '',
        department: ''
      }
    }));

    if (checked) {
      setErrors(prev => ({
        ...prev,
        complainant: {}
      }));
    }

    setTouched(prev => ({
      ...prev,
      complainant: {
        firstName: false,
        lastName: false,
        rut: false,
        email: false,
        position: false,
        department: false
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

  // Función para validar todo el formulario
  const validateForm = () => {
    // Validar sección de víctima solo si los campos han sido tocados
    const victimErrors: ErrorState = {};
    Object.keys(formData.victim).forEach(field => {
      const typedField = field as keyof PersonData;
      if (touched.victim[typedField]) {
        switch (typedField) {
          case 'rut':
            victimErrors[field] = validateRut(formData.victim[typedField]);
            break;
          case 'email':
            victimErrors[field] = validateEmail(formData.victim[typedField]);
            break;
          case 'position':
            victimErrors[field] = validatePosition(formData.victim[typedField]);
            break;
          case 'department':
            victimErrors[field] = validateDepartment(formData.victim[typedField]);
            break;
          default:
            victimErrors[field] = validateName(formData.victim[typedField]);
        }
      }
    });

    // Validar sección de denunciante
    let complainantErrors: ErrorState = {};
    if (!formData.isVictim && formData.complainant) {
      Object.keys(formData.complainant).forEach(field => {
        const typedField = field as keyof PersonData;
        if (touched.complainant[typedField]) {
          switch (typedField) {
            case 'rut':
              complainantErrors[field] = validateRut(formData.complainant![typedField]);
              break;
            case 'email':
              complainantErrors[field] = validateEmail(formData.complainant![typedField]);
              break;
            case 'position':
              complainantErrors[field] = validatePosition(formData.complainant![typedField]);
              break;
            case 'department':
              complainantErrors[field] = validateDepartment(formData.complainant![typedField]);
              break;
            default:
              complainantErrors[field] = validateName(formData.complainant![typedField]);
          }
        }
      });
    }

    setErrors({
      victim: victimErrors,
      complainant: complainantErrors
    });

    // Verificar si todos los campos requeridos están llenos
    const victimFieldsFilled = Object.values(formData.victim).every(value => value.trim() !== '');
    const hasVictimErrors = Object.values(victimErrors).some(error => error !== '');

    // Si es la víctima, solo validar la sección de víctima
    if (formData.isVictim) {
      const isFormValid = victimFieldsFilled && !hasVictimErrors;
      setIsValid(isFormValid);
      return isFormValid;
    }

    // Si no es la víctima, validar ambas secciones
    if (!formData.isVictim && formData.complainant) {
      const complainantFieldsFilled = Object.values(formData.complainant).every(value => value.trim() !== '');
      const hasComplainantErrors = Object.values(complainantErrors).some(error => error !== '');

      const isFormValid = victimFieldsFilled && !hasVictimErrors &&
        complainantFieldsFilled && !hasComplainantErrors;
      setIsValid(isFormValid);
      return isFormValid;
    }

    setIsValid(false);
    return false;
  };

  // No validar al iniciar, solo cuando cambian los datos
  useEffect(() => {
    if (Object.values(touched.victim).some(t => t) ||
      Object.values(touched.complainant).some(t => t)) {
      validateForm();
    }
  }, [formData]);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFormData,
    validateField,
    handleIsVictimChange,
    isValid,
    validateForm
  };
}; 