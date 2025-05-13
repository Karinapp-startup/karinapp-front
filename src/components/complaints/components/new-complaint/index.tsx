"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ComplaintForm } from "./components/ComplaintForm";
import { NewComplaintProps } from "@/interfaces/complaints/new-complaint";

export const NewComplaint = ({ isOpen, onClose }: NewComplaintProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <ComplaintForm />
      </DialogContent>
    </Dialog>
  );
}; 