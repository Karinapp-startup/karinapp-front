export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export type UserType = 'legalRep' | 'legalAdmin' | 'garageAdmin' | 'companyAdmin';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  documentId?: string;  // RUT
  phone?: string;
  position?: string;
  company?: {
    id: string;
    name: string;
    documentId: number;
    documentIdDv: string;
    documentType: string;  // RUT empresa
  };
  permissions: string[];
  status: 'active' | 'inactive' | 'pending';
  lastAccess?: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export interface LoginFormState {
  formData: LoginFormData;
  errors: Partial<Record<keyof LoginFormData, string>>;
  touched: Record<keyof LoginFormData, boolean>;
  isValid: boolean;
} 