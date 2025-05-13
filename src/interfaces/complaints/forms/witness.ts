export interface WitnessPerson {
  fullName: string;
  position: string;
  department: string;
}

export interface WitnessFormData {
  witnesses: WitnessPerson[];
  currentWitness: WitnessPerson;
}

export const defaultWitnessFormData: WitnessFormData = {
  witnesses: [],
  currentWitness: {
    fullName: '',
    position: '',
    department: ''
  }
};

export interface WitnessField {
  id: keyof WitnessPerson;
  label: string;
  placeholder: string;
}

export const witnessFields: WitnessField[] = [
  {
    id: 'fullName',
    label: 'Nombre completo',
    placeholder: 'ej: Juan Pablo'
  },
  {
    id: 'position',
    label: 'Cargo',
    placeholder: 'ej: López González'
  },
  {
    id: 'department',
    label: 'Departamento/Servicio',
    placeholder: 'ej: López González'
  }
]; 