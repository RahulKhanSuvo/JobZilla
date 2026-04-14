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
import { Star } from "lucide-react";
import type { AdminJob, AdminJobStatus } from "../types";
import JobActions from "./JobActions";
import { format } from "date-fns";

interface JobTableProps {
  jobs: AdminJob[];
  onUpdateStatus: (id: string, status: AdminJobStatus) => void;
  onToggleFeatured: (id: string, isFeatured: boolean) => void;
  onDelete: (id: string) => void;
}

export default function JobTable({
  jobs,
  onUpdateStatus,
  onToggleFeatured,
  onDelete,
}: JobTableProps) {
  const getStatusBadge = (status: AdminJobStatus) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/30"
          >
            Active
          </Badge>
        );
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/30"
          >
            Pending
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="outline"
            className="text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/30"
          >
            Rejected
          </Badge>
        );
      case "EXPIRED":
        return (
          <Badge
            variant="outline"
            className="text-slate-600 border-slate-200 bg-slate-50 dark:bg-slate-950/20 dark:border-slate-900/30"
          >
            Closed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getJobTypeBadge = (type: string | null | undefined) => {
    if (!type) return null;
    return (
      <Badge variant="secondary" className="font-normal text-[10px] uppercase">
        {type.replace("_", " ")}
      </Badge>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border-none overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[350px] font-semibold py-4">
              Job Details
            </TableHead>
            <TableHead className="font-semibold py-4">Type</TableHead>
            <TableHead className="font-semibold py-4">Status</TableHead>
            <TableHead className="font-semibold py-4">Posted Date</TableHead>
            <TableHead className="text-right font-semibold py-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground"
              >
                No jobs found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow
                key={job.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-slate-100 dark:border-slate-800 rounded-lg">
                      <AvatarImage src={job.companyLogo} />
                      <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold rounded-lg">
                        {job.companyName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                          {job.title}
                        </span>
                        {job.isFeatured && (
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {job.companyName}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {getJobTypeBadge(job.jobType)}
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(job.status)}
                </TableCell>
                <TableCell className="py-4 text-sm text-slate-500">
                  {format(new Date(job.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right py-4">
                  <JobActions
                    job={job}
                    onUpdateStatus={onUpdateStatus}
                    onToggleFeatured={onToggleFeatured}
                    onDelete={onDelete}
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
