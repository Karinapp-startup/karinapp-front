"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  onBack: () => void;
}

export function ReviewForm({ formData, updateFormData, onBack }: ReviewFormProps) {
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Revisión de la denuncia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sección Empleador */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase">Selección del empleador</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Editar
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Empleador</span>
                  <p className="text-sm text-gray-900 mt-1">{formData.employer || 'Nombre Apellido Empleador'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Fecha de ingreso de la denuncia</span>
                  <p className="text-sm text-gray-900 mt-1">{formData.date ? format(formData.date, "dd/MM/yyyy") : '12/12/2025'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Datos de la víctima */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">DATOS DE LA VÍCTIMA</h3>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                Editar
              </Button>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Nombres</span>
                  <p className="text-sm text-gray-900">{formData.victimFirstName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Apellidos</span>
                  <p className="text-sm text-gray-900">{formData.victimLastName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">RUT</span>
                  <p className="text-sm text-gray-900">{formData.victimRut}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Correo</span>
                  <p className="text-sm text-gray-900">{formData.victimEmail}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Cargo</span>
                  <p className="text-sm text-gray-900">{formData.victimPosition}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Departamento/Área</span>
                  <p className="text-sm text-gray-900">{formData.victimDepartment}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Relación entre víctima y denunciado */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase">Sobre la relación entre víctima y denunciado/a</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Editar
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-sm text-gray-900">
                  Existe una relación <span className="font-medium">asimétrica</span> en que la víctima tiene <span className="font-medium">dependencia directa o indirecta</span> de el/la denunciado/a.
                </p>
              </div>
            </div>
          </section>

          {/* Situaciones denunciadas */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase">Sobre las presuntas situaciones denunciadas</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Editar
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="space-y-2">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-sm text-gray-900">
                    Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <p className="text-sm text-gray-900">
                    Existe conocimiento de otros antecedentes de índole similar.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testigos */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase">Testigos</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Editar
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500">
                    <th className="pb-2">Nombre completo</th>
                    <th className="pb-2">Cargo</th>
                    <th className="pb-2">Departamento/Servicio</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-gray-900">Juan Pablo González</td>
                    <td className="py-2 text-gray-900">Desarrollador</td>
                    <td className="py-2 text-gray-900">Informática</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-gray-900">Juan Pablo López</td>
                    <td className="py-2 text-gray-900">Desarrollador</td>
                    <td className="py-2 text-gray-900">Informática</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-gray-900">Juan Pablo Díaz</td>
                    <td className="py-2 text-gray-900">Desarrollador</td>
                    <td className="py-2 text-gray-900">Informática</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Situaciones que se denuncian */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase">Situaciones que se denuncian</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Editar
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Acoso laboral</span>
                  <br />
                  Requerimientos sexuales indebidos y no consentidos que afectan la situación o condiciones laborales de quien los recibe.
                </p>
              </div>
            </div>
          </section>

          {/* Medidas de resguardo */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase">Medidas de resguardo</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Editar
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Medida adoptada</span>
                    <p className="text-sm text-gray-900 mt-1">Separación de espacios de trabajo</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Nombre de quien la adopta</span>
                    <p className="text-sm text-gray-900 mt-1">Juan Pablo López</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Medida adoptada desde</span>
                    <p className="text-sm text-gray-900 mt-1">12/12/2025</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Resumen de la denuncia */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase">Resumen de la denuncia</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Editar
              </Button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-900">
                Acá van todos los acontecimientos que denuncia ela víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ela víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ela víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ela víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres.
              </p>
            </div>
          </section>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="confirm"
                checked={formData.confirmed}
                onCheckedChange={(checked) => updateFormData({ confirmed: checked })}
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
              disabled={!formData.confirmed}
            >
              Solicitar firma de denunciante
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 