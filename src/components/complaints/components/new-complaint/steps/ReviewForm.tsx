"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewFormData, reviewSections } from "@/interfaces/complaints/forms/review";
import { StepProps } from "@/interfaces/complaints/forms";
import { ComplaintFormState } from "@/interfaces/complaints/form-state";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: ReviewFormData;
  complaintData: ComplaintFormState;
  onNext: (data: ReviewFormData) => void;
  onEditSection: (path: string) => void;
}

export const ReviewForm = ({
  onNext,
  onBack,
  defaultValues,
  complaintData,
  onEditSection
}: Props) => {
  const handleConfirmChange = (checked: boolean) => {
    const updatedValues: ReviewFormData = {
      ...defaultValues,
      confirmed: checked
    };
    onNext(updatedValues);
  };

  const renderEmployerSection = () => (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-medium text-gray-500 uppercase">
          {reviewSections[0].title}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 text-sm"
          onClick={() => onEditSection(reviewSections[0].editPath)}
        >
          Editar
        </Button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Empleador</span>
            <p className="text-sm text-gray-900 mt-1">
              {complaintData.employer.companyName}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Fecha de ingreso de la denuncia</span>
            <p className="text-sm text-gray-900 mt-1">
              {format(complaintData.employer.date, "dd/MM/yyyy", { locale: es })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // ... Renderizado similar para otras secciones ...

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Revisión de la denuncia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderEmployerSection()}
          {/* Otras secciones */}

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="confirm"
                checked={defaultValues.confirmed}
                onCheckedChange={handleConfirmChange}
                className="mt-1"
              />
              <div className="space-y-1">
                <label htmlFor="confirm" className="text-sm text-gray-900 font-medium">
                  Declaro haber revisado íntegramente la información contenida en esta denuncia, confirmando su completitud y exactitud.
                </label>
                <p className="text-sm text-gray-500">
                  Una vez marcado este recuadro, la información ingresada se considerará definitiva y ya no podrá ser modificada.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              className="bg-white"
              onClick={onBack}
            >
              Atrás
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!defaultValues.confirmed}
            >
              Solicitar firma de denunciante
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 