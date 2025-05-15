"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useNewComplaint } from "../complements/hooks/useNewComplaint";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";
import { VictimForm } from "../steps/VictimForm";
import { EmployerForm } from "../steps/EmployerForm";
import { AccusedForm } from "../steps/AccusedForm";
import { RelationshipForm } from "../steps/RelationshipForm";

import { WitnessForm } from "../steps/WitnessForm";
import { ReportedFactsForm } from "../steps/ReportedFactsForm";
import { ReportedSituationsForm } from "../steps/ReportedSituationsForm";
import { SafeguardMeasuresForm } from "../steps/SafeguardMeasuresForm";
import { SummaryForm } from "../steps/SummaryForm";
import { ReviewForm } from "../steps/ReviewForm";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useVictimFormValidation } from "../complements/hooks/useVictimFormValidation";
import { SafeguardMeasureType } from "@/interfaces/complaints/forms/safeguard";

export function ComplaintForm() {
  const {
    formData: complaintFormData,
    currentStep: step,
    isLoading,
    updateFormData,
    nextStep,
    previousStep
  } = useNewComplaint();

  const {
    formData: victimFormData,
    errors,
    isValid,
    validateForm,
  } = useVictimFormValidation();

  const TOTAL_STEPS = 9;
  const router = useRouter();

  const handleEmployerUpdate = (data: EmployerFormData) => {
    updateFormData({ employer: data });
  };

  const handleVictimUpdate = (data: VictimFormData) => {
    // Simplemente actualizar y avanzar sin validación
    updateFormData({ victim: data });
    nextStep();
  };

  const handleAccusedNext = (data: AccusedFormData) => {
    updateFormData({ accused: data });
    nextStep();
  };

  const handleRelationshipNext = (data: RelationshipFormData) => {
    updateFormData({
      relationship: data,
      reportedSituations: {
        ...complaintFormData.reportedSituations,
        evidence: data.relationship.situations.hasEvidence,
        priorCases: data.relationship.situations.hasPriorCases,
        previousReports: data.relationship.situations.wasPreviouslyReported
      }
    });
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
    switch (step) {
      case 1: // Employer Form
        return !!(
          complaintFormData.employer?.employer &&
          complaintFormData.employer.employer !== 'select' &&
          complaintFormData.employer?.date instanceof Date &&
          !isNaN(complaintFormData.employer.date.getTime())
        );
      case 2: // Victim Form
        return true;
      case 3: // Accused Form
        return !!(complaintFormData.accused?.accusedList?.length);
      case 4: // Relationship Form (incluye situations)
        return !!(
          complaintFormData.relationship?.relationship?.type &&
          complaintFormData.relationship?.relationship?.description?.trim()
        );
      case 5: // Witness Form (antes era 6)
        return !!(complaintFormData.witness?.witnesses?.length);
      case 6: // Reported Facts Form (antes era 7)
        return !!(
          complaintFormData.reportedFacts?.description &&
          complaintFormData.reportedFacts?.description.trim()
        );
      case 7: // Reported Situations Form (antes era 8)
        return !!(
          complaintFormData.reportedSituations?.situationType &&
          complaintFormData.reportedSituations?.situationType !== 'select' &&
          complaintFormData.reportedSituations?.description?.trim()
        );
      case 8: // Safeguard Measures Form
        return !!(
          complaintFormData.safeguardMeasures?.measures &&
          complaintFormData.safeguardMeasures.measures.length > 0 &&
          complaintFormData.safeguardMeasures.measures.every(measure =>
            measure.type &&
            measure.responsible &&
            measure.date &&
            (measure.type !== SafeguardMeasureType.OTHER || measure.description)
          )
        );
      case 9: // Summary Form (antes era 10)
        return !!(
          complaintFormData.reportedFacts?.description &&
          complaintFormData.reportedFacts?.description.trim()
        );
      default:
        return true;
    }
  };

  const canAdvanceToNextStep = () => {
    if (step === 2) { // Paso de la víctima
      // Siempre permitir avanzar en el paso de la víctima
      return true;
    }

    return isStepValid();
  };

  const handleNext = () => {
    if (canAdvanceToNextStep()) {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmployerForm
            defaultValues={complaintFormData.employer}
            onNext={handleEmployerUpdate}
            onBack={previousStep}
          />
        );
      case 2:
        return (
          <VictimForm
            defaultValues={complaintFormData.victim || defaultVictimFormData}
            onNext={handleVictimUpdate}
            onBack={previousStep}
          />
        );
      case 3:
        return (
          <AccusedForm
            defaultValues={complaintFormData.accused}
            onNext={handleAccusedNext}
            onBack={previousStep}
          />
        );
      case 4:
        return (
          <RelationshipForm
            defaultValues={complaintFormData.relationship}
            onNext={handleRelationshipNext}
            onBack={previousStep}
          />
        );
      case 5:
        return (
          <WitnessForm
            defaultValues={complaintFormData.witness}
            onNext={handleWitnessNext}
            onBack={previousStep}
          />
        );
      case 6:
        return (
          <ReportedFactsForm
            defaultValues={complaintFormData.reportedFacts}
            onNext={handleReportedFactsNext}
            onBack={previousStep}
          />
        );
      case 7:
        return (
          <ReportedSituationsForm
            defaultValues={complaintFormData.reportedSituations}
            onNext={handleReportedSituationsNext}
            onBack={previousStep}
          />
        );
      case 8:
        return (
          <SafeguardMeasuresForm
            defaultValues={complaintFormData.safeguardMeasures}
            onNext={handleSafeguardNext}
            onBack={previousStep}
          />
        );
      case 9:
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

  if (complaintFormData.isReviewing) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="border-b">
          <div className="flex items-center gap-2 h-[60px] px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
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
                defaultValues={complaintFormData.review}
                onNext={handleReviewNext}
                onBack={previousStep}
                complaintData={complaintFormData}
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
            onClick={() => router.push('/')}
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
          <div className="rounded-2xl border border-[#EAECF0] p-8 bg-gray-100">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                  <span className="text-sm text-blue-600 font-medium whitespace-nowrap">{step}/{TOTAL_STEPS}</span>
                  <div className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                    <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
                  </div>
                </div>
                {isLoading && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando...</span>
                  </div>
                )}
              </div>

              {renderStep()}

              <div className="flex justify-end gap-4">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={previousStep}
                    className="text-gray-700 border border-gray-300 flex items-center gap-2 mr-auto"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Atrás
                  </Button>
                )}

                <Button
                  onClick={handleNext}
                  disabled={!canAdvanceToNextStep()}
                  className={cn(
                    "px-6 ml-auto",
                    canAdvanceToNextStep()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  {step === 9 ? "Revisar" : "Siguiente"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 