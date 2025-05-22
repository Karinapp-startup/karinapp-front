export interface LoginState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface LoginFormState {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface LoginFormTouched {
  email: boolean;
  password: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
} 