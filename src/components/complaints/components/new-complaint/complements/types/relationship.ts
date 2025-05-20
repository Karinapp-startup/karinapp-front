import { RelationshipData } from "@/interfaces/complaints/forms/relationship";

export interface RelationshipFormState {
  relationship: RelationshipData;
  isValid: boolean;
  touched: {
    type: boolean;
    hierarchyLevel: boolean;
    description: boolean;
  };
  errors: {
    type?: string;
    hierarchyLevel?: string;
    description?: string;
  };
} 