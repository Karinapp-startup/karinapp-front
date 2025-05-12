import { ComplaintType } from '@/components/complaints/components/list-compliance/complements/types';
import { subDays, subHours } from 'date-fns';

const generateActivities = (id: string) => [
  {
    id: `${id}-1`,
    action: "Denuncia creada",
    date: subDays(now, 5),
    user: "Juan Pérez",
    details: "Registro inicial de la denuncia"
  },
  {
    id: `${id}-2`,
    action: "Actualización de estado",
    date: subDays(now, 2),
    user: "María González",
    details: "Revisión de documentación"
  }
];

const now = new Date("2025-04-27T12:00:00Z");

export const complaintsMockData: ComplaintType[] = [
  {
    id: "F1239",
    victimName: "Juan Pablo González",
    companyName: "Empresa Minera del Sur",
    status: "Recibida",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "high",
    assignedTo: "María González",
    step: "1/9",
    lastActivity: {
      text: "Revisión inicial",
      date: now
    },
    lastUpdate: now,
    activities: generateActivities("F1239")
  },
  {
    id: "F1240",
    victimName: "Juan Pablo López",
    companyName: "Constructora Nacional",
    status: "Finalizada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "low",
    assignedTo: "Carlos Ruiz",
    step: "9/9",
    lastActivity: {
      text: "Caso cerrado",
      date: subHours(now, 2)
    },
    lastUpdate: subDays(now, 1),
    activities: generateActivities("F1240")
  },
  {
    id: "F1223",
    victimName: "Juan Pablo Díaz",
    companyName: "Industrias Metalúrgicas SA",
    status: "Aviso de Inicio Investigación",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "medium",
    assignedTo: "Ana Martínez",
    step: "2/9",
    lastActivity: {
      text: "Derivación a departamento legal",
      date: subDays(now, 2)
    },
    lastUpdate: subDays(now, 2),
    activities: generateActivities("F1223")
  },
  {
    id: "F8989",
    victimName: "Juan Pablo Fernández",
    companyName: "Transportes del Norte",
    status: "Esperando DT",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "high",
    assignedTo: "Pedro Soto",
    step: "7/9",
    lastActivity: "Solicitud de documentación adicional",
    lastUpdate: now,
    activities: generateActivities("F8989")
  },
  {
    id: "F1251",
    victimName: "Juan Pablo Torres",
    companyName: "Agrícola del Valle",
    status: "Observaciones DT",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "medium",
    assignedTo: "Laura Vega",
    step: "8/9",
    lastActivity: "Asignación de responsable",
    lastUpdate: subDays(now, 1),
    activities: generateActivities("F1251")
  },
  {
    id: "F1252",
    victimName: "Juan Pablo Morales",
    companyName: "Pesquera del Pacífico",
    status: "Adopción de Sanciones",
    entryDate: "27/04/25",
    dueDate: "27/05/25",
    priority: "low",
    assignedTo: "Diego Muñoz",
    step: "6/9",
    lastActivity: "Revisión completada",
    lastUpdate: subDays(now, 3),
    activities: generateActivities("F1252")
  },
  {
    id: "F1260",
    victimName: "Juan Pablo Ruiz",
    companyName: "Forestal del Sur",
    status: "Derivada a DT",
    entryDate: "27/04/25",
    dueDate: "15/05/25",
    priority: "high",
    assignedTo: "Carmen Silva",
    step: "6/9",
    lastActivity: "Derivación a fiscalía",
    lastUpdate: now,
    activities: generateActivities("F1260")
  },
  {
    id: "F1277",
    victimName: "Juan Pablo Castillo",
    companyName: "Minera Los Andes",
    status: "Desarrollo Investigación",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "medium",
    assignedTo: "Roberto Parra",
    step: "4/9",
    lastActivity: "Pendiente documentación",
    lastUpdate: subDays(now, 2),
    activities: generateActivities("F1277")
  },
  {
    id: "F1300",
    victimName: "Juan Pablo Vega",
    companyName: "Constructora del Pacífico",
    status: "Esperando DT",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "high",
    assignedTo: "Claudia Rojas",
    step: "7/9",
    lastActivity: "Registro inicial",
    lastUpdate: now,
    activities: generateActivities("F1300")
  },
  {
    id: "F1333",
    victimName: "Juan Pablo Simpson",
    companyName: "Constructora Pocuro",
    status: "Esperando DT",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "high",
    assignedTo: "Claudia Rojas",
    step: "7/9",
    lastActivity: "Registro inicial",
    lastUpdate: now,
    activities: generateActivities("F1300")
  },
  {
    id: "F1355",
    victimName: "Juan Pablo Herrera",
    companyName: "Industrial Manufacturera",
    status: "Finalizada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "low",
    assignedTo: "Felipe Ortiz",
    step: "9/9",
    lastActivity: {
      text: "Revisión de seguimiento",
      date: subDays(now, 1)
    },
    lastUpdate: subDays(now, 1),
    activities: generateActivities("F1355")
  },
  {
    id: "F1666",
    victimName: "Juan Pablo Herrera",
    companyName: "Mecanica NFS",
    status: "Finalizada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "low",
    assignedTo: "Felipe Ortiz",
    step: "9/9",
    lastActivity: {
      text: "Revisión de seguimiento",
      date: subDays(now, 1)
    },
    lastUpdate: subDays(now, 1),
    activities: generateActivities("F1355")
  }
]; 