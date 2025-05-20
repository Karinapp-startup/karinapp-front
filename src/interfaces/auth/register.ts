export type RegisterType = 'legalRep' | 'legalAdmin' | 'garageAdmin' | 'companyAdmin';

export interface RegisterFormData {
  // Personal information
  firstName: string;
  lastName: string;
  documentId?: string;
  documentIdDv?: string;
  email: string;
  password: string;
  phone?: string;
  position?: string;

  // Company information (optional, for legal representatives)
  company?: {
    id?: string;
    name: string;
    documentId: number;
    documentIdDv: string;
    documentType: string;
  };

  // Terms and preferences
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
  registerType: RegisterType;
}

export interface RegisterValidation {
  firstName: {
    required: string;
    minLength: number;
    maxLength: number;
  };
  lastName: {
    required: string;
    minLength: number;
    maxLength: number;
  };
  documentId: {
    required: string;
    pattern: RegExp;
  };
  email: {
    required: string;
    pattern: RegExp;
  };
  password: {
    required: string;
    minLength: number;
    pattern: RegExp;
  };
  terms: {
    required: string;
  };
} 