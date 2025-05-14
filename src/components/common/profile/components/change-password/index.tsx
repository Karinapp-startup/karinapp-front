"use client";

import { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/common/dialog";
import { PasswordInput } from "@/components/shared/inputs/password-input";
import { FormError } from "@/components/shared/feedback/form-error";
import { PasswordRequirements } from "@/components/shared/validation/password-requirements";
import { useChangePassword } from "./hooks";
import type { ChangePasswordFormData } from "@/validators/schemas/password";

interface ChangePasswordDialogProps {
  trigger?: React.ReactNode;
}

export const ChangePasswordDialog = ({ trigger }: ChangePasswordDialogProps) => {
  const [open, setOpen] = useState(false);
  const { form, onSubmit } = useChangePassword();

  const handleSubmit = async (data: ChangePasswordFormData) => {
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
      <Button
        type="submit"
        form="change-password-form"
        className="bg-blue-600 hover:bg-blue-700 text-white h-9 ml-auto"
        disabled={form.formState.isSubmitting}
      >
        Guardar
      </Button>
    </div>
  );

  return (
    <Dialog
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title="Editar contraseña"
      description="Actualiza tu contraseña para ingresar a la plataforma. Recuerda que la contraseña debe tener 8 caracteres, una letra mayúscula, un número y un carácter especial."
      footer={dialogFooter}
      trigger={trigger}
      className="!fixed !right-0 !top-0 !bottom-0 !rounded-none !w-[400px] !max-w-none !translate-x-0 !translate-y-0"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          id="change-password-form"
          className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <label className="text-sm text-gray-600 block">
                    Contraseña actual
                  </label>
                  <FormControl>
                    <PasswordInput
                      error={!!form.formState.errors.currentPassword}
                      {...field}
                    />
                  </FormControl>
                  <FormError message={form.formState.errors.currentPassword?.message} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <label className="text-sm text-gray-600 block">
                    Contraseña nueva
                  </label>
                  <FormControl>
                    <PasswordInput
                      error={!!form.formState.errors.newPassword}
                      {...field}
                    />
                  </FormControl>
                  <FormError message={form.formState.errors.newPassword?.message} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <label className="text-sm text-gray-600 block">
                    Repite la contraseña nueva
                  </label>
                  <FormControl>
                    <PasswordInput
                      error={!!form.formState.errors.confirmPassword}
                      {...field}
                    />
                  </FormControl>
                  <FormError message={form.formState.errors.confirmPassword?.message} />
                </FormItem>
              )}
            />

            <PasswordRequirements password={form.watch("newPassword") || ""} />
          </div>
        </form>
      </Form>
    </Dialog>
  );
}; 