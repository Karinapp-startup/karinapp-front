import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { COGNITO_CONFIG } from '../data/constants';
import { RegisterFormData } from '@/interfaces/auth/register';

const userPool = new CognitoUserPool({
  UserPoolId: COGNITO_CONFIG.USER_POOL_ID!,
  ClientId: COGNITO_CONFIG.CLIENT_ID!
});

export const signUp = async (formData: RegisterFormData) => {
  // Validar que los campos requeridos existan
  if (!formData.firstName || !formData.lastName || !formData.email) {
    throw new Error('Faltan campos requeridos');
  }

  const baseAttributes = [
    new CognitoUserAttribute({ Name: 'email', Value: formData.email }),
    new CognitoUserAttribute({ Name: 'custom:firstName', Value: formData.firstName }),
    new CognitoUserAttribute({ Name: 'custom:lastName', Value: formData.lastName }),
    new CognitoUserAttribute({ Name: 'custom:userType', Value: formData.registerType })
  ];

  // Atributos condicionales para representante legal
  const legalRepAttributes = formData.registerType === 'legalRep' && formData.documentId
    ? [
      new CognitoUserAttribute({ Name: 'custom:documentId', Value: formData.documentId }),
      new CognitoUserAttribute({ Name: 'custom:acceptTerms', Value: formData.acceptTerms.toString() }),
      new CognitoUserAttribute({ Name: 'custom:acceptPrivacy', Value: formData.acceptPrivacyPolicy.toString() })
    ]
    : [];

  // Atributos opcionales
  const optionalAttributes = [
    formData.phone && new CognitoUserAttribute({ Name: 'phone_number', Value: formData.phone }),
    formData.position && new CognitoUserAttribute({ Name: 'custom:position', Value: formData.position })
  ].filter((attr): attr is CognitoUserAttribute => !!attr);

  const attributeList = [...baseAttributes, ...legalRepAttributes, ...optionalAttributes];

  return new Promise((resolve, reject) => {
    userPool.signUp(
      formData.email,
      formData.password,
      attributeList,
      [],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
}; 