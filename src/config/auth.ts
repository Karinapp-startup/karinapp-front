// Validar que las variables de entorno estén disponibles
if (!process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || 
    !process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || 
    !process.env.NEXT_PUBLIC_COGNITO_REGION ||
    !process.env.NEXT_PUBLIC_COGNITO_AUTHORITY) {
  console.error('Missing required Cognito configuration in environment variables');
}

export const COGNITO_CONFIG = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
  Region: process.env.NEXT_PUBLIC_COGNITO_REGION || '',
  Authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY || ''
} as const;

export const COGNITO_ENDPOINTS = {
  token: '/oauth2/token',
  userInfo: '/oauth2/userInfo',
  authorize: '/oauth2/authorize',
  logout: '/logout'
} as const;

export const COGNITO_SCOPES = ['openid', 'profile', 'email'] as const; 