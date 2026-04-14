import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserPlus,
  FileText,
  Briefcase,
  ShieldCheck,
  Settings,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import type { Activity, ActivityModule, ActivitySeverity } from "../types";
import { formatDistanceToNow } from "date-fns";

interface ActivityTableProps {
  activities: Activity[];
}

export default function ActivityTable({ activities }: ActivityTableProps) {
  const getModuleConfig = (module: ActivityModule) => {
    switch (module) {
      case "User":
        return {
          icon: UserPlus,
          color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
        };
      case "Job":
        return {
          icon: FileText,
          color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
        };
      case "Company":
        return {
          icon: Briefcase,
          color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30",
        };
      case "Auth":
        return {
          icon: ShieldCheck,
          color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
        };
      case "System":
        return {
          icon: Settings,
          color: "bg-slate-100 text-slate-600 dark:bg-slate-900/30",
        };
      default:
        return {
          icon: Settings,
          color: "bg-slate-100 text-slate-600 dark:bg-slate-900/30",
        };
    }
  };

  const getSeverityIcon = (severity: ActivitySeverity) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-3 w-3 text-red-500" />;
      case "error":
        return <AlertCircle className="h-3 w-3 text-rose-500" />;
      case "warning":
        return <AlertCircle className="h-3 w-3 text-amber-500" />;
      default:
        return <CheckCircle2 className="h-3 w-3 text-emerald-500" />;
    }
  };

  return (
    <Card className="border-none shadow-sm rounded overflow-hidden bg-white dark:bg-slate-900">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
              <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-800/50">
                <Settings className="h-8 w-8 opacity-20" />
              </div>
              <p className="font-bold text-sm uppercase tracking-widest opacity-50 italic">
                No activity logs found
              </p>
            </div>
          ) : (
            activities.map((activity, index) => {
              const config = getModuleConfig(activity.module);
              return (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={activity.id}
                  className="group flex items-start gap-4 p-6 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all"
                >
                  <div
                    className={`p-3 rounded shrink-0 ${config.color} transition-transform group-hover:scale-110`}
                  >
                    <config.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar className="h-5 w-5 border border-slate-100 dark:border-slate-800">
                          <AvatarImage src={activity.user.avatar} />
                          <AvatarFallback className="text-[8px] font-black">
                            {activity.user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-black text-slate-900 dark:text-slate-100 truncate">
                          {activity.user.name}
                        </span>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                          {getSeverityIcon(activity.severity)}
                          {activity.module}
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap bg-slate-100/50 dark:bg-slate-800/50 px-2 py-1 rounded-md flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(activity.timestamp))} ago
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                        {activity.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
