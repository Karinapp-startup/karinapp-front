"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SignaturePad from 'react-signature-canvas';
import styles from './SignaturePad.module.css';

interface SignatureFormProps { }

export function SignatureForm({ }: SignatureFormProps) {
  const signaturePadRef = useRef<SignaturePad>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showModificationsModal, setShowModificationsModal] = useState(false);
  const router = useRouter();

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSendDocument = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      setShowSendModal(true);
    } else {
      toast.error("Por favor, dibuja tu firma antes de continuar");
    }
  };

  const handleRequestModifications = () => {
    setShowModificationsModal(true);
  };

  const handleConfirmSend = () => {
    setShowSendModal(false);
    toast.success("Documento enviado exitosamente", {
      description: "El documento ha sido enviado al RLE.",
      duration: 5000,
    });
    setTimeout(() => {
      router.push('/complaints');
    }, 2000);
  };

  const handleConfirmModifications = () => {
    setShowModificationsModal(false);
    router.push('/complaints');
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Ingresa tus datos a continuación</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input placeholder="ej: Juan Pablo" />
            </div>
            <div className="space-y-2">
              <Label>RUT</Label>
              <Input placeholder="ej: Juan Pablo" />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label>Firma de denunciante</Label>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una tipografía" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arial">Arial</SelectItem>
                  <SelectItem value="times">Times New Roman</SelectItem>
                  <SelectItem value="calibri">Calibri</SelectItem>
                </SelectContent>
              </Select>

              <div className={styles.signaturePadContainer}>
                <SignaturePad
                  ref={signaturePadRef}
                  canvasProps={{
                    className: styles.signaturePad,
                    width: 500,
                    height: 200
                  }}
                  penColor="black"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  Dibuja o escribe tu firma aquí
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                  className="absolute top-2 right-2 bg-white"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handleRequestModifications}
              className="text-gray-700"
            >
              Solicitar modificaciones
            </Button>
            <Button
              onClick={handleSendDocument}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Enviar documento
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-6">Revisión de la denuncia</h2>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">SELECCIÓN DEL EMPLEADOR</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Empleador</span>
                    <p className="text-sm text-gray-900">Nombre Apellido Empleador</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Fecha de ingreso de la denuncia</span>
                    <p className="text-sm text-gray-900">12/12/2025</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">DATOS DE LA VÍCTIMA</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Nombres</span>
                    <p className="text-sm text-gray-900">Juan Pablo</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Apellidos</span>
                    <p className="text-sm text-gray-900">López González</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">RUT</span>
                    <p className="text-sm text-gray-900">18.456.789-0</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Correo</span>
                    <p className="text-sm text-gray-900">jplopezg@email.com</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Cargo</span>
                    <p className="text-sm text-gray-900">Desarrollador</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Departamento</span>
                    <p className="text-sm text-gray-900">Departamento Informática</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">DATOS DE EL O LOS DENUNCIADOS</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-6">
                  <div>
                    <span className="text-sm text-gray-500">Denunciado 1</span>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <span className="text-sm text-gray-500">Nombres</span>
                        <p className="text-sm text-gray-900">Juan Pablo</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Apellidos</span>
                        <p className="text-sm text-gray-900">López González</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">RUT</span>
                        <p className="text-sm text-gray-900">18.456.789-0</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Correo</span>
                        <p className="text-sm text-gray-900">jplopezg@email.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">SOBRE LA RELACIÓN ENTRE VÍCTIMA Y DENUNCIADORA</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-2">
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                    Existe una relación asimétrica en que la víctima tiene dependencia directa o indirecta de alta importancia
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">SOBRE LAS PRESUNTAS SITUACIONES DENUNCIADAS</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-2">
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                    Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                    Existe conocimiento de otros antecedentes de índole similar
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">TESTIGOS</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-2">Nombre completo</th>
                        <th className="pb-2">Cargo</th>
                        <th className="pb-2">Departamento/Servicio</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-900">
                      <tr>
                        <td className="py-2">Juan Pablo González</td>
                        <td className="py-2">Desarrollador</td>
                        <td className="py-2">Informática</td>
                      </tr>
                      <tr>
                        <td className="py-2">Juan Pablo López</td>
                        <td className="py-2">Desarrollador</td>
                        <td className="py-2">Informática</td>
                      </tr>
                      <tr>
                        <td className="py-2">Juan Pablo Díaz</td>
                        <td className="py-2">Desarrollador</td>
                        <td className="py-2">Informática</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">HECHOS DENUNCIADOS</h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-900">
                  Acá van todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">SITUACIONES QUE SE DENUNCIAN</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                  Acoso laboral - Requerimientos sexuales molestos y no consentidos que afectan la situación o condiciones laborales de quien los recibe
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">MEDIDAS DE RESGUARDO</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Medida adoptada</span>
                    <p className="text-sm text-gray-900">Separación de espacios de trabajo</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Nombre de quien la adopta</span>
                    <p className="text-sm text-gray-900">Juan Pablo López</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Medida adoptada desde</span>
                    <p className="text-sm text-gray-900">12/12/2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">RESUMEN DE LA DENUNCIA</h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-900">
                  Acá van todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">INVESTIGACIÓN SE LLEVARÁ A CABO POR</h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-900">[Empleador seleccionado en el paso 1]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Ir arriba y firmar
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Firma de Representante Laboral</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input placeholder="ej: Juan Pablo" />
            </div>
            <div className="space-y-2">
              <Label>RUT</Label>
              <Input placeholder="ej: Juan Pablo" />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label>Firma de denunciante</Label>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una tipografía" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arial">Arial</SelectItem>
                  <SelectItem value="times">Times New Roman</SelectItem>
                  <SelectItem value="calibri">Calibri</SelectItem>
                </SelectContent>
              </Select>

              <div className={styles.signaturePadContainer}>
                <SignaturePad
                  ref={signaturePadRef}
                  canvasProps={{
                    className: styles.signaturePad,
                    width: 500,
                    height: 200
                  }}
                  penColor="black"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  Dibuja o escribe tu firma aquí
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                  className="absolute top-2 right-2 bg-white"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handleRequestModifications}
              className="text-gray-700"
            >
              Solicitar modificaciones
            </Button>
            <Button
              onClick={handleSendDocument}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Enviar documento
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-6">Revisión de la denuncia</h2>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">SELECCIÓN DEL EMPLEADOR</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Empleador</span>
                    <p className="text-sm text-gray-900">Nombre Apellido Empleador</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Fecha de ingreso de la denuncia</span>
                    <p className="text-sm text-gray-900">12/12/2025</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">DATOS DE LA VÍCTIMA</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Nombres</span>
                    <p className="text-sm text-gray-900">Juan Pablo</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Apellidos</span>
                    <p className="text-sm text-gray-900">López González</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">RUT</span>
                    <p className="text-sm text-gray-900">18.456.789-0</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Correo</span>
                    <p className="text-sm text-gray-900">jplopezg@email.com</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Cargo</span>
                    <p className="text-sm text-gray-900">Desarrollador</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Departamento</span>
                    <p className="text-sm text-gray-900">Departamento Informática</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">DATOS DE EL O LOS DENUNCIADOS</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-6">
                  <div>
                    <span className="text-sm text-gray-500">Denunciado 1</span>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <span className="text-sm text-gray-500">Nombres</span>
                        <p className="text-sm text-gray-900">Juan Pablo</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Apellidos</span>
                        <p className="text-sm text-gray-900">López González</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">RUT</span>
                        <p className="text-sm text-gray-900">18.456.789-0</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Correo</span>
                        <p className="text-sm text-gray-900">jplopezg@email.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">SOBRE LA RELACIÓN ENTRE VÍCTIMA Y DENUNCIADORA</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-2">
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                    Existe una relación asimétrica en que la víctima tiene dependencia directa o indirecta de alta importancia
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">SOBRE LAS PRESUNTAS SITUACIONES DENUNCIADAS</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-2">
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                    Existe evidencia de lo denunciado (correos electrónicos, fotos, etc.)
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                    Existe conocimiento de otros antecedentes de índole similar
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">TESTIGOS</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-2">Nombre completo</th>
                        <th className="pb-2">Cargo</th>
                        <th className="pb-2">Departamento/Servicio</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-900">
                      <tr>
                        <td className="py-2">Juan Pablo González</td>
                        <td className="py-2">Desarrollador</td>
                        <td className="py-2">Informática</td>
                      </tr>
                      <tr>
                        <td className="py-2">Juan Pablo López</td>
                        <td className="py-2">Desarrollador</td>
                        <td className="py-2">Informática</td>
                      </tr>
                      <tr>
                        <td className="py-2">Juan Pablo Díaz</td>
                        <td className="py-2">Desarrollador</td>
                        <td className="py-2">Informática</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">HECHOS DENUNCIADOS</h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-900">
                  Acá van todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres. Acá van todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">SITUACIONES QUE SE DENUNCIAN</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
                  Acoso laboral - Requerimientos sexuales molestos y no consentidos que afectan la situación o condiciones laborales de quien los recibe
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">MEDIDAS DE RESGUARDO</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Medida adoptada</span>
                    <p className="text-sm text-gray-900">Separación de espacios de trabajo</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Nombre de quien la adopta</span>
                    <p className="text-sm text-gray-900">Juan Pablo López</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Medida adoptada desde</span>
                    <p className="text-sm text-gray-900">12/12/2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">RESUMEN DE LA DENUNCIA</h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-900">
                  Acá van todos los acontecimientos que denuncia ala víctima en un párrafo muy detallado y extenso. No debería tener un límite de caracteres.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">INVESTIGACIÓN SE LLEVARÁ A CABO POR</h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-900">[Empleador seleccionado en el paso 1]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Ir arriba y firmar
          </Button>
        </div>
      </div>

      <Dialog open={showSendModal} onOpenChange={setShowSendModal}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-[500px] gap-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Enviar documento
            </h2>

            <p className="text-sm text-gray-600">
              Al enviar esta denuncia, confirmas que la información entregada es veraz, fue proporcionada voluntariamente y estás de acuerdo con los hechos expuestos.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowSendModal(false)}
                className="bg-white hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmSend}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Enviar documento
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showModificationsModal} onOpenChange={setShowModificationsModal}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-[500px]">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Solicitar modificaciones
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600">
                Si deseas solicitar una modificación a esta denuncia, puedes indicarlo a continuación.
                <span className="font-medium"> Recuerda que solo se permite una oportunidad para realizar cambios una vez enviada.</span>
              </p>

              <div className="space-y-2">
                <textarea
                  className="w-full min-h-[120px] p-3 border rounded-lg resize-none text-sm"
                  placeholder="Escribe acá el o los motivos para cancelar el proceso."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowModificationsModal(false)}
                  className="bg-white hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmModifications}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Enviar solicitud
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 