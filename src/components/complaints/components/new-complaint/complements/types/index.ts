export interface NewComplaintFormData {
  type: string;
  employerId: string;
  entryDate: Date;
  victimInfo: {
    name: string;
    contact: string;
  };
  details: string;
  status: string;
}

export interface StepProps {
  formData: Partial<NewComplaintFormData>;
  onUpdate: (data: Partial<NewComplaintFormData>) => void;
  onNext: () => void;
  onBack: () => void;
} 