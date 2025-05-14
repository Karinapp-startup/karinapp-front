export enum RelationshipType {
  DIRECT = "direct",
  INDIRECT = "indirect",
  NONE = "none"
}

export enum HierarchyLevel {
  SUPERIOR = "superior",
  PEER = "peer",
  SUBORDINATE = "subordinate"
}

export interface RelationshipFormData {
  relationship: {
    type: RelationshipType;
    hierarchyLevel: HierarchyLevel;
    description: string;
  };
  startDate: Date;
  isCurrentEmployee: boolean;
  position: string;
  department: string;
}

// Valores por defecto
export const defaultRelationshipFormData: RelationshipFormData = {
  relationship: {
    type: RelationshipType.DIRECT,
    hierarchyLevel: HierarchyLevel.SUPERIOR,
    description: ""
  },
  startDate: new Date(),
  isCurrentEmployee: true,
  position: "",
  department: ""
};

export interface RelationshipOption {
  value: RelationshipType;
  label: string;
  description: string;
}

export const relationshipOptions: RelationshipOption[] = [
  {
    value: "asymmetric_victim_dependent",
    label: "Relación asimétrica - Víctima dependiente",
    description: "Existe una relación asimétrica en que la víctima tiene dependencia directa o indirecta de el/la denunciado/a."
  },
  {
    value: "asymmetric_accused_dependent",
    label: "Relación asimétrica - Denunciado dependiente",
    description: "Existe una relación asimétrica en que el/la denunciado/a tiene dependencia directa o indirecta de la víctima."
  },
  {
    value: "symmetric_same_area",
    label: "Relación simétrica - Misma área",
    description: "Existe una relación simétrica en que el/la denunciado/a y la víctima no tienen una dependencia directa ni indirecta, pero se desempeñan en la misma área/unidad/servicio."
  },
  {
    value: "symmetric_different_area",
    label: "Relación simétrica - Diferente área",
    description: "Existe una relación simétrica en que el/la denunciado/a y la víctima no tienen una dependencia directa ni indirecta, y no se desempeñan en la misma área/unidad/servicio."
  }
]; 