export const SafeguardMeasureType = {
  SEPARATION: "workspace_separation",
  TRANSFER: "transfer",
  SCHEDULE_MODIFICATION: "schedule_modification",
  PSYCHOLOGICAL_SUPPORT: "psychological_support",
  OTHER: "other"
} as const;

export type SafeguardMeasureTypeValues = typeof SafeguardMeasureType[keyof typeof SafeguardMeasureType];

export interface SafeguardMeasure {
  type: SafeguardMeasureTypeValues;
  description: string;
  responsible: string;
  date: Date;
}

export interface SafeguardMeasuresFormData {
  measures: SafeguardMeasure[];
  safeguardMeasure: SafeguardMeasureTypeValues;
  safeguardResponsible: string;
  safeguardDate: Date;
  otherMeasure: string;
  justification: string;
  urgencyLevel: "low" | "medium" | "high";
}

export const defaultSafeguardMeasuresFormData: SafeguardMeasuresFormData = {
  measures: [],
  safeguardMeasure: SafeguardMeasureType.SEPARATION,
  safeguardResponsible: "",
  safeguardDate: new Date(),
  otherMeasure: "",
  justification: "",
  urgencyLevel: "low"
};

export interface SafeguardMeasureOption {
  value: SafeguardMeasureTypeValues;
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