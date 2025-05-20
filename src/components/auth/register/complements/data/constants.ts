export const COGNITO_CONFIG = {
  REGION: process.env.NEXT_PUBLIC_COGNITO_REGION,
  USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
  CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
} as const;

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  DOCUMENT_ID: {
    PATTERN: /^[0-9]{1,8}-[0-9kK]{1}$/
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])/ 
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
} as const;

export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  INVALID_EMAIL: 'Correo electrónico inválido',
  INVALID_DOCUMENT_ID: 'RUT inválido',
  INVALID_PASSWORD: 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y carácter especial',
  TERMS_REQUIRED: 'Debes aceptar los términos y condiciones',
  PRIVACY_REQUIRED: 'Debes aceptar la política de privacidad',
  NAME_MIN_LENGTH: (min: number) => `El nombre debe tener al menos ${min} caracteres`,
  LASTNAME_MIN_LENGTH: (min: number) => `El apellido debe tener al menos ${min} caracteres`
} as const;

export const REGISTER_TYPES = {
  LEGAL_REP: 'legalRep',
  LEGAL_ADMIN: 'legalAdmin',
  GARAGE_ADMIN: 'garageAdmin',
  COMPANY_ADMIN: 'companyAdmin'
} as const;

export const FORM_LABELS = {
  FIRST_NAME: 'Nombres',
  LAST_NAME: 'Apellidos',
  DOCUMENT_ID: 'RUT',
  EMAIL: 'Correo electrónico',
  PASSWORD: 'Contraseña',
  PHONE: 'Teléfono',
  POSITION: 'Cargo',
  COMPANY_NAME: 'Nombre de la empresa',
  COMPANY_DOCUMENT_ID: 'RUT empresa',
  ACCEPT_TERMS: 'Acepto los términos y condiciones',
  ACCEPT_PRIVACY: 'Acepto la política de privacidad'
} as const; 