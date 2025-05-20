import { z } from "zod";

// Constantes para validaciones
const PASSWORD_MIN_LENGTH = 8;
const SPECIAL_CHARS = "@$!%*?&";

// Funciones auxiliares de validación
const hasUpperCase = (password: string) => /[A-Z]/.test(password);
const hasLowerCase = (password: string) => /[a-z]/.test(password);
const hasNumber = (password: string) => /\d/.test(password);
const hasSpecialChar = (password: string) => new RegExp(`[${SPECIAL_CHARS}]`).test(password);

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "Ingresa tu contraseña actual")
        .refine((password) => password.trim() !== "", {
            message: "La contraseña actual es requerida"
        }),
    newPassword: z
        .string()
        .min(PASSWORD_MIN_LENGTH, "La contraseña debe tener al menos 8 caracteres")
        .refine(hasUpperCase, {
            message: "Debe incluir al menos una letra mayúscula"
        })
        .refine(hasLowerCase, {
            message: "Debe incluir al menos una letra minúscula"
        })
        .refine(hasNumber, {
            message: "Debe incluir al menos un número"
        })
        .refine(hasSpecialChar, {
            message: `Debe incluir al menos un carácter especial (${SPECIAL_CHARS})`
        })
        .refine((password) => !password.includes(' '), {
            message: "La contraseña no puede contener espacios"
        }),
    confirmPassword: z
        .string()
        .min(1, "Debes confirmar la contraseña")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas nuevas no coinciden",
    path: ["confirmPassword"]
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Exportamos también las funciones de validación para usarlas en la UI
export const passwordValidations = [
    {
        id: "minLength",
        check: (password: string) => password.length >= PASSWORD_MIN_LENGTH,
        text: "Al menos 8 caracteres"
    },
    {
        id: "uppercase",
        check: hasUpperCase,
        text: "Una letra mayúscula"
    },
    {
        id: "lowercase",
        check: hasLowerCase,
        text: "Una letra minúscula"
    },
    {
        id: "number",
        check: hasNumber,
        text: "Un número"
    },
    {
        id: "special",
        check: hasSpecialChar,
        text: `Un carácter especial (${SPECIAL_CHARS})`
    }
]; 