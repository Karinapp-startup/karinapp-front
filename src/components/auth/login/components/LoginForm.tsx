"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLogin } from "../complements/hooks/useLogin";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const {
    formData,
    errors,
    touched,
    isLoading,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm text-gray-700">
            Correo electrónico
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Ingrese correo electrónico..."
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-sm text-gray-700">
            Contraseña
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Ingrese contraseña..."
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              id="remember"
              name="remember"
              checked={formData.remember}
              onCheckedChange={(checked) => 
                handleChange({ target: { name: 'remember', value: checked } } as any)
              }
            />
            <Label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Recordarme
            </Label>
          </div>
          <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
            ¿Olvidaste contraseña?
          </a>
        </div>
      </div>

      {isSuccess && (
        <Alert className="bg-green-50 text-green-700 border-green-200">
          <AlertDescription>
            Inicio de sesión exitoso
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 text-white py-2.5 rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full mt-4 border-[#e11d48] text-[#e11d48] hover:bg-[#e11d48]/10"
        onClick={() => window.location.href = '/portal-trabajador'}
      >
        Ir a Portal de trabajador
      </Button>

      <div className="text-center mt-4">
        <a href="/sitio-web" className="text-sm text-gray-600 hover:text-gray-900">
          Ir a Sitio web
        </a>
      </div>
    </form>
  );
} 