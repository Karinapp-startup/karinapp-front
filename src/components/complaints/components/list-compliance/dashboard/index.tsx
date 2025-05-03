import { StatCard } from "./StatCard";
import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export const Dashboard = () => (
  <div className="grid grid-cols-4 gap-4 mb-6">
    <StatCard
      title="Total Denuncias"
      value="156"
      trend={12}
      icon={<FileText className="h-5 w-5 text-blue-500" />}
    />
    <StatCard
      title="Pendientes"
      value="45"
      trend={-5}
      icon={<Clock className="h-5 w-5 text-yellow-500" />}
    />
    <StatCard
      title="Vencidas"
      value="8"
      trend={2}
      icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
    />
    <StatCard
      title="Finalizadas"
      value="103"
      trend={15}
      icon={<CheckCircle className="h-5 w-5 text-green-500" />}
    />
  </div>
); 