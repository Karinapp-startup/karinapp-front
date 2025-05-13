export type SituationType = 
  | "workplace_harassment"
  | "sexual_harassment"
  | "workplace_violence";

export interface ReportedSituationsFormData {
  situationType: 'workplace_harassment' | 'sexual_harassment' | 'workplace_violence';
  description: string;
  frequency: 'once' | 'multiple' | 'continuous';
  affectedEmployees: string[];
  impactLevel: 'low' | 'medium' | 'high';
  previousReports: boolean;
  evidence: boolean;
  priorCases: boolean;
  previousReportDetails?: string;
}

// Valores por defecto
export const defaultReportedSituationsFormData: ReportedSituationsFormData = {
  situationType: "workplace_harassment",
  description: "",
  frequency: "once",
  affectedEmployees: [],
  impactLevel: "medium",
  previousReports: false,
  evidence: false,
  priorCases: false
};

export interface SituationOption {
  value: SituationType;
  label: string;
  description: string;
}

export const situationOptions: SituationOption[] = [
  {
    value: "workplace_harassment",
    label: "Acoso Laboral",
    description: "Agresión u hostigamiento, sea puntual o reiterado, que causa maltrato, humillación o perjudica la situación laboral de la persona."
  },
  {
    value: "sexual_harassment",
    label: "Acoso Sexual",
    description: "Requerimientos sexuales indebidos y no consentidos que afectan la situación o condiciones laborales de quien los recibe."
  },
  {
    value: "workplace_violence",
    label: "Violencia en el Trabajo",
    description: "Conductas ejercidas por terceros ajenos a la relación laboral que afectan al trabajador durante la prestación de servicios."
  }
]; 