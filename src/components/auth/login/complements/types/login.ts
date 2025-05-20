export interface LoginState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface LoginFormState {
  formData: LoginFormData;
  errors: Partial<Record<keyof LoginFormData, string>>;
  touched: Record<keyof LoginFormData, boolean>;
  isValid: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
} 