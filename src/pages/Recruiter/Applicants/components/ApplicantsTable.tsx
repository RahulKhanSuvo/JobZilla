import { Button } from "@/components/ui/button";
import {
  Loader2,
  Users,
  MapPin,
  Check,
  Trophy,
  X,
  MessageSquareText,
  Download,
} from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import CommonWrapper from "@/components/common/CommonWrapper";
import type { Application, ApplicationStatus } from "@/types/application";

interface ApplicantsTableProps {
  isLoading: boolean;
  applicationList: Application[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  loadingId: string | null;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onOpenChat: (userId: string) => void;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600 border border-amber-100",
  ACCEPTED: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  SHORTLISTED: "bg-blue-50 text-blue-600 border border-blue-100",
  REJECTED: "bg-red-50 text-red-600 border border-red-100",
  HIRED: "bg-purple-50 text-purple-600 border border-purple-100",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ApplicantsTable({
  isLoading,
  applicationList,
  hasActiveFilters,
  onClearFilters,
  loadingId,
  onUpdateStatus,
  onOpenChat,
}: ApplicantsTableProps) {
  return (
    <CommonWrapper className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[38%]">
                Candidate
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-404 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-404 uppercase tracking-widest">
                Applied
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-404 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Loader2 className="size-8 animate-spin text-primary/40" />
                    <span className="text-sm font-medium">
                      Loading applicants...
                    </span>
                  </div>
                </td>
              </tr>
            ) : applicationList.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Users className="size-10 text-slate-200" />
                    <p className="text-base font-bold text-slate-500">
                      {hasActiveFilters
                        ? "No applicants match your filters"
                        : "No applicants yet"}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={onClearFilters}
                        className="text-sm text-primary font-semibold hover:underline"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              <AnimatePresence mode="wait">
                {applicationList.map((applicant, i) => (
                  <motion.tr
                    key={applicant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Candidate */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            applicant?.user?.candidate?.avatar ??
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${applicant?.user?.name}`
                          }
                          alt={applicant?.user?.name}
                          className="size-12 rounded-full bg-slate-100 object-cover shrink-0 ring-2 ring-white shadow-sm"
                        />
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-[11px] font-bold text-primary uppercase tracking-tight">
                            {applicant?.job?.title}
                          </p>
                          <h4 className="text-base font-bold text-slate-900 leading-tight truncate">
                            {applicant?.user?.name}
                          </h4>
                          {applicant?.user?.candidate?.location && (
                            <div className="flex items-center gap-1 text-slate-400">
                              <MapPin className="size-3" />
                              <span className="text-xs font-medium truncate">
                                {applicant?.user?.candidate?.location}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                          statusStyles[applicant.status] ??
                          "bg-slate-50 text-slate-500 border border-slate-100"
                        }`}
                      >
                        {applicant.status.charAt(0) +
                          applicant.status.slice(1).toLowerCase()}
                      </span>
                    </td>

                    {/* Applied Date */}
                    <td className="px-6 py-5 text-sm text-slate-500 font-medium whitespace-nowrap">
                      {formatDate(applicant.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {/* Shortlist */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Shortlist"
                          disabled={loadingId === applicant.id}
                          onClick={() =>
                            onUpdateStatus(applicant.id, "SHORTLISTED")
                          }
                          className="size-9 bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
                        >
                          {loadingId === applicant.id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Check className="size-3.5" />
                          )}
                        </Button>

                        {/* Hire */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Mark as Hired"
                          disabled={loadingId === applicant.id}
                          onClick={() =>
                            onUpdateStatus(
                              applicant.id,
                              "HIRED" as ApplicationStatus,
                            )
                          }
                          className="size-9 bg-slate-50 text-slate-400 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                        >
                          {loadingId === applicant.id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Trophy className="size-3.5" />
                          )}
                        </Button>

                        {/* Reject */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Reject"
                          disabled={loadingId === applicant.id}
                          onClick={() =>
                            onUpdateStatus(applicant.id, "REJECTED")
                          }
                          className="size-9 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        >
                          {loadingId === applicant.id ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <X className="size-3.5" />
                          )}
                        </Button>

                        {/* Message */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Message Candidate"
                          className="size-9 bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                          onClick={() =>
                            applicant?.user?.id && onOpenChat(applicant.user.id)
                          }
                        >
                          <MessageSquareText className="size-3.5" />
                        </Button>

                        {/* Download Resume */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Download Resume"
                          className="size-9 bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                          asChild
                        >
                          <a
                            href={applicant?.resume?.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Download className="size-3.5" />
                          </a>
                        </Button>

                        {/* View Profile */}
                        <Button
                          variant="outline"
                          className="h-9 px-3.5 text-xs border-primary/30 text-primary font-bold hover:bg-primary/5 rounded-lg ml-1"
                          asChild
                        >
                          <Link to={`/recruiter/applicants/${applicant.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </CommonWrapper>
  );
}
