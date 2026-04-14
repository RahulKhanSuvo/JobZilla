import DashboardTitle from "@/components/common/DashboardTitle";
import CommonWrapper from "@/components/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Users,
  Check,
  RotateCcw,
  Download,
  MapPin,
  X,
  Loader2,
} from "lucide-react";
import {
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/redux/features/recruiter/application.api";
import type { Application, ApplicationStatus } from "@/types/application";
import { errorToast } from "@/utils/errorToast";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600",
  ACCEPTED: "bg-emerald-50 text-emerald-600",
  SHORTLISTED: "bg-blue-50 text-blue-600",
  REJECTED: "bg-red-50 text-red-600",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AllApplicants() {
  const { data: response, isLoading } = useGetAllApplicationsQuery();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();
  const applicationList: Application[] = response?.data ?? [];

  const totalCount = applicationList.length;
  const shortlistedCount = applicationList.filter(
    (a) => a.status === "SHORTLISTED",
  ).length;
  const rejectedCount = applicationList.filter(
    (a) => a.status === "REJECTED",
  ).length;

  const stats = [
    {
      label: "Total Applicants",
      value: totalCount,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Shortlisted",
      value: shortlistedCount,
      icon: Check,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      icon: RotateCcw,
      color: "bg-red-50 text-red-600",
    },
  ];

  const handleUpdateStatus = async (
    applicationId: string,
    status: ApplicationStatus,
  ) => {
    try {
      setLoadingId(applicationId);
      await updateApplicationStatus({ applicationId, status }).unwrap();
      toast.success("Application status updated successfully");
    } catch (error) {
      errorToast(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <DashboardTitle>Applicants Jobs</DashboardTitle>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <CommonWrapper
            key={index}
            className="px-6 py-6 flex items-center gap-5"
          >
            <div
              className={`size-14 rounded-2xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="size-7" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {stat.label}
              </p>
            </div>
          </CommonWrapper>
        ))}
      </div>

      {/* Search and Sort */}
      <CommonWrapper className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <Input
            placeholder="Search"
            className="pl-12 h-12 bg-slate-50/50 border-none rounded"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
            Sort by:
          </span>
          <Select defaultValue="default">
            <SelectTrigger className="h-12 border-none bg-slate-50/50 rounded px-4 min-w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CommonWrapper>

      {/* Recent Applicants Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 px-1">
          Recent Applicants
        </h3>

        <CommonWrapper className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[40%]">
                    Candidates
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Applied Date
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-16 text-center text-slate-400 text-sm"
                    >
                      Loading applicants...
                    </td>
                  </tr>
                ) : applicationList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-16 text-center text-slate-400 text-sm"
                    >
                      No applicants found.
                    </td>
                  </tr>
                ) : (
                  applicationList.map((applicant) => (
                    <tr
                      key={applicant.id}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              applicant.user.candidate.profileImage ??
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${applicant.user.name}`
                            }
                            alt={applicant.user.name}
                            className="size-14 rounded-full bg-slate-100 object-cover"
                          />
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-tight">
                              {applicant.job.title}
                            </p>
                            <h4 className="text-[17px] font-bold text-slate-900 leading-tight">
                              {applicant.user.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <MapPin className="size-3.5" />
                              <span className="text-xs font-medium">
                                {applicant.user.candidate.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold ${
                            statusStyles[applicant.status] ??
                            "bg-slate-50 text-slate-500"
                          }`}
                        >
                          {applicant.status.charAt(0) +
                            applicant.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                        {formatDate(applicant.createdAt)}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            onClick={() =>
                              handleUpdateStatus(applicant.id, "SHORTLISTED")
                            }
                            size="icon"
                            disabled={loadingId === applicant.id}
                            title="Shortlist"
                            className="size-10 bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
                          >
                            {loadingId === applicant.id ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Check className="size-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Reject"
                            disabled={loadingId === applicant.id}
                            onClick={() =>
                              handleUpdateStatus(applicant.id, "REJECTED")
                            }
                            className="size-10 bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg"
                          >
                            {loadingId === applicant.id ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <X className="size-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Download Resume"
                            className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                            asChild
                          >
                            <a
                              href={applicant.resume.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Download className="size-4" />
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-10 px-4 border-emerald-500 text-emerald-600 font-bold hover:bg-emerald-50 rounded-lg ml-2"
                            asChild
                          >
                            <Link to={`/recruiter/applicants/${applicant.id}`}>
                              View Applicant
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CommonWrapper>
      </div>
    </div>
  );
}
