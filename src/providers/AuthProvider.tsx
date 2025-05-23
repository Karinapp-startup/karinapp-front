"use client";

import { AuthProvider as OidcProvider } from "react-oidc-context";
import { COGNITO_CONFIG } from "@/config/auth";
import { LoadingScreen } from "@/components/common/loading";
import { ErrorPage } from "@/components/common/error";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const oidcConfig = {
    authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY,
    client_id: COGNITO_CONFIG.ClientId,
    redirect_uri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
    response_type: 'code',
    scope: 'openid profile email',
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