import { useState } from "react";
import { Lock } from "lucide-react";
import { Section } from "./ui/Section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { errorToast } from "@/utils/errorToast";

export default function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useSelector((state: RootState) => state.auth);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();

      if (response.success) {
        toast.success("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <Section icon={<Lock className="w-5 h-5" />} title="Security & Password">
      <form onSubmit={handlePasswordChange} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 text-left">
            <label
              htmlFor="current-password"
              className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Current Password
            </label>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-12 px-4 border-slate-200 text-sm rounded-lg"
              required
            />
          </div>
          <div className="space-y-2 text-left">
            <label
              htmlFor="new-password"
              className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              New Password
            </label>
            <Input
              id="new-password"
              type="password"
              placeholder="Min. 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-12 px-4 border-slate-200 text-sm rounded-lg"
              required
            />
          </div>
          <div className="space-y-2 text-left">
            <label
              htmlFor="confirm-password"
              className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Confirm New Password
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 px-4 border-slate-200 text-sm rounded-lg"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-white text-sm font-bold h-11 px-8 rounded-lg transition-all"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </Section>
  );
}
