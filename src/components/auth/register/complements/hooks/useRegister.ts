"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterFormData, UserType } from '@/interfaces/auth/register';
import { useRegisterForm } from './useRegisterForm';
import { signUp } from '../utils/cognito';
import { toast } from 'sonner';

// Mapeamos los tipos de registro a los tipos de usuario de Cognito
const USER_TYPE_MAP = {
  user: 'garageAdmin' as UserType,
  representative: 'legalRep' as UserType
};

type RegisterType = keyof typeof USER_TYPE_MAP;

export const useRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registerType, setRegisterType] = useState<RegisterType>('user');

  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur
  } = useRegisterForm();

  const handleTypeChange = (type: RegisterType) => {
    setRegisterType(type);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!isValid) {
        toast.error('Por favor, corrige los errores del formulario');
        return;
      }

      // Mapeamos los campos del formulario a la estructura esperada por RegisterFormData
      const mappedFormData: RegisterFormData = {
        firstName: formData.nombres || '',
        lastName: formData.apellidos || '',
        documentId: formData.rut ? formData.rut.split('-')[0] : '',
        documentIdDv: formData.rut ? formData.rut.split('-')[1] : '',
        email: formData.email,
        password: formData.password,
        userType: USER_TYPE_MAP[registerType],
        acceptTerms: formData.terms,
        acceptPrivacy: formData.terms // Asumimos que los términos incluyen la política de privacidad
      };

      const response = await signUp(mappedFormData);

      if (response) {
        setIsSuccess(true);
        toast.success('Registro exitoso. Por favor verifica tu correo.');
        router.push('/auth/verify-email');
      }
    } catch (error: any) {
      console.error('Error en registro:', error);
      toast.error(error.message || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    touched,
    isLoading,
    isSuccess,
    registerType,
    handleChange,
    handleBlur,
    handleSubmit,
    handleTypeChange
  };
}; 