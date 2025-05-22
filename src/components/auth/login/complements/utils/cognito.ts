import { 
  CognitoUserPool, 
  CognitoUser, 
  AuthenticationDetails,
  CognitoUserSession 
} from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../data/constants';
import { LoginFormData } from '@/interfaces/auth/login';

const userPool = new CognitoUserPool({
  UserPoolId: COGNITO_CONFIG.USER_POOL_ID!,
  ClientId: COGNITO_CONFIG.CLIENT_ID!
});

export const signIn = async (formData: LoginFormData): Promise<any> => {
  const authenticationDetails = new AuthenticationDetails({
    Username: formData.email,
    Password: formData.password,
  });

  const cognitoUser = new CognitoUser({
    Username: formData.email,
    Pool: userPool
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        resolve({
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken()
        });
      },
      onFailure: (err) => {
        console.error('Error en signIn:', err);
        reject(new Error(err.message || 'Error al iniciar sesión'));
      }
    });
  });
}; 