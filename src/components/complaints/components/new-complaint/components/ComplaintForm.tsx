"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNewComplaint } from "../complements/hooks/useNewComplaint";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";
import { VictimForm } from "../steps/VictimForm";
import { EmployerForm } from "../steps/EmployerForm";
import { AccusedForm } from "../steps/AccusedForm";
import { RelationshipForm } from "../steps/RelationshipForm";
import { SituationsForm } from "../steps/SituationsForm";
import { WitnessForm } from "../steps/WitnessForm";
import { ReportedFactsForm } from "../steps/ReportedFactsForm";
import { ReportedSituationsForm } from "../steps/ReportedSituationsForm";
import { SafeguardMeasuresForm } from "../steps/SafeguardMeasuresForm";
import { SummaryForm } from "../steps/SummaryForm";
import { ReviewForm } from "../steps/ReviewForm";
import { ComplaintFormState } from "@/interfaces/complaints/form-state";
import { EmployerFormData } from "@/interfaces/complaints/forms/employer";
import { VictimFormData, defaultVictimFormData } from "@/interfaces/complaints/forms/victim";
import { AccusedFormData } from "@/interfaces/complaints/forms/accused";
import { RelationshipFormData } from "@/interfaces/complaints/forms/relationship";
import { SituationsFormData } from "@/interfaces/complaints/forms/situations";
import { WitnessFormData } from "@/interfaces/complaints/forms/witness";
import { ReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { ReportedSituationsFormData } from "@/interfaces/complaints/forms/reported-situations";
import { SafeguardMeasuresFormData } from "@/interfaces/complaints/forms/safeguard";
import { SummaryFormData } from "@/interfaces/complaints/forms/summary";
import { ReviewFormData } from "@/interfaces/complaints/forms/review";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function ComplaintForm() {
  const {
    formData,
    currentStep,
    isLoading,
    updateFormData,
    nextStep,
    previousStep
  } = useNewComplaint();

  const TOTAL_STEPS = 10;
  const router = useRouter();

  const handleEmployerUpdate = (data: EmployerFormData) => {
    updateFormData({ employer: data });
  };

  const handleVictimUpdate = (data: VictimFormData) => {
    updateFormData({ victim: data });
  };

  const handleAccusedNext = (data: AccusedFormData) => {
    updateFormData({ accused: data });
    nextStep();
  };

  const handleRelationshipNext = (data: RelationshipFormData) => {
    updateFormData({ relationship: data });
    nextStep();
  };

  const handleSituationsNext = (data: SituationsFormData) => {
    const reportedData: ReportedSituationsFormData = {
      situationType: "workplace_harassment",
      description: "Situación reportada",
      frequency: 'once',
      affectedEmployees: [],
      impactLevel: 'low',
      previousReports: data.situations.wasPreviouslyReported,
      evidence: data.situations.hasEvidence,
      priorCases: data.situations.hasPriorCases
    };
    updateFormData({ reportedSituations: reportedData });
    nextStep();
  };

  const handleWitnessNext = (data: WitnessFormData) => {
    updateFormData({ witness: data });
    nextStep();
  };

  const handleReportedFactsNext = (data: ReportedFactsFormData) => {
    updateFormData({ reportedFacts: data });
    nextStep();
  };

  const handleReportedSituationsNext = (data: ReportedSituationsFormData) => {
    updateFormData({ reportedSituations: data });
    nextStep();
  };

  const handleSafeguardNext = (data: SafeguardMeasuresFormData) => {
    updateFormData({ safeguardMeasures: data });
    nextStep();
  };

  const handleSummaryNext = (data: SummaryFormData) => {
    const reviewData: ReviewFormData = {
      confirmed: false,
      signature: '',
      reviewDate: new Date()
    };
    updateFormData({
      review: reviewData,
      isReviewing: true
    });
  };

  const handleReviewNext = (data: ReviewFormData) => {
    updateFormData({ review: data });
  };

  const handleEditSection = (path: string) => {
    console.log('Editando sección:', path);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: // Employer Form
        return !!(
          formData.employer?.employer &&
          formData.employer.employer !== 'select' &&
          formData.employer?.date instanceof Date &&
          !isNaN(formData.employer.date.getTime())
        );
      // ... otros casos
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (isStepValid()) {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmployerForm
            defaultValues={formData.employer}
            onNext={handleEmployerUpdate}
            onBack={previousStep}
          />
        );
      case 2:
        return (
          <VictimForm
            defaultValues={formData.victim || defaultVictimFormData}
            onNext={handleVictimUpdate}
            onBack={previousStep}
          />
        );
      case 3:
        return (
          <AccusedForm
            defaultValues={formData.accused}
            onNext={handleAccusedNext}
            onBack={previousStep}
          />
        );
      case 4:
        return (
          <RelationshipForm
            defaultValues={formData.relationship}
            onNext={handleRelationshipNext}
            onBack={previousStep}
          />
        );
      case 5:
        const situationsData: SituationsFormData = {
          situations: {
            hasEvidence: formData.reportedSituations?.evidence || false,
            hasPriorCases: formData.reportedSituations?.priorCases || false,
            wasPreviouslyReported: formData.reportedSituations?.previousReports || false
          }
        };
        return (
          <SituationsForm
            defaultValues={situationsData}
            onNext={handleSituationsNext}
            onBack={previousStep}
          />
        );
      case 6:
        return (
          <WitnessForm
            defaultValues={formData.witness}
            onNext={handleWitnessNext}
            onBack={previousStep}
          />
        );
      case 7:
        return (
          <ReportedFactsForm
            defaultValues={formData.reportedFacts}
            onNext={handleReportedFactsNext}
            onBack={previousStep}
          />
        );
      case 8:
        return (
          <ReportedSituationsForm
            defaultValues={formData.reportedSituations}
            onNext={handleReportedSituationsNext}
            onBack={previousStep}
          />
        );
      case 9:
        return (
          <SafeguardMeasuresForm
            defaultValues={formData.safeguardMeasures}
            onNext={handleSafeguardNext}
            onBack={previousStep}
          />
        );
      case 10:
        const summaryData: SummaryFormData = {
          summary: '',
          investigationBy: 'employer',
          actDate: new Date(),
          actTime: {
            hour: '09',
            minute: '00'
          }
        };
        return (
          <SummaryForm
            defaultValues={summaryData}
            onNext={handleSummaryNext}
            onBack={previousStep}
          />
        );
      default:
        return <div>Paso no implementado</div>;
    }
  };

  if (formData.isReviewing) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="border-b">
          <div className="flex items-center gap-2 h-[60px] px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/denuncia')}
              className="text-gray-600"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
            </Button>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-600">Denuncias</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Ingresar denuncia</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-900">Ingresar denuncia</h1>
        </div>

        <div className="flex-1 p-6 bg-gray-50">
          <div className="w-full max-w-[800px] mx-auto">
            <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-8">
              <ReviewForm
                defaultValues={formData.review}
                onNext={handleReviewNext}
                onBack={previousStep}
                complaintData={formData}
                onEditSection={handleEditSection}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b">
        <div className="flex items-center gap-2 h-[60px] px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/denuncia')}
            className="text-gray-600"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
          </Button>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600">Denuncias</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Ingresar denuncia</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-semibold text-gray-900">Ingresar denuncia</h1>
      </div>

      <div className="flex-1 p-6 bg-gray-50">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-8">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                  <span className="text-sm text-blue-600 font-medium whitespace-nowrap">{currentStep}/{TOTAL_STEPS}</span>
                  <div className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                    <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                  </div>
                </div>
                {isLoading && (
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    Guardando...
                  </span>
                )}
              </div>

              {renderStep()}

              <div className="flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className={cn(
                    "px-6",
                    isStepValid()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  {currentStep === 10 ? "Revisar" : "Siguiente"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 