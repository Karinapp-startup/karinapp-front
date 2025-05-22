"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginForm } from './useLoginForm';
import { useAuthService } from '@/hooks/useAuthService';
import { toast } from 'sonner';

export const useLogin = () => {
  const router = useRouter();
  const { signIn } = useAuthService();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur
  } = useLoginForm();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!isValid) {
        toast.error('Por favor, complete todos los campos requeridos');
        return;
      }

      await signIn(formData);
      toast.success('Inicio de sesión exitoso');
      router.push('/');
    } catch (error: any) {
      console.error('Error en login:', error);
      toast.error(error.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    touched,
    isLoading,
    isValid: isValid || false,
    handleChange,
    handleBlur,
    handleSubmit
  };
}; 