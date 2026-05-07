import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { LogEntry, EvaluationChoice } from "@/lib/evaluation";

interface AuditLogProps {
  entries: LogEntry[];
}

export default function AuditLog({ entries }: AuditLogProps) {
  const getChoiceBadge = (choice: EvaluationChoice) => {
    switch (choice) {
      case "orion":
        return (
          <Badge className="bg-blue-950 text-blue-300 hover:bg-blue-950">
            Variant Orion
          </Badge>
        );
      case "nova":
        return (
          <Badge className="bg-purple-950 text-purple-300 hover:bg-purple-950">
            Variant Nova
          </Badge>
        );
      case "equal":
        return (
          <Badge className="bg-slate-950 text-slate-300 hover:bg-slate-950">
            Equal
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <div className="space-y-6 p-8">
        <div className="space-y-2">
          <p className="text-lg font-semibold tracking-tight text-zinc-100">
            Audit Log
          </p>
          <p className="text-sm text-zinc-500">Evaluation feedback history</p>
        </div>

        {entries.length === 0 ? (
          <p className="text-sm text-zinc-500">No evaluations yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-300 font-medium">Time</TableHead>
                  <TableHead className="text-zinc-300 font-medium">Evaluation ID</TableHead>
                  <TableHead className="text-zinc-300 font-medium">Choice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="border-zinc-800 hover:bg-zinc-800/30"
                  >
                    <TableCell className="text-sm text-zinc-300 py-4">
                      {entry.timestamp}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-zinc-400 py-4">
                      {entry.evaluationId}
                    </TableCell>
                    <TableCell className="py-4">
                      {getChoiceBadge(entry.choice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </Card>
  );
}
