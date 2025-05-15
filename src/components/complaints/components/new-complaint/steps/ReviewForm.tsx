"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewFormData, reviewSections } from "@/interfaces/complaints/forms/review";
import { StepProps } from "@/interfaces/complaints/forms";
import { ComplaintFormState } from "@/interfaces/complaints/form-state";
import { useRouter } from "next/navigation";

interface Props extends Omit<StepProps, 'onNext'> {
  defaultValues: ReviewFormData;
  complaintData: ComplaintFormState;
  onNext: (data: ReviewFormData) => void;
  onEditSection: (section: string) => void;
}

export const ReviewForm = ({ onNext, onBack, defaultValues, complaintData, onEditSection }: Props) => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const router = useRouter();

  const handleRequestSignature = () => {
    setShowSignatureModal(true);
  };

  const handleConfirmSignature = () => {
    setShowSignatureModal(false);
    router.push('/complaints/sign-complaint');
  };

  const handleConfirmChange = (checked: boolean) => {
    onNext({
      ...defaultValues,
      confirmed: checked
    });
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-medium text-gray-500 uppercase">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEditSection(title)}
          className="text-blue-600 hover:text-blue-700"
        >
          Editar
        </Button>
      </div>
      {content}
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Revisión de la denuncia</h2>

        <div className="space-y-6">
          {renderSection("SELECCIÓN DEL EMPLEADOR", (
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Empleador</span>
                  <p className="text-sm text-gray-900">{complaintData.employer?.companyName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Fecha de ingreso de la denuncia</span>
                  <p className="text-sm text-gray-900">{complaintData.employer?.date?.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}

          {renderSection("DATOS DE LA VÍCTIMA", (
            <div className="bg-white rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Nombres</span>
                  <p className="text-sm text-gray-900">{complaintData.victim?.victim?.firstName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Apellidos</span>
                  <p className="text-sm text-gray-900">{complaintData.victim?.victim?.lastName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">RUT</span>
                  <p className="text-sm text-gray-900">{complaintData.victim?.victim?.rut}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Correo</span>
                  <p className="text-sm text-gray-900">{complaintData.victim?.victim?.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Cargo</span>
                  <p className="text-sm text-gray-900">{complaintData.victim?.victim?.position}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Departamento</span>
                  <p className="text-sm text-gray-900">{complaintData.victim?.victim?.department}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Sección similar para DATOS DEL DENUNCIANTE si existe */}
          {complaintData.victim?.complainant && renderSection("DATOS DEL DENUNCIANTE", (
            <div className="bg-white rounded-lg p-4 space-y-4">
              {/* Contenido similar al de la víctima */}
            </div>
          ))}

          {renderSection("DATOS DE EL O LOS DENUNCIADOS", (
            <div className="bg-white rounded-lg p-4 space-y-4">
              {complaintData.accused?.accusedList?.map((accused, index) => (
                <div key={index} className="space-y-4">
                  <p className="text-sm text-gray-500">Denunciado {index + 1}:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Nombres</span>
                      <p className="text-sm text-gray-900">{accused.fullName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">RUT</span>
                      <p className="text-sm text-gray-900">{accused.rut}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Correo</span>
                      <p className="text-sm text-gray-900">{accused.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Cargo</span>
                      <p className="text-sm text-gray-900">{accused.position}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Departamento</span>
                      <p className="text-sm text-gray-900">{accused.department}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {renderSection("SOBRE LA RELACIÓN ENTRE VÍCTIMA Y DENUNCIADO/A", (
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-blue-600">
                {complaintData.relationship?.relationship?.type}
              </p>
            </div>
          ))}

          {renderSection("SOBRE LAS PRESUNTAS SITUACIONES DENUNCIADAS", (
            <div className="bg-white rounded-lg p-4 space-y-2">
              {complaintData.relationship?.relationship?.situations?.hasEvidence && (
                <p className="text-sm text-blue-600">Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)</p>
              )}
              {complaintData.relationship?.relationship?.situations?.hasPriorCases && (
                <p className="text-sm text-blue-600">Existe conocimiento de otros antecedentes de índole similar.</p>
              )}
            </div>
          ))}

          {renderSection("TESTIGOS", (
            <div className="bg-white rounded-lg p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th>Nombre completo</th>
                    <th>Cargo</th>
                    <th>Departamento/Servicio</th>
                  </tr>
                </thead>
                <tbody>
                  {complaintData.witness?.witnesses?.map((witness, index) => (
                    <tr key={index} className="text-sm text-gray-900">
                      <td>{witness.fullName}</td>
                      <td>{witness.position}</td>
                      <td>{witness.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {renderSection("HECHOS DENUNCIADOS", (
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-900">{complaintData.reportedFacts?.description}</p>
            </div>
          ))}

          {renderSection("SITUACIONES QUE SE DENUNCIAN", (
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-blue-600">{complaintData.reportedSituations?.description}</p>
            </div>
          ))}

          {renderSection("MEDIDAS DE RESGUARDO", (
            <div className="bg-white rounded-lg p-4 space-y-4">
              {complaintData.safeguardMeasures?.measures?.map((measure, index) => (
                <div key={index}>
                  <p className="text-sm text-gray-500">Medida adoptada</p>
                  <p className="text-sm text-gray-900">{measure.type}</p>
                  <p className="text-sm text-gray-500">Nombre de quien la adopta</p>
                  <p className="text-sm text-gray-900">{measure.responsible}</p>
                  <p className="text-sm text-gray-500">Medida adoptada desde</p>
                  <p className="text-sm text-gray-900">{measure.date?.toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ))}

          {renderSection("RESUMEN DE LA DENUNCIA", (
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-900">{complaintData.reportedFacts?.description}</p>
            </div>
          ))}

          {renderSection("INVESTIGACIÓN SE LLEVARÁ A CABO POR", (
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-900">[Empleador seleccionado en el paso 1]</p>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="confirm"
                checked={defaultValues.confirmed}
                onCheckedChange={(checked) => handleConfirmChange(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-1">
                <label htmlFor="confirm" className="text-sm text-gray-900">
                  Declaro haber revisado íntegramente la información contenida en esta denuncia, confirmando su completitud y exactitud.
                </label>
                <p className="text-sm text-gray-500">
                  Una vez marcado este recuadro, la información ingresada se considerará definitiva y no podrá ser modificada.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Atrás
            </Button>
            <Button
              disabled={!defaultValues.confirmed}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleRequestSignature}
            >
              Solicitar firma de denunciante
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showSignatureModal} onOpenChange={setShowSignatureModal}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-[500px] gap-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Solicitar firma del denunciante
            </h2>

            <p className="text-sm text-gray-600">
              Se enviará un resumen de la denuncia al denunciante para que pueda ser revisada y firmada. El proceso pasará a estado <span className="font-medium">Esperando Firma</span> y el formulario no podrá volver a ser editado ¿Deseas continuar?
            </p>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex gap-2">
                <InfoIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  Después de que el denunciante revise y firme la denuncia, serás notificado y se solicitará tu firma para continuar con el proceso.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowSignatureModal(false)}
                className="bg-white hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmSignature}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sí, solicitar firma
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}; 