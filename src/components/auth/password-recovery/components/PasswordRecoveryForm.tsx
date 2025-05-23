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
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  email: z.string()
    .email("Correo electrónico inválido")
    .min(1, "El correo electrónico es requerido"),
});

type FormValues = z.infer<typeof formSchema>;

interface PasswordRecoveryFormProps {
  isLoading: boolean;
  onSubmit: (data: { email: string }) => Promise<void>;
}

export function PasswordRecoveryForm({ isLoading, onSubmit }: PasswordRecoveryFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    await onSubmit(data);
  };

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="ejemplo@correo.com"
                    autoComplete="email"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-sm text-gray-500">
            <p>
              Te enviaremos un código de verificación a tu correo electrónico para
              que puedas restablecer tu contraseña.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700"
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando código...
              </>
            ) : (
              'Recuperar contraseña'
            )}
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