import { Card } from '@/components/common/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
  icon?: React.ReactNode;
}

export function StatCard({ title, value, description, trend, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold">{value}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value > 0 ? '+' : ''}{trend.value}%
          </span>
          <span className="text-sm text-gray-500 ml-2">{trend.label}</span>
        </div>
      )}
    </div>
  );
} 