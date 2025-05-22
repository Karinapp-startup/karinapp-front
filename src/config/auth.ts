export const COGNITO_AUTH_CONFIG = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  Region: process.env.NEXT_PUBLIC_COGNITO_REGION!
};

export const COGNITO_ENDPOINTS = {
  token: '/oauth2/token',
  userInfo: '/oauth2/userInfo'
} as const; 