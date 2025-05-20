export interface SendInvitationDialogProps {
    trigger?: React.ReactNode;
}

export interface ChangePasswordDialogProps {
  trigger?: React.ReactNode;
}

export interface ProfileData {
  name: string;
  rut: string;
  activationDate: string;
  email: string;
}

export interface CompanyData {
  name: string;
  rut: string;
  email: string;
}

export interface LaborRepresentative {
  name: string;
  rut: string;
  status: "Activo" | "Inactivo";
}

export interface ConnectionStatus {
  lastCheck: string;
  status: "Activa" | "Inactiva";
} 