import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { CheckCircle2, Circle } from "lucide-react";
import type { CompletionCheck } from "@/utils/profileCompletion";

interface IncompleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  checks: CompletionCheck[];
}

export default function IncompleteProfileModal({
  isOpen,
  onClose,
  checks,
}: IncompleteProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <span className="text-[#F59E0B]">Profile Incomplete</span>
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 mt-2">
            Your profile must be 100% complete before you can apply for jobs.
            Here is what you still need to complete:
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <ul className="space-y-3">
            {checks.map((check, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                {check.completed ? (
                  <CheckCircle2 className="size-5 text-green-500 shrink-0" />
                ) : (
                  <Circle className="size-5 text-slate-300 dark:text-slate-700 shrink-0" />
                )}
                <span
                  className={
                    check.completed
                      ? "text-slate-900 dark:text-white font-medium"
                      : "text-slate-500 font-medium"
                  }
                >
                  {check.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto bg-[#10b981] hover:bg-[#059669] text-white"
          >
            <Link to="/candidate/profile">Complete Profile Now</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
