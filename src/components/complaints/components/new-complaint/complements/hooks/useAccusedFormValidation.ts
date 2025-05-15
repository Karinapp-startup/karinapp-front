"use client";

import { useState, useEffect } from 'react';

// Expresiones regulares simplificadas
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const RUT_REGEX = /^[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const BLOCKED_CHARS_REGEX = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

// Función para validar RUT chileno
const validateRut = (rut: string): boolean => {
  if (!RUT_REGEX.test(rut)) return false;

  let rutClean = rut.replace(/[.-]/g, '');
  const dv = rutClean.slice(-1).toUpperCase();
  let rutNumber = parseInt(rutClean.slice(0, -1));

  let M = 0, S = 1;
  while (rutNumber > 0) {
    S = (S + rutNumber % 10 * (9 - M++ % 6)) % 11;
    rutNumber = Math.floor(rutNumber / 10);
  }

  return dv === (S ? S - 1 + '' : 'K');
};

interface FormState {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  position: string;
  department: string;
}

interface TouchedState {
  firstName: boolean;
  lastName: boolean;
  rut: boolean;
  email: boolean;
  position: boolean;
  department: boolean;
}

export const useAccusedFormValidation = (initialData: Partial<FormState> = {}) => {
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    position: '',
    department: '',
    ...initialData
  });

  const [touched, setTouched] = useState<TouchedState>({
    firstName: false,
    lastName: false,
    rut: false,
    email: false,
    position: false,
    department: false
  });

  const [errors, setErrors] = useState<Record<keyof FormState, string>>({
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    position: '',
    department: ''
  });

  const [isValid, setIsValid] = useState(false);

  // Validaciones específicas por campo
  const validateName = (name: string): string => {
    if (!name) return 'Este campo es requerido';
    if (BLOCKED_CHARS_REGEX.test(name)) return 'No se permiten números ni caracteres especiales';
    if (!NAME_REGEX.test(name)) return 'Solo se permiten letras y espacios';
    if (name.trim().length < 2) return 'Debe tener al menos 2 caracteres';
    if (name.length > 50) return 'No debe exceder los 50 caracteres';
    if (/\s{2,}/.test(name)) return 'No se permiten espacios múltiples';
    if (/^\s|\s$/.test(name)) return 'No puede comenzar o terminar con espacios';
    return '';
  };

  const validateRutField = (rut: string): string => {
    if (!rut) return 'El RUT es requerido';
    if (!RUT_REGEX.test(rut)) return 'Formato inválido. Ej: 12.345.678-9';
    if (!validateRut(rut)) return 'RUT inválido';
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email) return 'El correo es requerido';
    if (!EMAIL_REGEX.test(email)) return 'Correo electrónico inválido';
    return '';
  };

  const validatePosition = (position: string): string => {
    if (!position) return 'El cargo es requerido';
    if (!NAME_REGEX.test(position)) return 'Solo se permiten letras y espacios';
    if (position.length < 2) return 'Debe tener al menos 2 caracteres';
    return '';
  };

  const validateDepartment = (department: string): string => {
    if (!department) return 'El departamento es requerido';
    if (!NAME_REGEX.test(department)) return 'Solo se permiten letras y espacios';
    if (department.length < 2) return 'Debe tener al menos 2 caracteres';
    return '';
  };

  // Validación general del formulario
  const validateForm = () => {
    const newErrors = {
      firstName: validateName(formData.firstName),
      lastName: validateName(formData.lastName),
      rut: validateRutField(formData.rut),
      email: validateEmail(formData.email),
      position: validatePosition(formData.position),
      department: validateDepartment(formData.department)
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    setIsValid(!hasErrors);
    return !hasErrors;
  };

  // Manejador para cuando el campo pierde el foco
  const handleBlur = (field: keyof FormState) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validar el campo específico
    let error = '';
    switch (field) {
      case 'firstName':
      case 'lastName':
        error = validateName(formData[field]);
        break;
      case 'rut':
        error = validateRutField(formData[field]);
        break;
      case 'email':
        error = validateEmail(formData[field]);
        break;
      case 'position':
        error = validatePosition(formData[field]);
        break;
      case 'department':
        error = validateDepartment(formData[field]);
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Manejador de cambios simplificado
  const handleChange = (field: keyof FormState, value: string) => {
    let processedValue = value;

    switch (field) {
      case 'firstName':
      case 'lastName':
        // Bloquear números y caracteres especiales
        if (BLOCKED_CHARS_REGEX.test(value)) {
          return; // No actualizar el valor si contiene caracteres bloqueados
        }
        break;

      case 'rut':
        processedValue = value
          .replace(/[^\dkK-]/g, '')
          .replace(/^(\d{1,2})(\d{3})(\d{3})([0-9kK])$/, '$1.$2.$3-$4');
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
      [field]: processedValue
    }));

    // Validar si el campo ya fue tocado
    if (touched[field]) {
      handleBlur(field);
    }
  };

  // Efecto para validar el formulario cuando cambian los datos
  useEffect(() => {
    validateForm();
  }, [formData]);

  return {
    formData,
    errors,
    isValid,
    handleChange,
    handleBlur,
    touched,
    validateForm,
    resetForm: () => {
      setFormData({
        firstName: '',
        lastName: '',
        rut: '',
        email: '',
        position: '',
        department: '',
        ...initialData
      });
      setErrors({
        firstName: '',
        lastName: '',
        rut: '',
        email: '',
        position: '',
        department: ''
      });
      setTouched({
        firstName: false,
        lastName: false,
        rut: false,
        email: false,
        position: false,
        department: false
      });
    }
  };
};