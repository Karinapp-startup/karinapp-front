"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
    trigger?: ReactNode;
    className?: string;
}

export function Dialog({ 
    open, 
    onClose, 
    onOpen,
    title, 
    description, 
    children, 
    footer,
    trigger,
    className 
}: DialogProps) {
    return (
        <>
            {trigger && (
                <div onClick={onOpen}>
                    {trigger}
                </div>
            )}
            
            {open && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div 
                        className={cn(
                            "bg-white w-full max-w-[480px] rounded-xl shadow-lg relative animate-in fade-in zoom-in duration-200",
                            className
                        )}
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Cerrar</span>
                        </button>

                        <div className="px-4 pt-4">
                            <h2 className="text-lg font-semibold text-gray-900 text-left">{title}</h2>
                            {description && (
                                <p className="text-sm text-gray-600 mt-2 text-left">
                                    {description}
                                </p>
                            )}
                        </div>

                        <div className="px-4 mt-4">{children}</div>

                        {footer && (
                            <div className="px-4 py-4 border-t border-gray-100 mt-4">
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
} 