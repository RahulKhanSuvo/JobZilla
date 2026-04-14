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
import { BadgeCheck, Star, Briefcase } from "lucide-react";
import type { Company, CompanyStatus } from "../types";
import CompanyActions from "./CompanyActions";

interface CompanyTableProps {
  companies: Company[];
  onUpdateStatus: (id: string, status: CompanyStatus) => void;
  onToggleVerification: (id: string, isVerified: boolean) => void;
  onToggleFeatured: (id: string, isFeatured: boolean) => void;
  onDelete: (id: string) => void;
}

export default function CompanyTable({
  companies,
  onUpdateStatus,
  onToggleVerification,
  onToggleFeatured,
  onDelete,
}: CompanyTableProps) {
  const getStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/30"
          >
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge
            variant="outline"
            className="text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/30"
          >
            Suspended
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/30"
          >
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border-none overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[350px] font-semibold py-4">
              Company Details
            </TableHead>
            <TableHead className="font-semibold py-4">Industry</TableHead>
            <TableHead className="font-semibold py-4">Status</TableHead>
            <TableHead className="font-semibold py-4">Jobs Posted</TableHead>
            <TableHead className="text-right font-semibold py-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground"
              >
                No companies found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company) => (
              <TableRow
                key={company.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-slate-100 dark:border-slate-800 rounded-lg">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold rounded-lg">
                        {company.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                          {company.name}
                        </span>
                        {company.isVerified && (
                          <BadgeCheck className="h-4 w-4 text-blue-500 fill-blue-50" />
                        )}
                        {company.isFeatured && (
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {company.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-sm">{company.industry}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {company.location}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(company.status)}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    {company.totalJobs}
                  </div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <CompanyActions
                    company={company}
                    onUpdateStatus={onUpdateStatus}
                    onToggleVerification={onToggleVerification}
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
