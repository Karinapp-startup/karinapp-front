export interface AccusedFormData {
  name: string;
  rut: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  commune: string;
}

export interface ComplaintFormData {
  accused: AccusedFormData;
  // ... otros datos del formulario de denuncia
}

export interface StepProps {
  defaultValues: any;
  onNext: (data: any) => void;
  onBack?: () => void;
} 