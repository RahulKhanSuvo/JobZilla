import { ShieldAlert } from "lucide-react";
import GeneralAccount from "./components/GeneralAccount";
import PasswordSettings from "./components/PasswordSettings";
import NotificationSettings from "./components/NotificationSettings";
import DangerZone from "./components/DangerZone";
import { motion } from "framer-motion";

export default function RecruiterSettings() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-left"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <ShieldAlert className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Account Settings
          </h1>
        </div>
        <p className="text-sm text-slate-500 max-w-2xl font-medium">
          Manage your recruiter account security, preferences, and notification
          settings. Keep your account secure and stay updated with the latest
          activity.
        </p>
      </motion.div>

      {/* Settings Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-8"
      >
        <GeneralAccount />
        <PasswordSettings />
        <NotificationSettings />
        <DangerZone />
      </motion.div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-slate-400 text-xs font-medium">
        <p>© 2026 Jobzilla Recruitment Portal. All rights reserved.</p>
        <p className="mt-1">Version 2.4.0 (Stable Release)</p>
      </div>
    </div>
  );
}
