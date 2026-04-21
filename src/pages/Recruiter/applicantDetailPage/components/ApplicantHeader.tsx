import type { Application } from "@/types/application";
import { Download, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStartConversationMutation } from "@/redux/features/chat/chat.api";
import { useNavigate } from "react-router";
import { errorToast } from "@/utils/errorToast";
import { useState } from "react";

interface Props {
  application: Application;
}

export default function ApplicantHeader({ application }: Props) {
  const user = application?.user;
  const resume = application?.resume;
  const job = application?.job;
  const candidate = user?.candidate;

  const [startConversation] = useStartConversationMutation();
  const navigate = useNavigate();
  const [isMessaging, setIsMessaging] = useState(false);

  const handleOpenChat = async () => {
    console.log(user);
    if (!user?.id) return;
    try {
      setIsMessaging(true);
      const res = await startConversation({ targetUserId: user.id }).unwrap();
      navigate(`/recruiter/messages/${res.data.id}`);
    } catch (error) {
      errorToast(error);
    } finally {
      setIsMessaging(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 shadow px-8 py-8 flex flex-col md:flex-row items-start md:items-center gap-8 group">
      {/* Avatar Container */}
      <div className="shrink-0 relative">
        <div className="size-24 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 ring-4 ring-slate-50 dark:ring-slate-800/50 shadow-md transition-transform duration-300 group-hover:scale-105">
          <img
            src={
              candidate?.avatar ??
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`
            }
            alt={user?.name || "Candidate"}
            className="size-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 size-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm" />
      </div>

      {/* Info Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-0 text-[10px] font-bold uppercase tracking-wider px-2.5">
            Available
          </Badge>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-slate-300" />
            Last active 2h ago
          </span>
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50 leading-tight tracking-tight truncate">
          {user?.name || "Unnamed Candidate"}
        </h1>

        <p className="text-base font-bold text-emerald-600 dark:text-emerald-400/90 tracking-tight flex items-center gap-2">
          {job?.title || "Applied Position"}
          <span className="text-slate-200 dark:text-slate-800">|</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center gap-1">
            <span>📍</span> {candidate?.location || "Remote"}
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
            <span className="text-emerald-500">✉</span>
            {user?.email || "No email provided"}
          </div>
        </div>
      </div>

      {/* Action Column */}
      <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
        <Button
          variant={"default"}
          className="font-bold px-8 h-12 gap-2 active:scale-95 transition-all"
          asChild
        >
          <a href={resume?.fileUrl} target="_blank" rel="noreferrer">
            <Download className="size-4" />
            Download CV
          </a>
        </Button>
        <Button
          variant="outline"
          disabled={isMessaging}
          onClick={handleOpenChat}
          className="font-bold px-8 h-12 gap-2 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all"
        >
          {isMessaging ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <MessageSquare className="size-4" />
          )}
          Message
        </Button>
      </div>
    </div>
  );
}
