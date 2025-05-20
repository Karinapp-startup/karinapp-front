import { EmployerFormData } from "@/interfaces/complaints/forms/employer";

export interface EmployerFormState {
  formData: EmployerFormData;
  isValid: boolean;
  touched: {
    employer: boolean;
    date: boolean;
    companyName: boolean;
    companyRut: boolean;
    address: boolean;
  };
  errors: {
    employer?: string;
    date?: string;
    companyName?: string;
    companyRut?: string;
    address?: string;
  };
}

export const initialEmployerFormState: EmployerFormState = {
  formData: {
    employer: 'select',
    date: new Date(),
    companyName: '',
    companyRut: '',
    address: '',
    region: '',
    commune: '',
    businessActivity: '',
    businessArea: '',
    activity: '',
    size: 'small',
    employeeCount: 0,
    unionized: false,
    unionCount: 0
  },
  isValid: false,
  touched: {
    employer: false,
    date: false,
    companyName: false,
    companyRut: false,
    address: false
  },
  errors: {}
}; 