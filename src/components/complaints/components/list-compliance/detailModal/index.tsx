"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComplaintType } from "../complements/types";
import { Edit2 } from "lucide-react";
import {
  AlertCircle,
  Printer,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DetailModalProps {
  complaint: ComplaintType;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailModal({ complaint, isOpen, onClose }: DetailModalProps) {
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        // handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80rem] bg-white p-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b p-6 pb-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Detalles de denuncia
                </DialogTitle>
                <Badge
                  variant="outline"
                  className="bg-gray-100 text-gray-700 border-gray-200 text-base px-4 py-1"
                >
                  #F1239
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 px-4 py-1"
              >
                Etapa {complaint.step}/9
              </Badge>
              <Badge
                className={cn(
                  "px-4 py-1",
                  complaint.priority === 'high' && "bg-red-100 text-red-700",
                  complaint.priority === 'medium' && "bg-yellow-100 text-yellow-700",
                  complaint.priority === 'low' && "bg-green-100 text-green-700"
                )}
              >
                Prioridad {complaint.priority}
              </Badge>
            </div>
          </div>

          {/* Alert para denuncias prioritarias */}
          {complaint.priority === 'high' && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Denuncia de alta prioridad</AlertTitle>
              <AlertDescription>
                Esta denuncia requiere atención inmediata según el protocolo.
              </AlertDescription>
            </Alert>
          )}
        </DialogHeader>

        {/* Contenedor con scroll */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="space-y-6 py-4">
            {/* Sección Empleador */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Selección del empleador
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-white p-2">
                <div>
                  <label className="text-sm text-gray-500">Empleador</label>
                  <p className="text-sm font-medium">{complaint.companyName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Fecha de ingreso de la denuncia</label>
                  <p className="text-sm font-medium">{complaint.entryDate}</p>
                </div>
              </div>
            </div>

            {/* Sección Datos de la Víctima */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Datos de la víctima
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-white p-2">
                <div>
                  <label className="text-sm text-gray-500">Nombres</label>
                  <p className="text-sm font-medium">{complaint.victimName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Apellidos</label>
                  <p className="text-sm font-medium">López González</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">RUT</label>
                  <p className="text-sm font-medium">18.456.789-0</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Correo</label>
                  <p className="text-sm font-medium">jlopezg@email.com</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Cargo</label>
                  <p className="text-sm font-medium">Desarrollador</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Departamento</label>
                  <p className="text-sm font-medium">Departamento Informática</p>
                </div>
              </div>
            </div>

            {/* Nueva Sección: Datos del Denunciante */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Datos del denunciante
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-white p-2">
                <div>
                  <label className="text-sm text-gray-500">Nombres</label>
                  <p className="text-sm font-medium">Juan Pablo</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Apellidos</label>
                  <p className="text-sm font-medium">López González</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">RUT</label>
                  <p className="text-sm font-medium">18.456.789-0</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Correo</label>
                  <p className="text-sm font-medium">jlopezg@email.com</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Cargo</label>
                  <p className="text-sm font-medium">Desarrollador</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Departamento</label>
                  <p className="text-sm font-medium">Departamento Informática</p>
                </div>
              </div>
            </div>

            {/* Nueva Sección: Datos de el o los Denunciados */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Datos de el o los denunciados
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>

              {/* Denunciado 1 */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Denunciado 1:</p>
                <div className="grid grid-cols-2 gap-4 bg-white p-2">
                  <div>
                    <label className="text-sm text-gray-500">Nombres</label>
                    <p className="text-sm font-medium">Juan Pablo</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Apellidos</label>
                    <p className="text-sm font-medium">López González</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">RUT</label>
                    <p className="text-sm font-medium">18.456.789-0</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Correo</label>
                    <p className="text-sm font-medium">jlopezg@email.com</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Cargo</label>
                    <p className="text-sm font-medium">Desarrollador</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Departamento</label>
                    <p className="text-sm font-medium">Departamento Informática</p>
                  </div>
                </div>
              </div>

              {/* Denunciado 2 */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Denunciado 2:</p>
                <div className="grid grid-cols-2 gap-4 bg-white p-2">
                  <div>
                    <label className="text-sm text-gray-500">Nombres</label>
                    <p className="text-sm font-medium">Juan Pablo</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Apellidos</label>
                    <p className="text-sm font-medium">López González</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">RUT</label>
                    <p className="text-sm font-medium">18.456.789-0</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Correo</label>
                    <p className="text-sm font-medium">jlopezg@email.com</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Cargo</label>
                    <p className="text-sm font-medium">Desarrollador</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Departamento</label>
                    <p className="text-sm font-medium">Departamento Informática</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección Relación */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Sobre la relación entre víctima y denunciado/a
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  Existe una relación <span className="font-medium">asimétrica</span> en que la víctima tiene{" "}
                  <span className="font-medium">dependencia directa o indirecta</span> de el/la denunciado/a.
                </p>
              </div>
            </div>

            {/* Nueva Sección: Testigos */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Testigos
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="overflow-hidden border rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3 text-sm text-gray-500">Nombre completo</th>
                      <th className="text-left p-3 text-sm text-gray-500">Cargo</th>
                      <th className="text-left p-3 text-sm text-gray-500">Departamento/Servicio</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y">
                    <tr>
                      <td className="p-3 text-sm">Juan Pablo González</td>
                      <td className="p-3 text-sm">Desarrollador</td>
                      <td className="p-3 text-sm">Informática</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-sm">Juan Pablo López</td>
                      <td className="p-3 text-sm">Desarrollador</td>
                      <td className="p-3 text-sm">Informática</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-sm">Juan Pablo Díaz</td>
                      <td className="p-3 text-sm">Desarrollador</td>
                      <td className="p-3 text-sm">Informática</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Nueva Sección: Hechos Denunciados */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Hechos denunciados
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="bg-white p-4 border rounded-lg">
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  Acá van todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso.
                  No debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ala
                  víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres. Acá van
                  todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso. No
                  debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ala víctima
                  en un párrafo muy detallado y extenso. No debería tener un límite de caracteres.
                </p>
              </div>
            </div>

            {/* Nueva Sección: Situaciones que se denuncian */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Situaciones que se denuncian
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">Acoso laboral</p>
                <p className="text-sm text-gray-600">
                  Requerimientos sexuales indebidos y no consentidos que afectan la situación o condiciones laborales de quien los recibe.
                </p>
              </div>
            </div>

            {/* Nueva Sección: Medidas de resguardo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Medidas de resguardo
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Medida adoptada</label>
                    <p className="text-sm font-medium">Separación de espacios de trabajo</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Nombre de quien la adopta</label>
                    <p className="text-sm font-medium">Juan Pablo López</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Medida adoptada desde</label>
                  <p className="text-sm font-medium">12/12/2025</p>
                </div>
              </div>
            </div>

            {/* Nueva Sección: Resumen de la denuncia */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Resumen de la denuncia
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="bg-white p-4 border rounded-lg">
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  Acá van todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso.
                  No debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ala
                  víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres. Acá van
                  todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso. No
                  debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ala víctima
                  en un párrafo muy detallado y extenso. No debería tener un límite de caracteres.
                </p>
              </div>
            </div>

            {/* Nueva Sección: Investigación */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                  Investigación se llevará a cabo por
                </h3>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">[Empleador seleccionado en el paso 1]</p>
                <p className="text-sm text-gray-600">[Empleador seleccionado en el paso 1]</p>
              </div>
            </div>

            {/* Sección Preguntas */}
            <div className="space-y-4">
              <h3 className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                Sobre las preguntas/situaciones denunciadas
              </h3>
              <div className="space-y-2">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm">Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm">Existe conocimiento de otros antecedentes de índole similar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo */}
        <div className="border-t p-6 bg-white">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Última actualización: {complaint.lastUpdate?.date}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-200 hover:bg-gray-50"
              >
                Cerrar
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>

        {/* Botón flotante de impresión */}
        <div className="fixed bottom-24 right-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full shadow-lg"
                  onClick={() => window.print()}
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Imprimir denuncia</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
} 