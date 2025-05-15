"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { EmployerForm } from "@/components/complaints/components/new-complaint/steps/EmployerForm";
import { VictimForm } from "@/components/complaints/components/new-complaint/steps/VictimForm";
import { AccusedForm } from "@/components/complaints/components/new-complaint/steps/AccusedForm";
import { RelationshipForm } from "@/components/complaints/components/new-complaint/steps/RelationshipForm";
import { SituationsForm } from "@/components/complaints/components/new-complaint/steps/SituationsForm";
import { WitnessForm } from "@/components/complaints/components/new-complaint/steps/WitnessForm";
import { ReportedFactsForm } from "@/components/complaints/components/new-complaint/steps/ReportedFactsForm";
import { ReportedSituationsForm } from "@/components/complaints/components/new-complaint/steps/ReportedSituationsForm";
import { SafeguardMeasuresForm } from "@/components/complaints/components/new-complaint/steps/SafeguardMeasuresForm";
import { SummaryForm } from "@/components/complaints/components/new-complaint/steps/SummaryForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ComplaintType } from "@/components/complaints/components/list-compliance/complements/types";
import {
  EmployerFormData
} from "@/interfaces/complaints/forms/employer";
import {
  VictimFormData
} from "@/interfaces/complaints/forms/victim";
import {
  AccusedFormData
} from "@/interfaces/complaints/forms/accused";
import {
  RelationshipFormData,
  RelationshipType,
  HierarchyLevel
} from "@/interfaces/complaints/forms/relationship";
import {
  SituationsFormData
} from "@/interfaces/complaints/forms/situations";
import {
  WitnessFormData
} from "@/interfaces/complaints/forms/witness";
import {
  ReportedFactsFormData
} from "@/interfaces/complaints/forms/reported-facts";
import {
  ReportedSituationsFormData
} from "@/interfaces/complaints/forms/reported-situations";
import {
  SafeguardMeasuresFormData,
  SafeguardMeasureType
} from "@/interfaces/complaints/forms/safeguard";
import {
  SummaryFormData
} from "@/interfaces/complaints/forms/summary";

// Extender el tipo ComplaintType para incluir los campos de edición
interface EditableComplaintType extends ComplaintType {
  employer?: EmployerFormData;
  victim?: VictimFormData;
  accused?: AccusedFormData;
  relationship?: RelationshipFormData;
  situations?: SituationsFormData;
  witness?: WitnessFormData;
  reportedFacts?: ReportedFactsFormData;
  reportedSituations?: ReportedSituationsFormData;
  safeguardMeasures?: SafeguardMeasuresFormData;
  summary?: SummaryFormData;
}

// Primero definimos los valores por defecto fuera del componente
const defaultFormValues = {
  employer: {
    companyName: "",
    companyRut: "",
    address: "",
    region: "",
    commune: "",
    businessArea: "",
    activity: "",
    size: "small" as const,
    employeeCount: 0,
    employer: "",
    date: new Date(),
  },
  victim: {
    victim: {
      firstName: "",
      lastName: "",
      rut: "",
      email: "",
      position: "",
      department: "",
    },
    isVictim: false,
  },
  accused: {
    accused: {
      firstName: "",
      lastName: "",
      rut: "",
      email: "",
      position: "",
      department: "",
    },
    employerId: "",
    accusedId: "",
  },
  relationship: {
    relationship: {
      type: RelationshipType.DIRECT,
      hierarchyLevel: HierarchyLevel.SUPERIOR,
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
    department: "",
  },
  situations: {
    situations: {
      hasEvidence: false,
      hasPriorCases: false,
      wasPreviouslyReported: false,
    }
  },
  witness: {
    witnesses: [],
    currentWitness: {
      fullName: "",
      position: "",
      department: "",
    }
  },
  reportedFacts: {
    date: new Date(),
    location: "",
    description: "",
    witnesses: [],
    hasEvidence: false,
    evidenceDescription: "",
    additionalNotes: "",
    victimInterview: "",
    reportedFacts: "",
    impactLevel: "low" as const,
    commune: "",
    street: "",
    number: "",
    addressReference: ""
  },
  reportedSituations: {
    situationType: "workplace_harassment" as const,
    description: "",
    frequency: "once" as const,
    affectedEmployees: [],
    impactLevel: "low" as const,
    previousReports: false,
    evidence: false,
    priorCases: false,
  },
  safeguardMeasures: {
    safeguardMeasure: SafeguardMeasureType.SEPARATION,
    safeguardResponsible: "",
    safeguardDate: new Date(),
    otherMeasure: "",
    justification: "",
    urgencyLevel: "low" as const,
    measures: []
  },
  summary: {
    summary: "",
    investigationBy: "employer" as const,
    actDate: new Date(),
    actTime: {
      hour: "09",
      minute: "00"
    }
  }
};

export default function EditComplaintStep() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get('step');
  const complaintId = params.id;
  const [complaintData, setComplaintData] = useState<EditableComplaintType | null>(null);

  useEffect(() => {
    const baseComplaint: Omit<ComplaintType, keyof typeof defaultFormValues> = {
      id: complaintId as string,
      companyName: "Empresa ejemplo",
      victimName: "Juan Pérez",
      status: "recibida",
      dueDate: "12/12/23",
      entryDate: "01/12/23",
      step: "1/9",
      priority: "low",
      assignedTo: "María González",
      createdAt: new Date().toISOString(),
      lastUpdate: {
        date: "01/12/23",
        time: "10:00"
      },
      activities: [],
      lastActivity: {
        description: "Denuncia creada",
        date: "01/12/23",
        time: "10:00"
      }
    };

    setComplaintData({
      ...baseComplaint,
      ...defaultFormValues
    });
  }, [complaintId]);

  const handleBack = () => {
    router.push('/');
  };

  const handleNext = (data: any) => {
    console.log('Guardando datos:', data);
    // Aquí iría la lógica para guardar los datos
  };

  const renderStep = () => {
    if (!complaintData) return null;

    const commonProps = {
      onNext: handleNext,
      onBack: handleBack,
    };

    switch (step) {
      case '1':
        return <EmployerForm defaultValues={complaintData.employer ?? defaultFormValues.employer} {...commonProps} />;
      case '2':
        return <VictimForm defaultValues={complaintData.victim ?? defaultFormValues.victim} {...commonProps} />;
      case '3':
        return <AccusedForm defaultValues={complaintData.accused ?? defaultFormValues.accused} {...commonProps} />;
      case '4':
        return <RelationshipForm defaultValues={complaintData.relationship ?? defaultFormValues.relationship} {...commonProps} />;
      case '5':
        return <SituationsForm defaultValues={complaintData.situations ?? defaultFormValues.situations} {...commonProps} />;
      case '6':
        return <WitnessForm defaultValues={complaintData.witness ?? defaultFormValues.witness} {...commonProps} />;
      case '7':
        return <ReportedFactsForm defaultValues={complaintData.reportedFacts ?? defaultFormValues.reportedFacts} {...commonProps} />;
      case '8':
        return <ReportedSituationsForm defaultValues={complaintData.reportedSituations ?? defaultFormValues.reportedSituations} {...commonProps} />;
      case '9':
        return <SafeguardMeasuresForm defaultValues={complaintData.safeguardMeasures ?? defaultFormValues.safeguardMeasures} {...commonProps} />;
      case '10':
        return <SummaryForm defaultValues={complaintData.summary ?? defaultFormValues.summary} {...commonProps} />;
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b">
        <div className="flex items-center gap-2 h-[60px] px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-gray-600"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
          </Button>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600">Denuncias</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Denuncia #{complaintId}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Editar paso {step}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-semibold text-gray-900">Editar denuncia</h1>
      </div>

      <div className="flex-1 p-6 bg-gray-50">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
} 