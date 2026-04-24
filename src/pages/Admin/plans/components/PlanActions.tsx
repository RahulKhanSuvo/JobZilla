import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import type { IPlan } from "../planSchema";

interface PlanActionsProps {
  plan: IPlan;
  onEdit: (plan: IPlan) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

export default function PlanActions({
  plan,
  onEdit,
  onDelete,
  onToggleStatus,
}: PlanActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 p-2 border-slate-200 dark:border-slate-800 shadow-xl rounded"
      >
        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-1.5">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />

        <DropdownMenuItem
          onClick={() => onEdit(plan)}
          className="flex items-center gap-2 cursor-pointer focus:bg-primary/5 focus:text-primary rounded-lg px-2 py-2"
        >
          <Edit className="h-4 w-4" />
          <span className="font-bold text-sm">Edit Plan</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onToggleStatus(plan.id!, plan.isActive)}
          className="flex items-center gap-2 cursor-pointer focus:bg-primary/5 focus:text-primary rounded-lg px-2 py-2"
        >
          {plan.isActive ? (
            <>
              <ToggleLeft className="h-4 w-4 text-amber-500" />
              <span className="font-bold text-sm">Deactivate</span>
            </>
          ) : (
            <>
              <ToggleRight className="h-4 w-4 text-green-500" />
              <span className="font-bold text-sm">Activate</span>
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />

        <DropdownMenuItem
          onClick={() => onDelete(plan.id!)}
          className="flex items-center gap-2 cursor-pointer focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/20 rounded-lg px-2 py-2 text-red-500"
        >
          <Trash2 className="h-4 w-4" />
          <span className="font-bold text-sm">Delete Plan</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
