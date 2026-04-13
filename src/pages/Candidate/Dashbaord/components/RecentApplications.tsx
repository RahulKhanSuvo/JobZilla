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
import { ExternalLink } from "lucide-react";

const applications = [
  {
    company: "Google",
    role: "Senior Frontend Engineer",
    appliedDate: "Oct 12, 2023",
    status: "Interview",
    statusColor:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    company: "Meta",
    role: "Product Designer",
    appliedDate: "Oct 10, 2023",
    status: "Reviewed",
    statusColor:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    company: "Amazon",
    role: "Backend Developer",
    appliedDate: "Oct 08, 2023",
    status: "Applied",
    statusColor:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
  {
    company: "Netflix",
    role: "Fullstack Engineer",
    appliedDate: "Oct 05, 2023",
    status: "Shortlisted",
    statusColor:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    company: "Microsoft",
    role: "Software Engineer II",
    appliedDate: "Oct 01, 2023",
    status: "Rejected",
    statusColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
];

export default function RecentApplications() {
  return (
    <Card className="border-none shadow-sm dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Recent Applications</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
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
              {applications.map((app, index) => (
                <TableRow
                  key={index}
                  className="border-b border-border/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {app.appliedDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${app.statusColor} border-none font-medium`}
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:text-primary transition-colors"
                    >
                      <ExternalLink className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
