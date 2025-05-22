"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthService } from "@/hooks/useAuthService";
import { useLogin } from "../complements/hooks/useLogin";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
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
        <h2 className="text-xl font-bold">Bienvenido {user.email}</h2>
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
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 p-2 rounded">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-semibold">KarinApp</span>
        </div>
        <h1 className="text-2xl font-semibold">Inicio de sesión</h1>
      </div>

      <div className="text-center text-gray-600 mb-8">
        ¿No tienes cuenta? <Link href="/auth/register" className="text-blue-600 hover:text-blue-700">Registrarme ahora</Link>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-gray-700">Correo</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="ej. jplopezg@email.com"
            required
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 pr-10 ${errors.password && touched.password ? "border-red-500" : "border-gray-300"}`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-500 mt-2">
            {typeof error === 'string' ? error : 'Ha ocurrido un error inesperado'}
          </div>
        )}

        <div className="text-right">
          <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
            Olvidé mi contraseña
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          disabled={!isValid || isLoading}
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
      </form>
    </div>
  );
} 