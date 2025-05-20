import { 
  CognitoUserPool, 
  CognitoUser, 
  AuthenticationDetails,
  CognitoUserSession 
} from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../data/constants';
import { LoginFormData, LoginResponse } from '@/interfaces/auth/login';

const userPool = new CognitoUserPool({
  UserPoolId: COGNITO_CONFIG.USER_POOL_ID!,
  ClientId: COGNITO_CONFIG.CLIENT_ID!
});

export const signIn = async (formData: LoginFormData): Promise<LoginResponse> => {
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
      onSuccess: (session: CognitoUserSession) => {
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();
        
        // Obtener el tipo de usuario desde los atributos
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
            return;
          }
          
          const userType = attributes?.find(attr => attr.getName() === 'custom:user_type')?.getValue() as 'user' | 'representative';
          
          resolve({
            accessToken,
            refreshToken,
            userType
          });
        });
      },
      onFailure: (err) => {
        reject(err);
      }
    });
  });
}; 