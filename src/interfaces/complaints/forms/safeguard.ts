import { SAFEGUARD_TYPES, SAFEGUARD_MEASURE_OPTIONS } from "@/components/complaints/components/new-complaint/complements/data/constants";

export type SafeguardMeasureTypeValues = typeof SAFEGUARD_MEASURE_OPTIONS[number]['value'];

export interface SafeguardMeasure {
  type: SafeguardMeasureTypeValues;
  responsible: string;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface SafeguardMeasuresFormData {
  selectedMeasures: SafeguardMeasureTypeValues[];
  safeguardMeasure: SafeguardMeasureTypeValues;
  safeguardResponsible: string;
  safeguardDate: Date;
  description: string;
  otherMeasure?: string;
  measures: SafeguardMeasure[];
}

export const defaultSafeguardMeasuresFormData: SafeguardMeasuresFormData = {
  selectedMeasures: [],
  safeguardMeasure: 'workspace_separation',
  safeguardResponsible: '',
  safeguardDate: new Date(),
  description: '',
  otherMeasure: '',
  measures: []
};

export const SafeguardMeasureType = {
  SEPARATION: 'separation',
  RELOCATION: 'relocation', 
  SCHEDULE_ADJUSTMENT: 'schedule_adjustment',
  OTHER: 'other'
} as const;

export type SafeguardMeasureTypeValues = typeof SafeguardMeasureType[keyof typeof SafeguardMeasureType];

export interface SafeguardMeasureOption {
  value: SafeguardMeasureTypeValues;
  label: string;
}

export const safeguardMeasureOptions: SafeguardMeasureOption[] = [
  {
    value: "separation",
    label: "Separación de espacios de trabajo"
  },
  {
    value: "schedule_adjustment",
    label: "Modificación de jornadas"
  },
  {
    value: "other",
    label: "Otro"
  }
]; 