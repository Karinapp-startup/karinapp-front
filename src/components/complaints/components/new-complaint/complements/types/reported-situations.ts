import { ReportedSituationsFormData } from "@/interfaces/complaints/forms/reported-situations";

export interface ReportedSituationsFormState {
  formData: ReportedSituationsFormData;
  isValid: boolean;
  touched: {
    situationType: boolean;
    frequency: boolean;
    description: boolean;
  };
  errors: {
    situationType?: string;
    frequency?: string;
    description?: string;
  };
} 