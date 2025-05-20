import { SafeguardMeasuresFormData } from "@/interfaces/complaints/forms/safeguard";

export interface SafeguardMeasuresFormState {
  formData: SafeguardMeasuresFormData;
  isValid: boolean;
  touched: {
    safeguardMeasure: boolean;
    safeguardResponsible: boolean;
    safeguardDate: boolean;
    description: boolean;
  };
  errors: {
    safeguardMeasure?: string;
    safeguardResponsible?: string;
    safeguardDate?: string;
    description?: string;
  };
} 