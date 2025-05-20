import { WitnessData, WitnessFormData } from "@/interfaces/complaints/forms/witness";

export interface WitnessFormState {
  formData: WitnessFormData;
  errors: {
    witness: {
      fullName?: string;
      position?: string;
      department?: string;
    };
  };
  touched: {
    witness: {
      fullName: boolean;
      position: boolean;
      department: boolean;
    };
  };
  isValid: boolean;
}

export interface WitnessFormValidation {
  formData: WitnessFormData;
  errors: WitnessFormState['errors'];
  touched: WitnessFormState['touched'];
  isValid: boolean;
  handleChange: (field: keyof WitnessData, value: string) => void;
  handleBlur: (field: keyof WitnessData) => void;
  validateForm: () => boolean;
  resetForm: () => void;
} 