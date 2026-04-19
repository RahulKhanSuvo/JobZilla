import { Trash2, AlertTriangle } from "lucide-react";
import { Section } from "./ui/Section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DangerZone() {
  return (
    <Section icon={<Trash2 className="w-5 h-5" />} title="Danger Zone" danger>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-red-50/50 rounded-xl border border-red-100">
        <div className="space-y-1 text-left">
          <h4 className="text-sm font-bold text-red-600 flex items-center gap-2">
            Delete Recruiter Account
          </h4>
          <p className="text-xs text-red-500/80 leading-relaxed font-medium">
            Permanently remove your account, all posted jobs, and history. This
            action cannot be undone.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="h-10 px-6 font-bold shadow-sm"
            >
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <DialogTitle className="text-center text-xl font-bold text-slate-900">
                Confirm Deletion
              </DialogTitle>
              <DialogDescription className="text-center pt-2">
                Are you absolutely sure? This will permanently delete your
                recruiter account and remove all your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex gap-3 sm:gap-0">
              <Button variant="outline" className="flex-1 font-bold">
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1 font-bold">
                Confirm Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}
