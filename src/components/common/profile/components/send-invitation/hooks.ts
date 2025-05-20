import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invitationSchema, type InvitationFormData } from "@/validators/schemas/invitation";
import { useState, useEffect } from 'react';

export const useSendInvitation = () => {
  const form = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: InvitationFormData) => {
    try {
      console.log("Invitación enviada a:", data.email);
      return true;
    } catch (error) {
      console.error("Error al enviar la invitación:", error);
      return false;
    }
  };

  return {
    form,
    onSubmit,
  };
};

export const useEmailValidation = (type: 'rle' | 'empresa') => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateEmail = (email: string) => {
    if (!email && touched) {
      setError(`El correo del ${type === 'rle' ? 'RLE' : 'empleador'} es requerido`);
      return false;
    }

    if (email) {
      const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!basicEmailRegex.test(email)) {
        setError('El formato del correo no es válido');
        return false;
      }

      const [localPart, domain] = email.split('@');

      if (email.length > 254) {
        setError('El correo es demasiado largo');
        return false;
      }

      if (localPart.length > 64) {
        setError('La parte local del correo es demasiado larga');
        return false;
      }

      const validLocalPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
      if (!validLocalPartRegex.test(localPart)) {
        setError('El correo contiene caracteres no permitidos');
        return false;
      }

      const domainParts = domain.split('.');

      if (domainParts.length < 2) {
        setError('El dominio del correo no es válido');
        return false;
      }

      const validTLDs = [
        'com', 'net', 'org', 'edu', 'gov', 'mil', 'cl',
        'co', 'io', 'info', 'biz', 'me', 'tv'
      ];
      const tld = domainParts[domainParts.length - 1].toLowerCase();

      if (!validTLDs.includes(tld)) {
        setError('La extensión del correo no es válida');
        return false;
      }

      const validDomainPartRegex = /^[a-zA-Z0-9-]+$/;
      for (const part of domainParts) {
        if (!validDomainPartRegex.test(part) || part.length < 2) {
          setError('El dominio del correo contiene caracteres no permitidos');
          return false;
        }
      }
    }

    setError('');
    return email.length > 0;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setTouched(true);
    setIsValid(validateEmail(value));
  };

  const resetField = () => {
    setEmail('');
    setError('');
    setTouched(false);
    setIsValid(false);
  };

  useEffect(() => {
    if (touched) {
      setIsValid(validateEmail(email));
    }
  }, [email, touched]);

  return {
    email,
    setEmail: handleEmailChange,
    isValid,
    error: touched ? error : '',
    resetField
  };
}; 