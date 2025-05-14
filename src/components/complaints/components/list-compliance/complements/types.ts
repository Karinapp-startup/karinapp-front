export type StatusType =
  | 'recibida'
  | 'finalizada'
  | 'en_proceso'
  | 'derivada_dt'
  | 'esperando_dt'
  | 'observaciones_dt'
  | 'adopcion_sanciones'
  | 'aviso_inicio_investigacion';

export const statusAliases: Record<StatusType, string> = {
  'recibida': 'Recibida',
  'finalizada': 'Finalizada',
  'en_proceso': 'En Proceso',
  'derivada_dt': 'Derivada DT',
  'esperando_dt': 'Esperando DT',
  'observaciones_dt': 'Observaciones DT',
  'adopcion_sanciones': 'Adopción de Sanciones',
  'aviso_inicio_investigacion': 'Aviso de Inicio Investigación'
};

export const statusDescriptions: Record<StatusType, string> = {
  'recibida': 'La denuncia ha sido recibida y está pendiente de revisión inicial.',
  'finalizada': 'El proceso de la denuncia ha sido completado y cerrado.',
  'en_proceso': 'La denuncia está siendo procesada y evaluada.',
  'derivada_dt': 'La denuncia ha sido derivada a la Dirección del Trabajo.',
  'esperando_dt': 'En espera de respuesta de la Dirección del Trabajo.',
  'observaciones_dt': 'La DT ha enviado observaciones que requieren atención.',
  'adopcion_sanciones': 'En proceso de determinar y aplicar sanciones.',
  'aviso_inicio_investigacion': 'Se ha notificado el inicio de la investigación.'
};

export const getStatusDescription = (status: StatusType): string => {
  return statusDescriptions[status] || 'Estado no definido';
};

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  column: keyof ComplaintType;
  direction: SortDirection;
}

export interface ComplaintType {
  id: string;
  companyName: string;
  victimName: string;
  status: StatusType;
  dueDate: string;
  createdAt: string;
  entryDate: string;
  lastUpdate: {
    date: string;
    time: string;
  };
  lastActivity: {
    date: string;
    time: string;
    description: string;
  };
  activities: Array<{
    date: string;
    time: string;
    description: string;
  }>;
  step: number;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
} 