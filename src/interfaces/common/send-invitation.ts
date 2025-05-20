export interface SendInvitationDialogProps {
  trigger: React.ReactNode;
  type?: 'rle' | 'empresa';
  recipientData?: {
    name: string;
    rut: string;
  };
} 