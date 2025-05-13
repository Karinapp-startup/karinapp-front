export interface EmployerFormData {
  companyName: string;
  companyRut: string;
  address: string;
  region: string;
  commune: string;
  businessArea: string;
  employeeCount: number;
  employer: string;
  date: Date;
  activity: string;
  size: string;
}

// Valores por defecto para inicialización
export const defaultEmployerFormData: EmployerFormData = {
  employer: 'select',
  date: new Date(),
  companyName: '',
  companyRut: '',
  address: '',
  region: '',
  commune: '',
  activity: '',
  size: ''
}; 