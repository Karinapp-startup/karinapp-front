export interface PersonData {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  position: string;
  department: string;
}

export type ComplainantData = Partial<PersonData>;

export interface VictimData extends PersonData {
  phone: string;
  address: string;
}

export interface VictimFormData {
  victim: PersonData;
  isComplainant: boolean;
  complainant?: PersonData;
  isValid: boolean;
  touched: {
    victim: Record<keyof PersonData, boolean>;
    complainant?: Record<keyof PersonData, boolean>;
  };
  errors: {
    victim: Partial<Record<keyof PersonData, string>>;
    complainant?: Partial<Record<keyof PersonData, string>>;
  };
}

export interface VictimFormValidation {
  formData: VictimFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  handleChange: (field: string, value: any) => void;
  handleBlur: (field: string) => void;
  validateForm: () => boolean;
}

export type PersonField = {
  id: keyof PersonData;
  label: string;
  type: string;
  placeholder: string;
}

export const personFields: PersonField[] = [
  {
    id: 'firstName',
    label: 'Nombres',
    type: 'text',
    placeholder: 'ej: Juan Pablo'
  },
  {
    id: 'lastName',
    label: 'Apellidos',
    type: 'text',
    placeholder: 'ej: López González'
  },
  {
    id: 'rut',
    label: 'RUT',
    type: 'text',
    placeholder: 'ej: 18.456.987-0'
  },
  {
    id: 'email',
    label: 'Correo',
    type: 'email',
    placeholder: 'ej: jplopezg@email.com'
  },
  {
    id: 'position',
    label: 'Cargo',
    type: 'text',
    placeholder: 'ej: Desarrollador'
  },
  {
    id: 'department',
    label: 'Departamento/Área',
    type: 'text',
    placeholder: 'ej: Depto informática'
  }
];

export const defaultVictimFormData: VictimFormData = {
  victim: {
    firstName: '',
    lastName: '',
    rut: '',
    email: '',
    position: '',
    department: ''
  },
  isComplainant: true,
  isValid: false,
  touched: {
    victim: {
      firstName: false,
      lastName: false,
      rut: false,
      email: false,
      position: false,
      department: false
    }
  },
  errors: {
    victim: {}
  }
}; 