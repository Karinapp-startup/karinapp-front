export type UserType = 'legalRep' | 'legalAdmin' | 'garageAdmin' | 'companyAdmin';

export interface RegisterFormData {
  // Personal information
  firstName: string;
  lastName: string;
  documentId: string;      // RUT number without DV
  documentIdDv: string;    // RUT verification digit
  email: string;
  password: string;
  phone?: string;
  position?: string;
  userType: UserType;

  // Terms acceptance (only for legalRep)
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
}

export interface RegisterFormState {
  formData: RegisterFormData;
  errors: Partial<Record<keyof RegisterFormData, string>>;
  touched: Record<keyof RegisterFormData, boolean>;
  isValid: boolean;
}

export interface RegisterResponse {
  // Response from Cognito
  userSub: string;
  userConfirmed: boolean;
  email: string;
  userType: UserType;
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