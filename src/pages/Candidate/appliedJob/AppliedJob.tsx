import type { Application } from "@/types/application";
import { ReusableTable } from "@/components/common/ReusableTable";
import DashboardTitle from "@/components/common/DashboardTitle";
import CommonWrapper from "@/components/common/CommonWrapper";
import { useGetCandidateAppliedJobsQuery } from "@/redux/features/candidate/candidate.api";
import { appliedJobColumns } from "./appliedJobColumns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Building2,
  Eye,
  FileX2,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function AppliedJob() {
  const { data: response, isLoading } = useGetCandidateAppliedJobsQuery();
  const navigate = useNavigate();

  const applications = response?.data || [];

  const statusMap: Record<string, string> = {
    PENDING:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500",
    ACCEPTED:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500",
    REJECTED: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    SHORTLISTED:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500",
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <div className="flex items-center gap-4 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Button>
          <DashboardTitle>Applied Jobs</DashboardTitle>
        </div>
        <p className="text-sm text-muted-foreground ml-14">
          Track and manage your recent job applications
        </p>
      </div>

      <CommonWrapper className="overflow-hidden bg-white dark:bg-slate-900 border-none">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <ReusableTable<Application>
            columns={appliedJobColumns}
            data={applications}
            isLoading={isLoading}
            emptyMessage="You haven't applied to any jobs yet."
            className="border-none"
          />
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded border border-slate-100 dark:border-slate-800 space-y-4 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-3 w-[40%]" />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-[30%]" />
                  <Skeleton className="h-8 w-1/4 rounded" />
                </div>
              </div>
            ))
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-slate-50/50 dark:bg-slate-800/30 rounded border border-dashed border-slate-200 dark:border-slate-800">
              <FileX2 className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                No applications yet
              </p>
              <p className="text-sm max-w-[200px] mt-1">
                Once you apply, your applications will appear here.
              </p>
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-12 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <AvatarImage src={app.job?.user?.company?.logo || ""} />
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">
                        {app.job?.title?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <Link
                        to={`/jobs/${app.job?.id}`}
                        className="font-bold text-[16px] text-slate-900 dark:text-slate-50 hover:text-primary transition-colors block leading-tight"
                      >
                        {app.job?.title || "N/A"}
                      </Link>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Building2 className="size-3" />
                          {app.job?.user?.name || "N/A"}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <MapPin className="size-3" />
                          {app.job?.user?.company?.location || "Remote"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 dark:border-slate-800/50 mb-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                      Status
                    </p>
                    <Badge
                      variant="secondary"
                      className={`h-6 text-[10px] font-bold border-none shadow-none px-3 ${statusMap[app.status] || "bg-slate-100 text-slate-600"}`}
                    >
                      {app.status.charAt(0) + app.status.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                      Applied On
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Calendar className="size-3 text-slate-400" />
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <Link
                  to={`/job/${app.job?.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-all group/btn"
                >
                  <Eye className="size-4 group-hover/btn:scale-110 transition-transform" />
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </CommonWrapper>
    </div>
  );
}

export default AppliedJob;
