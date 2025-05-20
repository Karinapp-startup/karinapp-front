import { LucideIcon } from 'lucide-react';

export interface ComplaintType {
  id: string;
  victimName: string;
  companyName: string;
  status: StatusType;
  entryDate: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  lastActivity: {
    text: string;
    date: Date;
  };
  lastUpdate: Date;
  activities: Activity[];
}

export interface Activity {
  id: string;
  action: string;
  date: Date;
  user: string;
  details: string;
}

export type DueStatus = 'onTime' | 'warning' | 'overdue';
export type StatusType = 'Ingresada' | 'Finalizada' | 'Derivada' | 'Incompleta' | 'Revisada';

export type StatusConfig = Record<StatusType, {
  color: string;
  icon: LucideIcon;
}>;

export interface StatusColorMap {
  [key: string]: string;
}

export type SortDirection = 'asc' | 'desc' | undefined;

export interface SortConfig {
  column: keyof ComplaintType | undefined;
  direction: SortDirection;
} 