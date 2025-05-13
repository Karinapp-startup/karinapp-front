export interface ReportedFactsFormData {
  description: string;
  date: Date;
  location: string;
  witnesses: string[];
  hasEvidence: boolean;
  evidenceDescription?: string;
  victimInterview: string;
  reportedFacts: string;
  impactLevel: 'low' | 'medium' | 'high';
}

// Valores por defecto
export const defaultReportedFactsFormData: ReportedFactsFormData = {
  description: '',
  date: new Date(),
  location: '',
  witnesses: [],
  hasEvidence: false,
  victimInterview: '',
  reportedFacts: '',
  impactLevel: 'medium'
}; 