export interface ComplaintCardProps {
  id: string;
  status: "pending" | "in_progress" | "completed" | "rejected";
  date: string;
  title: string;
  description: string;
}

export interface ComplaintStatusBadgeProps {
  status: ComplaintCardProps["status"];
}

export interface ComplaintDetailsProps {
  complaintId: string;
} 