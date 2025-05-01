import { ComplaintsHeader } from './components/Header';
import { ComplaintsSearchBar } from './components/SearchBar';
import { ComplaintsTable } from './components/Table';
import { ComplaintsPagination } from './components/Pagination';
import { ComplaintType } from './types';
import { Card } from '@/components/common/Card';
import { PageHeader } from '@/components/common/pageHeader';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ComplaintsProps {
  complaints: ComplaintType[];
}

export const Complaints = ({ complaints }: ComplaintsProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>Denuncias</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Índice de denuncias</h1>

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Busca por denuncia o nombre de la víctima"
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <ComplaintsSearchBar />
        </div>
      </div>

      <Card>
        <ComplaintsTable complaints={complaints} />
        <ComplaintsPagination />
      </Card>
    </div>
  );
}; 