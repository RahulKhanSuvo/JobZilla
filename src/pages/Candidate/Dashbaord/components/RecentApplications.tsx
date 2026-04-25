import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileX2, MapPin } from "lucide-react";
import { useGetCandidateAppliedJobsQuery } from "@/redux/features/candidate/candidate.api";
import TableSkeleton from "@/components/common/TableSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router";
import { formatDate } from "date-fns";

export default function RecentApplications() {
  const { data: response, isLoading } = useGetCandidateAppliedJobsQuery();
  const applications = response?.data || [];
  return (
    <Card className="border-none shadow-sm dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Recent Applications</CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-primary">
          <Link to="/candidate/my-applied-jobs">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/50">
                <TableHead className="font-semibold text-foreground/70">
                  Company
                </TableHead>
                <TableHead className="font-semibold text-foreground/70">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-foreground/70">
                  Applied Date
                </TableHead>
                <TableHead className="font-semibold text-foreground/70">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-foreground/70">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton />
              ) : applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                      <FileX2 className="w-10 h-10 mb-3 opacity-70" />
                      <p className="text-lg font-medium">No applications yet</p>
                      <p className="text-sm">
                        Once you apply, your applications will appear here.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-border/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-10 border">
                          <AvatarImage
                            src={app.job?.user?.company.logo || ""}
                          />
                          <AvatarFallback>
                            {app.job?.title?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium truncate max-w-[150px]">
                            {app.job?.user?.name || "Company"}
                          </span>
                          <span className="text-muted-foreground text-xs flex items-center gap-1">
                            <MapPin className="size-3" />
                            {app.job?.user?.company?.location || "Remote"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {app.job.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {formatDate(app.createdAt, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${app.status === "ACCEPTED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : app.status === "REJECTED" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : app.status === "SHORTLISTED" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : app.status === "PENDING" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"} border-none font-medium text-[10px] sm:text-xs`}
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 hover:text-primary transition-colors"
                        asChild
                      >
                        <Link to={`/job/${app.job?.id}`}>
                          <ExternalLink className="size-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-border/50 space-y-3 animate-pulse bg-slate-50/50 dark:bg-slate-900/50 h-[100px]"
                />
              ))}
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <FileX2 className="w-10 h-10 mb-3 opacity-70" />
              <p className="text-lg font-medium">No applications yet</p>
            </div>
          ) : (
            applications.map((app, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border/50 bg-slate-50/50 dark:bg-slate-900/50 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border bg-white">
                      <AvatarImage src={app.job?.user?.company.logo || ""} />
                      <AvatarFallback>
                        {app.job?.title?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-sm leading-none mb-1">
                        {app.job.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {app.job?.user?.name || "Company"}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${app.status === "ACCEPTED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : app.status === "REJECTED" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : app.status === "SHORTLISTED" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : app.status === "PENDING" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"} border-none font-bold text-[9px] uppercase tracking-wider`}
                  >
                    {app.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">
                      Applied On
                    </div>
                    <div className="text-xs font-semibold">
                      {formatDate(app.createdAt, "MMM dd, yyyy")}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-primary hover:bg-primary/10 gap-1 text-xs"
                    asChild
                  >
                    <Link to={`/job/${app.job?.id}`}>
                      View Details
                      <ExternalLink className="size-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
