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
  CheckCircle,
  XCircle,
  Star,
  StarOff,
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";
import type { AdminJob, AdminJobStatus } from "../types";

interface JobActionsProps {
  job: AdminJob;
  onUpdateStatus: (id: string, status: AdminJobStatus) => void;
  onToggleFeatured: (id: string, isFeatured: boolean) => void;
  onDelete: (id: string) => void;
}

export default function JobActions({
  job,
  onUpdateStatus,
  onToggleFeatured,
  onDelete,
}: JobActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Job Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Approval Workflow */}
        {job.status === "PENDING" && (
          <>
            <DropdownMenuItem
              onClick={() => onUpdateStatus(job.id, "APPROVED")}
            >
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              <span>Approve Job</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUpdateStatus(job.id, "REJECTED")}
            >
              <XCircle className="mr-2 h-4 w-4 text-red-600" />
              <span>Reject Job</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Featured Toggle */}
        <DropdownMenuItem
          onClick={() => onToggleFeatured(job.id, !job.isFeatured)}
        >
          {job.isFeatured ? (
            <>
              <StarOff className="mr-2 h-4 w-4 text-amber-600" />
              <span>Remove Featured</span>
            </>
          ) : (
            <>
              <Star className="mr-2 h-4 w-4 text-amber-600" />
              <span>Mark as Featured</span>
            </>
          )}
        </DropdownMenuItem>

        {/* Visibility/Lifecycle */}
        {job.status === "APPROVED" ? (
          <DropdownMenuItem onClick={() => onUpdateStatus(job.id, "EXPIRED")}>
            <Lock className="mr-2 h-4 w-4 text-slate-600" />
            <span>Close/Expire Job</span>
          </DropdownMenuItem>
        ) : job.status === "EXPIRED" ? (
          <DropdownMenuItem onClick={() => onUpdateStatus(job.id, "APPROVED")}>
            <Unlock className="mr-2 h-4 w-4 text-blue-600" />
            <span>Re-open Job</span>
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuSeparator />

        {/* Delete Action */}
        <DropdownMenuItem
          onClick={() => onDelete(job.id)}
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete Job</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
