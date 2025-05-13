export interface ComplaintStatus {
  value: "pending" | "in_progress" | "completed" | "rejected";
  label: string;
  color: string;
}

export interface StatusFilterProps {
  value: ComplaintStatus["value"];
  onChange: (value: ComplaintStatus["value"]) => void;
} 