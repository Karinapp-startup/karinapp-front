"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { SendInvitationDialogProps } from "@/interfaces/common/send-invitation";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useEmailValidation } from "./hooks";

export function SendInvitationDialog({
  trigger,
  type = 'rle',
  recipientData
}: SendInvitationDialogProps) {
  const [open, setOpen] = useState(false);
  const { email, setEmail, isValid, error, resetField } = useEmailValidation(type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    setOpen(false);
    resetField();

    toast.success(
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>Correo de invitación enviado correctamente a {email}</span>
      </div>
    );
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetField();
      }}
    >
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent className="p-6 bg-white rounded-xl">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Enviar invitación</h2>

          <p className="text-sm text-gray-600">
            {type === 'rle'
              ? 'Al enviar una invitación, el Representante Laboral Electrónico recibirá un correo para que pueda registrarse en la plataforma.'
              : 'Al enviar una invitación, el empleador recibirá un correo para que pueda registrarse en la plataforma.'}
          </p>

          <div>
            <label className="text-sm text-gray-600 block">
              {type === 'rle' ? 'Correo del RLE' : 'Correo del empleador'}
            </label>
            <Input
              type="email"
              placeholder="ej. jplopezg@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>

          <div className="flex justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                resetField();
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#0066FF] text-white hover:bg-blue-600"
              disabled={!isValid}
            >
              Enviar invitación
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 