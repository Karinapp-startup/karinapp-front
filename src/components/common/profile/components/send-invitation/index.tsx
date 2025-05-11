"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/common/dialog";
import { FormError } from "@/components/shared/feedback/form-error";
import { SendInvitationDialogProps } from "@/interfaces/common/profile";
import { useSendInvitation } from "./hooks";

export const SendInvitationDialog = ({ trigger }: SendInvitationDialogProps) => {
    const [open, setOpen] = useState(false);
    const { form, onSubmit } = useSendInvitation();

    const handleSubmit = async (data) => {
        const success = await onSubmit(data);
        if (success) {
            setOpen(false);
            form.reset();
        }
    };

    const dialogFooter = (
        <div className="w-full flex items-center">
            <Button
                type="button"
                variant="ghost"
                onClick={() => {
                    setOpen(false);
                    form.reset();
                }}
                className="text-gray-600 h-9"
            >
                Cancelar
            </Button>
            <span className="flex-1" />
            <Button
                type="submit"
                form="invitation-form"
                className="bg-blue-600 hover:bg-blue-700 text-white h-9"
                disabled={form.formState.isSubmitting}
            >
                Enviar invitación
            </Button>
        </div>
    );

    const defaultTrigger = (
        <Button variant="outline" size="sm">
            Enviar invitación
        </Button>
    );

    return (
        <Dialog
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            title="Enviar invitación"
            description="Al enviar una invitación, el Representante Laboral Electrónico recibirá un correo para que pueda registrarse en la plataforma."
            footer={dialogFooter}
            trigger={trigger || defaultTrigger}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} id="invitation-form">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <label className="text-sm text-gray-600 block mb-1.5 text-left pl-0">
                                    Correo del RLE
                                </label>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="ej. gonzalez@email.com"
                                        className={cn(
                                            "w-full h-10 text-sm",
                                            form.formState.errors.email
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50"
                                                : "border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormError message={form.formState.errors.email?.message} />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </Dialog>
    );
}; 