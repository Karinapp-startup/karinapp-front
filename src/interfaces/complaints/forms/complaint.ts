import { EmployerFormData } from './employer';
import { VictimFormData } from './victim';
import { AccusedFormData } from './accused';
import { RelationshipFormData } from './relationship';
import { SummaryFormData } from './summary';
import { WitnessFormData } from './witness';
import { ReportedFactsFormData } from './reported-facts';
import { ReportedSituationsFormData } from './reported-situations';
import { SafeguardMeasuresFormData } from './safeguard';

export interface ComplaintFormData {
  employer?: EmployerFormData;
  victim?: VictimFormData;
  accused?: AccusedFormData;
  relationship?: RelationshipFormData;
  witness?: WitnessFormData;
  reportedFacts?: ReportedFactsFormData;
  reportedSituations?: ReportedSituationsFormData;
  safeguardMeasures?: SafeguardMeasuresFormData;
  summary?: SummaryFormData;
}

export const defaultComplaintFormData: ComplaintFormData = {
  employer: undefined,
  victim: undefined,
  accused: undefined,
  relationship: undefined,
  witness: undefined,
  reportedFacts: undefined,
  reportedSituations: {
    situations: []
  },
  safeguardMeasures: undefined,
  summary: undefined
}; 