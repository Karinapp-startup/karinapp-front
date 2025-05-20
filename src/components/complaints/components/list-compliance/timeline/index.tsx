"use client";

import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface Activity {
  date: string;
  time: string;
  description: string;
}

interface TimelineProps {
  activities: Activity[];
}

export function Timeline({ activities }: TimelineProps) {
  const formatDateTime = (date: string, time: string) => {
    try {
      // Asumiendo que date viene en formato "DD/MM/YY" y time en "HH:mm"
      const [day, month, year] = date.split('/').map(Number);
      const [hours, minutes] = time.split(':').map(Number);
      
      const dateObj = new Date(2000 + year, month - 1, day, hours, minutes);
      return format(dateObj, "dd MMM yyyy HH:mm", { locale: es });
    } catch (error) {
      console.error('Error formatting date:', error);
      return `${date} ${time}`;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="relative pb-4 last:pb-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <time className="text-sm text-gray-500">
              {formatDateTime(activity.date, activity.time)}
            </time>
          </div>
          <p className="text-sm text-gray-600 ml-4">
            {activity.description}
          </p>
        </div>
      ))}
    </div>
  );
} 