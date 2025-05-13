export type SafeguardMeasureType = 
  | "workspace_separation"
  | "schedule_modification"
  | "psychological_care"
  | "other";

export interface SafeguardMeasuresFormData {
  safeguardMeasure: SafeguardMeasureType;
  otherMeasure?: string;
  safeguardResponsible: string;
  safeguardDate: Date;
  justification?: string;
  urgencyLevel?: 'low' | 'medium' | 'high';
}

export const defaultSafeguardMeasuresFormData: SafeguardMeasuresFormData = {
  safeguardMeasure: "workspace_separation",
  safeguardResponsible: "",
  safeguardDate: new Date()
};

export interface SafeguardMeasureOption {
  value: SafeguardMeasureType;
  label: string;
}

export const safeguardMeasureOptions: SafeguardMeasureOption[] = [
  {
    value: "workspace_separation",
    label: "Separación de espacios de trabajo"
  },
  {
    value: "schedule_modification",
    label: "Modificación de jornadas"
  },
  {
    value: "psychological_care",
    label: "Atención psicológica"
  },
  {
    value: "other",
    label: "Otro"
  }
]; 