"use client";

import { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { RegisterState, RegisterType, RegisterFormData } from '../types/register';
import { useRegisterForm } from './useRegisterForm';
import { toast } from 'sonner';

const COGNITO_CONFIG = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
};

const userPool = new CognitoUserPool(COGNITO_CONFIG);

export const useRegister = () => {
  const [state, setState] = useState<RegisterState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    registerType: 'user'
  });

  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur
  } = useRegisterForm();

  const handleTypeChange = (type: RegisterType) => {
    setState(prev => ({ ...prev, registerType: type }));
  };

  const signUp = async (formData: RegisterFormData, userAttributes: CognitoUserAttribute[]) => {
    return new Promise((resolve, reject) => {
      userPool.signUp(
        formData.email,
        formData.password,
        userAttributes,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      toast.error('Por favor, revisa los campos del formulario');
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Atributos base que todo usuario debe tener
      const baseAttributes = [
        new CognitoUserAttribute({ Name: 'email', Value: formData.email }),
        new CognitoUserAttribute({ Name: 'custom:terms_accepted', Value: 'true' })
      ];

      // Atributos específicos según el tipo de usuario
      const specificAttributes = state.registerType === 'representative' 
        ? [
            new CognitoUserAttribute({ Name: 'custom:user_type', Value: 'representative' }),
            new CognitoUserAttribute({ Name: 'custom:nombres', Value: formData.nombres! }),
            new CognitoUserAttribute({ Name: 'custom:apellidos', Value: formData.apellidos! }),
            new CognitoUserAttribute({ Name: 'custom:rut', Value: formData.rut! })
          ]
        : [
            new CognitoUserAttribute({ Name: 'custom:user_type', Value: 'user' })
          ];

      const allAttributes = [...baseAttributes, ...specificAttributes];

      await signUp(formData, allAttributes);
      
      setState(prev => ({ ...prev, isSuccess: true }));
      toast.success('Registro exitoso. Por favor revisa tu correo para confirmar tu cuenta.');
    } catch (error: any) {
      let errorMessage = 'Error al registrar usuario';
      
      // Manejar errores específicos de Cognito
      if (error.code === 'UsernameExistsException') {
        errorMessage = 'El correo electrónico ya está registrado';
      } else if (error.code === 'InvalidPasswordException') {
        errorMessage = 'La contraseña no cumple con los requisitos';
      } else if (error.code === 'InvalidParameterException') {
        errorMessage = 'Uno o más campos son inválidos';
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
    handleSubmit,
    registerType: state.registerType,
    handleTypeChange
  };
}; 