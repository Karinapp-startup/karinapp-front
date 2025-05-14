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