import { SummaryFormData } from "@/interfaces/complaints/forms/summary";

export interface SummaryFormState {
  formData: SummaryFormData;
  isValid: boolean;
  touched: {
    summary: boolean;
    investigationBy: boolean;
    actDate: boolean;
    actTime: boolean;
  };
  errors: {
    summary?: string;
    investigationBy?: string;
    actDate?: string;
    actTime?: string;
  };
} 