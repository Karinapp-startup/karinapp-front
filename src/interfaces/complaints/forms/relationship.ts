export enum RelationshipType {
  ASYMMETRIC_VICTIM_DEPENDENT = 'asymmetric_victim_dependent',
  ASYMMETRIC_ACCUSED_DEPENDENT = 'asymmetric_accused_dependent',
  SYMMETRIC_SAME_AREA = 'symmetric_same_area',
  SYMMETRIC_DIFFERENT_AREA = 'symmetric_different_area',
}

export interface SituationOptions {
  hasEvidence: boolean;
  hasPriorCases: boolean;
  wasPreviouslyReported: boolean;
  hasPriorKnowledge: boolean;
}

export interface RelationshipData {
  type: RelationshipType;
  situations: SituationOptions;
}

export interface RelationshipFormData {
  relationship: RelationshipData;
}

export interface RelationshipOption {
  value: RelationshipType;
  description: string;
}

export const relationshipOptions: RelationshipOption[] = [
  {
    value: RelationshipType.ASYMMETRIC_VICTIM_DEPENDENT,
    description: 'Existe una relación asimétrica en que la víctima tiene dependencia directa o indirecta del/la denunciado/a.'
  },
  {
    value: RelationshipType.ASYMMETRIC_ACCUSED_DEPENDENT,
    description: 'Existe una relación asimétrica en que el/la denunciado/a tiene dependencia directa o indirecta de la víctima.'
  },
  {
    value: RelationshipType.SYMMETRIC_SAME_AREA,
    description: 'Existe una relación simétrica en que el/la denunciado/a y la víctima no tienen una dependencia directa ni indirecta, pero se desempeñan en la misma área/unidad/servicio.'
  },
  {
    value: RelationshipType.SYMMETRIC_DIFFERENT_AREA,
    description: 'Existe una relación simétrica en que el/la denunciado/a y la víctima no tienen una dependencia directa ni indirecta, y no se desempeñan en la misma área/unidad/servicio.'
  }
];

export const defaultRelationshipFormData: RelationshipFormData = {
  relationship: {
    type: RelationshipType.ASYMMETRIC_VICTIM_DEPENDENT,
    situations: {
      hasEvidence: false,
      hasPriorCases: false,
      wasPreviouslyReported: false,
      hasPriorKnowledge: false
    }
  }
}; 