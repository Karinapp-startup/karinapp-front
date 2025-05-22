export type ErrorCode = 
  | '400' 
  | '401'
  | '403'
  | '404'
  | '500'
  | '503';

export interface ErrorPageProps {
  code: ErrorCode;
  message?: string;
  description?: string;
}

export const ERROR_MESSAGES: Record<ErrorCode, {
  title: string;
  description: string;
}> = {
  '400': {
    title: 'Solicitud incorrecta',
    description: 'Lo sentimos, la solicitud enviada no es válida. Por favor, verifica los datos e intenta nuevamente.'
  },
  '401': {
    title: 'No autorizado',
    description: 'No tienes autorización para acceder a esta página. Por favor, inicia sesión para continuar.'
  },
  '403': {
    title: 'Acceso denegado',
    description: 'No tienes permisos suficientes para acceder a esta página.'
  },
  '404': {
    title: 'Página no encontrada',
    description: 'Lo sentimos, la página que estás buscando no existe o ha sido movida.'
  },
  '500': {
    title: 'Error del servidor',
    description: 'Lo sentimos, ha ocurrido un error en nuestros servidores. Por favor, intenta nuevamente más tarde.'
  },
  '503': {
    title: 'Servicio no disponible',
    description: 'El servicio se encuentra temporalmente no disponible. Por favor, intenta nuevamente en unos minutos.'
  }
}; 