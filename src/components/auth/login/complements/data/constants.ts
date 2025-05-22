export const COGNITO_CONFIG = {
  USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
  CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  REGION: process.env.NEXT_PUBLIC_COGNITO_REGION
} as const;

export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  INVALID_EMAIL: 'Correo electrónico inválido',
  INVALID_PASSWORD: 'Contraseña inválida',
  INVALID_CREDENTIALS: 'Credenciales incorrectas',
  USER_NOT_CONFIRMED: 'Usuario no confirmado',
  USER_NOT_FOUND: 'Usuario no encontrado'
} as const;

export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 8
  }
} as const; 