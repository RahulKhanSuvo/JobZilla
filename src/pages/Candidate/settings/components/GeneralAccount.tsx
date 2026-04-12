import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Section } from "./ui/Section";

export default function GeneralAccount() {
  const [email, setEmail] = useState("rahul.khan@example.com");
  const [phone, setPhone] = useState("+880 1712 345 678");
  const [currentPassword, setCurrentPassword] = useState("········");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Section icon={<ShieldAlert className="w-5 h-5" />} title="General Account">
      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="settings-email"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Email Address
          </label>
          <input
            id="settings-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label
            htmlFor="settings-phone"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Phone Number
          </label>
          <input
            id="settings-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Change password */}
      <div className="mt-6">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
          Change Password
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="current-password"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end mt-6 pt-5 border-t border-gray-100">
        <button
          className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          onClick={() => {}}
        >
          Update Account
        </button>
      </div>
    </Section>
  );
}
