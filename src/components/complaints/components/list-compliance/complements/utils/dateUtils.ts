import { parseISO, differenceInDays } from "date-fns";
import { DueStatus } from "../types";

export function getDueStatus(dueDate: string): DueStatus {
  const today = new Date();
  const due = parseISO(dueDate);
  const daysUntilDue = differenceInDays(due, today);

  if (daysUntilDue < 0) return 'overdue';
  if (daysUntilDue <= 3) return 'warning';
  return 'onTime';
}

export function getDaysUntilDue(dueDate: string): number {
  const today = new Date();
  const due = parseISO(dueDate);
  return differenceInDays(due, today);
} 