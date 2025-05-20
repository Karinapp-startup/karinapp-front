export interface StepProps {
  defaultValues: any;
  onNext: (data: any) => void;
  onBack?: () => void;
}

export interface PersonData {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
}

export interface ComplaintFormState {
  currentStep: number;
  isValid: boolean;
  isSubmitting: boolean;
  data: ComplaintFormData;
} 