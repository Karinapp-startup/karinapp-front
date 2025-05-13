import { ComplaintCardProps } from "./components";
import { ComplaintStatus } from "./status";

export interface ComplaintListProps {
  complaints: ComplaintCardProps[];
  onStatusFilter?: (status: ComplaintStatus["value"]) => void;
}

export interface ComplaintFilterProps {
  onFilter: (filters: ComplaintFilters) => void;
}

export interface ComplaintFilters {
  status?: ComplaintStatus["value"];
  dateRange?: {
    from: Date;
    to: Date;
  };
  search?: string;
} 