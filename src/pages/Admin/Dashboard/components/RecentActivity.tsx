import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  ArrowRight,
  UserPlus,
  CreditCard,
  FileText,
} from "lucide-react";

const activities = [
  {
    type: "USER_REG",
    user: "TechCorp Inc.",
    action: "registered as a new Employer",
    time: "5 mins ago",
    icon: UserPlus,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
  },
  {
    type: "PAYMENT",
    user: "John Doe",
    action: "purchased 'Premium Listing' for $49.00",
    time: "25 mins ago",
    icon: CreditCard,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30",
  },
  {
    type: "JOB_POST",
    user: "DesignWave",
    action: "posted a new job: 'Senior UI/UX Designer'",
    time: "1 hour ago",
    icon: FileText,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
  },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-none shadow rounded-xl overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between py-6 px-8 border-b border-slate-50 dark:border-slate-800">
          <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
          <Button
            variant="ghost"
            className="text-primary font-bold hover:bg-primary/5 text-sm"
          >
            View System Log
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
              >
                <div className={`p-2 rounded-lg shrink-0 ${activity.color}`}>
                  <activity.icon className="size-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {activity.user}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                    {activity.action}
                  </p>
                </div>
                {activity.type === "VERIFY" && (
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      className="size-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 rounded-full text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex justify-center">
            <Button
              variant="link"
              className="text-slate-500 font-bold hover:text-primary transition-colors flex items-center gap-2 group"
            >
              See more activities
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
