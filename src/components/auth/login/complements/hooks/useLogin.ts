"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginState } from '../types/login';
import { useLoginForm } from './useLoginForm';
import { signIn } from '../utils/cognito';
import { ERROR_MESSAGES } from '../data/constants';
import { toast } from 'sonner';

export const useLogin = () => {
  const router = useRouter();
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    isSuccess: false,
    error: null
  });

  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur
  } = useLoginForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      toast.error('Por favor, revisa los campos del formulario');
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await signIn(formData);
      
      // Guardar tokens en localStorage si remember está activo
      if (formData.remember) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      } else {
        sessionStorage.setItem('accessToken', response.accessToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
      }

      setState(prev => ({ ...prev, isSuccess: true }));
      toast.success('Inicio de sesión exitoso');
      
      // Redirigir según el tipo de usuario
      router.push(response.userType === 'representative' ? '/dashboard' : '/complaints');
    } catch (error: any) {
      let errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
      
      if (error.code === 'UserNotConfirmedException') {
        errorMessage = ERROR_MESSAGES.USER_NOT_CONFIRMED;
      } else if (error.code === 'NotAuthorizedException') {
        errorMessage = ERROR_MESSAGES.INVALID_CREDENTIALS;
      }

      setState(prev => ({ ...prev, error: errorMessage }));
      toast.error(errorMessage);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    formData,
    errors,
    touched,
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    error: state.error,
    handleChange,
    handleBlur,
    handleSubmit
  };
}; 