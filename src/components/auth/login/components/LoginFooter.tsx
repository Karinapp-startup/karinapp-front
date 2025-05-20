"use client";

export function LoginFooter() {
  return (
    <div className="mt-8 text-center text-sm text-gray-500">
      <p>
        ¿No tienes una cuenta?{' '}
        <a href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
          Regístrate aquí
        </a>
      </p>
    </div>
  );
} 