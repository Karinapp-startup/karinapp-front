"use client";
import { useState, useEffect } from 'react';

const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const BLOCKED_CHARS_REGEX = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

export interface WitnessData {
  fullName: string;
  position: string;
  department: string;
}

interface WitnessFormState {
  witness: WitnessData;
}

interface InitialData {
  witness?: WitnessData;
}

interface TouchedState {
  witness: Record<keyof WitnessData, boolean>;
}

interface ErrorState {
  [key: string]: string;
}

export const useWitnessFormValidation = (initialData: InitialData = {}) => {
  const [formData, setFormData] = useState<WitnessFormState>({
    witness: {
      fullName: initialData.witness?.fullName || '',
      position: initialData.witness?.position || '',
      department: initialData.witness?.department || ''
    }
  });

  const [touched, setTouched] = useState<TouchedState>({
    witness: {
      fullName: false,
      position: false,
      department: false
    }
  });

  const [errors, setErrors] = useState<{
    witness: Partial<Record<keyof WitnessData, string>>;
  }>({
    witness: {},
  });

  const [isValid, setIsValid] = useState(false);

  const validateFullName = (name: string): string => {
    if (!name) return 'Este campo es requerido';
    if (BLOCKED_CHARS_REGEX.test(name)) return 'No se permiten números ni caracteres especiales';
    if (!NAME_REGEX.test(name)) return 'Solo se permiten letras y espacios';
    if (name.trim().length < 3) return 'Debe tener al menos 3 caracteres';
    if (name.length > 50) return 'No debe exceder los 50 caracteres';
    if (/\s{2,}/.test(name)) return 'No se permiten espacios múltiples';
    if (/^\s|\s$/.test(name)) return 'No puede comenzar o terminar con espacios';
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

  const handleChange = (field: keyof WitnessData, value: string) => {
    let processedValue = value;

    switch (field) {
      case 'fullName':
        if (BLOCKED_CHARS_REGEX.test(value)) {
          return;
        }
        break;
      case 'position':
      case 'department':
        if (BLOCKED_CHARS_REGEX.test(value)) {
          return;
        }
        break;
    }

    setFormData(prev => ({
      ...prev,
      witness: {
        ...prev.witness,
        [field]: processedValue
      }
    }));

    if (touched.witness[field]) handleBlur(field);
  };

  const validateField = (field: keyof WitnessData, value: string) => {
    let error = '';

    switch (field) {
      case 'fullName':
        error = validateFullName(value);
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
      witness: {
        ...prev.witness,
        [field]: error
      }
    }));
  };

  const handleBlur = (field: keyof WitnessData) => {
    setTouched(prev => ({
      ...prev,
      witness: {
        ...prev.witness,
        [field]: true
      }
    }));

    const value = formData.witness[field];
    validateField(field, value);
  };

  const validateForm = () => {
    const witnessErrors: ErrorState = {};

    Object.keys(formData.witness).forEach(field => {
      const typedField = field as keyof WitnessData;
      if (touched.witness[typedField]) {
        switch (typedField) {
          case 'position':
            witnessErrors[field] = validatePosition(formData.witness[typedField]);
            break;
          case 'department':
            witnessErrors[field] = validateDepartment(formData.witness[typedField]);
            break;
          default:
            witnessErrors[field] = validateFullName(formData.witness[typedField]);
        }
      }
    });

    setErrors({ witness: witnessErrors });

    const allFieldsFilled = Object.values(formData.witness).every(value => value.trim() !== '');
    const hasErrors = Object.values(witnessErrors).some(error => error !== '');
    const isFormValid = allFieldsFilled && !hasErrors;

    setIsValid(isFormValid);
    return isFormValid;
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(formData.witness).every(value => value.trim() !== '');
    const hasErrors = Object.values(errors.witness).some(error => error !== '');
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
        witness: {
          fullName: '',
          position: '',
          department: '',
          ...(initialData.witness || {})
        }
      });
      setErrors({ witness: {} });
      setTouched({
        witness: {
          fullName: false,
          position: false,
          department: false
        }
      });
    }
  };
};