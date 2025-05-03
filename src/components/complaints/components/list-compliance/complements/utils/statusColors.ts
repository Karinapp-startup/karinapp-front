import { StatusColorMap } from '../types';

export const getStatusColor = (status: string): string => {
  const statusColors: StatusColorMap = {
    'Ingresada': 'text-orange-500',
    'Finalizada': 'text-green-500',
    'Derivada': 'text-blue-500',
    'Incompleta': 'text-purple-500',
    'Revisada': 'text-green-500',
    'Pendiente': 'text-yellow-500'
  };

  return statusColors[status] || 'text-gray-500';
}; 