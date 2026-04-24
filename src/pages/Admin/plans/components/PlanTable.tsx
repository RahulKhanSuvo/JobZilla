import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar } from "lucide-react";
import PlanActions from "./PlanActions";
import { format } from "date-fns";
import type { IPlan } from "../planSchema";

interface PlanTableProps {
  plans: IPlan[];
  onEdit: (plan: IPlan) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

export default function PlanTable({
  plans,
  onEdit,
  onDelete,
  onToggleStatus,
}: PlanTableProps) {
  const getStatusBadge = (status: boolean) => {
    switch (status) {
      case true:
        return (
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/30 font-bold uppercase text-[10px]"
          >
            Active
          </Badge>
        );
      case false:
        return (
          <Badge
            variant="outline"
            className="text-slate-500 border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-800 font-bold uppercase text-[10px]"
          >
            Inactive
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800 lg:p-4">
      <Table>
        <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[200px] font-black py-4 uppercase text-[10px] tracking-widest text-slate-400">
              Plan Name
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400 text-center">
              Price
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400 text-center">
              Interval
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400 text-center">
              Features
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400 text-center">
              Status
            </TableHead>
            <TableHead className="font-black py-4 uppercase text-[10px] tracking-widest text-slate-400 text-center">
              Created At
            </TableHead>
            <TableHead className="text-right font-black py-4 uppercase text-[10px] tracking-widest text-slate-400">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-48 text-center text-slate-400 font-bold italic"
              >
                No subscription plans found.
              </TableCell>
            </TableRow>
          ) : (
            plans.map((plan) => (
              <TableRow
                key={plan.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-50 dark:border-slate-800"
              >
                <TableCell className="py-5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 leading-tight">
                        {plan.name}
                      </span>
                      {plan.isHighlight && (
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded text-[8px] font-black text-amber-600 uppercase border border-amber-100 dark:border-amber-900/30">
                          <Star className="h-2 w-2 fill-amber-600" />
                          Popular
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 line-clamp-1 mt-0.5">
                      {plan.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5 text-center">
                  <span className="font-black text-slate-900 dark:text-slate-100 italic">
                    ${plan.price}
                  </span>
                </TableCell>
                <TableCell className="py-5 text-center">
                  <div className="flex items-center justify-center gap-1.5 capitalize text-xs font-bold text-slate-600 dark:text-slate-400">
                    {plan.billingInterval === "MONTHLY" ? (
                      <Clock className="h-3 w-3" />
                    ) : (
                      <Calendar className="h-3 w-3" />
                    )}
                    {plan.billingInterval}
                  </div>
                </TableCell>
                <TableCell className="py-5 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {plan.features.length} Features
                  </span>
                </TableCell>
                <TableCell className="py-5 text-center">
                  {getStatusBadge(plan.isActive)}
                </TableCell>
                <TableCell className="py-5 text-center text-[11px] font-black text-slate-500">
                  {plan.createdAt
                    ? format(new Date(plan.createdAt), "MMM dd, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right py-5">
                  <PlanActions
                    plan={plan}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
