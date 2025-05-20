export interface DialogProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
} 