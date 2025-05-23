export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  INVALID_EMAIL: 'Correo electrónico inválido',
  USER_NOT_FOUND: 'Usuario no encontrado',
  INVALID_CODE: 'Código de verificación inválido',
  PASSWORDS_NOT_MATCH: 'Las contraseñas no coinciden',
  INVALID_PASSWORD: 'La contraseña no cumple con los requisitos',
  GENERIC_ERROR: 'Ha ocurrido un error. Por favor, intenta nuevamente.'
} as const;

export const SUCCESS_MESSAGES = {
  EMAIL_SENT: 'Se ha enviado un código de verificación a tu correo electrónico.',
  PASSWORD_UPDATED: 'Tu contraseña ha sido actualizada correctamente.'
} as const;

export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  },
  CODE: {
    PATTERN: /^\d{6}$/
  }
} as const; 