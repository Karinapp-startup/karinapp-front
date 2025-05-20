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
import { WitnessFormData, WitnessData } from "@/interfaces/complaints/forms/witness";
import { ReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { ReportedSituationsFormData } from "@/interfaces/complaints/forms/reported-situations";
import { SafeguardMeasuresFormData } from "@/interfaces/complaints/forms/safeguard";
import { SummaryFormData } from "@/interfaces/complaints/forms/summary";
import { ReviewFormData } from "@/interfaces/complaints/forms/review";
import { useRouter } from "next/navigation";
import { useVictimFormValidation } from "../complements/hooks/useVictimFormValidation";
import { SafeguardMeasureType } from "@/interfaces/complaints/forms/safeguard";
import { useAccusedFormValidation } from "../complements/hooks/useAccusedFormValidation";
import { useWitnessFormValidation } from "../complements/hooks/useWitnessFormValidation";
import { useState, useCallback } from "react";
import { ComplaintFormData } from '@/interfaces/complaints/forms/complaint';
import {
  defaultEmployerFormData,
  defaultAccusedFormData,
  defaultRelationshipFormData,
  defaultWitnessFormData,
  defaultReportedFactsFormData,
  defaultReportedSituationsFormData,
  defaultSafeguardMeasuresFormData,
  defaultReviewFormData
} from '@/interfaces/complaints/forms/defaults';
import { useReportedSituationsValidation } from "../complements/hooks/useReportedSituationsValidation";
import { SITUATION_TYPES, FREQUENCY_TYPES } from "../complements/data/constants";
import { useEmployerFormValidation } from "../complements/hooks/useEmployerFormValidation";
import { useReportedFactsValidation } from "../complements/hooks/useReportedFactsValidation";
import { useSafeguardMeasuresValidation } from "../complements/hooks/useSafeguardMeasuresValidation";
import { useSummaryFormValidation } from "../complements/hooks/useSummaryFormValidation";
import { defaultSummaryFormData } from '@/interfaces/complaints/forms/summary';
import { useRelationshipFormValidation } from "../complements/hooks/useRelationshipFormValidation";

export function ComplaintForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ComplaintFormData>({
    employer: defaultEmployerFormData,
    victim: defaultVictimFormData,
    accused: {
      ...defaultAccusedFormData,
      accused: {
        firstName: '',
        lastName: '',
        position: '',
        department: '',
        rut: '',
        email: ''
      }
    },
    relationship: defaultRelationshipFormData,
    witness: {
      witness: {
        fullName: '',
        position: '',
        department: ''
      },
      witnesses: []
    },
    reportedFacts: defaultReportedFactsFormData,
    reportedSituations: defaultReportedSituationsFormData,
    safeguardMeasures: defaultSafeguardMeasuresFormData,
    review: defaultReviewFormData,
    isReviewing: false,
  });

  const nextStep = useCallback(() => {
    console.log('Moving to next step from:', currentStep);
    setCurrentStep(prev => prev + 1);
  }, [currentStep]);

  const previousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (data: Partial<ComplaintFormData>) => {
    console.log('Updating form data:', data);
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleEmployerUpdate = useCallback((data: EmployerFormData) => {
    console.log('Employer data being updated:', data);
    setFormData(prev => ({
      ...prev,
      employer: data
    }));
    nextStep();
  }, [nextStep]);

  const handleVictimUpdate = (data: VictimFormData) => {
    updateFormData({ victim: data });
    nextStep();
  };

  const handleAccusedNext = (data: AccusedFormData) => {
    updateFormData({ accused: data });
    nextStep();
  };

  const handleRelationshipNext = useCallback((data: RelationshipFormData) => {
    const updatedReportedSituations: ReportedSituationsFormData = {
      ...formData.reportedSituations,
      evidence: data.relationship.situations.hasEvidence,
      priorCases: data.relationship.situations.hasPriorCases,
      previousReports: data.relationship.situations.wasPreviouslyReported,
      situationType: formData.reportedSituations?.situationType || SITUATION_TYPES.HARASSMENT,
      frequency: formData.reportedSituations?.frequency || FREQUENCY_TYPES.ONCE,
      description: formData.reportedSituations?.description || '',
      affectedEmployees: formData.reportedSituations?.affectedEmployees || 0,
      impactLevel: formData.reportedSituations?.impactLevel || 'low'
    };

    updateFormData({
      relationship: data,
      reportedSituations: updatedReportedSituations
    });
    nextStep();
  }, [formData, updateFormData, nextStep]);

  const handleWitnessNext = useCallback((data: WitnessData[]) => {
    updateFormData({
      witness: {
        witness: defaultWitnessFormData.witness,
        witnesses: data
      }
    });
    nextStep();
  }, [updateFormData, nextStep]);

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

  const validation = useVictimFormValidation(defaultVictimFormData);
  const accusedValidation = useAccusedFormValidation({
    ...defaultAccusedFormData,
    accused: {
      firstName: '',
      lastName: '',
      position: '',
      department: '',
      rut: '',
      email: ''
    }
  });
  const witnessValidation = useWitnessFormValidation(defaultWitnessFormData);
  const employerValidation = useEmployerFormValidation(defaultEmployerFormData);
  const reportedFactsValidation = useReportedFactsValidation(defaultReportedFactsFormData);
  const safeguardValidation = useSafeguardMeasuresValidation(defaultSafeguardMeasuresFormData);
  const summaryValidation = useSummaryFormValidation(defaultSummaryFormData);
  const relationshipValidation = useRelationshipFormValidation(defaultRelationshipFormData);

  const handleStepSubmit = (stepData: Partial<ComplaintFormData>) => {
    setFormData((prev: ComplaintFormData) => ({
      ...prev,
      ...stepData,
    }));

    // Solo avanzar si no estamos en el paso de revisión
    if (!formData.isReviewing) {
      nextStep();
    }
  };

  // Mover la inicialización del hook fuera del renderStep
  const reportedSituationsValidation = useReportedSituationsValidation(
    formData.reportedSituations || defaultReportedSituationsFormData
  );

  const renderStep = useCallback(() => {
    console.log('Rendering step:', currentStep);
    switch (currentStep) {
      case 1:
        return (
          <EmployerForm
            key="employer-form"
            defaultValues={formData.employer}
            onNext={handleEmployerUpdate}
            onBack={previousStep}
            validation={employerValidation}
          />
        );
      case 2:
        return (
          <VictimForm
            defaultValues={formData.victim}
            onNext={handleVictimUpdate}
            onBack={previousStep}
            validation={validation}
          />
        );
      case 3:
        return (
          <AccusedForm
            defaultValues={formData.accused}
            onNext={handleAccusedNext}
            onBack={previousStep}
            validation={accusedValidation}
          />
        );
      case 4:
        return (
          <WitnessForm
            defaultValues={formData.witness.witnesses}
            onNext={handleWitnessNext}
            onBack={previousStep}
          />
        );
      case 5:
        return (
          <ReportedFactsForm
            defaultValues={formData.reportedFacts}
            onNext={handleReportedFactsNext}
            onBack={previousStep}
            validation={reportedFactsValidation}
          />
        );
      case 6:
        return (
          <ReportedSituationsForm
            defaultValues={formData.reportedSituations}
            onNext={handleReportedSituationsNext}
            onBack={previousStep}
            validation={reportedSituationsValidation}
          />
        );
      case 7:
        return (
          <SafeguardMeasuresForm
            defaultValues={formData.safeguardMeasures}
            onNext={handleSafeguardNext}
            onBack={previousStep}
            validation={safeguardValidation}
          />
        );
      case 8:
        const summaryData: SummaryFormData = {
          summary: '',
          investigationBy: 'employer',
          actDate: new Date(),
          actTime: {
            hour: '09',
            minute: '00'
          },
          ...formData
        };

        return (
          <SummaryForm
            defaultValues={summaryData}
            onNext={handleSummaryNext}
            onBack={previousStep}
            validation={summaryValidation}
          />
        );
      default:
        return null;
    }
  }, [
    currentStep,
    formData,
    employerValidation,
    handleEmployerUpdate,
    handleVictimUpdate,
    handleAccusedNext,
    handleWitnessNext,
    handleReportedFactsNext,
    handleReportedSituationsNext,
    handleSafeguardNext,
    handleSummaryNext,
    validation,
    accusedValidation,
    witnessValidation,
    reportedFactsValidation,
    reportedSituationsValidation,
    safeguardValidation,
    summaryValidation,
    previousStep
  ]);

  const canAdvanceToNextStep = useCallback(() => {
    switch (currentStep) {
      case 1: // Employer Form
        return !!(
          formData.employer?.employer &&
          formData.employer.employer !== 'select' &&
          formData.employer?.date instanceof Date
        );
      case 2: // Victim Form
        return validation.isValid;
      case 3: // Accused Form
        return !!(formData.accused?.accusedList?.length) && accusedValidation.isValid;
      case 4: // Witness Form
        return !!(formData.witness?.witnesses?.length);
      case 5: // Reported Facts Form
        return !!(
          formData.reportedFacts?.description &&
          formData.reportedFacts?.description.trim()
        );
      case 6: // Reported Situations Form
        return !!(
          formData.reportedSituations?.situationType &&
          formData.reportedSituations?.frequency &&
          formData.reportedSituations?.description?.trim()
        );
      case 7: // Safeguard Measures Form
        return !!(
          formData.safeguardMeasures?.measures &&
          formData.safeguardMeasures.measures.length > 0
        );
      case 8: // Summary Form
        return true;
      default:
        return false;
    }
  }, [currentStep, formData, validation, accusedValidation, witnessValidation, reportedFactsValidation, safeguardValidation, summaryValidation]);

  const router = useRouter();

  if (formData.isReviewing) {
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

      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-[800px] mx-auto w-full">
          <div className="rounded-2xl border border-[#EAECF0] p-8 bg-gray-100">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                  <span className="text-sm text-blue-600 font-medium whitespace-nowrap">
                    {currentStep}/{9}
                  </span>
                  <div className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                    <ProgressBar currentStep={currentStep} totalSteps={9} />
                  </div>
                </div>
              </div>

              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
