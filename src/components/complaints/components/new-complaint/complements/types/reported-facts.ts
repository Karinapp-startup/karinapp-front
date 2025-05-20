import { ReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";

export interface ReportedFactsFormState {
  formData: ReportedFactsFormData;
  isValid: boolean;
  touched: {
    date: boolean;
    location: boolean;
    commune: boolean;
    street: boolean;
    description: boolean;
    number?: boolean;
    addressReference?: boolean;
  };
  errors: {
    date?: string;
    location?: string;
    commune?: string;
    street?: string;
    description?: string;
    number?: string;
    addressReference?: string;
  };
} 