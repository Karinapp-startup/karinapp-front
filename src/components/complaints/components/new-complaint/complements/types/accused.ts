import { AccusedFormData, AccusedPerson } from "@/interfaces/complaints/forms/accused";

export interface AccusedFormState {
  formData: AccusedFormData;
  isValid: boolean;
  touched: {
    accusedList: boolean;
  };
  errors: {
    accusedList?: string;
    accused?: {
      [key: number]: {
        firstName?: string;
        lastName?: string;
        position?: string;
        department?: string;
      };
    };
  };
}

export interface AccusedPersonErrors {
  firstName?: string;
  lastName?: string;
  position?: string;
  department?: string;
} 