import { useState } from "react";
import { Bell } from "lucide-react";
import { Section } from "./ui/Section";
import { Checkbox } from "./ui/Checkbox";

export default function NotificationPreferences() {
  const [notifs, setNotifs] = useState({
    jobRecEmail: true,
    jobRecPush: true,
    appUpdEmail: true,
    appUpdPush: true,
    msgEmail: true,
    msgPush: false,
  });

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Section
      icon={<Bell className="w-5 h-5" />}
      title="Notification Preferences"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-[10px] tracking-widest text-gray-400 uppercase pb-3 font-medium">
                Notification Type
              </th>
              <th className="text-center text-[10px] tracking-widest text-gray-400 uppercase pb-3 w-20 font-medium">
                Email
              </th>
              <th className="text-center text-[10px] tracking-widest text-gray-400 uppercase pb-3 w-20 font-medium">
                Push
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* Job Recommendations */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 pr-4">
                <p className="text-sm font-medium text-gray-900">
                  Job Recommendations
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Based on your skills and preferences.
                </p>
              </td>
              <td className="text-center py-4">
                <div className="flex justify-center">
                  <Checkbox
                    id="notif-jobrec-email"
                    checked={notifs.jobRecEmail}
                    onChange={() => toggleNotif("jobRecEmail")}
                  />
                </div>
              </td>
              <td className="text-center py-4">
                <div className="flex justify-center">
                  <Checkbox
                    id="notif-jobrec-push"
                    checked={notifs.jobRecPush}
                    onChange={() => toggleNotif("jobRecPush")}
                  />
                </div>
              </td>
            </tr>
            {/* Application Updates */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 pr-4">
                <p className="text-sm font-medium text-gray-900">
                  Application Updates
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  When your application status changes.
                </p>
              </td>
              <td className="text-center py-4">
                <div className="flex justify-center">
                  <Checkbox
                    id="notif-appupd-email"
                    checked={notifs.appUpdEmail}
                    onChange={() => toggleNotif("appUpdEmail")}
                  />
                </div>
              </td>
              <td className="text-center py-4">
                <div className="flex justify-center">
                  <Checkbox
                    id="notif-appupd-push"
                    checked={notifs.appUpdPush}
                    onChange={() => toggleNotif("appUpdPush")}
                  />
                </div>
              </td>
            </tr>
            {/* Message Alerts */}
            <tr className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 pr-4">
                <p className="text-sm font-medium text-gray-900">
                  Message Alerts
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  When a recruiter sends you a direct message.
                </p>
              </td>
              <td className="text-center py-4">
                <div className="flex justify-center">
                  <Checkbox
                    id="notif-msg-email"
                    checked={notifs.msgEmail}
                    onChange={() => toggleNotif("msgEmail")}
                  />
                </div>
              </td>
              <td className="text-center py-4">
                <div className="flex justify-center">
                  <Checkbox
                    id="notif-msg-push"
                    checked={notifs.msgPush}
                    onChange={() => toggleNotif("msgPush")}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}
