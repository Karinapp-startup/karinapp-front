export interface AccusedFormData {
  accusedFirstName?: string;
  accusedLastName?: string;
  accusedRut?: string;
  accusedEmail?: string;
  accusedPosition?: string;
  accusedDepartment?: string;
  accusedList?: AccusedPerson[];
  employerId: string;
  accusedId: string;
}

export interface AccusedPerson {
  fullName: string;
  rut: string;
  email: string;
  position: string;
  department: string;
}

export const defaultAccusedFormData: AccusedFormData = {
  accusedFirstName: '',
  accusedLastName: '',
  accusedRut: '',
  accusedEmail: '',
  accusedPosition: '',
  accusedDepartment: '',
  accusedList: [],
  employerId: 'select',
  accusedId: 'select'
}; 