export const COGNITO_CONFIG = {
  REGION: process.env.NEXT_PUBLIC_COGNITO_REGION,
  USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
  CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
} as const;

export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  INVALID_EMAIL: 'Correo electrónico inválido',
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  USER_NOT_CONFIRMED: 'Usuario no confirmado',
  NETWORK_ERROR: 'Error de conexión'
} as const;

export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
} as const; 