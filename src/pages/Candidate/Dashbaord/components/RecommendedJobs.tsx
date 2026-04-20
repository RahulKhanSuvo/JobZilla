import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, ArrowRight, Loader2 } from "lucide-react";
import { useGetRecommendedJobsQuery } from "@/redux/features/job/job.api";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

export default function RecommendedJobs() {
  const { data: response, isLoading, isError } = useGetRecommendedJobsQuery();
  const jobs = response?.data || [];

  if (isLoading) {
    return (
      <Card className="border-none shadow-sm dark:bg-slate-900 min-h-[400px] flex flex-col items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground mt-4">
          Finding best matches for you...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-none shadow-sm dark:bg-slate-900 p-8 text-center text-red-500">
        Failed to load recommendations. Please try again later.
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm dark:bg-slate-900 transition-all duration-500">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">Recommended Jobs</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-primary hover:bg-primary/10"
        >
          <Link to="/jobs">Explore All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No specific recommendations found. Try adding more skills to your
            profile!
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded border border-border/50 hover:border-primary/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex items-center justify-center size-12 rounded overflow-hidden text-xl font-bold shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-400`}
                >
                  {job.company?.logo ? (
                    <img
                      src={job.company.logo}
                      alt={job.company.user.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    job.company?.user.name?.[0]?.toUpperCase() || "J"
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold group-hover:text-primary transition-colors">
                    {job.title}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-2">
                      <MapPin className="size-3" />{" "}
                      {job.company?.location || "Remote"}
                    </span>
                    <span className="flex items-center gap-2">
                      <DollarSign className="size-3" />
                      {job.salaryMin && job.salaryMax
                        ? `$${job.salaryMin / 1000}k - $${job.salaryMax / 1000}k`
                        : "Negotiable"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="size-3" />{" "}
                      {formatDistanceToNow(new Date(job.createdAt))} ago
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-3">
                <Badge
                  variant="outline"
                  className="rounded-md font-medium px-2.5 py-0.5 capitalize bg-background/50"
                >
                  {job.jobType?.replace("_", " ").toLowerCase() || "Full Time"}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
                >
                  <Link to={`/jobs/public/${job.id}`}>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
