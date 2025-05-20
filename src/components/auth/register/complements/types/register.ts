export type RegisterType = 'user' | 'representative';

export interface RegisterState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  registerType: RegisterType;
}

export interface RegisterFormState {
  formData: RegisterFormData;
  errors: Partial<Record<keyof RegisterFormData, string>>;
  touched: Record<keyof RegisterFormData, boolean>;
  isValid: boolean;
}

export interface RegisterFormData {
  nombres?: string;
  apellidos?: string;
  rut?: string;
  email: string;
  password: string;
  terms: boolean;
} 