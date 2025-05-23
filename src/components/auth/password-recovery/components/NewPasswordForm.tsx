"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useNewPasswordForm, NewPasswordFormValues } from "../complements/hooks/useNewPasswordForm";

interface NewPasswordFormProps {
  email: string;
  onSubmit: (data: { code: string; newPassword: string }) => Promise<void>;
}

export function NewPasswordForm({ email, onSubmit }: NewPasswordFormProps) {
  const {
    form,
    validations,
    isLoading,
    setIsLoading
  } = useNewPasswordForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (data: NewPasswordFormValues) => {
    setIsLoading(true);
    try {
      await onSubmit({
        code: data.code,
        newPassword: data.newPassword
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent className="space-y-4 pt-0">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600">
          Se ha enviado un código de verificación a:<br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de verificación</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    maxLength={6}
                    className="h-11"
                    placeholder="Ingresa el código de 6 dígitos"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      className="h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <p className="text-sm">La contraseña debe tener:</p>
            <ul className="space-y-1 text-sm">
              <ValidationRequirement
                met={validations.hasMinLength}
                text="Al menos 8 caracteres"
              />
              <ValidationRequirement
                met={validations.hasUpperCase}
                text="Una letra mayúscula"
              />
              <ValidationRequirement
                met={validations.hasNumber}
                text="Un número"
              />
              <ValidationRequirement
                met={validations.hasSpecialChar}
                text="Un carácter especial"
              />
              <ValidationRequirement
                met={validations.passwordsMatch}
                text="Las contraseñas coinciden"
              />
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700"
            disabled={!form.formState.isValid || isLoading}
          >
            Recuperar contraseña
          </Button>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}

function ValidationRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <li className={cn(
      "flex items-center gap-2",
      met ? "text-green-600" : "text-red-500"
    )}>
      {!met && <X size={16} />}
      {text}
    </li>
  );
} 