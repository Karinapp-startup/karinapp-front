"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRegister } from "../complements/hooks/useRegister";
import { RegisterFormData } from "@/interfaces/auth/register";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const {
    formData,
    errors,
    touched,
    isLoading,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    registerType,
    handleTypeChange,
  } = useRegister();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="mb-6">
        <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md ${registerType === 'user' ? 'bg-white shadow' : ''
              }`}
            onClick={() => handleTypeChange('user')}
          >
            Usuario
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md ${registerType === 'representative' ? 'bg-white shadow' : ''
              }`}
            onClick={() => handleTypeChange('representative')}
          >
            Representante Laboral
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {registerType === 'representative' && (
          <>
            <div>
              <Label htmlFor="nombres">Nombres</Label>
              <Input
                id="nombres"
                name="nombres"
                type="text"
                value={formData.nombres}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.nombres ? "border-red-500" : ""}
              />
              {touched.nombres && errors.nombres && (
                <p className="mt-1 text-sm text-red-500">{errors.nombres}</p>
              )}
            </div>

            <div>
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                name="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.apellidos ? "border-red-500" : ""}
              />
              {touched.apellidos && errors.apellidos && (
                <p className="mt-1 text-sm text-red-500">{errors.apellidos}</p>
              )}
            </div>

            <div>
              <Label htmlFor="rut">RUT</Label>
              <Input
                id="rut"
                name="rut"
                type="text"
                placeholder="12.345.678-9"
                value={formData.rut}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.rut ? "border-red-500" : ""}
              />
              {touched.rut && errors.rut && (
                <p className="mt-1 text-sm text-red-500">{errors.rut}</p>
              )}
            </div>
          </>
        )}

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
        </div>

        <div className="flex justify-end">
          <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
            ¿Olvidaste contraseña?
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            name="terms"
            checked={formData.terms}
            onCheckedChange={(checked) =>
              handleChange({ target: { name: 'terms', value: checked } } as any)
            }
          />
          <Label htmlFor="terms" className="text-sm">
            Acepto los términos y condiciones
          </Label>
        </div>
        {touched.terms && errors.terms && (
          <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
        )}
      </div>

      {isSuccess && (
        <Alert className="bg-green-50 text-green-700 border-green-200">
          <AlertDescription>
            Registro exitoso. Por favor revisa tu correo para confirmar tu cuenta.
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isLoading || Object.keys(errors).length > 0}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registrando...
          </>
        ) : (
          'Registrarse'
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