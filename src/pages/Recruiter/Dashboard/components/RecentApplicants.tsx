import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, ExternalLink, Mail, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useGetAllApplicationsQuery } from "@/redux/features/recruiter/application.api";

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    case "SHORTLISTED":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "HIRED":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "REJECTED":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400";
  }
};

export function RecentApplicants() {
  const { data } = useGetAllApplicationsQuery({
    limit: 5,
    page: 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-none shadow rounded overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between py-6 px-8 border-b border-slate-50 dark:border-slate-800">
          <CardTitle className="text-xl font-bold">Recent Applicants</CardTitle>
          <Button
            variant="ghost"
            className="text-primary font-bold hover:bg-primary/5 text-sm"
          >
            View All Applicants
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  <th className="px-8 py-4">Candidate</th>
                  <th className="px-6 py-4">Job Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {data?.data?.map((applicant) => (
                  <motion.tr
                    key={applicant.id}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.01)" }}
                    className="group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 border-2 border-white dark:border-slate-800 shadow-sm">
                          <AvatarImage
                            src={
                              applicant?.user?.candidate?.avatar ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${applicant?.user?.name}`
                            }
                          />
                          <AvatarFallback>
                            {applicant?.user?.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {applicant?.user?.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail className="size-3" />
                            <span className="truncate max-w-[120px]">
                              {applicant?.user?.email || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {applicant?.job?.title}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <Badge
                        className={`rounded-full px-3 py-1 text-[10px] font-bold border-none ${getStatusColor(
                          applicant.status,
                        )}`}
                      >
                        {applicant.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="size-3" />
                        {formatDistanceToNow(new Date(applicant.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 rounded-full hover:bg-primary/5 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {(!data?.data || data?.data?.length === 0) && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-8 py-10 text-center text-slate-500 text-sm italic"
                    >
                      No applicants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
