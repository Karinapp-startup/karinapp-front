export interface NewComplaintProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ComplaintDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
} 