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
import { Loading } from "@/components/common/loading";

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

  const handleNextStep = () => {
    if (currentStep === 10) {
      updateFormData({ isReviewing: true });
    } else {
      nextStep();
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
              onClick={() => window.history.back()}
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
                formData={formData}
                updateFormData={updateFormData}
                onBack={previousStep}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EmployerForm formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <VictimForm formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <AccusedForm formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <RelationshipForm formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <SituationsForm formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <WitnessForm formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <ReportedFactsForm formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <ReportedSituationsForm formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <SafeguardMeasuresForm formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <SummaryForm formData={formData} updateFormData={updateFormData} />;
      default:
        return <div>Paso no implementado</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b">
        <div className="flex items-center gap-2 h-[60px] px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
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

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button
                    onClick={previousStep}
                    disabled={isLoading}
                    variant="outline"
                    className="bg-white"
                  >
                    Atrás
                  </Button>
                )}
                <div className={currentStep === 1 ? 'ml-auto' : ''}>
                  <Button
                    onClick={handleNextStep}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    {currentStep === 10 ? "Revisar" : "Siguiente"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 