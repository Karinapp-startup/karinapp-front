export interface ReportedFactsFormData {
  date: Date | undefined;
  location: string;
  commune: string;
  street: string;
  number: string;
  addressReference: string;
  description: string;
}

// Valores por defecto
export const defaultReportedFactsFormData: ReportedFactsFormData = {
  date: undefined,
  location: "",
  commune: "",
  street: "",
  number: "",
  addressReference: "",
  description: ""
}; 