import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordFormData } from "@/validators/schemas/password";

export const useChangePassword = () => {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      console.log("Cambio de contraseña:", data);
      return true;
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      return false;
    }
  };

  return {
    form,
    onSubmit,
  };
}; 