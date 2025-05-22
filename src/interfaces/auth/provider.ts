import type { ReactNode } from 'react';
import type { WebStorageStateStore } from 'oidc-client-ts';

export interface OidcConfig {
    authority: string;
    client_id: string;
    redirect_uri?: string;
    response_type: string;
    scope: string;
    onSigninCallback?: () => void;
    loadingElement?: ReactNode;
    errorElement?: ReactNode;
    userStore?: WebStorageStateStore;
}

export interface AuthProviderProps {
    children: ReactNode;
} 