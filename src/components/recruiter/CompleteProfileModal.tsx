import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, UserCheck } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export default function CompleteProfileModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-amber-500 h-2 w-full" />
        <div className="p-8 space-y-6">
          <DialogHeader className="items-center text-center space-y-3">
            <div className="size-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 animate-pulse">
              <AlertCircle className="size-8" />
            </div>
            <DialogTitle className="text-2xl font-black text-slate-900 leading-tight">
              Incomplete Profile
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium leading-relaxed">
              To post a job and reach top talent, you need to complete your
              company profile first. It only takes a minute!
            </DialogDescription>
          </DialogHeader>

          <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
              <div className="size-2 rounded-full bg-emerald-500" />
              Company Description
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
              <div className="size-2 rounded-full bg-emerald-500" />
              Industry & Category
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
              <div className="size-2 rounded-full bg-emerald-500" />
              Location & Contact Info
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-3">
            <Button
              onClick={() => {
                onClose(false);
                navigate("/recruiter/profile/edit");
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 gap-2 rounded-xl shadow-lg shadow-slate-900/10 active:scale-[0.98] transition-all"
            >
              <UserCheck className="size-4" />
              Complete Profile Now
            </Button>
            <Button
              variant="ghost"
              onClick={() => onClose(false)}
              className="w-full text-slate-400 font-bold hover:bg-slate-50 hover:text-slate-600 h-10 rounded-xl"
            >
              Maybe Later
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
