"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthService } from "@/hooks/useAuthService";
import { useLogin } from "../complements/hooks/useLogin";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const {
    formData,
    errors,
    touched,
    isLoading,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit
  } = useLogin();

  const { isAuthenticated, user, signOut, error } = useAuthService();

  // Si ya está autenticado, mostrar información
  if (isAuthenticated && user) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Bienvenido {user.profile.email}</h2>
        <Button onClick={() => signOut()}>Cerrar sesión</Button>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e1b4b]"></div>
        <span className="ml-3 text-gray-700">Cargando...</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "border-red-500" : ""}
            required
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "border-red-500" : ""}
            required
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

      {error && (
        <Alert className="bg-red-50 text-red-700 border-red-200">
          <AlertDescription>
            {error.message || 'Ha ocurrido un error inesperado'}
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={!isValid || isLoading}
        onClick={() => console.log('🔘 Estado del botón:', {
          isValid,
          isLoading,
          buttonDisabled: !isValid || isLoading
        })}
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
        <a href="/auth/register" className="text-sm text-blue-600 hover:text-blue-500">
          ¿No tienes una cuenta? Regístrate
        </a>
      </div>

      <div className="text-center mt-4">
        <a href="/sitio-web" className="text-sm text-gray-600 hover:text-gray-900">
          Ir a Sitio web
        </a>
      </div>
    </form>
  );
} 