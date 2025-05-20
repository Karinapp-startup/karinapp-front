import { ComplaintFormData } from "@/interfaces/complaints/forms/complaint";
import { RelationshipFormData } from "@/interfaces/complaints/forms/relationship";
import { VictimFormData } from "@/interfaces/complaints/forms/victim";
import { AccusedFormData, AccusedPerson } from "@/interfaces/complaints/forms/accused";
import { WitnessData } from "@/interfaces/complaints/forms/witness";
import { EmployerFormData } from "@/interfaces/complaints/forms/employer";
import { ReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { ReportedSituationsFormData } from "@/interfaces/complaints/forms/reported-situations";

export const validateComplaintForm = (data: ComplaintFormData): boolean => {
  return !!(
    data.victim &&
    data.accused &&
    data.relationship &&
    data.reportedSituations &&
    data.reportedFacts &&
    validateVictimForm(data.victim) &&
    validateAccusedForm(data.accused) &&
    validateReportedFactsForm(data.reportedFacts) &&
    validateReportedSituationsForm(data.reportedSituations)
  );
};

export const validateAccusedForm = (data: AccusedFormData): boolean => {
  return !!(
    data.accusedList &&
    data.accusedList.length > 0 &&
    data.accusedList.every((accused: AccusedPerson) => !!(
      accused.firstName?.trim() &&
      accused.lastName?.trim() &&
      accused.rut?.trim() &&
      accused.email?.trim() &&
      accused.position?.trim() &&
      accused.department?.trim()
    ))
  );
};

export const validateRelationshipForm = (data: RelationshipFormData): boolean => {
  return !!(
    data.relationship.type &&
    Object.values(data.relationship.situations).some(value => value)
  );
};

export const validateVictimForm = (data: VictimFormData): boolean => {
  return !!(
    data.victim.firstName?.trim() &&
    data.victim.lastName?.trim() &&
    data.victim.rut?.trim() &&
    data.victim.email?.trim() &&
    data.victim.position?.trim() &&
    data.victim.department?.trim()
  );
};

export const validateWitnessForm = (witnesses: WitnessData[]): boolean => {
  return witnesses.length > 0 && witnesses.every(witness => !!(
    witness.fullName?.trim() &&
    witness.position?.trim() &&
    witness.department?.trim()
  ));
};

export const validateEmployerForm = (data: EmployerFormData): boolean => {
  return !!(
    data.employer &&
    data.employer !== 'select' &&
    data.companyName?.trim() &&
    data.companyRut?.trim()
  );
};

export const validateReportedFactsForm = (data: ReportedFactsFormData): boolean => {
  return !!(
    data.date &&
    data.location?.trim() &&
    data.commune?.trim() &&
    data.street?.trim() &&
    data.description?.trim()
  );
};

export const validateReportedSituationsForm = (data: ReportedSituationsFormData): boolean => {
  return !!(
    data.situationType &&
    data.frequency &&
    data.description?.trim() &&
    typeof data.evidence === 'boolean' &&
    typeof data.priorCases === 'boolean' &&
    typeof data.previousReports === 'boolean'
  );
};

// ... otras funciones de validación 