export const RelationshipType = {
  DIRECT: "direct",
  INDIRECT: "indirect",
  NONE: "none"
} as const;

export type RelationshipTypeValues = typeof RelationshipType[keyof typeof RelationshipType];

export const HierarchyLevel = {
  SUPERIOR: "superior",
  PEER: "peer",
  SUBORDINATE: "subordinate"
} as const;

export type HierarchyLevelValues = typeof HierarchyLevel[keyof typeof HierarchyLevel];

export interface RelationshipSituations {
  hasEvidence: boolean;
  hasPriorCases: boolean;
  wasPreviouslyReported: boolean;
}

export interface RelationshipData {
  type: RelationshipTypeValues;
  hierarchyLevel: HierarchyLevelValues;
  description: string;
  situations: RelationshipSituations;
}

export interface RelationshipFormData {
  relationship: RelationshipData;
  startDate: Date;
  isCurrentEmployee: boolean;
  position: string;
  department: string;
}

// Valores por defecto
export const defaultRelationshipFormData: RelationshipFormData = {
  relationship: {
    type: "direct",
    hierarchyLevel: "superior",
    description: "",
    situations: {
      hasEvidence: false,
      hasPriorCases: false,
      wasPreviouslyReported: false
    }
  },
  startDate: new Date(),
  isCurrentEmployee: true,
  position: "",
  department: ""
};

export interface RelationshipOption {
  value: RelationshipTypeValues;
  label: string;
  description: string;
}

export const relationshipOptions: RelationshipOption[] = [
  {
    value: "direct",
    label: "Direct",
    description: "Existe una relación directa entre el denunciado y la víctima."
  },
  {
    value: "indirect",
    label: "Indirect",
    description: "Existe una relación indirecta entre el denunciado y la víctima."
  },
  {
    value: "none",
    label: "None",
    description: "No existe una relación entre el denunciado y la víctima."
  }
]; 