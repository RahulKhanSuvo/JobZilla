import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Project Manager",
    company: "Google",
    location: "California, USA",
    type: "Full Time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    logo: "G",
    logoBg: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
  },
  {
    title: "UX Designer",
    company: "Airbnb",
    location: "Remote",
    type: "Full Time",
    salary: "$90k - $120k",
    posted: "1 day ago",
    logo: "A",
    logoBg: "bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  },
  {
    title: "DevOps Engineer",
    company: "Slack",
    location: "San Francisco",
    type: "Contract",
    salary: "$80 - $100/hr",
    posted: "5 hours ago",
    logo: "S",
    logoBg:
      "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
];

export default function RecommendedJobs() {
  return (
    <Card className="border-none shadow-sm dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">Recommended Jobs</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:bg-primary/10"
        >
          Explore Projects
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded border border-border/50 hover:border-primary/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex items-center justify-center size-12 rounded text-xl font-bold shrink-0 ${job.logoBg}`}
              >
                {job.logo}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold group-hover:text-primary transition-colors">
                  {job.title}
                </h4>
                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="size-3" /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {job.posted}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-3">
              <Badge
                variant="outline"
                className="rounded-md font-medium px-2.5 py-0.5"
              >
                {job.type}
              </Badge>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white transition-all"
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
