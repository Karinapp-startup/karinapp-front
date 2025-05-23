"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../data/constants';

type Step = 
  | { type: 'email' }
  | { type: 'newPassword', email: string };

const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || ''
});

export const usePasswordRecovery = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>({ type: 'email' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitEmail = async (data: { email: string }) => {
    setIsLoading(true);

    try {
      if (!userPool.getUserPoolId() || !userPool.getClientId()) {
        throw new Error('Cognito configuration is not properly initialized');
      }

      const cognitoUser = new CognitoUser({
        Username: data.email,
        Pool: userPool
      });

      await new Promise((resolve, reject) => {
        cognitoUser.forgotPassword({
          onSuccess: () => {
            toast.success(SUCCESS_MESSAGES.EMAIL_SENT);
            resolve(true);
          },
          onFailure: (err) => {
            reject(new Error(err.message || ERROR_MESSAGES.GENERIC_ERROR));
          }
        });
      });

      setStep({ type: 'newPassword', email: data.email });
    } catch (error: any) {
      console.error('Error en recuperación:', error);
      toast.error(error.message || ERROR_MESSAGES.GENERIC_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmNewPassword = async (data: { code: string; newPassword: string }) => {
    setIsLoading(true);

    try {
      if (step.type !== 'newPassword') {
        throw new Error('Invalid state');
      }

      const cognitoUser = new CognitoUser({
        Username: step.email,
        Pool: userPool
      });

      await new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(data.code, data.newPassword, {
          onSuccess() {
            toast.success(SUCCESS_MESSAGES.PASSWORD_UPDATED);
            resolve(true);
            router.push('/auth/login');
          },
          onFailure(err) {
            reject(new Error(err.message || ERROR_MESSAGES.GENERIC_ERROR));
          }
        });
      });
    } catch (error: any) {
      console.error('Error al confirmar nueva contraseña:', error);
      toast.error(error.message || ERROR_MESSAGES.GENERIC_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    isLoading,
    handleSubmitEmail,
    handleConfirmNewPassword
  };
}; 