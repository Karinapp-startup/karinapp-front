import { ComplaintFormData } from './complaint';
import { SafeguardMeasureType } from './safeguard';
import { EmployerFormData } from './employer';
import { RelationshipFormData } from './relationship';
import { SummaryFormData } from './summary';
import { WitnessFormData } from './witness';

export const defaultEmployerFormData: EmployerFormData = {
  employer: 'select',
  date: new Date(),
  companyName: '',
  companyRut: '',
  address: '',
  region: '',
  commune: '',
  businessActivity: '',
  businessArea: '',
  activity: '',
  size: 'small',
  employeeCount: 0,
  unionized: false,
  unionCount: 0
};

export const defaultAccusedFormData = {
  accusedList: [],
  employerId: 'select',
  accusedId: 'select'
};

export const defaultRelationshipFormData: RelationshipFormData = {
  relationship: {
    type: 'none',
    description: '',
    hierarchyLevel: 'peer',
    situations: {
      hasEvidence: false,
      hasPriorCases: false,
      wasPreviouslyReported: false
    }
  },
  startDate: new Date(),
  isCurrentEmployee: false,
  position: '',
  department: ''
};

export const defaultWitnessFormData: WitnessFormData = {
  witness: {
    fullName: '',
    position: '',
    department: ''
  },
  witnesses: []
};

export const defaultReportedFactsFormData = {
  date: new Date(),
  location: '',
  commune: '',
  street: '',
  number: '',
  addressReference: '',
  description: ''
};

export const defaultReportedSituationsFormData: ReportedSituationsFormData = {
  situationType: 'select',
  description: '',
  frequency: '',
  evidence: false,
  priorCases: false,
  previousReports: false,
  affectedEmployees: 0,
  impactLevel: 'low' as const
};

export const defaultSafeguardMeasuresFormData: SafeguardMeasuresFormData = {
  measures: [],
  safeguardMeasure: SafeguardMeasureType.SEPARATION,
  safeguardResponsible: '',
  safeguardDate: new Date(),
  otherMeasure: '',
  description: '',
  status: 'pending' as const
};

export const defaultReviewFormData = {
  confirmed: false,
  signature: '',
  reviewDate: new Date()
};

export const defaultSummaryFormData: SummaryFormData = {
  summary: '',
  investigationBy: 'employer',
  actDate: new Date(),
  actTime: {
    hour: '09',
    minute: '00'
  }
}; 