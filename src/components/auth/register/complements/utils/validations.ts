import { RegisterFormData } from '@/interfaces/auth/register';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../data/constants';

export const validateField = (
  field: keyof RegisterFormData,
  value: string | boolean
): string => {
  if (typeof value === 'string' && !value.trim()) {
    return ERROR_MESSAGES.REQUIRED;
  }

  switch (field) {
    case 'firstName':
    case 'lastName':
      if (typeof value === 'string' && value.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
        return `Mínimo ${VALIDATION_RULES.NAME.MIN_LENGTH} caracteres`;
      }
      if (typeof value === 'string' && value.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
        return `Máximo ${VALIDATION_RULES.NAME.MAX_LENGTH} caracteres`;
      }
      break;

    case 'documentId':
      if (typeof value === 'string' && !VALIDATION_RULES.DOCUMENT_ID.PATTERN.test(value)) {
        return 'RUT inválido';
      }
      break;

    case 'email':
      if (typeof value === 'string' && !VALIDATION_RULES.EMAIL.PATTERN.test(value)) {
        return 'Correo electrónico inválido';
      }
      break;

    case 'password':
      if (typeof value === 'string') {
        if (value.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
          return `Mínimo ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} caracteres`;
        }
        if (!VALIDATION_RULES.PASSWORD.PATTERN.test(value)) {
          return 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial';
        }
      }
      break;

    case 'acceptTerms':
      if (!value) {
        return 'Debes aceptar los términos y condiciones';
      }
      break;
  }

  return '';
};

export const validateRegisterForm = (formData: RegisterFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(formData).forEach((key) => {
    const field = key as keyof RegisterFormData;
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}; 