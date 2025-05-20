export interface AccusedPerson {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  rut: string;
  email: string;
}

export interface AccusedFormData {
  accusedList: AccusedPerson[];
  accused: AccusedPerson;
}

export interface InitialData extends AccusedFormData {
  employerId: string;
  accusedId: string;
}

export const defaultAccusedFormData: InitialData = {
  accusedList: [],
  accused: {
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    rut: '',
    email: ''
  },
  employerId: 'select',
  accusedId: 'select'
};

export interface PersonField {
  name: keyof AccusedPerson;
  label: string;
  type?: string;
  placeholder: string;
}

export const personFields: PersonField[] = [
  {
    name: 'firstName',
    label: 'Nombres',
    placeholder: 'ej: Juan Pablo'
  },
  {
    name: 'lastName',
    label: 'Apellidos',
    placeholder: 'ej: López González'
  },
  {
    name: 'rut',
    label: 'RUT',
    placeholder: 'ej: 18.456.987-0'
  },
  {
    name: 'email',
    label: 'Correo',
    type: 'email',
    placeholder: 'ej: jplopezg@email.com'
  },
  {
    name: 'position',
    label: 'Cargo',
    placeholder: 'ej: Desarrollador'
  },
  {
    name: 'department',
    label: 'Departamento/Área',
    placeholder: 'ej: Depto informática'
  }
]; 