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
  Eye,
  CheckCircle,
  Archive,
  Trash2,
} from "lucide-react";
import type { Activity } from "../types";

interface ActivityActionsProps {
  activity: Activity;
  onResolve: (id: string) => void;
  onArchive: (id: string) => void;
  onViewDetails: (activity: Activity) => void;
}

export default function ActivityActions({
  activity,
  onResolve,
  onArchive,
  onViewDetails,
}: ActivityActionsProps) {
  const needsResolution =
    (activity.severity === "error" ||
      activity.severity === "critical" ||
      activity.severity === "warning") &&
    !activity.isResolved;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Activity Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onViewDetails(activity)}>
          <Eye className="mr-2 h-4 w-4" />
          <span>View Details</span>
        </DropdownMenuItem>

        {needsResolution && (
          <DropdownMenuItem onClick={() => onResolve(activity.id)}>
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
            <span>Mark as Resolved</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => onArchive(activity.id)}>
          <Archive className="mr-2 h-4 w-4 text-slate-600" />
          <span>Archive Log</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete Action */}
        <DropdownMenuItem
          onClick={() => onArchive(activity.id)} // For demo, archive and delete are similar
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete Permanently</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
