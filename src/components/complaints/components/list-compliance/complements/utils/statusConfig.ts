import { AlertCircle, CheckCircle, ArrowRight, AlertTriangle, Clock } from "lucide-react";
import { StatusConfig } from "../types";

export const statusConfig: StatusConfig = {
  Ingresada: {
    color: "bg-orange-100 text-orange-700",
    icon: AlertCircle
  },
  Finalizada: {
    color: "bg-green-100 text-green-700",
    icon: CheckCircle
  },
  Derivada: {
    color: "bg-blue-100 text-blue-700",
    icon: ArrowRight
  },
  Incompleta: {
    color: "bg-purple-100 text-purple-700",
    icon: AlertTriangle
  },
  Revisada: {
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock
  }
}; 