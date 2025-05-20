import { AccusedFormData } from "./forms/accused";
import { EmployerFormData } from "./forms/employer";
import { RelationshipFormData } from "./forms/relationship";
import { ReportedFactsFormData } from "./forms/reported-facts";
import { ReportedSituationsFormData } from "./forms/reported-situations";
import { SafeguardMeasuresFormData } from "./forms/safeguard";
import { VictimFormData } from "./forms/victim";
import { WitnessFormData } from "./forms/witness";
import { ReviewFormData } from "./forms/review";

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
  isReviewing: boolean;
} 