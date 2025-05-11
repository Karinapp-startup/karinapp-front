"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { SendInvitationDialog } from "./components/send-invitation";
import { ChangePasswordDialog } from "./components/change-password";

export const Profile = () => {
    return (
        <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/">
                    <Button variant="ghost" className="p-0">
                        <ChevronLeft className="h-4 w-4" />
                        Perfil de usuario
                    </Button>
                </Link>
            </div>

            <div className="space-y-6">
                {/* Información Personal */}
                <Card className="shadow-sm">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-lg font-semibold">Información personal</h2>
                            <ChangePasswordDialog
                                trigger={
                                    <Button variant="outline">
                                        Cambiar contraseña
                                    </Button>
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
                            <div>
                                <p className="text-sm text-gray-500">Nombre</p>
                                <p className="text-sm text-gray-700">Juan Pablo González</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">RUT</p>
                                <p className="text-sm text-gray-700">15.444.555-6</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Fecha de activación</p>
                                <p className="text-sm text-gray-700">30/03/2025</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Correo</p>
                                <p className="text-sm text-gray-700">jpgonzalezd@gmail.com</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Contraseña</p>
                                <p className="text-sm text-gray-700">************</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Empresa representada */}
                <Card className="shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Empresa representada</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
                            <div>
                                <p className="text-sm text-gray-500">Razón social</p>
                                <p className="text-sm text-gray-700">Empresa Ficticia SA</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">RUT</p>
                                <p className="text-sm text-gray-700">15.444.555-6</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Correo</p>
                                <p className="text-sm text-gray-700">juanpablo@empresa.com</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Representantes laborales */}
                <Card className="shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Representantes laborales electrónicos asociados</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Importante: Esta plataforma está diseñada exclusivamente para la gestión de denuncias realizadas por RLEs vinculados al sistema. Si tu RLE no se encuentra registrado, no podrás monitorear sus denuncias
                        </p>

                        <table className="w-full">
                            <thead>
                                <tr className="text-sm text-gray-500">
                                    <th className="text-left font-normal py-2">Nombre completo</th>
                                    <th className="text-left font-normal py-2">RUT</th>
                                    <th className="text-left font-normal py-2">Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Juan Pablo González", rut: "15.555.666-7", status: "Activo" },
                                    { name: "Juan Pablo López", rut: "15.555.666-7", status: "Inactivo" },
                                    { name: "Juan Pablo Díaz", rut: "15.555.666-7", status: "Activo" },
                                    { name: "Juan Pablo Fernández", rut: "15.555.666-7", status: "Inactivo" },
                                    { name: "Juan Pablo Torres", rut: "15.555.666-7", status: "Activo" },
                                ].map((person, idx) => (
                                    <tr key={idx} className="border-t border-gray-100">
                                        <td className="py-3 text-sm text-gray-700">{person.name}</td>
                                        <td className="text-sm text-gray-700">{person.rut}</td>
                                        <td>
                                            <Badge variant={person.status === "Activo" ? "default" : "secondary"}
                                                className={person.status === "Activo" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"}>
                                                {person.status}
                                            </Badge>
                                        </td>
                                        <td className="text-right">
                                            {person.status === "Inactivo" && (
                                                <SendInvitationDialog
                                                    trigger={
                                                        <Button variant="outline" size="sm" className="text-sm">
                                                            Enviar invitación
                                                        </Button>
                                                    }
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Estado de conexión */}
                <Card className="shadow-sm">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">Estado de conexión a la Dirección del Trabajo (con clave tributaria)</h2>
                                <p className="text-sm text-gray-500">Última consulta a las 12:30 del lunes 12 de mayo</p>
                            </div>
                            <Badge variant="default" className="bg-green-50 text-green-600">
                                Activa
                            </Badge>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}; 