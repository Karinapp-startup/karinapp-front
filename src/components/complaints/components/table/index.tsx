import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PenSquare, HelpCircle, Clock } from "lucide-react";
import { ComplaintType } from '../../types';
import { getStatusColor } from '../../utils/statusColors';

interface ComplaintsTableProps {
  complaints: ComplaintType[];
}

export const ComplaintsTable = ({ complaints }: ComplaintsTableProps) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Denuncia</TableHead>
            <TableHead>Nombre de la víctima</TableHead>
            <TableHead className="cursor-pointer">
              Status 
              <HelpCircle className="inline-block ml-1 h-4 w-4" />
            </TableHead>
            <TableHead>
              Fecha de ingreso
              <HelpCircle className="inline-block ml-1 h-4 w-4" />
            </TableHead>
            <TableHead>
              Próximo a vencer
              <Clock className="inline-block ml-1 h-4 w-4" />
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint) => (
            <TableRow key={complaint.id}>
              <TableCell className="font-medium">{complaint.id}</TableCell>
              <TableCell>{complaint.victimName}</TableCell>
              <TableCell>
                <span className={getStatusColor(complaint.status)}>
                  {complaint.status}
                </span>
              </TableCell>
              <TableCell>{complaint.entryDate}</TableCell>
              <TableCell>{complaint.dueDate}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <PenSquare className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 