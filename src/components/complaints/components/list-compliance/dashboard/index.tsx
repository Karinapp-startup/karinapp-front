"use client";

import { StatCard } from "./statCard";
import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { ComplaintType } from "../complements/types";

interface DashboardProps {
  complaints: ComplaintType[];
}

export function Dashboard({ complaints }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total denuncias"
        value={2420}
        trend={{ value: 40, label: "vs mes anterior" }}
        icon={<FileText className="h-5 w-5 text-blue-500" />}
      />
      <StatCard
        title="Pendientes"
        value={1210}
        trend={{ value: -10, label: "vs mes anterior" }}
        icon={<Clock className="h-5 w-5 text-yellow-500" />}
      />
      <StatCard
        title="Vencidas"
        value={1210}
        trend={{ value: -10, label: "vs mes anterior" }}
        icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
      />
      <StatCard
        title="Finalizadas"
        value={316}
        trend={{ value: 20, label: "vs mes anterior" }}
        icon={<CheckCircle className="h-5 w-5 text-green-500" />}
      />
    </div>
  );
} 