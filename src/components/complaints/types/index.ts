export interface ComplaintType {
  id: string;
  victimName: string;
  status: string;
  entryDate: string;
  dueDate: string;
}

export interface StatusColorMap {
  [key: string]: string;
} 