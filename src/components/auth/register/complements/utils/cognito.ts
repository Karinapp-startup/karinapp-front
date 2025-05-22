import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../data/constants';
import { RegisterFormData } from '@/interfaces/auth/register';

const userPool = new CognitoUserPool({
  UserPoolId: COGNITO_CONFIG.USER_POOL_ID!,
  ClientId: COGNITO_CONFIG.CLIENT_ID!
});

export const signUp = async (formData: RegisterFormData): Promise<any> => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: formData.email
    }),
    new CognitoUserAttribute({
      Name: 'given_name',
      Value: formData.firstName
    }),
    new CognitoUserAttribute({
      Name: 'family_name',
      Value: formData.lastName
    })
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(
      formData.email,
      formData.password,
      attributeList,
      [],
      (err, result) => {
        if (err) {
          console.error('Error en signUp:', err);
          reject(new Error(err.message || 'Error al registrar usuario'));
          return;
        }
        resolve(result);
      }
    );
  });
}; 