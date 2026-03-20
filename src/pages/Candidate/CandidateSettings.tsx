import { useState } from "react";
import { Eye, Globe, Bell, ShieldAlert } from "lucide-react";

// ── Toggle ────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        checked ? "bg-primary" : "bg-slate-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ── Checkbox ──────────────────────────────────────────────

function Checkbox({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`size-5 rounded flex items-center justify-center border-2 transition-colors shrink-0 ${
        checked ? "bg-primary border-primary" : "bg-white border-slate-300"
      }`}
    >
      {checked && (
        <svg className="size-3 text-white" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5l3.5 3.5L11 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

// ── Section wrapper ───────────────────────────────────────

function Section({
  icon,
  title,
  children,
  danger,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl border shadow-sm ${
        danger ? "border-red-200" : "border-border"
      }`}
    >
      <div
        className={`flex items-center gap-2 px-6 py-4 border-b ${
          danger ? "border-red-100" : "border-border"
        }`}
      >
        <span className={danger ? "text-red-500" : "text-primary"}>{icon}</span>
        <h2
          className={`font-semibold text-base ${
            danger ? "text-red-600" : "text-foreground"
          }`}
        >
          {title}
        </h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────

export default function CandidateSettings() {
  // General account
  const [email, setEmail] = useState("rahul.khan@example.com");
  const [phone, setPhone] = useState("+880 1712 345 678");
  const [currentPassword, setCurrentPassword] = useState("········");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Privacy
  const [profileVisible, setProfileVisible] = useState(true);
  const [openToWork, setOpenToWork] = useState(false);

  // Notifications
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

  // Language & Region
  const [language, setLanguage] = useState("English (United States)");
  const [timezone, setTimezone] = useState("(GMT +06:00) Dhaka");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-10">
      {/* Page heading */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Account Settings</h1>
        <p className="text-sm text-[color:var(--paragraph)] mt-0.5">
          Manage your profile visibility, security, and notification
          preferences.
        </p>
      </div>

      {/* ── General Account ──────────────────────────── */}
      <Section
        icon={<ShieldAlert className="size-4" />}
        title="General Account"
      >
        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="settings-email"
              className="block text-xs font-medium text-[color:var(--paragraph)] mb-1"
            >
              Email Address
            </label>
            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label
              htmlFor="settings-phone"
              className="block text-xs font-medium text-[color:var(--paragraph)] mb-1"
            >
              Phone Number
            </label>
            <input
              id="settings-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Change password */}
        <div className="mt-5">
          <p className="text-[10px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase mb-3">
            Change Password
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="current-password"
                className="block text-xs font-medium text-[color:var(--paragraph)] mb-1"
              >
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block text-xs font-medium text-[color:var(--paragraph)] mb-1"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full h-10 px-3 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-xs font-medium text-[color:var(--paragraph)] mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-10 px-3 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end mt-5">
          <button
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => {}}
          >
            Update Account
          </button>
        </div>
      </Section>

      {/* ── Privacy & Visibility ─────────────────────── */}
      <Section icon={<Eye className="size-4" />} title="Privacy & Visibility">
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Profile Visibility
              </p>
              <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
                Control who can find your profile and CV in searches.
              </p>
            </div>
            <Toggle
              id="toggle-profile-visibility"
              checked={profileVisible}
              onChange={setProfileVisible}
            />
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                "Open to Work" Badge
              </p>
              <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
                Show a badge to recruiters indicating you are actively looking.
              </p>
            </div>
            <Toggle
              id="toggle-open-to-work"
              checked={openToWork}
              onChange={setOpenToWork}
            />
          </div>
        </div>
      </Section>

      {/* ── Notification Preferences ─────────────────── */}
      <Section
        icon={<Bell className="size-4" />}
        title="Notification Preferences"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[10px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase pb-3">
                Notification Type
              </th>
              <th className="text-center text-[10px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase pb-3 w-20">
                Email
              </th>
              <th className="text-center text-[10px] font-semibold tracking-widest text-[color:var(--paragraph)] uppercase pb-3 w-20">
                Push
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Job Recommendations */}
            <tr className="border-b border-border">
              <td className="py-4">
                <p className="text-sm font-medium text-foreground">
                  Job Recommendations
                </p>
                <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
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
            <tr className="border-b border-border">
              <td className="py-4">
                <p className="text-sm font-medium text-foreground">
                  Application Updates
                </p>
                <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
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
            <tr>
              <td className="py-4">
                <p className="text-sm font-medium text-foreground">
                  Message Alerts
                </p>
                <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
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
      </Section>

      {/* ── Language & Region ────────────────────────── */}
      <Section icon={<Globe className="size-4" />} title="Language & Region">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="interface-language"
              className="block text-xs font-medium text-[color:var(--paragraph)] mb-1"
            >
              Interface Language
            </label>
            <select
              id="interface-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6E6F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option>English (United States)</option>
              <option>English (United Kingdom)</option>
              <option>Bangla (Bangladesh)</option>
              <option>Hindi (India)</option>
              <option>French (France)</option>
              <option>Spanish (Spain)</option>
              <option>German (Germany)</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="timezone"
              className="block text-xs font-medium text-[color:var(--paragraph)] mb-1"
            >
              Time Zone
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6E6F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option>(GMT +06:00) Dhaka</option>
              <option>(GMT +00:00) UTC</option>
              <option>(GMT -05:00) Eastern Time</option>
              <option>(GMT -08:00) Pacific Time</option>
              <option>(GMT +01:00) London</option>
              <option>(GMT +05:30) Mumbai</option>
              <option>(GMT +08:00) Singapore</option>
              <option>(GMT +09:00) Tokyo</option>
            </select>
          </div>
        </div>
      </Section>

      {/* ── Danger Zone ──────────────────────────────── */}
      <Section
        icon={<ShieldAlert className="size-4" />}
        title="Danger Zone"
        danger
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-red-600">Delete Account</p>
            <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="shrink-0 bg-red-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Account
          </button>
        </div>

        {/* Inline confirm */}
        {showDeleteConfirm && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-semibold text-red-700">
              Are you absolutely sure?
            </p>
            <p className="text-xs text-red-500 mt-1">
              This action cannot be undone. All your data will be permanently
              removed.
            </p>
            <div className="flex gap-3 mt-3">
              <button
                className="text-sm font-semibold bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Yes, delete my account
              </button>
              <button
                className="text-sm font-semibold border border-border text-foreground px-4 py-1.5 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}
