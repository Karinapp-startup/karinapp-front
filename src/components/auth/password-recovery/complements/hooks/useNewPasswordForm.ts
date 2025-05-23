import { useState, useCallback, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ERROR_MESSAGES } from '../data/constants';

// Definir el esquema de validación
const formSchema = z.object({
  code: z.string()
    .min(6, "El código debe tener 6 dígitos")
    .max(6, "El código debe tener 6 dígitos")
    .regex(/^\d+$/, "El código debe contener solo números"),
  newPassword: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un carácter especial"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

// Exportar el tipo para usarlo en el componente
export type NewPasswordFormValues = z.infer<typeof formSchema>;

export const useNewPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      newPassword: "",
      confirmPassword: ""
    },
    mode: "onChange"
  });

  const validations = useMemo(() => {
    const { newPassword = "", confirmPassword = "" } = form.getValues();
    return {
      hasMinLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      passwordsMatch: newPassword === confirmPassword && newPassword !== ''
    };
  }, [form.watch(["newPassword", "confirmPassword"])]);

  const isValid = useMemo(() => {
    return Object.values(validations).every(Boolean) && 
           form.getValues().code.length === 6;
  }, [validations, form.getValues().code]);

  const validateField = useCallback((name: string, value: string, allValues: NewPasswordFormValues): string => {
    if (!value) {
      return ERROR_MESSAGES.REQUIRED;
    }

    switch (name) {
      case 'code':
        if (!/^\d{6}$/.test(value)) {
          return 'El código debe tener 6 dígitos';
        }
        break;
      case 'newPassword':
        if (!validations.hasMinLength) return 'La contraseña debe tener al menos 8 caracteres';
        if (!validations.hasUpperCase) return 'Debe contener al menos una mayúscula';
        if (!validations.hasNumber) return 'Debe contener al menos un número';
        if (!validations.hasSpecialChar) return 'Debe contener al menos un carácter especial';
        break;
      case 'confirmPassword':
        if (value !== allValues.newPassword) {
          return 'Las contraseñas no coinciden';
        }
        break;
    }
    return '';
  }, [validations]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.setValue(name, value);
  }, [form]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    form.clearErrors(name);
  }, [form]);

  return {
    form,
    validations,
    isLoading,
    setIsLoading,
    isValid,
    handleChange,
    handleBlur
  };
}; 