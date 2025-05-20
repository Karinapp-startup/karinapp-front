"use client";

import { Button } from "@/components/ui/button";
import { Edit2, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComplaintFormData } from "@/interfaces/complaints/forms/complaint";
import { PersonData } from "@/interfaces/complaints/forms/victim";
import { AccusedPerson } from "@/interfaces/complaints/forms/accused";
import { RelationshipType, relationshipOptions, RelationshipOption } from "@/interfaces/complaints/forms/relationship";
import { cn } from "@/lib/utils";
import { SummaryFormData } from '@/interfaces/complaints/forms/summary';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ReviewFormProps {
  complaintData: ComplaintFormData;
  onBack: () => void;
  onSubmit: () => void;
}

export const ReviewForm = ({ complaintData, onBack, onSubmit }: ReviewFormProps) => {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleEdit = (step: number) => {
    router.push(`/complaints/new?step=${step}`);
  };

  const handleRequestSignature = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSignature = () => {
    router.push('/complaints/sign-complaint');
  };

  // Datos de la víctima
  const victimData = complaintData.victim?.victim;

  // Datos del denunciante si es diferente a la víctima
  const complainantData = !complaintData.victim?.isComplainant ? complaintData.victim?.complainant : null;

  // Lista de acusados
  const accusedList = complaintData.accused?.accusedList || [];

  const getRelationshipDescription = (type: RelationshipType | undefined): string => {
    if (!type) return '';
    const option = relationshipOptions.find((opt: RelationshipOption) => opt.value === type);
    return option?.description || '';
  };

  // Función para validar el formulario completo
  const isFormValid = (): boolean => {
    const summary = complaintData.summary;
    if (!summary) return false;

    // Validar resumen (mínimo 900 caracteres)
    const summaryValid = summary.summary.length >= 900;

    // Validar que se haya seleccionado quién llevará la investigación
    const investigationTypeValid = Boolean(summary.investigationType);

    // Validar que se haya seleccionado fecha y hora
    const dateValid = Boolean(summary.actDate);
    const timeValid = Boolean(summary.actTime);

    return summaryValid && investigationTypeValid && dateValid && timeValid;
  };

  // Función para mostrar el estado del formulario
  const getFormStatus = (): string => {
    const summary = complaintData.summary;
    if (!summary?.summary) {
      return 'Debe ingresar un resumen de la denuncia';
    }
    if (summary.summary.length < 900) {
      return 'El resumen debe tener al menos 900 caracteres';
    }
    if (!summary.investigationType) {
      return 'Debe seleccionar quién llevará a cabo la investigación';
    }
    if (!summary.actDate || !summary.actTime) {
      return 'Debe seleccionar fecha y hora';
    }
    return '';
  };

  // Función auxiliar para verificar si hay situaciones reportadas
  const hasSituations = () => {
    return complaintData.reportedSituations?.situations &&
      complaintData.reportedSituations.situations.length > 0;
  };

  return (
    <>
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold">Revisión de la denuncia</h1>

        {/* Empleador */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">SELECCIÓN DEL EMPLEADOR</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(1)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Empleador</p>
              <p className="text-sm text-gray-600">{complaintData.employer?.companyName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Fecha de ingreso de la denuncia</p>
              <p className="text-sm text-gray-600">
                {complaintData.employer?.date?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {/* Víctima */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">DATOS DE LA VÍCTIMA</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(2)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {victimData && Object.entries(victimData).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm font-medium">{getFieldLabel(key)}</p>
                <p className="text-sm text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Denunciados */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">DATOS DE EL O LOS DENUNCIADOS</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(3)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          {accusedList.map((person: AccusedPerson, index: number) => (
            <div key={index} className="mb-4">
              <p className="text-sm font-medium mb-2">Denunciado {index + 1}:</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Nombres</p>
                  <p className="text-sm text-gray-600">{person.firstName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Apellidos</p>
                  <p className="text-sm text-gray-600">{person.lastName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">RUT</p>
                  <p className="text-sm text-gray-600">{person.rut}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Correo</p>
                  <p className="text-sm text-gray-600">{person.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Cargo</p>
                  <p className="text-sm text-gray-600">{person.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Departamento</p>
                  <p className="text-sm text-gray-600">{person.department}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Relación */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">SOBRE LA RELACIÓN ENTRE VÍCTIMA Y DENUNCIADO/A</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(4)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
            {getRelationshipDescription(complaintData.relationship?.relationship.type)}
          </div>
        </section>

        {/* Testigos */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">TESTIGOS</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(5)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="text-left font-medium">Nombre completo</th>
                  <th className="text-left font-medium">Cargo</th>
                  <th className="text-left font-medium">Departamento/Servicio</th>
                </tr>
              </thead>
              <tbody>
                {complaintData.witness?.witnesses.map((witness, index) => (
                  <tr key={index} className="text-sm text-gray-600">
                    <td>{witness.fullName}</td>
                    <td>{witness.position}</td>
                    <td>{witness.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hechos Denunciados */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">HECHOS DENUNCIADOS</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(6)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {complaintData.reportedFacts?.description}
          </p>
        </section>

        {/* Situaciones que se Denuncian */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">SITUACIONES QUE SE DENUNCIAN</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(7)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <div className="space-y-2">
            {hasSituations() ? (
              complaintData.reportedSituations!.situations.map((situation, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                  {situation}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No se han registrado situaciones</p>
            )}
          </div>
        </section>

        {/* Medidas de Resguardo */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">MEDIDAS DE RESGUARDO</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(8)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <div className="space-y-4">
            {complaintData.safeguardMeasures?.measures.map((measure, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">Medida adoptada:</div>
                <div className="text-gray-600">{measure.type}</div>
                <div className="font-medium mt-2">Nombre de quien la adopta:</div>
                <div className="text-gray-600">{measure.responsible}</div>
                <div className="font-medium mt-2">Medida adoptada desde:</div>
                <div className="text-gray-600">
                  {measure.date?.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resumen de la Denuncia */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">RESUMEN DE LA DENUNCIA</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(9)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {complaintData.summary?.summary}
          </p>
        </section>

        {/* Investigación se llevará a cabo por */}
        <section className="bg-white rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-500">INVESTIGACIÓN SE LLEVARÁ A CABO POR</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(9)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            {complaintData.summary?.investigationType === 'employer'
              ? '[Empleador seleccionado en el paso 1]'
              : 'Dirección del trabajo'}
          </p>
        </section>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-4 py-2"
          >
            Atrás
          </Button>
          <Button
            onClick={handleRequestSignature}
            disabled={!isFormValid()}
            className={cn(
              "px-4 py-2",
              isFormValid()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            )}
            title={!isFormValid() ? getFormStatus() : ''}
          >
            Solicitar firma de denunciante
          </Button>
        </div>

        {/* Mostrar mensaje de error si el formulario no es válido */}
        {!isFormValid() && (
          <p className="text-sm text-red-500 text-center mt-2">
            {getFormStatus()}
          </p>
        )}
      </div>

      {/* Modal de Confirmación */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar firma del denunciante</DialogTitle>
            <DialogDescription className="space-y-3">
              <p>
                Se enviará un resumen de la denuncia al denunciante para que pueda ser revisada y firmada.
                El proceso pasará a estado <span className="font-medium">Esperando Firma</span> y el formulario
                no podrá volver a ser editado ¿Deseas continuar?
              </p>
              <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Después de que el denunciante revise y firme la denuncia, serás notificado y se solicitará
                  tu firma para continuar con el proceso.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSignature}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sí, solicitar firma
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Función auxiliar para obtener las etiquetas de los campos
const getFieldLabel = (key: string): string => {
  const labels: Record<string, string> = {
    firstName: 'Nombres',
    lastName: 'Apellidos',
    rut: 'RUT',
    email: 'Correo',
    position: 'Cargo',
    department: 'Departamento'
  };
  return labels[key] || key;
}; 