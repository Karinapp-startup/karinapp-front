import { Complaints } from "@/components/Complaints";
import { complaintsMockData } from "@/components/Complaints/data/mockData";

export default function ComplaintsPage() {
  return <Complaints complaints={complaintsMockData} />;
}
