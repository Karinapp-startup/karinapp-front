export interface PasswordRecoveryFormData {
  email: string;
}

export interface NewPasswordFormData {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordRecoveryState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  step: 'email' | 'newPassword';
}

export interface PasswordRecoveryFormState {
  formData: PasswordRecoveryFormData;
  errors: {
    email?: string;
  };
  touched: {
    email: boolean;
  };
  isValid: boolean;
}

export interface NewPasswordFormState {
  formData: NewPasswordFormData;
  errors: {
    code?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
  touched: {
    code: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
  };
  isValid: boolean;
} 