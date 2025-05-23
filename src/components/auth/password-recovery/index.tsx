"use client";

import { Card } from "@/components/ui/card";
import { PasswordRecoveryForm } from "./components/PasswordRecoveryForm";
import { NewPasswordForm } from "./components/NewPasswordForm";
import { PasswordRecoveryHeader } from "./components/PasswordRecoveryHeader";
import { usePasswordRecovery } from "./complements/hooks/usePasswordRecovery";

export function PasswordRecovery() {
  const {
    step,
    isLoading,
    handleSubmitEmail,
    handleConfirmNewPassword
  } = usePasswordRecovery();

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-[400px]">
        <Card className="shadow-xl rounded-2xl border-gray-100">
          <PasswordRecoveryHeader />
          
          {step.type === 'email' ? (
            <PasswordRecoveryForm
              isLoading={isLoading}
              onSubmit={handleSubmitEmail}
            />
          ) : (
            <NewPasswordForm
              email={step.email}
              onSubmit={handleConfirmNewPassword}
            />
          )}
        </Card>
      </div>
    </div>
  );
} 