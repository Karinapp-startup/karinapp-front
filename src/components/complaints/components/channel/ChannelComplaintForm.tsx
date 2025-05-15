"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VictimForm } from "../new-complaint/steps/VictimForm";
import { ReportedFactsForm } from "../new-complaint/steps/ReportedFactsForm";
import { ReportedSituationsForm } from "../new-complaint/steps/ReportedSituationsForm";
import { WitnessForm } from "../new-complaint/steps/WitnessForm";
import { SafeguardMeasuresForm } from "../new-complaint/steps/SafeguardMeasuresForm";
import { useVictimFormValidation } from "../new-complaint/complements/hooks/useVictimFormValidation";
import { ProgressBar } from "../new-complaint/components/ProgressBar";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SafeguardMeasureType, SafeguardMeasuresFormData } from "@/interfaces/complaints/forms/safeguard";
import { ReportedFactsFormData, defaultReportedFactsFormData } from "@/interfaces/complaints/forms/reported-facts";
import { WitnessFormData } from "@/interfaces/complaints/forms/witness";
import { ReportedSituationsFormData } from "@/interfaces/complaints/forms/reported-situations";
import { AccusedForm } from "../new-complaint/steps/AccusedForm";
import { RelationshipForm } from "../new-complaint/steps/RelationshipForm";
import { AccusedFormData, AccusedPerson } from "@/interfaces/complaints/forms/accused";
import { RelationshipFormData, RelationshipType, HierarchyLevel } from "@/interfaces/complaints/forms/relationship";
import { toast } from "sonner";
import { VictimFormData } from "@/interfaces/complaints/forms/victim";

interface ChannelFormData {
  victim: VictimFormData | null;
  accused: AccusedFormData | null;
  relationship: RelationshipFormData | null;
  witness: WitnessFormData | null;
  reportedFacts: ReportedFactsFormData | null;
}

export function ChannelComplaintForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const TOTAL_STEPS = 5;

  const [formData, setFormData] = useState<ChannelFormData>({
    victim: null,
    accused: null,
    relationship: null,
    witness: null,
    reportedFacts: null
  });

  const victimValidation = useVictimFormValidation({
    victim: {
      firstName: "",
      lastName: "",
      rut: "",
      email: "",
      position: "",
      department: "",
    },
    isVictim: true
  });

  const canAdvanceToNextStep = () => {
    if (isLoading) return false;

    switch (currentStep) {
      case 1: // VictimForm
        return victimValidation.isValid;

      case 2: // AccusedForm
        return formData.accused?.accusedList && formData.accused.accusedList.length > 0;

      case 3: // RelationshipForm
        return formData.relationship?.relationship &&
          formData.relationship.relationship.type &&
          formData.relationship.relationship.hierarchyLevel;

      case 4: // WitnessForm
        return true; // Los testigos son opcionales

      case 5: // ReportedFactsForm
        return formData.reportedFacts?.date &&
          formData.reportedFacts?.description &&
          formData.reportedFacts.description.length > 0;

      default:
        return false;
    }
  };

  const handleNext = async (data: any) => {
    setIsLoading(true);

    try {
      const formName = getCurrentFormName();
      if (formName) {
        setFormData(prev => ({
          ...prev,
          [formName]: data
        }));
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Guardando datos:', data);

      if (currentStep === TOTAL_STEPS) {
        toast.success("Denuncia guardada correctamente");
        router.push('/complaints/sign-complaint');
        return;
      }

      setCurrentStep(prev => prev + 1);
    } catch (error) {
      toast.error("Error al guardar los datos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentFormName = (): keyof ChannelFormData | '' => {
    switch (currentStep) {
      case 1: return 'victim';
      case 2: return 'accused';
      case 3: return 'relationship';
      case 4: return 'witness';
      case 5: return 'reportedFacts';
      default: return '';
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    const commonProps = {
      onNext: handleNext,
      onBack: handleBack,
    };

    switch (currentStep) {
      case 1:
        return (
          <VictimForm
            defaultValues={{
              victim: {
                firstName: "",
                lastName: "",
                rut: "",
                email: "",
                position: "",
                department: "",
              },
              isVictim: true
            }}
            validation={victimValidation}
            {...commonProps}
          />
        );
      case 2:
        const accusedDefaults: AccusedFormData = {
          accusedFirstName: '',
          accusedLastName: '',
          accusedRut: '',
          accusedEmail: '',
          accusedPosition: '',
          accusedDepartment: '',
          accusedList: [],
          employerId: 'select',
          accusedId: 'select'
        };
        return <AccusedForm defaultValues={accusedDefaults} {...commonProps} />;
      case 3:
        const relationshipDefaults = {
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
          isCurrentEmployee: false,
          position: "",
          department: ""
        };
        return <RelationshipForm defaultValues={relationshipDefaults} {...commonProps} />;
      case 4:
        const witnessDefaults: WitnessFormData = {
          witnesses: [{
            fullName: "",
            position: "",
            department: "",
          }]
        };
        return <WitnessForm defaultValues={witnessDefaults} {...commonProps} />;
      case 5:
        return <ReportedFactsForm
          defaultValues={defaultReportedFactsFormData}
          {...commonProps}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-semibold text-gray-900">Canal de ingreso de denuncias KarinApp</h1>
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
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando...</span>
                  </div>
                )}
              </div>

              {renderStep()}

              <div className="flex justify-end gap-4">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="text-gray-700 border border-gray-300 flex items-center gap-2 mr-auto"
                  >
                    Atrás
                  </Button>
                )}

                <Button
                  onClick={() => handleNext({})}
                  disabled={!canAdvanceToNextStep()}
                  className={cn(
                    "px-6 ml-auto",
                    canAdvanceToNextStep()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  {currentStep === TOTAL_STEPS ? "Finalizar" : "Siguiente"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 