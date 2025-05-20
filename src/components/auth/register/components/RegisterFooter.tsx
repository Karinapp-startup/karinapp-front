"use client";

export function RegisterFooter() {
  return (
    <div className="mt-8 text-center text-sm text-gray-500">
      <p>
        Al registrarte, aceptas nuestros{' '}
        <a href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
          términos y condiciones
        </a>
        {' '}y{' '}
        <a href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
          política de privacidad
        </a>
      </p>
    </div>
  );
} 