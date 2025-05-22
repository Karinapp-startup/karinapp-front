"use client";

import { AuthProvider as OidcProvider } from "react-oidc-context";
import { COGNITO_AUTH_CONFIG } from "@/config/auth";
import { LoadingScreen } from "@/components/common/loading";
import { ErrorPage } from "@/components/common/error";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const oidcConfig = {
    ...COGNITO_AUTH_CONFIG,
    onSigninCallback: () => {
      window.history.replaceState({}, document.title, window.location.pathname);
    },
    loadingElement: <LoadingScreen />,
    errorElement: <ErrorPage code="401" title="No autorizado" />
  };

  return (
    <OidcProvider {...oidcConfig}>
      {children}
    </OidcProvider>
  );
} 