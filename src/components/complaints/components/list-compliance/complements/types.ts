export interface ComplaintType {
  id: string;
  victimName: string;
  employer: string; // Este es el campo que usamos en lugar de 'company'
  status: string;
  entryDate: string;
  dueDate: string;
  companyName: string;
  priority: string;
  assignedTo: string;
  lastActivity: {
    date: string;
    time: string;
    description: string;
  };
  lastUpdate: {
    date: string;
    time: string;
  };
} 