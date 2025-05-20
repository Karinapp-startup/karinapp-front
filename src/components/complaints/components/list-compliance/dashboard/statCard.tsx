import { Card } from '@/components/common/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  trend: number;
  icon: React.ReactNode;
}

export const StatCard = ({ title, value, trend, icon }: StatCardProps) => (
  <Card>
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>{Math.abs(trend)}% vs mes anterior</span>
      </div>
    </div>
  </Card>
); 