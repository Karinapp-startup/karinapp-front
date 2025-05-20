import { SITUATION_TYPES } from "@/components/complaints/components/new-complaint/complements/data/constants";

export type SituationType = typeof SITUATION_TYPES[keyof typeof SITUATION_TYPES];

export interface ReportedSituationsFormData {
  situations: string[];
}

// Valores por defecto
export const defaultReportedSituationsFormData: ReportedSituationsFormData = {
  situations: []
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