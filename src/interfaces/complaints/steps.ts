export interface AccusedFormProps extends StepProps {
  defaultValues?: AccusedFormData;
}

export interface ComplaintTypeProps extends StepProps {
  onTypeSelect: (type: string) => void;
}

export interface ComplaintDetailsProps extends StepProps {
  type: string;
} 