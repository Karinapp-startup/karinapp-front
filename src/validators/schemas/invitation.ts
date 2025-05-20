import { z } from "zod";

const EMAIL_MAX_LENGTH = 254; // Longitud máxima estándar para emails
const EMAIL_MIN_LENGTH = 5; // usuario@dominio -> mínimo 5 caracteres
const RESTRICTED_DOMAINS = ["tempmail.com", "temp-mail.org", "disposable.com"]; // Dominios temporales no permitidos

const hasValidEmailFormat = (email: string) => {
    try {
        const parts = email.split('@');
        if (parts.length !== 2) return false;
        const [user, domain] = parts;
        return user.length > 0 && domain.length > 0;
    } catch {
        return false;
    }
};

export const invitationSchema = z.object({
    email: z
        .string()
        .min(1, "El correo es requerido")
        .min(EMAIL_MIN_LENGTH, "El correo es demasiado corto")
        .max(EMAIL_MAX_LENGTH, "El correo no puede exceder los 254 caracteres")
        .email("El formato del correo no es válido")
        .refine((email) => email.trim() !== "", {
            message: "El correo es requerido"
        })
        .refine((email) => !email.includes(' '), {
            message: "El correo no puede contener espacios"
        })
        .refine(hasValidEmailFormat, {
            message: "El formato del correo no es válido"
        })
        .transform((email) => email.toLowerCase())
        .refine((email) => {
            try {
                const domain = email.split('@')[1];
                return domain && domain.includes('.');
            } catch {
                return false;
            }
        }, {
            message: "El dominio del correo no es válido"
        })
        .refine((email) => {
            try {
                const user = email.split('@')[0];
                return !(/[._%+-]{2,}/).test(user);
            } catch {
                return false;
            }
        }, {
            message: "El correo contiene caracteres especiales consecutivos no permitidos"
        })
        .refine((email) => {
            try {
                const domain = email.split('@')[1];
                return !domain.startsWith('-') && !domain.endsWith('-');
            } catch {
                return false;
            }
        }, {
            message: "El dominio del correo no puede empezar o terminar con guion"
        })
        .refine((email) => {
            return !RESTRICTED_DOMAINS.some(domain => 
                email.endsWith(`@${domain}`)
            );
        }, {
            message: "No se permiten correos temporales"
        })
});

export type InvitationFormData = z.infer<typeof invitationSchema>; 