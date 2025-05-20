import { INVESTIGATION_TYPES } from '../../components/complaints/components/new-complaint/complements/data/constants';

export type InvestigationType = 'employer' | 'labor_direction';

export interface SummaryFormData {
  summary: string;
  investigationType: 'employer' | 'labor_direction';
  actDate: Date | null;
  actTime: string;
  employer?: EmployerFormData;
  victim?: VictimFormData;
  accused?: AccusedFormData;
  relationship?: RelationshipFormData;
  witness?: WitnessFormData;
  reportedFacts?: ReportedFactsFormData;
  reportedSituations?: ReportedSituationsFormData;
  safeguardMeasures?: SafeguardMeasuresFormData;
}

export const defaultSummaryFormData: SummaryFormData = {
  summary: '',
  investigationType: 'employer',
  actDate: null,
  actTime: ''
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