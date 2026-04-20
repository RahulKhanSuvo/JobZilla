import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <DialogTitle className="text-center text-xl font-bold text-slate-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-3 sm:gap-2">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            variant="destructive"
            className="flex-1 font-bold"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
