import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Section } from "./ui/Section";
import { useDeleteAccountMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { errorToast } from "@/utils/errorToast";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";

export default function DangerZone() {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const [open, setOpen] = useState(false);
  const handelDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      toast.success("Account deleted successfully");
    } catch (error) {
      errorToast(error);
    }
  };
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
        <Button
          onClick={() => setOpen(true)}
          className="shrink-0 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          Delete Account
        </Button>
      </div>

      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        loading={isLoading}
        onConfirm={handelDeleteAccount}
      />
    </Section>
  );
}
