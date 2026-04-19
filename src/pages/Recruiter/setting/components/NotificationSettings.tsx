import { useState } from "react";
import { Bell } from "lucide-react";
import { Section } from "./ui/Section";
import { Switch } from "@/components/ui/switch";

export default function NotificationSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [applicantAlerts, setApplicantAlerts] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);

  return (
    <Section
      icon={<Bell className="w-5 h-5" />}
      title="Notification Preferences"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-100 transition-all">
          <div className="space-y-0.5 text-left">
            <h4 className="text-sm font-bold text-slate-900">
              Email Notifications
            </h4>
            <p className="text-xs text-slate-500">
              Receive updates and summaries via your registered email.
            </p>
          </div>
          <Switch
            checked={emailNotif}
            onCheckedChange={setEmailNotif}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-100 transition-all">
          <div className="space-y-0.5 text-left">
            <h4 className="text-sm font-bold text-slate-900">
              New Applicant Alerts
            </h4>
            <p className="text-xs text-slate-500">
              Get notified immediately when a new candidate applies to your job.
            </p>
          </div>
          <Switch
            checked={applicantAlerts}
            onCheckedChange={setApplicantAlerts}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-100 transition-all">
          <div className="space-y-0.5 text-left">
            <h4 className="text-sm font-bold text-slate-900">
              Message Notifications
            </h4>
            <p className="text-xs text-slate-500">
              Get notified when you receive a new message from a candidate.
            </p>
          </div>
          <Switch
            checked={messageAlerts}
            onCheckedChange={setMessageAlerts}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-100 transition-all opacity-60">
          <div className="space-y-0.5 text-left">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Push Notifications
              <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                Soon
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              Receive notifications directly on your browser or device.
            </p>
          </div>
          <Switch checked={pushNotif} onCheckedChange={setPushNotif} disabled />
        </div>
      </div>

      <div className="flex justify-end mt-8 pt-6 border-t border-slate-100">
        <button
          className="bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold h-11 px-8 rounded-lg transition-all"
          onClick={() => {}}
        >
          Reset to Defaults
        </button>
      </div>
    </Section>
  );
}
