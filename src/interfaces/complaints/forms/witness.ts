import { PersonData } from "./victim";

export interface WitnessData {
  fullName: string;
  position: string;
  department: string;
}

export type WitnessField = {
  id: keyof WitnessData;
  label: string;
  type: string;
  placeholder: string;
}

export const witnessFields: WitnessField[] = [
  {
    id: 'fullName',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'ej: Juan Pablo González'
  },
  {
    id: 'position',
    label: 'Cargo',
    type: 'text',
    placeholder: 'ej: Desarrollador'
  },
  {
    id: 'department',
    label: 'Departamento/Servicio',
    type: 'text',
    placeholder: 'ej: Informática'
  }
];

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