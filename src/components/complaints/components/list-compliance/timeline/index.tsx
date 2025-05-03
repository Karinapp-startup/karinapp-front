"use client";

import { Activity } from "@/components/complaints/components/list-compliance/complements/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface TimelineProps {
  activities: Activity[];
}

export function Timeline({ activities }: TimelineProps) {
  return (
    <ScrollArea className="h-[200px] w-full pr-4">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="relative flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div className="absolute h-full w-px bg-gray-200 top-3 left-1" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <time className="text-gray-500">
                  {format(activity.date, "dd MMM yyyy HH:mm", { locale: es })}
                </time>
              </div>
              <p className="text-sm text-gray-600">{activity.details}</p>
              <p className="text-xs text-gray-500">Por: {activity.user}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
} 