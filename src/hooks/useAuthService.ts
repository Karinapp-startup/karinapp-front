"use client";

import { useAuth } from "react-oidc-context";
import { LoginFormData } from "@/interfaces/auth/login";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
});

export const useAuthService = () => {
  const auth = useAuth();

  const signIn = (formData: LoginFormData): Promise<any> => {
    return new Promise((resolve, reject) => {
      const { email, password } = formData;

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.getIdToken().getJwtToken();
          
          // Guardar tokens si es necesario
          if (formData.remember) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('idToken', idToken);
          }

          resolve(result);
        },
        onFailure: (err) => {
          let errorMessage = 'Error al iniciar sesión';
          
          switch (err.code) {
            case 'UserNotConfirmedException':
              errorMessage = 'Por favor, verifica tu correo electrónico';
              break;
            case 'NotAuthorizedException':
              errorMessage = 'Credenciales incorrectas';
              break;
            case 'UserNotFoundException':
              errorMessage = 'Usuario no encontrado';
              break;
            default:
              errorMessage = err.message || 'Error al iniciar sesión';
          }
          
          reject(new Error(errorMessage));
        }
      });
    });
  };

  const signOut = async () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idToken');
    }
  };

  const getCurrentUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (!cognitoUser) {
        reject(new Error('No hay usuario autenticado'));
        return;
      }

      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          reject(err);
          return;
        }
        
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
            return;
          }
          
          const userData = attributes?.reduce((acc: any, attr) => {
            acc[attr.Name] = attr.Value;
            return acc;
          }, {});

          resolve({
            ...userData,
            isAuthenticated: true,
            session
          });
        });
      });
    });
  };

  return {
    signIn,
    signOut,
    getCurrentUser,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    user: auth.user
  };
}; 