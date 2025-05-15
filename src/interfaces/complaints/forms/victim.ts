export interface PersonData {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  position: string;
  department: string;
}

export type ComplainantData = Partial<PersonData>;

export interface VictimFormData {
  victim: PersonData;
  complainant?: PersonData;
  isVictim: boolean;
  isValid?: boolean;
}

export const defaultVictimFormData: VictimFormData = {
  victim: {
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    position: '',
    department: ''
  },
  isVictim: true,
  complainant: undefined
};

export const personFields = [
  { id: 'firstName' as const, label: 'Nombres', placeholder: 'ej: Juan Pablo', type: 'text' },
  { id: 'lastName' as const, label: 'Apellidos', placeholder: 'ej: López González', type: 'text' },
  { id: 'rut' as const, label: 'RUT', placeholder: 'ej: 18.456.987-0', type: 'text' },
  { id: 'email' as const, label: 'Correo', placeholder: 'ej: jplopezg@email.com', type: 'email' },
  { id: 'position' as const, label: 'Cargo', placeholder: 'Desarrollador', type: 'text' },
  { id: 'department' as const, label: 'Departamento/Área', placeholder: 'ej: Depto informática', type: 'text' }
] as const; 