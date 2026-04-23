import CommonWrapper from "@/components/common/CommonWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import type { IJob } from "@/types/job";
import { Briefcase, Lock, Unlock, Edit2, Trash2, Eye } from "lucide-react";
import { Link } from "react-router"; // Fixed react-router to standard routing
import { Button } from "@/components/ui/button";
import AppTooltip from "@/components/common/AppTooltip";
import { motion } from "framer-motion";

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

interface MyJobsTableProps {
  jobs: IJob[];
  isLoading: boolean;
  isUpdatingStatus: boolean;
  handleStatusChange: (id: string, status: string) => void;
  setSelectedJobId: (id: string) => void;
  setOpen: (open: boolean) => void;
}

const tableContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tableItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MyJobsTable({
  jobs,
  isLoading,
  isUpdatingStatus,
  handleStatusChange,
  setSelectedJobId,
  setOpen,
}: MyJobsTableProps) {
  return (
    <CommonWrapper className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse ">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                My Jobs
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Applicants
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Created & Expiry
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Views
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>
          <motion.tbody
            variants={tableContainerVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-slate-50"
          >
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-8 py-4">
                    <Skeleton className="h-20 w-full rounded" />
                  </td>
                </tr>
              ))
            ) : jobs.length > 0 ? (
              jobs.map((job: IJob) => (
                <motion.tr
                  variants={tableItemVariants}
                  key={job.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-start gap-2">
                      <h4 className="text-[17px] font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors cursor-pointer capitalize">
                        {job.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 mt-1.5">
                      <Briefcase className="size-4" />
                      <span className="text-sm font-medium">
                        {job.jobType?.replace("_", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm text-slate-600 font-semibold">
                      {job?.totalApplications || 0} Applicants
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-600 font-medium">
                        Created:{" "}
                        <span className="text-slate-900">
                          {formatDate(job.createdAt)}
                        </span>
                      </p>
                      <p className="text-sm text-slate-600 font-medium">
                        Expiry date:{" "}
                        <span className="text-slate-900">
                          {job.deadline ? formatDate(job.deadline) : "N/A"}
                        </span>
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm text-slate-600 font-semibold">
                      {job.views}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold ${job.status === "OPEN" ? "bg-emerald-50 text-emerald-600" : job.status === "CLOSED" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}
                    >
                      {job.status?.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-3">
                      <AppTooltip
                        content={
                          job.status === "OPEN" ? "Close Job" : "Open Job"
                        }
                      >
                        <Button
                          variant="ghost"
                          disabled={isUpdatingStatus}
                          size="icon"
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                          onClick={() =>
                            handleStatusChange(
                              job.id,
                              job.status === "OPEN" ? "CLOSED" : "OPEN",
                            )
                          }
                        >
                          {job.status === "OPEN" ? (
                            <Lock className="size-4" />
                          ) : (
                            <Unlock className="size-4" />
                          )}
                        </Button>
                      </AppTooltip>

                      <AppTooltip content="Edit Job">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <Link to={`/recruiter/my-jobs/edit-job/${job.id}`}>
                            <Edit2 className="size-4" />
                          </Link>
                        </Button>
                      </AppTooltip>
                      {/* <AppTooltip content="Applicants">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <Link to={`/recruiter/applicants/${job.id}`}>
                            <Users className="size-4" />
                          </Link>
                        </Button>
                      </AppTooltip> */}
                      <AppTooltip content={"view job"}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <Link to={`/job/${job.id}`}>
                            <Eye />
                          </Link>
                        </Button>
                      </AppTooltip>
                      <Button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setOpen(true);
                        }}
                        variant="outline"
                        className="h-10 px-6 border-none text-red-600 font-bold hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-8 py-10 text-center">
                  <p className="text-slate-500 font-medium">No jobs found.</p>
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </CommonWrapper>
  );
}
