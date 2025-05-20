import { AccusedFormData } from "./accused";
import { EmployerFormData } from "./employer";
import { RelationshipFormData } from "./relationship";
import { ReportedFactsFormData } from "./reported-facts";
import { ReportedSituationsFormData } from "./reported-situations";
import { SafeguardMeasuresFormData } from "./safeguard";
import { VictimFormData } from "./victim";
import { WitnessFormData } from "./witness";
import { ReviewFormData } from "./review";

export interface ComplaintFormState {
  accused: AccusedFormData;
  employer: EmployerFormData;
  relationship: RelationshipFormData;
  reportedFacts: ReportedFactsFormData;
  reportedSituations: ReportedSituationsFormData;
  safeguardMeasures: SafeguardMeasuresFormData;
  victim: VictimFormData;
  witness: WitnessFormData;
  review: ReviewFormData;
  currentStep: number;
}

export interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  isLastStep?: boolean;
}

export * from "./accused";
export * from "./employer";
export * from "./relationship";
export * from "./reported-facts";
export * from "./reported-situations";
export * from "./safeguard";
export * from "./victim";
export * from "./witness";
export * from "./review"; 