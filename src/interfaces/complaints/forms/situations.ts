export interface SituationsFormData {
  situations: {
    hasEvidence: boolean;
    hasPriorCases: boolean;
    wasPreviouslyReported: boolean;
  };
}

export const defaultSituationsFormData: SituationsFormData = {
  situations: {
    hasEvidence: false,
    hasPriorCases: false,
    wasPreviouslyReported: false
  }
};

export interface SituationOption {
  id: keyof SituationsFormData['situations'];
  label: string;
}

export const situationOptions: SituationOption[] = [
  {
    id: 'hasEvidence',
    label: 'Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)'
  },
  {
    id: 'hasPriorCases',
    label: 'Existe conocimiento de otros antecedentes de índole similar.'
  },
  {
    id: 'wasPreviouslyReported',
    label: 'La situación denunciada fue informada previamente en otra instancia similar (jefatura, supervisor, mediación laboral, etc.)'
  }
]; 