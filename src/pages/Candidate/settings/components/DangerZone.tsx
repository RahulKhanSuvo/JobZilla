import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Section } from "./ui/Section";

export default function DangerZone() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <Section
      icon={<ShieldAlert className="w-5 h-5" />}
      title="Danger Zone"
      danger
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-red-600">Delete Account</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="shrink-0 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          Delete Account
        </button>
      </div>

      {/* Inline confirm */}
      {showDeleteConfirm && (
        <div className="mt-5 p-5 bg-red-50/50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm font-bold text-red-700">
            Are you absolutely sure?
          </p>
          <p className="text-xs text-red-600/80 mt-1.5">
            This action cannot be undone. All your data will be permanently
            removed.
          </p>
          <div className="flex gap-3 mt-4">
            <button
              className="text-sm font-semibold bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 shadow-sm transition-colors"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Yes, delete my account
            </button>
            <button
              className="text-sm font-semibold bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
