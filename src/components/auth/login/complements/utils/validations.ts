import { VALIDATION_RULES } from '../data/constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL.PATTERN.test(email);
};

export const validateLoginForm = (formData: LoginFormData) => {
  const errors: Partial<Record<keyof LoginFormData, string>> = {};

  if (!formData.email) {
    errors.email = 'El correo es requerido';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Correo electrónico inválido';
  }

  if (!formData.password) {
    errors.password = 'La contraseña es requerida';
  }

  return errors;
}; 