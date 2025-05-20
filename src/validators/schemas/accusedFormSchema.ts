import { z } from "zod";
import { validateRut } from "@/validators/rut";

const personSchema = z.object({
  firstName: z.string().min(1, "Campo obligatorio").max(100),
  lastName: z.string().min(1, "Campo obligatorio").max(100),
  rut: z
    .string()
    .min(1, "Campo obligatorio")
    .refine(validateRut, { message: "RUT inválido" }),
  email: z
    .string()
    .min(1, "Campo obligatorio")
    .email("Correo inválido")
    .max(100),
  position: z.string().min(1, "Campo obligatorio").max(100),
  department: z.string().min(1, "Campo obligatorio").max(100),
});

export const accusedFormSchema = z.object({
  accused: personSchema
});