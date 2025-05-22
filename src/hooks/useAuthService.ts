"use client";

import { useEffect, useCallback } from 'react';
import { useAuth } from "react-oidc-context";
import { LoginFormData } from "@/interfaces/auth/login";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserSession,
  IAuthenticationCallback,
  ICognitoUserAttributeData,
  CognitoRefreshToken
} from 'amazon-cognito-identity-js';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials, setUser, setError, clearError, logout } from '@/store/slices/authSlice';

const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
});

const REFRESH_TOKEN_THRESHOLD = 5 * 60 * 1000; // 5 minutos antes de que expire

export const useAuthService = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, tokens = {
    accessToken: null,
    idToken: null,
    refreshToken: null,
    expiration: null
  }, error } = useAppSelector(state => state.auth);

  const refreshSession = useCallback(async () => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser || !tokens?.refreshToken) return;

    return new Promise((resolve, reject) => {
      if (!tokens?.refreshToken) {
        reject(new Error('No refresh token available'));
        return;
      }

      cognitoUser.refreshSession(
        new CognitoRefreshToken({ RefreshToken: tokens.refreshToken }),
        (err, session) => {
          if (err) {
            console.error('Error refreshing session:', err);
            dispatch(logout());
            reject(err);
            return;
          }

          dispatch(setCredentials({
            accessToken: session.getAccessToken().getJwtToken(),
            idToken: session.getIdToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken(),
            expiration: session.getAccessToken().getExpiration() * 1000
          }));
          resolve(session);
        }
      );
    });
  }, [dispatch, tokens?.refreshToken]);

  // Efecto para manejar el refresh automático del token
  useEffect(() => {
    if (!isAuthenticated || !tokens?.expiration) return;

    const timeUntilExpiry = tokens.expiration - Date.now();
    const timeUntilRefresh = timeUntilExpiry - REFRESH_TOKEN_THRESHOLD;

    // Si el token está próximo a expirar, refrescarlo inmediatamente
    if (timeUntilRefresh < 0) {
      refreshSession();
      return;
    }

    // Programar el próximo refresh
    const refreshTimer = setTimeout(() => {
      refreshSession();
    }, timeUntilRefresh);

    return () => clearTimeout(refreshTimer);
  }, [isAuthenticated, tokens?.expiration, refreshSession]);

  // Efecto para verificar la sesión al cargar la aplicación
  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser && !isAuthenticated) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err || !session.isValid()) {
          dispatch(logout());
          return;
        }

        dispatch(setCredentials({
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
          expiration: session.getAccessToken().getExpiration() * 1000
        }));

        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) return;

          const userData = attributes?.reduce((acc: any, attr) => {
            acc[attr.Name] = attr.Value;
            return acc;
          }, {});

          dispatch(setUser(userData));
        });
      });
    }
  }, [dispatch, isAuthenticated]);

  const signIn = (formData: LoginFormData): Promise<any> => {
    return new Promise((resolve, reject) => {
      const { email, password } = formData;

      dispatch(clearError());

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      const callbacks: IAuthenticationCallback = {
        onSuccess: (result: CognitoUserSession) => {
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.getIdToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();

          // Actualizar el estado de Redux
          dispatch(setCredentials({
            accessToken,
            idToken,
            refreshToken,
            expiration: result.getAccessToken().getExpiration() * 1000
          }));

          // Obtener los atributos del usuario
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error getting user attributes:', err);
              return;
            }

            const userData = attributes?.reduce((acc: any, attr) => {
              acc[attr.Name] = attr.Value;
              return acc;
            }, {});

            dispatch(setUser(userData));
          });

          dispatch(clearError());
          resolve(result);
        },
        onFailure: (err: Error) => {
          let errorMessage = 'Error al iniciar sesión';

          switch ((err as any).code) {
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

          dispatch(setError(errorMessage));
          reject(new Error(errorMessage));
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          delete userAttributes.email_verified;
          delete userAttributes.email;

          cognitoUser.completeNewPasswordChallenge(
            password,
            userAttributes,
            callbacks
          );
        },
        mfaRequired: () => {
          reject(new Error('MFA no soportado en esta aplicación'));
        },
        totpRequired: () => {
          reject(new Error('TOTP no soportado en esta aplicación'));
        }
      };

      cognitoUser.authenticateUser(authenticationDetails, callbacks);
    });
  };

  const signOut = async () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      dispatch(logout());
      dispatch(clearError());
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

          dispatch(setUser(userData));
          resolve(userData);
        });
      });
    });
  };

  return {
    signIn,
    signOut,
    getCurrentUser,
    refreshSession,
    isAuthenticated,
    user,
    tokens,
    error
  };
}; 