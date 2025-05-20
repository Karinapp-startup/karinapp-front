import * as XLSX from 'xlsx';
import { ComplaintType } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const exportToExcel = (complaints: ComplaintType[]) => {
  // Formatear los datos para la exportación
  const data = complaints.map(complaint => ({
    'ID Denuncia': complaint.id,
    'Víctima': complaint.victimName,
    'Empresa': complaint.companyName,
    'Estado': complaint.status,
    'Fecha Ingreso': complaint.entryDate,
    'Fecha Vencimiento': complaint.dueDate,
    'Prioridad': complaint.priority,
    'Asignado a': complaint.assignedTo,
    'Última Actividad': complaint.lastActivity.text,
    'Fecha Última Actividad': complaint.lastActivity.date instanceof Date
      ? format(complaint.lastActivity.date, 'dd/MM/yyyy HH:mm', { locale: es })
      : 'N/A',
    'Última Actualización': complaint.lastUpdate instanceof Date
      ? format(complaint.lastUpdate, 'dd/MM/yyyy HH:mm', { locale: es })
      : 'N/A'
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  ws['!cols'] = [
    { wch: 10 }, // ID
    { wch: 30 }, // Víctima
    { wch: 30 }, // Empresa
    { wch: 15 }, // Estado
    { wch: 15 }, // Fecha Ingreso
    { wch: 15 }, // Fecha Vencimiento
    { wch: 10 }, // Prioridad
    { wch: 20 }, // Asignado
    { wch: 40 }, // Última Actividad
    { wch: 20 }, // Fecha Última Actividad
    { wch: 20 }, // Última Actualización
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Denuncias');
  XLSX.writeFile(wb, `denuncias_${format(new Date(), 'dd-MM-yyyy')}.xlsx`);
}; 