import * as XLSX from 'xlsx';
import { ComplaintType } from '../types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const exportToExcel = (complaints: ComplaintType[]) => {
  const workbook = XLSX.utils.book_new();
  
  const data = complaints.map(complaint => ({
    'ID': complaint.id,
    'Víctima': complaint.victimName,
    'Empleador': complaint.employer,
    'Empresa': complaint.companyName,
    'Estado': complaint.status,
    'Prioridad': complaint.priority,
    'Asignado a': complaint.assignedTo,
    'Última actividad (fecha)': complaint.lastActivity.date,
    'Última actividad (hora)': complaint.lastActivity.time,
    'Última actividad': complaint.lastActivity.description,
    'Fecha de ingreso': complaint.entryDate,
    'Última actualización (fecha)': complaint.lastUpdate.date,
    'Última actualización': complaint.lastUpdate.time,
    'Fecha de vencimiento': complaint.dueDate,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Denuncias');
  XLSX.writeFile(workbook, 'denuncias.xlsx');
}; 