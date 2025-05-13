export type InvestigationType = 'employer' | 'labor_direction';

export interface SummaryFormData {
  summary: string;
  investigationBy: InvestigationType;
  actDate: Date;
  actTime: {
    hour: string;
    minute: string;
  };
}

export const defaultSummaryFormData: SummaryFormData = {
  summary: '',
  investigationBy: 'employer',
  actDate: new Date(),
  actTime: {
    hour: '09',
    minute: '00'
  }
};

export interface InvestigationOption {
  value: InvestigationType;
  label: string;
}

export const investigationOptions: InvestigationOption[] = [
  {
    value: 'employer',
    label: 'Empleador'
  },
  {
    value: 'labor_direction',
    label: 'Dirección del trabajo'
  }
];

export const timeOptions = {
  hours: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')),
  minutes: Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))
}; 