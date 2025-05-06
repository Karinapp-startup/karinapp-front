export interface ComplaintType {
  id: string;
  victimName: string;
  employer: string; // Este es el campo que usamos en lugar de 'company'
  status: string;
  entryDate: string;
  dueDate: string;
  step: string;
  // ... otros campos
} 