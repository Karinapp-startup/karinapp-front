import { ComplaintType } from '@/components/complaints/components/list-compliance/complements/types';
import { subDays, subHours } from 'date-fns';

const generateActivities = (id: string) => [
  {
    id: `${id}-1`,
    action: "Denuncia creada",
    date: subDays(new Date(), 5),
    user: "Juan Pérez",
    details: "Registro inicial de la denuncia"
  },
  {
    id: `${id}-2`,
    action: "Actualización de estado",
    date: subDays(new Date(), 2),
    user: "María González",
    details: "Revisión de documentación"
  }
];

export const complaintsMockData: ComplaintType[] = [
  {
    id: "F1239",
    victimName: "Juan Pablo González",
    companyName: "Empresa Minera del Sur",
    status: "Ingresada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "high",
    assignedTo: "María González",
    lastActivity: {
      text: "Revisión inicial",
      date: new Date()
    },
    lastUpdate: new Date(),
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
    lastActivity: {
      text: "Caso cerrado",
      date: subHours(new Date(), 2)
    },
    lastUpdate: subDays(new Date(), 1),
    activities: generateActivities("F1240")
  },
  {
    id: "F1223",
    victimName: "Juan Pablo Díaz",
    companyName: "Industrias Metalúrgicas SA",
    status: "Derivada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "medium",
    assignedTo: "Ana Martínez",
    lastActivity: {
      text: "Derivación a departamento legal",
      date: subDays(new Date(), 2)
    },
    lastUpdate: subDays(new Date(), 2),
    activities: generateActivities("F1223")
  },
  {
    id: "F8989",
    victimName: "Juan Pablo Fernández",
    companyName: "Transportes del Norte",
    status: "Incompleta",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "high",
    assignedTo: "Pedro Soto",
    lastActivity: "Solicitud de documentación adicional",
    lastUpdate: new Date(),
    activities: generateActivities("F8989")
  },
  {
    id: "F1251",
    victimName: "Juan Pablo Torres",
    companyName: "Agrícola del Valle",
    status: "Ingresada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "medium",
    assignedTo: "Laura Vega",
    lastActivity: "Asignación de responsable",
    lastUpdate: subDays(new Date(), 1),
    activities: generateActivities("F1251")
  },
  {
    id: "F1252",
    victimName: "Juan Pablo Morales",
    companyName: "Pesquera del Pacífico",
    status: "Revisada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "low",
    assignedTo: "Diego Muñoz",
    lastActivity: "Revisión completada",
    lastUpdate: subDays(new Date(), 3),
    activities: generateActivities("F1252")
  },
  {
    id: "F1260",
    victimName: "Juan Pablo Ruiz",
    companyName: "Forestal del Sur",
    status: "Derivada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "high",
    assignedTo: "Carmen Silva",
    lastActivity: "Derivación a fiscalía",
    lastUpdate: new Date(),
    activities: generateActivities("F1260")
  },
  {
    id: "F1277",
    victimName: "Juan Pablo Castillo",
    companyName: "Minera Los Andes",
    status: "Incompleta",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "medium",
    assignedTo: "Roberto Parra",
    lastActivity: "Pendiente documentación",
    lastUpdate: subDays(new Date(), 2),
    activities: generateActivities("F1277")
  },
  {
    id: "F1300",
    victimName: "Juan Pablo Vega",
    companyName: "Constructora del Pacífico",
    status: "Ingresada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "high",
    assignedTo: "Claudia Rojas",
    lastActivity: "Registro inicial",
    lastUpdate: new Date(),
    activities: generateActivities("F1300")
  },
  {
    id: "F1355",
    victimName: "Juan Pablo Herrera",
    companyName: "Industrial Manufacturera",
    status: "Revisada",
    entryDate: "27/04/25",
    dueDate: "27/04/25",
    priority: "low",
    assignedTo: "Felipe Ortiz",
    lastActivity: {
      text: "Revisión de seguimiento",
      date: subDays(new Date(), 1)
    },
    lastUpdate: subDays(new Date(), 1),
    activities: generateActivities("F1355")
  }
]; 