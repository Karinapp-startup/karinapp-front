export interface EmployerFormData {
  employer: string;
  date: Date;
  companyName: string;
  companyRut: string;
  address: string;
  region?: string;
  commune?: string;
  businessActivity?: string;
  businessArea?: string;
  activity?: string;
  size?: 'small' | 'medium' | 'large';
  employeeCount?: number;
  unionized?: boolean;
  unionCount?: number;
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
  businessActivity: '',
  businessArea: '',
  activity: '',
  size: 'small',
  employeeCount: 0,
  unionized: false,
  unionCount: 0
}; 