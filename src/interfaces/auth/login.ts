export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
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
  // Auth tokens
  accessToken: string;
  refreshToken: string;
  expiresIn: number;

  // User information
  userType: UserType;
  profile: UserProfile;

  // Session metadata
  sessionId: string;
  lastLogin: string;

  // User preferences
  settings?: {
    theme: 'light' | 'dark' | 'system';
    language: 'es' | 'en';
    notifications: boolean;
  };
} 