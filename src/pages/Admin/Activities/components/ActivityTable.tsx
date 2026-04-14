import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Info,
  AlertTriangle,
  XOctagon,
  ShieldAlert,
  CheckCircle2,
  Clock,
} from "lucide-react";
import type { Activity, ActivitySeverity, ActivityModule } from "../types";
import ActivityActions from "./ActivityActions";
import { formatDistanceToNow } from "date-fns";

interface ActivityTableProps {
  activities: Activity[];
  onResolve: (id: string) => void;
  onArchive: (id: string) => void;
  onViewDetails: (activity: Activity) => void;
}

export default function ActivityTable({
  activities,
  onResolve,
  onArchive,
  onViewDetails,
}: ActivityTableProps) {
  const getSeverityBadge = (
    severity: ActivitySeverity,
    isResolved?: boolean,
  ) => {
    if (isResolved) {
      return (
        <Badge
          variant="outline"
          className="text-green-600 border-green-200 bg-green-50 gap-1.5 font-normal"
        >
          <CheckCircle2 className="h-3 w-3" /> Resolved
        </Badge>
      );
    }

    switch (severity) {
      case "critical":
        return (
          <Badge className="bg-red-600 hover:bg-red-700 text-white border-none gap-1.5 font-normal">
            <ShieldAlert className="h-3 w-3 text-white" /> Critical
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none gap-1.5 font-normal">
            <XOctagon className="h-3 w-3 text-white" /> Error
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none gap-1.5 font-normal">
            <AlertTriangle className="h-3 w-3 text-white" /> Warning
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="gap-1.5 font-normal">
            <Info className="h-3 w-3" /> Info
          </Badge>
        );
    }
  };

  const getModuleBadge = (module: ActivityModule) => {
    return (
      <Badge
        variant="outline"
        className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground border-slate-200"
      >
        {module}
      </Badge>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border-none overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[350px] font-semibold py-4">
              Activity
            </TableHead>
            <TableHead className="font-semibold py-4 text-center">
              Severity
            </TableHead>
            <TableHead className="font-semibold py-4">User</TableHead>
            <TableHead className="font-semibold py-4">Module</TableHead>
            <TableHead className="text-right font-semibold py-4">
              Time
            </TableHead>
            <TableHead className="text-right font-semibold py-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No activity logs found.
              </TableCell>
            </TableRow>
          ) : (
            activities.map((activity) => (
              <TableRow
                key={activity.id}
                className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800 ${activity.severity === "critical" ? "bg-red-50/10" : ""}`}
              >
                <TableCell className="py-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {activity.action}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-1 w-[300px]">
                      {activity.details}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-center">
                  {getSeverityBadge(activity.severity, activity.isResolved)}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7 border border-slate-100">
                      <AvatarImage src={activity.user.avatar} />
                      <AvatarFallback className="text-[10px] font-bold">
                        {activity.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {activity.user.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {getModuleBadge(activity.module)}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {formatDistanceToNow(new Date(activity.timestamp))} ago
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />
                      {new Date(activity.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <ActivityActions
                    activity={activity}
                    onResolve={onResolve}
                    onArchive={onArchive}
                    onViewDetails={onViewDetails}
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
