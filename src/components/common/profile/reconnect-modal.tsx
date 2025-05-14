"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReconnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    type: 'tributaria' | 'unica';
}

export function ReconnectModal({ isOpen, onClose, onConfirm, type }: ReconnectModalProps) {
    const connectionType = type === 'tributaria' ? 'clave tributaria' : 'clave única';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-red-50 border-red-100">
                <DialogTitle className="text-red-600">
                    Error de sincronización
                </DialogTitle>
                <DialogDescription className="text-red-600">
                    Ocurrió un problema al sincronizar tus datos con los de la Dirección del Trabajo. Vuelve a vincularlos para continuar.
                </DialogDescription>
                <div className="mt-4">
                    <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={onConfirm}
                    >
                        Volver a vincular
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}