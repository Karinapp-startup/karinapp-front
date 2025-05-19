"use client";

import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { ComplaintType } from "../complements/types";
import { Card } from "@/components/ui/card";

interface DashboardProps {
  complaints: ComplaintType[];
}

export function Dashboard() {
  return (
    <>
      <Card className="p-6 bg-white hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Total denuncias</h3>
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">2420</span>
            <span className="text-sm font-medium text-green-600">+40% vs mes anterior</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Pendientes</h3>
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">1210</span>
            <span className="text-sm font-medium text-red-600">-10% vs mes anterior</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Vencidas</h3>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">1210</span>
            <span className="text-sm font-medium text-red-600">-10% vs mes anterior</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">Finalizadas</h3>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">316</span>
            <span className="text-sm font-medium text-green-600">+20% vs mes anterior</span>
          </div>
        </div>
      </Card>
    </>
  );
} 