export interface Witness {
  fullName: string;
  position: string;
  department: string;
}

export interface WitnessFormData {
  witnesses: Witness[];
}

export const defaultWitnessFormData: WitnessFormData = {
  witnesses: []
};

export interface WitnessField {
  id: keyof Witness;
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