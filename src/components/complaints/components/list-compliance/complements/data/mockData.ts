import { ComplaintType } from "../types";
import { format } from "date-fns";

const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yy');
};

const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

const generateActivities = (id: string) => [
  {
    date: formatDate(new Date()),
    time: formatTime(new Date()),
    description: "Registro inicial de la denuncia"
  },
  {
    date: formatDate(new Date()),
    time: formatTime(new Date()),
    description: "Revisión de documentación"
  }
];

export const complaintsMockData: ComplaintType[] = [
  {
    id: "F1239",
    companyName: "Empresa Minera del Sur",
    victimName: "Juan Pablo González",
    status: "recibida",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    entryDate: "27/04/25",
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Última actualización del caso"
    },
    activities: generateActivities("F1239"),
    step: "1/9",
    priority: "high",
    assignedTo: "Ana Martínez"
  },
  {
    id: "F1240",
    victimName: "Juan Pablo López",
    companyName: "Constructora Nacional",
    status: "finalizada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "low",
    assignedTo: "Carlos Ruiz",
    step: "9/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Caso cerrado"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1240")
  },
  {
    id: "F1223",
    victimName: "Juan Pablo Díaz",
    companyName: "Industrias Metalúrgicas SA",
    status: "aviso_inicio_investigacion",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "medium",
    assignedTo: "Ana Martínez",
    step: "2/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Derivación a departamento legal"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1223")
  },
  {
    id: "F8989",
    victimName: "Juan Pablo Fernández",
    companyName: "Transportes del Norte",
    status: "esperando_dt",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "high",
    assignedTo: "Pedro Soto",
    step: "7/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Solicitud de documentación adicional"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F8989")
  },
  {
    id: "F1251",
    victimName: "Juan Pablo Torres",
    companyName: "Agrícola del Valle",
    status: "observaciones_dt",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "medium",
    assignedTo: "Laura Vega",
    step: "8/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Asignación de responsable"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1251")
  },
  {
    id: "F1252",
    victimName: "Juan Pablo Morales",
    companyName: "Pesquera del Pacífico",
    status: "adopcion_sanciones",
    entryDate: "27/04/25",
    dueDate: "27/05/25",
    createdAt: "27/04/25",
    priority: "low",
    assignedTo: "Diego Muñoz",
    step: "6/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Revisión completada"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1252")
  },
  {
    id: "F1260",
    victimName: "Juan Pablo Ruiz",
    companyName: "Forestal del Sur",
    status: "derivada_dt",
    entryDate: "27/04/25",
    dueDate: "15/05/25",
    createdAt: "27/04/25",
    priority: "high",
    assignedTo: "Carmen Silva",
    step: "6/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Derivación a fiscalía"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1260")
  },
  {
    id: "F1277",
    victimName: "Juan Pablo Castillo",
    companyName: "Minera Los Andes",
    status: "en_proceso",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "medium",
    assignedTo: "Roberto Parra",
    step: "4/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Pendiente documentación"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1277")
  },
  {
    id: "F1300",
    victimName: "Juan Pablo Vega",
    companyName: "Constructora del Pacífico",
    status: "esperando_dt",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "high",
    assignedTo: "Claudia Rojas",
    step: "8/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Registro inicial"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1300")
  },
  {
    id: "F1333",
    victimName: "Juan Pablo Simpson",
    companyName: "Constructora Pocuro",
    status: "esperando_dt",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "high",
    assignedTo: "Claudia Rojas",
    step: "6/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Registro inicial"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1300")
  },
  {
    id: "F1355",
    victimName: "Juan Pablo Herrera",
    companyName: "Industrial Manufacturera",
    status: "finalizada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "low",
    assignedTo: "Felipe Ortiz",
    step: "6/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Revisión de seguimiento"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1355")
  },
  {
    id: "F1666",
    victimName: "Juan Pablo Herrera",
    companyName: "Mecanica NFS",
    status: "finalizada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    createdAt: "27/04/25",
    priority: "low",
    assignedTo: "Felipe Ortiz",
    step: "4/9",
    lastActivity: {
      date: formatDate(new Date()),
      time: formatTime(new Date()),
      description: "Revisión de seguimiento"
    },
    lastUpdate: {
      date: formatDate(new Date()),
      time: formatTime(new Date())
    },
    activities: generateActivities("F1666")
  }
];

export const mockComplaints = complaintsMockData; 