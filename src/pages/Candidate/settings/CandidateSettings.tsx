import GeneralAccount from "./components/GeneralAccount";
import PrivacyVisibility from "./components/PrivacyVisibility";
import NotificationPreferences from "./components/NotificationPreferences";
import LanguageRegion from "./components/LanguageRegion";
import DangerZone from "./components/DangerZone";
import { ShieldAlert } from "lucide-react";

export default function CandidateSettings() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-primary" />
          Account Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your profile visibility, security, and notification
          preferences.
        </p>
      </div>

      <div className="space-y-6">
        <GeneralAccount />
        <PrivacyVisibility />
        <NotificationPreferences />
        <LanguageRegion />
        <DangerZone />
      </div>
    </div>
  );
}
